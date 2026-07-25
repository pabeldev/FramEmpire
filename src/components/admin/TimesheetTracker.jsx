import React, { useState } from 'react';
import { Clock, CheckCircle2, XCircle, Calendar, Plus, ShieldCheck, UserCheck } from 'lucide-react';
import { RECENT_TIMESHEETS, PTO_REQUESTS } from '../../data/creativeData';

export default function TimesheetTracker({ userRole }) {
  const [timesheets, setTimesheets] = useState(RECENT_TIMESHEETS);
  const [ptoList, setPtoList] = useState(PTO_REQUESTS);
  const [showLogModal, setShowLogModal] = useState(false);

  const [newLog, setNewLog] = useState({
    employee: 'Elena Vance',
    project: 'AETHERIA Quantum Reveal',
    hours: '8.0',
    category: '3D Rendering',
  });

  const handleApproveTimesheet = (id) => {
    setTimesheets(timesheets.map(t => t.id === id ? { ...t, status: 'Approved' } : t));
  };

  const handleRejectTimesheet = (id) => {
    setTimesheets(timesheets.map(t => t.id === id ? { ...t, status: 'Rejected' } : t));
  };

  const handleApprovePTO = (id) => {
    setPtoList(ptoList.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    const created = {
      id: `ts-${Date.now()}`,
      employee: newLog.employee,
      project: newLog.project,
      hours: parseFloat(newLog.hours),
      date: new Date().toISOString().split('T')[0],
      category: newLog.category,
      status: 'Pending Approval',
    };
    setTimesheets([created, ...timesheets]);
    setShowLogModal(false);
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Creative Hours Log Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Syne'] text-xl font-bold text-white">Creative Hours & Production Log</h2>
            <p className="text-xs text-slate-400">Manager sign-offs for 3D animation, editing, vector design & coding hours</p>
          </div>

          <button
            onClick={() => setShowLogModal(true)}
            className="neon-button-primary py-2 px-4 text-xs"
          >
            <Clock className="w-4 h-4" />
            <span>Log Creative Hours</span>
          </button>
        </div>

        <div className="neon-card overflow-hidden border-cyan-500/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/90 text-cyan-400 font-bold uppercase tracking-wider border-b border-cyan-500/20">
                <tr>
                  <th className="p-4">Specialist</th>
                  <th className="p-4">Project</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Hours Logged</th>
                  <th className="p-4">Approval Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {timesheets.map((ts) => (
                  <tr key={ts.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-4 font-bold text-white">{ts.employee}</td>
                    <td className="p-4 text-cyan-300 font-semibold">{ts.project}</td>
                    <td className="p-4">
                      <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 font-medium">
                        {ts.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{ts.date}</td>
                    <td className="p-4 font-extrabold text-white">{ts.hours} hrs</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        ts.status === 'Approved'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                          : ts.status === 'Rejected'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                      }`}>
                        {ts.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {ts.status === 'Pending Approval' && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleApproveTimesheet(ts.id)}
                            className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/40 border border-green-500/30 transition-colors"
                            title="Approve Hours"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRejectTimesheet(ts.id)}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 border border-red-500/30 transition-colors"
                            title="Reject Hours"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. PTO & Leave Requests */}
      <div className="space-y-4">
        <div>
          <h2 className="font-['Syne'] text-xl font-bold text-white">PTO & Vacation Requests</h2>
          <p className="text-xs text-slate-400">Manage leave schedules to balance studio render node capacity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ptoList.map((pto) => (
            <div key={pto.id} className="neon-card p-5 border-cyan-500/20 flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-white">{pto.employee}</h4>
                <p className="text-xs text-cyan-300 font-semibold">{pto.dates} • Reason: {pto.reason}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                  pto.status === 'Approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {pto.status}
                </span>
              </div>

              {pto.status === 'Pending Approval' && (
                <button
                  onClick={() => handleApprovePTO(pto.id)}
                  className="neon-button-primary py-1.5 px-3 text-xs"
                >
                  Approve PTO
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal to Log Hours */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="neon-card max-w-md w-full border-cyan-400 p-6 space-y-6">
            <h3 className="font-['Syne'] text-xl font-bold text-white">Log Creative Production Hours</h3>
            
            <form onSubmit={handleAddLog} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Specialist Name</label>
                <input
                  type="text"
                  required
                  value={newLog.employee}
                  onChange={(e) => setNewLog({ ...newLog, employee: e.target.value })}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Project</label>
                <input
                  type="text"
                  required
                  value={newLog.project}
                  onChange={(e) => setNewLog({ ...newLog, project: e.target.value })}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Hours Logged</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newLog.hours}
                    onChange={(e) => setNewLog({ ...newLog, hours: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Category</label>
                  <select
                    value={newLog.category}
                    onChange={(e) => setNewLog({ ...newLog, category: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                  >
                    <option value="3D Rendering">3D Rendering</option>
                    <option value="Color Grading">Color Grading</option>
                    <option value="Frontend Coding">Frontend Coding</option>
                    <option value="Vector Design">Vector Design</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neon-button-primary py-2 px-5 text-xs"
                >
                  Submit Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
