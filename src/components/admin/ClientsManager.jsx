import React, { useState } from 'react';
import { Building2, Mail, ExternalLink, Globe, Plus, Search, DollarSign, ShieldCheck, Lock, Edit, Trash2, Phone, FileText, FolderKey, CheckCircle2, AlertCircle } from 'lucide-react';
import { CONFIDENTIAL_CLIENTS } from '../../data/creativeData';

export default function ClientsManager({ userRole }) {
  const [clients, setClients] = useState(CONFIDENTIAL_CLIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    whatsapp: '',
    retainerAmount: '$10,000',
    lifetimeValue: '$25,000',
    invoicedAmount: '$10,000',
    paidAmount: '$10,000',
    unpaidAmount: '$0',
    financialStatus: 'Fully Paid',
    status: 'Active - Retainer',
    lead: 'A M Pabel',
    website: '',
    vaultDriveUrl: 'https://drive.google.com/',
    ndaSigned: true,
    privateNotes: ''
  });

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      whatsapp: '',
      retainerAmount: '$15,000',
      lifetimeValue: '$30,000',
      invoicedAmount: '$15,000',
      paidAmount: '$15,000',
      unpaidAmount: '$0',
      financialStatus: 'Fully Paid',
      status: 'Active - Retainer',
      lead: 'A M Pabel',
      website: '',
      vaultDriveUrl: 'https://drive.google.com/',
      ndaSigned: true,
      privateNotes: ''
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      company: client.company,
      phone: client.phone,
      email: client.email,
      whatsapp: client.whatsapp,
      retainerAmount: client.retainerAmount,
      lifetimeValue: client.lifetimeValue,
      invoicedAmount: client.invoicedAmount,
      paidAmount: client.paidAmount,
      unpaidAmount: client.unpaidAmount,
      financialStatus: client.financialStatus,
      status: client.status,
      lead: client.lead,
      website: client.website || '',
      vaultDriveUrl: client.vaultDriveUrl || 'https://drive.google.com/',
      ndaSigned: client.ndaSigned,
      privateNotes: client.privateNotes || ''
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.company) return;

    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...editingClient, ...formData } : c));
    } else {
      const newClient = {
        id: `client-${Date.now()}`,
        ...formData
      };
      setClients([newClient, ...clients]);
    }

    setShowAddModal(false);
    setEditingClient(null);
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-red-950/70 via-slate-900 to-[#070913] p-4 sm:p-6 rounded-2xl border border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.15)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge border-red-400 text-red-400 bg-red-950/60">
              <Lock className="w-3 h-3" />
              CONFIDENTIAL EXECUTIVE VAULT (ADMIN EXCLUSIVE)
            </span>
          </div>
          <h2 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white mt-1.5">
            Confidential Executive Clients Directory & Financial Vault
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Strictly private directory for <strong>A M Pabel (Studio Captain)</strong>. Contains direct WhatsApp/phone contacts, retainer amounts, Lifetime Value (LTV), private notes, and NDA drive links.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="neon-button-primary py-2.5 px-5 text-xs justify-center shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Onboard New Client</span>
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search confidential client, company, phone, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
          />
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
          <span>Active Accounts: <strong className="text-cyan-300">{clients.length} Clients</strong></span>
          <span>Total Vault LTV: <strong className="text-green-400">$325,000</strong></span>
        </div>
      </div>

      {/* Client Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="neon-card p-5 sm:p-6 border-red-500/30 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              
              {/* Header: Company, Name & Financial Status */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Creato_Display'] text-base sm:text-lg font-bold text-white">
                      {client.company}
                    </h3>
                    <p className="text-xs text-slate-400">Key Contact: <strong className="text-cyan-300">{client.name}</strong></p>
                  </div>
                </div>

                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  client.financialStatus === 'Fully Paid'
                    ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                    : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                }`}>
                  {client.financialStatus}
                </span>
              </div>

              {/* Financial Vault Metrics Breakdown */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-center">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Retainer Amount</span>
                  <span className="text-xs sm:text-sm font-extrabold text-cyan-400 font-['Creato_Display']">{client.retainerAmount}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Lifetime Value (LTV)</span>
                  <span className="text-xs sm:text-sm font-extrabold text-green-400 font-['Creato_Display']">{client.lifetimeValue}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Unpaid / Due</span>
                  <span className={`text-xs sm:text-sm font-extrabold font-['Creato_Display'] ${client.unpaidAmount === '$0' ? 'text-slate-400' : 'text-red-400'}`}>
                    {client.unpaidAmount}
                  </span>
                </div>
              </div>

              {/* Contact Info (Direct Phone / WhatsApp / Email) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a href={`mailto:${client.email}`} className="hover:text-cyan-300 font-semibold truncate">{client.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>WhatsApp: {client.whatsapp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>NDA Status: <strong className="text-green-300">{client.ndaSigned ? 'Signed & Verified' : 'Pending'}</strong></span>
                </div>
              </div>

              {/* Private Executive Notes */}
              {client.privateNotes && (
                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-xs text-slate-300 space-y-1">
                  <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest block">Executive Private Note:</span>
                  <p className="leading-relaxed text-slate-200 italic">{client.privateNotes}</p>
                </div>
              )}

            </div>

            {/* Action Bar & Vault Link */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <a
                href={client.vaultDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 font-bold flex items-center gap-1.5"
              >
                <FolderKey className="w-3.5 h-3.5 text-cyan-400" />
                <span>Private Drive Vault ↗</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(client)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-yellow-500/30 text-yellow-300 hover:border-yellow-400 font-semibold flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Info</span>
                </button>

                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                  title="Archive Account"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Onboard / Edit Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="neon-card max-w-xl w-full max-h-[92vh] overflow-y-auto border-red-400 p-6 sm:p-8 relative space-y-6">
            
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-red-500/30"
            >
              ✕
            </button>

            <div className="space-y-1">
              <h3 className="font-['Creato_Display'] text-xl font-extrabold text-white">
                {editingClient ? 'Edit Executive Client Profile & Notes' : 'Onboard New Confidential Client'}
              </h3>
              <p className="text-xs text-slate-400">Strictly confidential client details, retainer budgets, and private notes.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shikor Media Group"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-900 border border-red-500/30 rounded-xl p-3 text-white outline-none focus:border-red-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Key Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Executive Director"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-red-500/30 rounded-xl p-3 text-white outline-none focus:border-red-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Direct Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+880 1700-000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsapp: e.target.value })}
                    className="w-full bg-slate-900 border border-red-500/30 rounded-xl p-3 text-white outline-none focus:border-red-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="client@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-red-500/30 rounded-xl p-3 text-white outline-none focus:border-red-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Retainer Amount</label>
                  <input
                    type="text"
                    placeholder="$15,000"
                    value={formData.retainerAmount}
                    onChange={(e) => setFormData({ ...formData, retainerAmount: e.target.value })}
                    className="w-full bg-slate-900 border border-red-500/30 rounded-xl p-3 text-cyan-300 font-bold outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Lifetime Value (LTV)</label>
                  <input
                    type="text"
                    placeholder="$45,000"
                    value={formData.lifetimeValue}
                    onChange={(e) => setFormData({ ...formData, lifetimeValue: e.target.value })}
                    className="w-full bg-slate-900 border border-red-500/30 rounded-xl p-3 text-green-400 font-bold outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Unpaid Amount</label>
                  <input
                    type="text"
                    placeholder="$0"
                    value={formData.unpaidAmount}
                    onChange={(e) => setFormData({ ...formData, unpaidAmount: e.target.value, financialStatus: e.target.value === '$0' ? 'Fully Paid' : 'Partial Paid' })}
                    className="w-full bg-slate-900 border border-red-500/30 rounded-xl p-3 text-red-400 font-bold outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Private Drive / Contract Vault URL</label>
                <input
                  type="text"
                  placeholder="https://drive.google.com/drive/folders/client-vault"
                  value={formData.vaultDriveUrl}
                  onChange={(e) => setFormData({ ...formData, vaultDriveUrl: e.target.value })}
                  className="w-full bg-slate-900 border border-red-500/30 rounded-xl p-3 text-white outline-none focus:border-red-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Private Executive Description & Notes</label>
                <textarea
                  rows={3}
                  placeholder="Private client contract details, preferences, NDA terms, and special agreements..."
                  value={formData.privateNotes}
                  onChange={(e) => setFormData({ ...formData, privateNotes: e.target.value })}
                  className="w-full bg-slate-900 border border-red-500/30 rounded-xl p-3 text-white outline-none focus:border-red-400"
                />
              </div>

              <button
                type="submit"
                className="neon-button-primary w-full justify-center py-3 text-xs font-extrabold"
              >
                <span>{editingClient ? 'Save Confidential Profile' : 'Publish Confidential Client'}</span>
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
