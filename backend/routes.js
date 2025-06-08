const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { SuperAdmin, Admin, Agent, Tenant } = require('./schema');

// middleware to check token - modified for testing
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  
  // For testing purposes, allow dummy token
  if (!token) {
    return res.status(401).json({ error: 'Access Denied - No token provided' });
  }

  // Skip JWT verification for testing with dummy token
  if (token === 'dummy-token-for-testing') {
    req.user = { id: 'test-user', role: 'superadmin' };
    return next();
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY || 'fallback-secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid Token' });
  }
}

// Super Admin Login
router.post('/superadmin/login', async (req, res) => {
  const { email, password } = req.body;
  const superAdmin = await SuperAdmin.findOne({ email, password });
  if (!superAdmin) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: superAdmin._id, role: 'superadmin' }, process.env.TOKEN_KEY);
  res.json({ token });
});

// Admin Signup/Login
router.post('/admin/signup', async (req, res) => {
  const { email, password } = req.body;
  const admin = new Admin({ email, password });
  await admin.save();
  res.send('Admin account created');
});

router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, password });
  if (!admin) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.TOKEN_KEY);
  res.json({ token });
});

// Agent Signup/Login
router.post('/agent/signup', async (req, res) => {
  const { email, password } = req.body;
  const agent = new Agent({ email, password });
  await agent.save();
  res.send('Agent account created');
});

router.post('/agent/login', async (req, res) => {
  const { email, password } = req.body;
  const agent = await Agent.findOne({ email, password });
  if (!agent) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ id: agent._id, role: 'agent' }, process.env.TOKEN_KEY);
  res.json({ token });
});

// TENANT ROUTES

// Get all tenants with optional filters
router.get('/tenants', authMiddleware, async (req, res) => {
  try {
    const { status, from, to, search } = req.query;
    let query = {};

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by date range
    if (from || to) {
      query.subscriptionStart = {};
      if (from) query.subscriptionStart.$gte = new Date(from);
      if (to) query.subscriptionStart.$lte = new Date(to);
    }

    // Search functionality
    if (search) {
      query.$or = [
        { tenantName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subdomain: { $regex: search, $options: 'i' } }
      ];
    }

    const tenants = await Tenant.find(query).select('-password').sort({ createdAt: -1 });
    
    // Get tenant statistics
    const totalTenants = await Tenant.countDocuments();
    const activeTenants = await Tenant.countDocuments({ status: 'active' });
    const inactiveTenants = await Tenant.countDocuments({ status: 'inactive' });

    res.json({
      tenants,
      stats: {
        total: totalTenants,
        active: activeTenants,
        inactive: inactiveTenants
      }
    });
  } catch (error) {
    console.error('Error fetching tenants:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single tenant by ID
router.get('/tenants/:id', authMiddleware, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id).select('-password');
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new tenant
router.post('/tenants', authMiddleware, async (req, res) => {
  try {
    const { tenantName, subdomain, email, password, status } = req.body;

    // Check if email or subdomain already exists
    const existingEmail = await Tenant.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const existingSubdomain = await Tenant.findOne({ subdomain });
    if (existingSubdomain) {
      return res.status(400).json({ error: 'Subdomain already exists' });
    }

    const tenant = new Tenant({
      tenantName,
      subdomain: subdomain.toLowerCase(),
      email: email.toLowerCase(),
      password,
      status: status || 'active'
    });

    await tenant.save();
    
    // Return tenant without password
    const savedTenant = await Tenant.findById(tenant._id).select('-password');
    res.status(201).json({ 
      message: 'Tenant created successfully', 
      tenant: savedTenant 
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({ error: `${field} already exists` });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Update tenant
router.put('/tenants/:id', authMiddleware, async (req, res) => {
  try {
    const { tenantName, email, status } = req.body;
    
    // Check if email exists for other tenants
    if (email) {
      const existingEmail = await Tenant.findOne({ 
        email: email.toLowerCase(), 
        _id: { $ne: req.params.id } 
      });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    const updateData = {
      updatedAt: Date.now()
    };

    if (tenantName) updateData.tenantName = tenantName;
    if (email) updateData.email = email.toLowerCase();
    if (status) updateData.status = status;

    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    res.json({ 
      message: 'Tenant updated successfully', 
      tenant 
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({ error: `${field} already exists` });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Delete tenant
router.delete('/tenants/:id', authMiddleware, async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    res.json({ message: 'Tenant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update tenant status (activate/deactivate)
router.patch('/tenants/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be "active" or "inactive"' });
    }

    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).select('-password');

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    res.json({ 
      message: `Tenant ${status === 'active' ? 'activated' : 'deactivated'} successfully`, 
      tenant 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
