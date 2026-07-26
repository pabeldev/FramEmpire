import React, { useState } from 'react';
import { Building2, Mail, ExternalLink, Globe, Plus, Search, DollarSign, FolderKanban, ShieldCheck, User } from 'lucide-react';
import { INITIAL_CLIENTS_LIST } from '../../data/creativeData';

export default function ClientsManager({ userRole }) {
  const [clients, setClients] = useState(INITIAL_CLIENTS_LIST);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    activeProjects: 1,
    totalSpent: '$10,000',
    status: 'Active',
    lead: 'A M Pabel',
    website: ''
  });

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.company) return;

    const newClient = {
      id: `client-${Date.now()}`,
      ...formData
    };

    setClients([newClient, ...clients]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-950/80 via-slate-900 to-[#070913] p-4 sm:p-6 rounded-2xl border border-blue-500/30 shadow-[0_0_20px_rgba(0,102,255,0.15)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge border-blue-400 text-blue-300">EXECUTIVE CLIENTS DIRECTORY</span>
            <span className="text-xs text-slate-300">• Accessible by <strong className="text-white">{userRole}</strong></span>
          </div>
          <h2 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white mt-1">
            Agency Clients & Retainer Contracts
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Master list of client accounts, active retainer contracts, total revenue generated, and assigned studio leads.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="neon-button-primary py-2.5 px-5 text-xs justify-center shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Onboard New Client</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search client name, company, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
          />
        </div>
        <span className="text-xs font-semibold text-slate-400">Total Clients: <strong className="text-cyan-300">{clients.length} Accounts</strong></span>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="neon-card p-5 sm:p-6 border-blue-500/30 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              {/* Header: Company & Status */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Creato_Display'] text-base font-bold text-white">
                      {client.company}
                    </h3>
                    <p className="text-xs text-slate-400">Contact: <strong className="text-cyan-300">{client.name}</strong></p>
                  </div>
                </div>

                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  client.status.includes('Retainer')
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : client.status === 'Active'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-green-500/20 text-green-300 border border-green-500/40'
                }`}>
                  {client.status}
                </span>
              </div>

              {/* Client Metrics */}
              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Active Sprints</span>
                  <span className="text-sm font-extrabold text-cyan-400 font-['Creato_Display']">{client.activeProjects} Active</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Total Revenue</span>
                  <span className="text-sm font-extrabold text-green-400 font-['Creato_Display']">{client.totalSpent}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Studio Lead</span>
                  <span className="text-xs font-bold text-yellow-300 block truncate">{client.lead}</span>
                </div>
              </div>

              {/* Email & Website Info */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a href={`mailto:${client.email}`} className="hover:text-cyan-300 font-semibold">{client.email}</a>
                </div>
                {client.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold hover:underline truncate">{client.website}</a>
                  </div>
                )}
              </div>

            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[10px]">Client ID: {client.id}</span>
              <a
                href={`mailto:${client.email}?subject=FramEmpire%20Studio%20Update`}
                className="text-cyan-300 font-bold hover:underline flex items-center gap-1"
              >
                <span>Send Brief</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Onboard Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="neon-card max-w-md w-full border-blue-400 p-6 sm:p-8 relative space-y-6">
            
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-blue-500/30"
            >
              ✕
            </button>

            <div className="space-y-1">
              <h3 className="font-['Creato_Display'] text-xl font-extrabold text-white">
                Onboard New Client Account
              </h3>
              <p className="text-xs text-slate-400">Add client contact, company name, contract status, and studio lead.</p>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shikor Media Group"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-slate-900 border border-blue-500/30 rounded-xl p-3 text-white outline-none focus:border-blue-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Primary Contact Person</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Executive Director Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-blue-500/30 rounded-xl p-3 text-white outline-none focus:border-blue-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Contact Email</label>
                <input
                  type="email"
                  required
                  placeholder="client@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-blue-500/30 rounded-xl p-3 text-white outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Contract Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-900 border border-blue-500/30 rounded-xl p-3 text-cyan-300 font-semibold outline-none focus:border-blue-400"
                  >
                    <option value="Active">Active</option>
                    <option value="Active - Retainer">Active - Retainer</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Studio Lead</label>
                  <select
                    value={formData.lead}
                    onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                    className="w-full bg-slate-900 border border-blue-500/30 rounded-xl p-3 text-white font-semibold outline-none focus:border-blue-400"
                  >
                    <option value="A M Pabel">A M Pabel (Team Captain)</option>
                    <option value="David Kross">David Kross (Web Lead)</option>
                    <option value="Marcus Vance">Marcus Vance (Video Lead)</option>
                    <option value="Sophia Chen">Sophia Chen (Design Lead)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="neon-button-primary w-full justify-center py-3 text-xs font-extrabold"
              >
                <span>Publish Client Account</span>
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
