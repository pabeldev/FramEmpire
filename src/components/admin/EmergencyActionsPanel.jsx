import React, { useState } from 'react';
import { AlertCircle, Zap, Send, ShieldCheck, UserCheck, RefreshCw, Radio, FileText, CheckCircle2 } from 'lucide-react';
import { EMPLOYEES } from '../../data/creativeData';

export default function EmergencyActionsPanel({ userRole, onBroadcastNotice }) {
  const [fromEmp, setFromEmp] = useState(EMPLOYEES[1]?.name || 'Elena Vance');
  const [toEmp, setToEmp] = useState(EMPLOYEES[4]?.name || 'David Kross');
  const [reassignSuccess, setReassignSuccess] = useState(false);

  // Broadcast Notice State
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Contract Link Generator
  const [clientContractName, setClientContractName] = useState('');
  const [generatedContractUrl, setGeneratedContractUrl] = useState('');

  const handleReassignProjects = (e) => {
    e.preventDefault();
    if (fromEmp === toEmp) return;
    setReassignSuccess(true);
    setTimeout(() => setReassignSuccess(false), 4000);
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastText) return;
    if (onBroadcastNotice) onBroadcastNotice(broadcastText);
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastText('');
    }, 4000);
  };

  const handleGenerateContract = (e) => {
    e.preventDefault();
    if (!clientContractName) return;
    const clean = clientContractName.toLowerCase().replace(/\s+/g, '-');
    setGeneratedContractUrl(`https://framempire.agency/legal/nda-agreement?client=${clean}&token=${Date.now()}`);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-red-950/80 via-slate-900 to-[#070913] p-4 sm:p-6 rounded-2xl border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge border-red-400 text-red-400 bg-red-950/60">EMERGENCY ACTION MATRIX</span>
            <span className="text-xs text-slate-300">• Authorized: <strong className="text-white">{userRole}</strong></span>
          </div>
          <h2 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white mt-1">
            Quick Operations & Emergency Response Panel
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Emergency 1-click project re-assignment, auto-contract generation, and studio broadcast announcements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* 1. Emergency Project Re-assign */}
        <div className="neon-card p-5 sm:p-6 border-red-500/30 space-y-4">
          <div className="flex items-center gap-2 border-b border-red-500/20 pb-3">
            <RefreshCw className="w-5 h-5 text-red-400" />
            <h3 className="font-['Creato_Display'] font-bold text-base text-white">Emergency Project Re-Assign</h3>
          </div>

          <p className="text-xs text-slate-300">
            Transfer all active sprints from an absent or sick specialist to an available team member in 1-click.
          </p>

          {reassignSuccess && (
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/40 text-green-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span>Sprints re-assigned successfully from {fromEmp} to {toEmp}!</span>
            </div>
          )}

          <form onSubmit={handleReassignProjects} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-300">Absent / Sick Specialist (From):</label>
              <select
                value={fromEmp}
                onChange={(e) => setFromEmp(e.target.value)}
                className="w-full bg-slate-900 border border-red-500/30 rounded-xl p-2.5 text-red-300 font-bold outline-none"
              >
                {EMPLOYEES.map(emp => <option key={emp.id} value={emp.name}>{emp.name} ({emp.role})</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Target Specialist (To):</label>
              <select
                value={toEmp}
                onChange={(e) => setToEmp(e.target.value)}
                className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-2.5 text-cyan-300 font-bold outline-none"
              >
                {EMPLOYEES.map(emp => <option key={emp.id} value={emp.name}>{emp.name} ({emp.role})</option>)}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold text-xs shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Execute Emergency Transfer</span>
            </button>
          </form>
        </div>

        {/* 2. Broadcast Announcement */}
        <div className="neon-card p-5 sm:p-6 border-cyan-500/30 space-y-4">
          <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h3 className="font-['Creato_Display'] font-bold text-base text-white">Broadcast Studio Notice</h3>
          </div>

          <p className="text-xs text-slate-300">
            Push official high-priority emergency notifications to all staff portals instantly.
          </p>

          {broadcastSent && (
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Broadcast notice dispatched to all staff portals!</span>
            </div>
          )}

          <form onSubmit={handleSendBroadcast} className="space-y-3 text-xs">
            <textarea
              rows={3}
              required
              placeholder="e.g. Urgent Render Server Maintenance scheduled at 20:00 UTC. Save all Octane caches..."
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
              className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
            />

            <button
              type="submit"
              className="neon-button-primary w-full justify-center py-2.5 text-xs font-extrabold"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Notice Now</span>
            </button>
          </form>
        </div>

        {/* 3. Send Contract / NDA Generator */}
        <div className="neon-card p-5 sm:p-6 border-purple-500/30 space-y-4">
          <div className="flex items-center gap-2 border-b border-purple-500/20 pb-3">
            <FileText className="w-5 h-5 text-purple-400" />
            <h3 className="font-['Creato_Display'] font-bold text-base text-white">Contract / NDA Generator</h3>
          </div>

          <p className="text-xs text-slate-300">
            Auto-generate secure client agreement & NDA links for instant digital signing.
          </p>

          <form onSubmit={handleGenerateContract} className="space-y-3 text-xs">
            <input
              type="text"
              required
              placeholder="Client Company Name (e.g. Shikor TV)"
              value={clientContractName}
              onChange={(e) => setClientContractName(e.target.value)}
              className="w-full bg-slate-900 border border-purple-500/30 rounded-xl p-3 text-white placeholder-slate-500 outline-none focus:border-purple-400"
            />

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 font-extrabold hover:border-purple-400 flex items-center justify-center gap-2 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Generate Contract Link</span>
            </button>
          </form>

          {generatedContractUrl && (
            <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 text-xs space-y-1">
              <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest block">Generated NDA Link:</span>
              <a href={generatedContractUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-mono underline break-all text-[10px]">
                {generatedContractUrl}
              </a>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
