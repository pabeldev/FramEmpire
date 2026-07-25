import React, { useState } from 'react';
import { 
  Users, FolderKanban, Clock, DollarSign, Cpu, Activity, 
  Film, Video, Sparkles
} from 'lucide-react';

import EmployeeManager from './EmployeeManager';
import ProjectKanban from './ProjectKanban';
import TimesheetTracker from './TimesheetTracker';
import PortfolioManager from './PortfolioManager';

import { EMPLOYEES, CLIENT_PROJECTS_PIPELINE } from '../../data/creativeData';

export default function AdminDashboard({ userRole, projects, onAddProject, onDeleteProject }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, portfolio, employees, projects, timesheets

  return (
    <div className="min-h-screen bg-[#070913] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-[#070913] p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,243,255,0.15)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge text-[10px]">INTERNAL STUDIO WORKSPACE</span>
            <span className="text-xs text-cyan-400 font-semibold">• Logged in as <strong className="text-white">{userRole}</strong></span>
          </div>
          <h1 className="font-['Creato_Display'] text-2xl sm:text-3xl font-extrabold text-white mt-1">
            FramEmpire Operations & Studio Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Manage creative staff, YouTube/Vimeo/Behance portfolio embeds, active renders & client project pipelines.
          </p>
        </div>

        {/* Action Quick Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 border border-cyan-500/30 p-3 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 font-bold block uppercase font-mono">Render Farm Load</span>
            <span className="text-base font-extrabold text-cyan-400 font-['Creato_Display']">24 / 24 Nodes Active</span>
          </div>
          <div className="bg-slate-900/90 border border-blue-500/30 p-3 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 font-bold block uppercase font-mono">Monthly Revenue</span>
            <span className="text-base font-extrabold text-green-400 font-['Creato_Display']">$185,000 USD</span>
          </div>
        </div>
      </div>

      {/* Admin Module Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-cyan-500/20 pb-4">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: Activity },
          { id: 'portfolio', label: `Portfolio Embed Manager (${projects.length})`, icon: Video },
          { id: 'employees', label: `Employee Directory (${EMPLOYEES.length})`, icon: Users },
          { id: 'projects', label: `Project Pipeline (${CLIENT_PROJECTS_PIPELINE.length})`, icon: FolderKanban },
          { id: 'timesheets', label: 'Timesheets & PTO', icon: Clock },
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                  : 'bg-slate-900 border border-cyan-500/20 text-slate-300 hover:border-cyan-400 hover:text-cyan-300'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Render */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Executive Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="neon-card p-5 border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between text-cyan-400">
                <span className="text-xs font-bold text-slate-400 uppercase">Monthly Revenue</span>
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-white font-['Creato_Display']">$185,000</p>
              <p className="text-xs text-green-400 font-semibold">+22.4% vs last month</p>
            </div>

            <div className="neon-card p-5 border-blue-500/30 space-y-2">
              <div className="flex items-center justify-between text-blue-400">
                <span className="text-xs font-bold text-slate-400 uppercase">Active Creative Projects</span>
                <FolderKanban className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-white font-['Creato_Display']">{CLIENT_PROJECTS_PIPELINE.length} Sprints</p>
              <p className="text-xs text-cyan-300 font-semibold">2 Projects in Final Review</p>
            </div>

            <div className="neon-card p-5 border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between text-purple-400">
                <span className="text-xs font-bold text-slate-400 uppercase">Employee Roster</span>
                <Users className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-white font-['Creato_Display']">{EMPLOYEES.length} Specialists</p>
              <p className="text-xs text-slate-300 font-semibold">Average Workload: 82%</p>
            </div>

            <div className="neon-card p-5 border-cyan-400/30 space-y-2">
              <div className="flex items-center justify-between text-cyan-300">
                <span className="text-xs font-bold text-slate-400 uppercase">Live Portfolio Items</span>
                <Video className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-white font-['Creato_Display']">{projects.length} Embeds</p>
              <p className="text-xs text-cyan-400 font-semibold">YouTube, Vimeo, Behance</p>
            </div>

          </div>

          {/* Quick Overview Grid: Active Projects & Render Cluster */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Active Projects Overview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-['Creato_Display'] font-bold text-lg text-white">Active Animation & Video Sprints</h3>
                <button onClick={() => setActiveTab('projects')} className="text-xs text-cyan-400 font-bold hover:underline">
                  View Full Pipeline &rarr;
                </button>
              </div>

              <div className="space-y-4">
                {CLIENT_PROJECTS_PIPELINE.map((proj) => (
                  <div key={proj.id} className="neon-card p-4 border-cyan-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="neon-badge text-[9px] mb-1">{proj.discipline}</span>
                        <h4 className="font-bold text-sm text-white">{proj.name}</h4>
                        <p className="text-xs text-slate-400">Client: {proj.client} • Lead: <strong className="text-cyan-300">{proj.lead}</strong></p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-cyan-300 block">{proj.budget}</span>
                        <span className="text-[11px] text-yellow-400 font-semibold">{proj.status}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Sprint Completion</span>
                        <span>{proj.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Render Farm & Team Status Widget */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Octane Render Farm Widget */}
              <div className="neon-card p-6 border-cyan-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-['Creato_Display'] text-base font-bold text-white">GPU Render Node Status</h3>
                  </div>
                  <span className="neon-badge text-[9px]">OCTANE 2026.1</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="bg-slate-900/90 border border-cyan-500/40 p-2 rounded-lg text-center space-y-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping mx-auto" />
                      <span className="text-[9px] font-mono text-cyan-300 font-bold">NODE-{i+1}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  All GPU render nodes operating at 100% efficiency. 4K frame caching for <i>FramEmpire 3D Reel</i> estimated finish at 18:30 UTC.
                </p>
              </div>

              {/* Quick Team Workload Summary */}
              <div className="neon-card p-6 border-blue-500/30 space-y-4">
                <h3 className="font-['Creato_Display'] text-base font-bold text-white">Team Availability</h3>
                <div className="space-y-3">
                  {EMPLOYEES.slice(0, 3).map(emp => (
                    <div key={emp.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <img src={emp.avatar} alt={emp.name} className="w-7 h-7 rounded-full object-cover border border-cyan-400" />
                        <div>
                          <p className="font-bold text-white">{emp.name}</p>
                          <p className="text-[10px] text-slate-400">{emp.role}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-cyan-300">{emp.workloadPercent}% Load</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Portfolio Embed Manager Tab */}
      {activeTab === 'portfolio' && (
        <PortfolioManager
          projects={projects}
          onAddProject={onAddProject}
          onDeleteProject={onDeleteProject}
        />
      )}

      {/* Employee Directory Tab */}
      {activeTab === 'employees' && <EmployeeManager userRole={userRole} />}

      {/* Project Pipeline Kanban Tab */}
      {activeTab === 'projects' && <ProjectKanban userRole={userRole} />}

      {/* Timesheets & PTO Tab */}
      {activeTab === 'timesheets' && <TimesheetTracker userRole={userRole} />}

    </div>
  );
}
