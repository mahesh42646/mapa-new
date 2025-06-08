const mongoose = require('mongoose');

// SuperAdmin Schema
const superAdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { collection: 'superadmins' });

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { collection: 'admins' });

// Agent Schema
const agentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { collection: 'agents' });

// Tenant Schema
const tenantSchema = new mongoose.Schema({
  tenantName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  subdomain: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'active' 
  },
  subscriptionStart: { 
    type: Date, 
    default: Date.now 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  collection: 'tenants',
  timestamps: true 
});

// Models
const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Agent = mongoose.model('Agent', agentSchema);
const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = { SuperAdmin, Admin, Agent, Tenant };
