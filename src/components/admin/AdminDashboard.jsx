import React, { useState } from 'react';
import { 
  Activity, Lock, ShieldCheck, DollarSign, CheckSquare, Users, 
  FolderKanban, Clock, Video, Plus, CreditCard, Rocket, Radio, AlertTriangle, Cpu, TrendingUp, PieChart, ShieldAlert, Zap
} from 'lucide-react';

import ClientsManager from './ClientsManager';
import AccessControlManager from './AccessControlManager';
import PayrollManager from './PayrollManager';
import ProductionPipelineMonitor from './ProductionPipelineMonitor';
import FinancialsExpensesEngine from './FinancialsExpensesEngine';
import LeadFunnelControl from './LeadFunnelControl';
import EmergencyActionsPanel from './EmergencyActionsPanel';
import TaskManager from './TaskManager';
import PortfolioManager from './PortfolioManager';

import { EMPLOYEES, CLIENT_PROJECTS_PIPELINE, INITIAL_STUDIO_TASKS } from '../../data/creativeData';

export default function AdminDashboard({ userRole, projects, onAddProject, onDeleteProject }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, clients, access, payroll, pipeline, financials, leads, emergency, tasks, portfolio
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // Dynamic Studio Tasks & Broadcast Notice
  const [tasksList, setTasksList] = useState(INITIAL_STUDIO_TASKS);
  const [broadcastNotice, setBroadcastNotice] = useState('Welcome to FramEmpire Executive Operations & Administration Portal.');

  const handleAddTask = (newTask) => {
    setTasksList([newTask, ...tasksList]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasksList(tasksList.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleDeleteTask = (taskId) => {
    setTasksList(tasksList.filter(t => t.id !== taskId));
  };

  const handlePushTaskToPortfolio = (task) => {
    const newPortfolioItem = {
      id: `proj-${Date.now()}`,
      title: task.title,
      client: task.client,
      category: task.category || 'Graphic Design',
      categoryKey: task.categoryKey || 'graphic-design',
      platform: task.embedUrl?.includes('behance') ? 'behance' : (task.embedUrl?.includes('youtube') ? 'youtube' : 'web'),
      embedUrl: task.embedUrl || '',
      liveUrl: task.liveUrl || '',
      image: task.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      year: new Date().getFullYear().toString(),
      summary: task.description,
      stats: `Delivered by ${task.assignedTo} • Approved by ${task.reportingBoss}`,
      deliverables: ['Studio Master Final', 'Client Approved Cut', 'High-Res Assets'],
      featured: true
    };

    onAddProject(newPortfolioItem);
    setTasksList(tasksList.map(t => t.id === task.id ? { ...t, addedToPortfolio: true } : t));
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white p-3 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-[#070913] p-4 sm:p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge text-[9px]">FRAMEMPIRE HEAD OF OPERATIONS & ADMIN PORTAL</span>
            <span className="text-[11px] text-cyan-400 font-semibold">• Executive Access: <strong className="text-white">{userRole}</strong></span>
          </div>
          <h1 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white mt-1">
            FramEmpire Agency Operations Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Executive Financials, Confidential Clients Directory, System Permissions, HR Payroll Clearances & Emergency Actions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('emergency')}
            className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 font-extrabold text-xs flex items-center gap-2 hover:bg-red-500/20 transition-all shrink-0"
          >
            <Zap className="w-4 h-4 text-red-400 fill-red-400" />
            <span>Emergency Actions</span>
          </button>

          <div className="hidden lg:block bg-slate-900/90 border border-cyan-500/30 p-2.5 rounded-xl text-right shrink-0">
            <span className="text-[9px] text-slate-400 font-bold block uppercase font-mono">GPU Cluster</span>
            <span className="text-xs font-extrabold text-cyan-400 font-['Creato_Display']">24 / 24 Render Active</span>
          </div>
        </div>
      </div>

      {/* Broadcast Notice Alert Bar */}
      {broadcastNotice && (
        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
            <span className="font-bold">STUDIO BROADCAST NOTICE:</span>
            <span className="text-slate-200">{broadcastNotice}</span>
          </div>
          <button onClick={() => setBroadcastNotice('')} className="text-slate-400 hover:text-white text-xs font-bold">Dismiss</button>
        </div>
      )}

      {/* Master 8-Module Navigation Tabs - Horizontally Scrollable on Mobile */}
      <div className="flex overflow-x-auto gap-2 border-b border-cyan-500/20 pb-3 scrollbar-none no-scrollbar">
        {[
          { id: 'overview', label: '1. Executive KPI Center', icon: Activity },
          { id: 'clients', label: '2. Confidential Clients Vault', icon: Lock },
          { id: 'access', label: '3. Role & Access Matrix', icon: ShieldCheck },
          { id: 'payroll', label: '4. HR Payroll & Clearance', icon: DollarSign },
          { id: 'pipeline', label: '5. Production Pipeline', icon: FolderKanban },
          { id: 'financials', label: '6. Expenses & Profitability', icon: CreditCard },
          { id: 'leads', label: '7. Lead Funnel & Deals', icon: Rocket },
          { id: 'emergency', label: '8. Emergency Actions', icon: Zap },
          { id: 'tasks', label: `Task Control (${tasksList.length})`, icon: CheckSquare },
          { id: 'portfolio', label: `Public Showcase (${projects.length})`, icon: Video },
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                  : 'bg-slate-900 border border-cyan-500/20 text-slate-300 hover:border-cyan-400 hover:text-cyan-300'
              }`}
            >
              <IconComp className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Executive Control Dashboard (KPI Center) */}
      {activeTab === 'overview' && (
        <div className="space-y-6 sm:space-y-8">
          
          {/* Financial Summary Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="neon-card p-4 sm:p-5 border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between text-cyan-400">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Monthly Recurring Revenue (MRR)</span>
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-['Creato_Display']">$185,000</p>
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className="text-green-400">Collected: $167,000</span>
                <span className="text-yellow-400">Pending: $18,000</span>
              </div>
            </div>

            <div className="neon-card p-4 sm:p-5 border-green-500/30 space-y-2">
              <div className="flex items-center justify-between text-green-400">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Net Profit Margin</span>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-green-400 font-['Creato_Display']">68.2% ($126,100)</p>
              <p className="text-[11px] text-slate-300 font-semibold">After Team Payroll & Software Costs</p>
            </div>

            <div className="neon-card p-4 sm:p-5 border-blue-500/30 space-y-2">
              <div className="flex items-center justify-between text-blue-400">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Active Projects vs Stuck</span>
                <FolderKanban className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-['Creato_Display']">12 Running</p>
              <div className="flex items-center gap-1.5 text-[11px] text-red-400 font-bold">
                <AlertTriangle className="w-3.5 h-3.5 fill-red-400/20" />
                <span>1 Project Blocked (Revision Limit)</span>
              </div>
            </div>

            <div className="neon-card p-4 sm:p-5 border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between text-purple-400">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Team Capacity Utilization</span>
                <PieChart className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-cyan-300 font-['Creato_Display']">82.4% Capacity</p>
              <p className="text-[11px] text-slate-300 font-semibold">Optimal Load (5 Specialists Active)</p>
            </div>

          </div>

          {/* Quick Operational Alerts & Render Farm Status */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left: Operational Alerts & Live Task Statuses */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-['Creato_Display'] font-bold text-base sm:text-lg text-white">Quick Operational Alerts & Sprints</h3>
                <button onClick={() => setActiveTab('tasks')} className="text-xs text-cyan-400 font-bold hover:underline">
                  View Task Control &rarr;
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/40 text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-red-300 font-semibold">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>OVERDUE INVOICE: Ibnu Abil Khair Enterprise ($8,000 Due)</span>
                  </div>
                  <button onClick={() => setActiveTab('clients')} className="text-cyan-300 font-bold text-[11px] hover:underline shrink-0">View Vault &rarr;</button>
                </div>

                <div className="p-3.5 rounded-xl bg-yellow-950/30 border border-yellow-500/40 text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-yellow-300 font-semibold">
                    <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>PAYROLL CLEARANCE ALERT: 1 Staff Salary Pending Monthly Approval</span>
                  </div>
                  <button onClick={() => setActiveTab('payroll')} className="text-cyan-300 font-bold text-[11px] hover:underline shrink-0">Approve &rarr;</button>
                </div>

                {tasksList.slice(0, 3).map((task) => (
                  <div key={task.id} className="neon-card p-4 border-cyan-500/20 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{task.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${task.status === 'Ready to Deliver' ? 'bg-green-500/20 text-green-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Client: {task.client} • Lead Designer: <strong className="text-cyan-300">{task.assignedTo}</strong></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Render Farm & Team Status Widget */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Octane Render Farm Widget */}
              <div className="neon-card p-4 sm:p-6 border-cyan-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    <h3 className="font-['Creato_Display'] text-sm sm:text-base font-bold text-white">GPU Render Cluster Status</h3>
                  </div>
                  <span className="neon-badge text-[9px]">OCTANE 2026.1</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="bg-slate-900/90 border border-cyan-500/40 p-1.5 sm:p-2 rounded-lg text-center space-y-1">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mx-auto" />
                      <span className="text-[8px] sm:text-[9px] font-mono text-cyan-300 font-bold block">N-{i+1}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  All GPU render nodes operating at 100% efficiency. 4K frame caching for <i>FramEmpire 3D Reel</i> estimated finish at 18:30 UTC.
                </p>
              </div>

              {/* Team Workload Allocation */}
              <div className="neon-card p-4 sm:p-6 border-blue-500/30 space-y-4">
                <h3 className="font-['Creato_Display'] text-sm sm:text-base font-bold text-white">Specialist Availability</h3>
                <div className="space-y-3">
                  {EMPLOYEES.slice(0, 4).map(emp => (
                    <div key={emp.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img src={emp.avatar} alt={emp.name} className="w-7 h-7 rounded-full object-cover border border-cyan-400" />
                        <div>
                          <p className="font-bold text-white text-xs">{emp.name}</p>
                          <p className="text-[9px] text-slate-400 truncate max-w-[120px]">{emp.role}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-cyan-300 text-xs shrink-0">{emp.workloadPercent}% Load</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* 2. Confidential Executive Clients Directory & Vault */}
      {activeTab === 'clients' && <ClientsManager userRole={userRole} />}

      {/* 3. Role Assignment & Access Control Matrix */}
      {activeTab === 'access' && <AccessControlManager userRole={userRole} />}

      {/* 4. HR Overview, Payroll & Salary Clearance Hub */}
      {activeTab === 'payroll' && <PayrollManager userRole={userRole} />}

      {/* 5. Production Pipeline & Bottleneck Monitor */}
      {activeTab === 'pipeline' && <ProductionPipelineMonitor userRole={userRole} />}

      {/* 6. Agency Financials, Expenses & Profitability Engine */}
      {activeTab === 'financials' && <FinancialsExpensesEngine userRole={userRole} />}

      {/* 7. Lead Conversion Funnel & Contract Status */}
      {activeTab === 'leads' && <LeadFunnelControl userRole={userRole} />}

      {/* 8. Quick Operations & Emergency Actions Panel */}
      {activeTab === 'emergency' && (
        <EmergencyActionsPanel
          userRole={userRole}
          onBroadcastNotice={(notice) => setBroadcastNotice(notice)}
        />
      )}

      {/* Studio Task Control */}
      {activeTab === 'tasks' && (
        <TaskManager
          tasks={tasksList}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onPushToPortfolio={handlePushTaskToPortfolio}
          userRole={userRole}
        />
      )}

      {/* Portfolio & Files Manager */}
      {activeTab === 'portfolio' && (
        <PortfolioManager
          projects={projects}
          onAddProject={onAddProject}
          onDeleteProject={onDeleteProject}
          showAddModalDirectly={showAddProjectModal}
          setShowAddModalDirectly={setShowAddProjectModal}
        />
      )}

    </div>
  );
}
