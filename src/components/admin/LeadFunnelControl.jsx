import React, { useState } from 'react';
import { Rocket, Send, CheckCircle2, Plus, FileText, ArrowRight, UserCheck } from 'lucide-react';
import { INITIAL_LEADS } from '../../data/creativeData';

export default function LeadFunnelControl({ userRole }) {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    contact: '',
    stage: 'New Lead',
    dealValue: '$25,000'
  });

  const STAGES = ['New Lead', 'Proposal Sent', 'Negotiation', 'Won / Onboarded'];

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!formData.clientName) return;

    const newLead = {
      id: `lead-${Date.now()}`,
      ...formData,
      proposalSent: formData.stage !== 'New Lead',
      contractSigned: formData.stage === 'Won / Onboarded'
    };

    setLeads([newLead, ...leads]);
    setShowAddModal(false);
  };

  const handleChangeStage = (id, newStage) => {
    setLeads(leads.map(l => {
      if (l.id === id) {
        return {
          ...l,
          stage: newStage,
          proposalSent: newStage !== 'New Lead',
          contractSigned: newStage === 'Won / Onboarded'
        };
      }
      return l;
    }));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-950/80 via-slate-900 to-[#070913] p-4 sm:p-6 rounded-2xl border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge border-amber-400 text-amber-300">BUSINESS DEVELOPMENT</span>
            <span className="text-xs text-slate-300">• Logged in as <strong className="text-white">{userRole}</strong></span>
          </div>
          <h2 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white mt-1">
            Lead Conversion Funnel & Contract Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Track prospective client inquiries, proposal statuses, negotiations, and closed agreements.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="neon-button-primary py-2.5 px-5 text-xs justify-center shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Prospective Lead</span>
        </button>
      </div>

      {/* 4-Stage Lead Funnel Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAGES.map(stage => {
          const stageLeads = leads.filter(l => l.stage === stage);

          return (
            <div key={stage} className="bg-slate-950/90 border border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider text-[11px]">{stage}</span>
                <span className="bg-slate-900 text-slate-400 px-2 py-0.5 rounded-full text-[10px] font-mono">{stageLeads.length}</span>
              </div>

              <div className="space-y-3 min-h-[180px]">
                {stageLeads.map(lead => (
                  <div key={lead.id} className="neon-card p-3.5 border-amber-500/20 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-xs">{lead.clientName}</h4>
                      <span className="font-extrabold text-green-400 font-['Creato_Display']">{lead.dealValue}</span>
                    </div>

                    <p className="text-[10px] text-slate-400">{lead.contact}</p>

                    <div className="flex items-center justify-between text-[9px] pt-1">
                      <span className={lead.proposalSent ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                        {lead.proposalSent ? '✓ Proposal Sent' : 'No Proposal Yet'}
                      </span>
                      <span className={lead.contractSigned ? 'text-green-400 font-bold' : 'text-slate-500'}>
                        {lead.contractSigned ? '✓ Contract Signed' : 'Pending Sign'}
                      </span>
                    </div>

                    {/* Stage Selector */}
                    <select
                      value={lead.stage}
                      onChange={(e) => handleChangeStage(lead.id, e.target.value)}
                      className="w-full bg-slate-900 border border-amber-500/30 rounded-lg p-1 text-[10px] text-amber-300 font-bold outline-none mt-1"
                    >
                      {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="neon-card max-w-md w-full border-amber-400 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-['Creato_Display'] text-lg font-bold text-white">Add New Client Inquiry / Lead</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Client / Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aether AI Robotics"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-slate-900 border border-amber-500/30 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Contact Person / Email</label>
                <input
                  type="text"
                  required
                  placeholder="sarah@aether.ai"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-slate-900 border border-amber-500/30 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Estimated Deal Value</label>
                  <input
                    type="text"
                    placeholder="$35,000"
                    value={formData.dealValue}
                    onChange={(e) => setFormData({ ...formData, dealValue: e.target.value })}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-xl p-3 text-green-400 font-bold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Initial Funnel Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-xl p-3 text-amber-300 font-bold outline-none"
                  >
                    {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="neon-button-primary w-full justify-center py-3 text-xs font-extrabold"
              >
                <span>Save Prospective Lead</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
