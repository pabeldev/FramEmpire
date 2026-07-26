import React, { useState } from 'react';
import { FolderKanban, AlertTriangle, CheckCircle2, Clock, Users, ShieldAlert, ArrowRight, Activity, Cpu } from 'lucide-react';
import { MASTER_PIPELINE_STAGES, EMPLOYEES } from '../../data/creativeData';

export default function ProductionPipelineMonitor({ userRole }) {
  const [pipeline, setPipeline] = useState(MASTER_PIPELINE_STAGES);

  const STAGES = ['Briefing', 'In-Production', 'Internal Review', 'Client Review', 'Delivered', 'Invoiced'];

  const handleChangeStage = (id, newStage) => {
    setPipeline(pipeline.map(p => p.id === id ? { ...p, stage: newStage } : p));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-950/80 via-slate-900 to-[#070913] p-4 sm:p-6 rounded-2xl border border-blue-500/30 shadow-[0_0_20px_rgba(0,102,255,0.15)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge border-blue-400 text-blue-300">PRODUCTION OPERATIONS PIPELINE</span>
            <span className="text-xs text-slate-300">• Logged in as <strong className="text-white">{userRole}</strong></span>
          </div>
          <h2 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white mt-1">
            Global Master Production Pipeline & Bottleneck Monitor
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            6-Stage production workflow, resource allocation, and revision bottleneck analytics.
          </p>
        </div>
      </div>

      {/* 6-Stage Kanban Board */}
      <div className="space-y-4">
        <h3 className="font-['Creato_Display'] font-bold text-base text-white">Global 6-Stage Master Pipeline View</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {STAGES.map((stage) => {
            const stageProjects = pipeline.filter(p => p.stage === stage);

            return (
              <div key={stage} className="bg-slate-950/90 border border-slate-800 p-3.5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider text-[11px]">{stage}</span>
                  <span className="bg-slate-900 text-slate-400 px-2 py-0.5 rounded-full text-[10px] font-mono">{stageProjects.length}</span>
                </div>

                <div className="space-y-3 min-h-[160px]">
                  {stageProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className={`neon-card p-3 space-y-2 border-cyan-500/20 text-xs ${
                        proj.bottleneck ? 'border-red-500/50 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : ''
                      }`}
                    >
                      <h4 className="font-bold text-white text-xs line-clamp-1">{proj.title}</h4>
                      <p className="text-[10px] text-slate-400">Client: {proj.client}</p>

                      {proj.bottleneck && (
                        <div className="flex items-center gap-1 text-[9px] font-extrabold text-red-400 bg-red-500/10 p-1 rounded border border-red-500/30">
                          <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
                          <span>BOTTLENECK: {proj.revisions} Revisions</span>
                        </div>
                      )}

                      {/* Advance Stage Control */}
                      <select
                        value={proj.stage}
                        onChange={(e) => handleChangeStage(proj.id, e.target.value)}
                        className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-1 text-[10px] text-cyan-300 font-bold outline-none"
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
      </div>

      {/* Revision & Bottleneck Analytics Card */}
      <div className="neon-card p-5 sm:p-6 border-cyan-500/30 space-y-4">
        <h3 className="font-['Creato_Display'] font-bold text-base text-white">Revision & Bottleneck Analytics</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Average Revision Count</span>
            <p className="text-xl font-extrabold text-cyan-400 font-['Creato_Display']">1.4 Revisions / Proj</p>
            <p className="text-[11px] text-green-400">Within Healthy Studio Norms</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Flagged Bottlenecks</span>
            <p className="text-xl font-extrabold text-red-400 font-['Creato_Display']">1 Active Warning</p>
            <p className="text-[11px] text-red-400">Ibnu Abil Khair Portal (4 Revisions)</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Render Farm Node Load</span>
            <p className="text-xl font-extrabold text-green-400 font-['Creato_Display']">100% Efficiency</p>
            <p className="text-[11px] text-cyan-300">24 / 24 Octane GPU Nodes</p>
          </div>
        </div>
      </div>

    </div>
  );
}
