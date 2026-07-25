import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Mail, Star, Briefcase, Clock, CheckCircle, ShieldAlert, Award } from 'lucide-react';
import { EMPLOYEES } from '../../data/creativeData';

export default function EmployeeManager({ userRole }) {
  const [employeesList, setEmployeesList] = useState(EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  // New Employee Form State
  const [newEmp, setNewEmp] = useState({
    name: '',
    role: '',
    department: 'Motion Graphics',
    email: '',
    skills: '',
  });

  const filteredEmployees = employeesList.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'all' || emp.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.role) return;

    const created = {
      id: `emp-${Date.now()}`,
      name: newEmp.name,
      role: newEmp.role,
      department: newEmp.department,
      email: newEmp.email || `${newEmp.name.toLowerCase().replace(' ', '.')}@cybernexus.agency`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop',
      status: 'Active - Available',
      skills: newEmp.skills ? newEmp.skills.split(',').map(s => s.trim()) : ['Design', 'Creative'],
      currentProject: 'Unassigned',
      workloadPercent: 20,
      rating: 5.0,
      hoursThisWeek: 0.0,
    };

    setEmployeesList([created, ...employeesList]);
    setShowAddModal(false);
    setNewEmp({ name: '', role: '', department: 'Motion Graphics', email: '', skills: '' });
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-['Syne'] text-xl font-bold text-white">Employee & Talent Directory</h2>
          <p className="text-xs text-slate-400">Manage studio animators, video editors, designers & fullstack developers</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="neon-button-primary py-2 px-4 text-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Specialist</span>
          </button>
        </div>
      </div>

      {/* Search & Department Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-950/80 p-4 rounded-xl border border-cyan-500/20">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search team by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
          />
        </div>

        {/* Department Filter Buttons */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {['all', 'Motion Graphics', 'Video Editing', 'Graphic Design', 'Web Development'].map(dept => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                departmentFilter === dept
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {dept === 'all' ? 'All Departments' : dept}
            </button>
          ))}
        </div>

      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            onClick={() => setSelectedEmp(emp)}
            className="neon-card p-6 border-cyan-500/20 hover:border-cyan-400 cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              
              {/* Header Avatar & Status */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#070913]" />
                  </div>
                  <div>
                    <h3 className="font-['Syne'] text-base font-bold text-white hover:text-cyan-300">
                      {emp.name}
                    </h3>
                    <p className="text-xs text-slate-400">{emp.role}</p>
                  </div>
                </div>

                <span className="neon-badge text-[9px]">{emp.department}</span>
              </div>

              {/* Current Assignment & Rating */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Assigned Project:</span>
                  <span className="font-bold text-cyan-300 truncate max-w-[140px]">{emp.currentProject}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Performance Rating:</span>
                  <span className="flex items-center gap-1 text-yellow-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span>{emp.rating}</span>
                  </span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5">
                {emp.skills.map((skill, idx) => (
                  <span key={idx} className="bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 text-[10px] px-2 py-0.5 rounded-md font-semibold">
                    {skill}
                  </span>
                ))}
              </div>

            </div>

            {/* Workload Progress Bar */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Workload Allocation</span>
                <span className={`font-bold ${emp.workloadPercent > 80 ? 'text-yellow-400' : 'text-cyan-300'}`}>
                  {emp.workloadPercent}% ({emp.hoursThisWeek} hrs/wk)
                </span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all ${
                    emp.workloadPercent > 80 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  }`}
                  style={{ width: `${emp.workloadPercent}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add Specialist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="neon-card max-w-lg w-full border-cyan-400 p-6 space-y-6">
            <h3 className="font-['Syne'] text-xl font-bold text-white">Add New Studio Specialist</h3>

            <form onSubmit={handleAddEmployee} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leo Sterling"
                  value={newEmp.name}
                  onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior 3D Lighting Artist"
                  value={newEmp.role}
                  onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Department</label>
                  <select
                    value={newEmp.department}
                    onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                  >
                    <option value="Motion Graphics">Motion Graphics</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Skills (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="Cinema 4D, After Effects"
                    value={newEmp.skills}
                    onChange={(e) => setNewEmp({ ...newEmp, skills: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neon-button-primary py-2 px-5 text-xs"
                >
                  Save Specialist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
