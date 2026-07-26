import React, { useState } from 'react';
import { 
  Users, FolderKanban, Clock, DollarSign, Cpu, Activity, 
  Film, Video, Sparkles, Plus, Upload, CheckSquare, Building2, Rocket
} from 'lucide-react';

import TaskManager from './TaskManager';
import ClientsManager from './ClientsManager';
import EmployeeManager from './EmployeeManager';
import ProjectKanban from './ProjectKanban';
import TimesheetTracker from './TimesheetTracker';
import PortfolioManager from './PortfolioManager';

import { EMPLOYEES, CLIENT_PROJECTS_PIPELINE, INITIAL_STUDIO_TASKS } from '../../data/creativeData';

export default function AdminDashboard({ userRole, projects, onAddProject, onDeleteProject }) {
  const [activeTab, setActiveTab] = useState('tasks'); // tasks, clients, overview, portfolio, employees, projects, timesheets
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // Dynamic Studio Tasks State
  const [tasksList, setTasksList] = useState(INITIAL_STUDIO_TASKS);

  const handleAddTask = (newTask) => {
    setTasksList([newTask, ...tasksList]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasksList(tasksList.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleDeleteTask = (taskId) => {
    setTasksList(tasksList.filter(t => t.id !== taskId));
  };

  // + Add to Portfolio Callback (Pushes completed task to public portfolio!)
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

    // Mark task as added to portfolio
    setTasksList(tasksList.map(t => t.id === task.id ? { ...t, addedToPortfolio: true } : t));
  };

  const handleOpenAddProjectModal = () => {
    setActiveTab('portfolio');
    setShowAddProjectModal(true);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white p-3 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-[#070913] p-4 sm:p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge text-[9px]">FRAMEMPIRE STUDIO PANEL</span>
            <span className="text-[11px] text-cyan-400 font-semibold">• Logged in as <strong className="text-white">{userRole}</strong></span>
          </div>
          <h1 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white mt-1">
            FramEmpire Operations & Studio Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Task Assignment Control, Daily Productivity Tracker, HR Role Management & Client Directory.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleOpenAddProjectModal}
            className="neon-button-primary py-2.5 px-4 text-xs w-full sm:w-auto justify-center shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add / Upload Project</span>
          </button>

          <div className="hidden lg:block bg-slate-900/90 border border-cyan-500/30 p-2.5 rounded-xl text-right shrink-0">
            <span className="text-[9px] text-slate-400 font-bold block uppercase font-mono">Render Cluster</span>
            <span className="text-xs font-extrabold text-cyan-400 font-['Creato_Display']">24 / 24 GPU Active</span>
          </div>
        </div>
      </div>

      {/* Admin Module Navigation Tabs - Horizontally Scrollable on Mobile */}
      <div className="flex overflow-x-auto gap-2 border-b border-cyan-500/20 pb-3 scrollbar-none no-scrollbar">
        {[
          { id: 'tasks', label: `Task Control (${tasksList.length})`, icon: CheckSquare },
          { id: 'clients', label: 'Clients Directory', icon: Building2 },
          { id: 'overview', label: 'Whole Agency Productivity', icon: Activity },
          { id: 'portfolio', label: `Public Portfolio (${projects.length})`, icon: Video },
          { id: 'employees', label: `Team & HR (${EMPLOYEES.length})`, icon: Users },
          { id: 'projects', label: `Pipeline Sprints (${CLIENT_PROJECTS_PIPELINE.length})`, icon: FolderKanban },
          { id: 'timesheets', label: 'Timesheets & PTO', icon: Clock },
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

      {/* Tab Content Render */}
      
      {/* 1. Studio Task Manager */}
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

      {/* 2. Executive Clients Directory */}
      {activeTab === 'clients' && (
        <ClientsManager userRole={userRole} />
      )}

      {/* 3. Whole Agency Productivity Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6 sm:space-y-8">
          
          {/* Executive Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="neon-card p-4 sm:p-5 border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between text-cyan-400">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Monthly Agency Revenue</span>
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-['Creato_Display']">$185,000</p>
              <p className="text-[11px] text-green-400 font-semibold">+22.4% vs last month</p>
            </div>

            <div className="neon-card p-4 sm:p-5 border-blue-500/30 space-y-2">
              <div className="flex items-center justify-between text-blue-400">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Active Task Sprints</span>
                <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-['Creato_Display']">{tasksList.length} Tasks</p>
              <p className="text-[11px] text-cyan-300 font-semibold">{tasksList.filter(t => t.status === 'Ready to Deliver').length} Ready to Deliver</p>
            </div>

            <div className="neon-card p-4 sm:p-5 border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between text-purple-400">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Team Roster</span>
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-['Creato_Display']">{EMPLOYEES.length} Specialists</p>
              <p className="text-[11px] text-slate-300 font-semibold">Average Workload: 84%</p>
            </div>

            <div className="neon-card p-4 sm:p-5 border-cyan-400/30 space-y-2 cursor-pointer hover:border-cyan-300 transition-colors" onClick={() => setActiveTab('portfolio')}>
              <div className="flex items-center justify-between text-cyan-300">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Live Portfolio Showcase</span>
                <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-['Creato_Display']">{projects.length} Uploads</p>
              <p className="text-[11px] text-cyan-400 font-semibold">+ Upload / Embed New &rarr;</p>
            </div>

          </div>

          {/* Quick Overview Grid: Active Projects & Render Cluster */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left: Active Tasks Productivity Overview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-['Creato_Display'] font-bold text-base sm:text-lg text-white">Daily Productivity & Task Statuses</h3>
                <button onClick={() => setActiveTab('tasks')} className="text-xs text-cyan-400 font-bold hover:underline">
                  View Task Control &rarr;
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {tasksList.map((task) => (
                  <div key={task.id} className="neon-card p-4 border-cyan-500/20 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="neon-badge text-[9px] mb-1">{task.category || 'Graphic Design'}</span>
                        <h4 className="font-bold text-xs sm:text-sm text-white">{task.title}</h4>
                        <p className="text-[11px] text-slate-400">Assigned: <strong className="text-cyan-300">{task.assignedTo}</strong> • Boss: <strong className="text-yellow-300">{task.reportingBoss}</strong></p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          task.status === 'Ready to Deliver' ? 'bg-green-500/20 text-green-300' : 'bg-cyan-500/20 text-cyan-300'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Daily Productivity Completion</span>
                        <span>{task.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${task.progressPercent}%` }}
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
              <div className="neon-card p-4 sm:p-6 border-cyan-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    <h3 className="font-['Creato_Display'] text-sm sm:text-base font-bold text-white">GPU Render Node Status</h3>
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

              {/* Quick Team Workload Summary */}
              <div className="neon-card p-4 sm:p-6 border-blue-500/30 space-y-4">
                <h3 className="font-['Creato_Display'] text-sm sm:text-base font-bold text-white font-['Creato_Display']">Team Availability</h3>
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

      {/* Portfolio & Files Manager Tab */}
      {activeTab === 'portfolio' && (
        <PortfolioManager
          projects={projects}
          onAddProject={onAddProject}
          onDeleteProject={onDeleteProject}
          showAddModalDirectly={showAddProjectModal}
          setShowAddModalDirectly={setShowAddProjectModal}
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
