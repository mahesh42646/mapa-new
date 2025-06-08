"use client";
import React, { useState } from "react";
import Image from 'next/image';

const agents = [

    { name: "Staff 1", type: "", avatar: null },
];

function AgentDetails({ agent, onBack }) {
    const [tab, setTab] = React.useState("individual");
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="  fw-bold">
                    <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#222', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginRight: 16 }}>←</button>
                    Cultural Agent Details</h4>
                <div className="d-flex me-2 gap-2">
                    <button className="rounded-5" style={{ background: '#eee', color: '#888', border: 'none', padding: '6px 36px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Disable</button>
                    <button className="rounded-5" style={{ background: '#7CFC00', color: '#222', border: 'none', borderRadius: 16, padding: '6px 36px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Active</button>
                </div>
            </div>
            <div style={{ maxWidth: '100%', margin: '0 auto', background: '#fff', borderRadius: 16, padding: 0, boxShadow: '0 2px 8px #0001', border: '2px solid #eee' }}>
                {/* Header */}
                <div style={{ background: '#f7f7f7', borderBottom: '1px solid #eee', padding: 24, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            {agent.avatar ? (
                                <Image 
                                    src={agent.avatar} 
                                    alt={agent.name} 
                                    width={56}
                                    height={56}
                                    style={{ borderRadius: '50%', objectFit: 'cover', background: '#eee' }}
                                />
                            ) : (
                                <div style={{ width: 56, height: 56, borderRadius: '50%', background: agent.color || '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 24 }}>
                                    {agent.name.split(' ').length > 1 ? agent.name.split(' ').map(n => n[0]).join('') : agent.name[0]}
                                </div>
                            )}
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 20 }}>{agent.name}</div>
                                <div style={{ color: '#222', fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ color: '#2ecc40', fontSize: 18 }}>●</span> Verified Agent
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <button className="rounded-5 " style={{ background: '#F5FFF0', color: '#222', border: '1px solid rgb(216, 251, 216)', borderRadius: 16, padding: '6px 18px', fontWeight: 500, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                Download Agent Details <span style={{ fontSize: 18 }}><i class="bi bi-download"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid #eee', paddingLeft: 24, gap: 32, marginTop: 0 }}>
                    <div onClick={() => setTab('individual')} style={{ cursor: 'pointer', padding: '18px 0 10px 0', borderBottom: tab === 'individual' ? '2px solid #2ecc40' : 'none', color: tab === 'individual' ? '#2ecc40' : '#222', fontWeight: tab === 'individual' ? 600 : 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                        Individual {tab === 'individual' && <span style={{ fontSize: 18 }}><i class="bi bi-person-circle"></i></span>}
                    </div>
                    <div onClick={() => setTab('legal')} style={{ cursor: 'pointer', padding: '18px 0 10px 0', borderBottom: tab === 'legal' ? '2px solid #2ecc40' : 'none', color: tab === 'legal' ? '#2ecc40' : '#222', fontWeight: tab === 'legal' ? 600 : 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 18 }}>🏛️</span> Legal Entity
                    </div>
                    <div onClick={() => setTab('collective')} style={{ cursor: 'pointer', padding: '18px 0 10px 0', borderBottom: tab === 'collective' ? '2px solid #2ecc40' : 'none', color: tab === 'collective' ? '#2ecc40' : '#222', fontWeight: tab === 'collective' ? 600 : 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 18 }}>👥</span> Collective Group
                    </div>
                </div>
                {/* Form */}
                <form style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 36 }}>
                    {/* Dados Pessoais */}
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Dados Pessoais</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>CPF *</label>
                                <input placeholder="" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Full name *</label>
                                <input placeholder="" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Social name</label>
                                <input placeholder="" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Gender *</label>
                                <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                                    <option>Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Breed *</label>
                                <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                                    <option>Select</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </select>
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Are you LGBTQIAPN+? *</label>
                                <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                                    <option>Select</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Date of birth *</label>
                                <input type="date" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>RG *</label>
                                <input placeholder="" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                            </div>
                        </div>
                    </div>
                    {/* Informações de Acessibilidade */}
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Informações de Acessibilidade</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Do you have a PCD disability? *</label>
                                <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                                    <option>Select</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>In case without PCD which one?</label>
                                <input placeholder="" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                            </div>
                        </div>
                    </div>
                    {/* Informações Socioeconômicas e Educacionais */}
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Informações Socioeconômicas e Educacionais</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Education *</label>
                                <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                                    <option>Select</option>
                                    <option>Primary</option>
                                    <option>Secondary</option>
                                    <option>Higher</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Individual income *</label>
                                <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                                    <option>Select</option>
                                    <option>Up to 1 minimum wage</option>
                                    <option>1-3 minimum wages</option>
                                    <option>Above 3 minimum wages</option>
                                </select>
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Beneficiary of any social program?</label>
                                <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                                    <option>Select</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Name of the social program</label>
                                <input placeholder="" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                            </div>
                        </div>
                    </div>
                    {/* Informações Profissionais */}
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Informações Profissionais</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Main area of activity *</label>
                                <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                                    <option>Select</option>
                                    <option>Music</option>
                                    <option>Dance</option>
                                    <option>Theater</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Do you belong to traditional communities?</label>
                                <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                                    <option>Select</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                                <span style={{ color: '#888', fontSize: 13, marginTop: 2 }}>(E.g.: quilombolas, indigenous people, riverside communities, etc.)</span>
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Name of the social program</label>
                                <input placeholder="" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                            </div>
                        </div>
                    </div>
                    {/* Endereço */}
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Endereço</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>State</label>
                                <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                                    <option>Select</option>
                                    <option>SP</option>
                                    <option>RJ</option>
                                    <option>MG</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>City</label>
                                <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                                    <option>Select</option>
                                    <option>São Paulo</option>
                                    <option>Rio de Janeiro</option>
                                    <option>Belo Horizonte</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Street name and number</label>
                                <input placeholder="" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                            </div>
                        </div>
                    </div>
                    {/* Contato */}
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Contato</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Telefone</label>
                                <input placeholder="" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                            </div>
                            <div style={{ gridColumn: '1/3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontWeight: 500 }}>Email</label>
                                <input placeholder="" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                            </div>
                        </div>
                    </div>
                    {/* Responsável pela Inscrição */}
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Responsável pela Inscrição</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label style={{ fontWeight: 500 }}>Name of person responsible for registration (if not the person themselves)</label>
                            <input placeholder="" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function AgentsPage() {
    const [selectedAgent, setSelectedAgent] = useState(null);
    return (
        <div className="ps-lg-5 pe-lg-2 px-2 py-lg-4 py-2" >
            {selectedAgent ? (
                <AgentDetails agent={selectedAgent} onBack={() => setSelectedAgent(null)} />
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <h2 style={{ margin: 0, fontWeight: 600, fontSize: 20 }}>List of Staff</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <input
                                type="text"
                                placeholder="Search agent"
                                style={{ border: '1px solid #ccc', borderRadius: 24, padding: '6px 24px', outline: 'none', width: 200 }}
                            />
                            <button style={{ background: '#7CFC00', border: 'none', borderRadius: 24, padding: '8px 24px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
                                Filter
                            </button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {agents.map((agent, idx) => (
                            <div
                                key={agent.name}
                                className="d-flex align-items-center gap-3 bg-transparent rounded-3 "
                                style={{ minHeight: 48, cursor: 'pointer', }}
                                onClick={() => setSelectedAgent(agent)}   >
                                {agent.avatar ? (
                                    <Image 
                                        src={agent.avatar} 
                                        alt={agent.name} 
                                        width={36}
                                        height={36}
                                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: agent.color || '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18 }}>
                                        {agent.name.split(' ').length > 1 ? agent.name.split(' ').map(n => n[0]).join('') : agent.name[0]}
                                    </div>
                                )}
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: 16 }}>{agent.name}</div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
