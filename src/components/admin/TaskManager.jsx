import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, Play, Plus, Edit, Trash2, Rocket, 
  User, ShieldAlert, Sparkles, AlertCircle, Check, Send, Search, Filter
} from 'lucide-react';
import { EMPLOYEES } from '../../data/creativeData';

export default function TaskManager({ 
  tasks, 
  onAddTask, 
  onUpdateTask, 
  onDeleteTask, 
  onPushToPortfolio, 
  userRole 
}) {
  const [activeFilter, setActiveFilter] = useState('All'); // All, Pending, In Progress, Ready to Deliver
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // New Task Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    assignedTo: EMPLOYEES[1]?.name || 'Elena Vance',
    assignedBy: userRole.includes('Admin') ? 'A M Pabel (Team Captain)' : userRole,
    reportingBoss: 'A M Pabel',
    status: 'In Progress',
    progressPercent: 50,
    dueDate: new Date().toISOString().split('T')[0],
    categoryKey: 'graphic-design',
    category: 'Graphic Design',
    embedUrl: '',
    liveUrl: ''
  });

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = activeFilter === 'All' || task.status === activeFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenCreateModal = () => {
    setFormData({
      title: '',
      description: '',
      client: '',
      assignedTo: EMPLOYEES[1]?.name || 'Elena Vance',
      assignedBy: userRole.includes('Admin') ? 'A M Pabel (Team Captain)' : userRole,
      reportingBoss: 'A M Pabel',
      status: 'In Progress',
      progressPercent: 50,
      dueDate: new Date().toISOString().split('T')[0],
      categoryKey: 'graphic-design',
      category: 'Graphic Design',
      embedUrl: '',
      liveUrl: ''
    });
    setEditingTask(null);
    setShowCreateModal(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      client: task.client,
      assignedTo: task.assignedTo,
      assignedBy: task.assignedBy,
      reportingBoss: task.reportingBoss,
      status: task.status,
      progressPercent: task.progressPercent,
      dueDate: task.dueDate,
      categoryKey: task.categoryKey || 'graphic-design',
      category: task.category || 'Graphic Design',
      embedUrl: task.embedUrl || '',
      liveUrl: task.liveUrl || ''
    });
    setShowCreateModal(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.client) return;

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        ...formData
      });
    } else {
      const newTask = {
        id: `task-${Date.now()}`,
        ...formData,
        addedToPortfolio: false
      };
      onAddTask(newTask);
    }

    setShowCreateModal(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Header & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-[#070913] p-4 sm:p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge text-[9px]">FRAMEMPIRE TASK CONTROL</span>
            <span className="text-xs text-cyan-400 font-semibold">• Role Access: <strong className="text-white">{userRole}</strong></span>
          </div>
          <h2 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white mt-1">
            Studio Task & Assignment Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Assign tasks, track reporting bosses, daily productivity progress, and push finished deliverables directly to public Portfolio!
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="neon-button-primary py-2.5 px-5 text-xs justify-center shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create & Assign Task</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        
        {/* Status Filters */}
        <div className="flex overflow-x-auto gap-2 scrollbar-none no-scrollbar">
          {['All', 'Pending', 'In Progress', 'Ready to Deliver'].map((st) => {
            const isActive = activeFilter === st;
            const count = st === 'All' ? tasks.length : tasks.filter(t => t.status === st).length;
            
            return (
              <button
                key={st}
                onClick={() => setActiveFilter(st)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                    : 'bg-slate-900 border border-cyan-500/20 text-slate-300 hover:border-cyan-400 hover:text-cyan-300'
                }`}
              >
                <span>{st}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${isActive ? 'bg-black/30 text-black' : 'bg-slate-800 text-cyan-300'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search task, designer, client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
          />
        </div>

      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => {
          const isReady = task.status === 'Ready to Deliver';
          const isInProgress = task.status === 'In Progress';

          return (
            <div
              key={task.id}
              className={`neon-card p-5 space-y-4 flex flex-col justify-between transition-all duration-300 ${
                isReady
                  ? 'border-green-400/60 bg-green-950/20 shadow-[0_0_20px_rgba(74,222,128,0.15)]'
                  : isInProgress
                  ? 'border-cyan-500/30 bg-slate-900/80'
                  : 'border-yellow-500/30 bg-slate-900/60'
              }`}
            >
              <div className="space-y-3">
                
                {/* Status Badge & Designed For Client */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    isReady
                      ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                      : isInProgress
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                  }`}>
                    {task.status}
                  </span>

                  <span className="text-[10px] font-bold text-slate-400 truncate max-w-[140px]" title={`Design For: ${task.client}`}>
                    For: <strong className="text-cyan-300">{task.client}</strong>
                  </span>
                </div>

                {/* Task Title & Instructions */}
                <div>
                  <h3 className="font-['Creato_Display'] text-base font-bold text-white line-clamp-1">
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                    {task.description}
                  </p>
                </div>

                {/* Staff Assignment & Reporting Boss Meta */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-[11px]">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 font-semibold">Assigned Designer:</span>
                    <strong className="text-cyan-300 font-bold">{task.assignedTo}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 font-semibold">Reporting Boss:</span>
                    <strong className="text-yellow-400 font-bold">{task.reportingBoss}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span>Assigned By: {task.assignedBy}</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>

                {/* Daily Productive Progress Tracker */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Daily Productive Progress:</span>
                    <span className={task.progressPercent === 100 ? 'text-green-400' : 'text-cyan-300'}>
                      {task.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        task.progressPercent === 100
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                          : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                      }`}
                      style={{ width: `${task.progressPercent}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Action Buttons: Edit, Delete & + Add to Portfolio */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                
                {/* Special "Add to Portfolio" Option after Ready to Deliver */}
                {isReady && (
                  <div>
                    {task.addedToPortfolio ? (
                      <div className="w-full py-2 px-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Added to Public Portfolio</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onPushToPortfolio(task)}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                      >
                        <Rocket className="w-4 h-4 fill-black" />
                        <span>+ Add to Portfolio Showcase</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Edit & Delete Action Row */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => handleOpenEditModal(task)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Task & Status</span>
                  </button>

                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Create / Edit Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="neon-card max-w-xl w-full max-h-[92vh] overflow-y-auto border-cyan-400 p-6 sm:p-8 relative space-y-6">
            
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/30"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-['Creato_Display'] text-xl font-extrabold text-white">
                {editingTask ? 'Edit Task Instructions & Status' : 'Create & Assign New Studio Task'}
              </h3>
              <p className="text-xs text-slate-400">Fill in task briefing, assigned designer, reporting boss, and client details.</p>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3D Kinetic Motion Teaser for Client"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Project Description & Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Detailed creative brief, dimensions, resolution, and design instructions..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Designed For (Client / Brand)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Education BD, Shikor TV"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Assigned Designer</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-cyan-300 font-semibold outline-none focus:border-cyan-400"
                  >
                    {EMPLOYEES.map(emp => (
                      <option key={emp.id} value={emp.name} className="bg-slate-900 text-white">
                        {emp.name} ({emp.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Reporting Boss / Supervisor</label>
                  <select
                    value={formData.reportingBoss}
                    onChange={(e) => setFormData({ ...formData, reportingBoss: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-yellow-300 font-semibold outline-none focus:border-cyan-400"
                  >
                    <option value="A M Pabel">A M Pabel (Team Captain)</option>
                    <option value="Sophia Chen">Sophia Chen (HR / Design Lead)</option>
                    <option value="Elena Vance">Elena Vance (3D Motion Lead)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Task Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setFormData({ 
                        ...formData, 
                        status: newStatus,
                        progressPercent: newStatus === 'Ready to Deliver' ? 100 : formData.progressPercent
                      });
                    }}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white font-bold outline-none focus:border-cyan-400"
                  >
                    <option value="Pending" className="bg-slate-900 text-yellow-400">Pending</option>
                    <option value="In Progress" className="bg-slate-900 text-cyan-400">In Progress</option>
                    <option value="Ready to Deliver" className="bg-slate-900 text-green-400">Ready to Deliver</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Productivity Progress % ({formData.progressPercent}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progressPercent}
                    onChange={(e) => {
                      const pct = parseInt(e.target.value);
                      setFormData({ 
                        ...formData, 
                        progressPercent: pct,
                        status: pct === 100 ? 'Ready to Deliver' : (pct === 0 ? 'Pending' : 'In Progress')
                      });
                    }}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Embed or Live Link (Optional)</label>
                  <input
                    type="text"
                    placeholder="Behance / YouTube embed or website link..."
                    value={formData.embedUrl || formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="neon-button-primary w-full justify-center py-3 text-xs font-extrabold"
              >
                <Send className="w-4 h-4" />
                <span>{editingTask ? 'Save Task Updates' : 'Publish & Assign Task'}</span>
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
