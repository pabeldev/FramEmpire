import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, KeyRound, UserCheck, UserX, Clock, Check, X, Award, AlertTriangle, Activity } from 'lucide-react';
import { EMPLOYEES, INITIAL_AUDIT_LOGS } from '../../data/creativeData';

export default function AccessControlManager({ userRole }) {
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const handleToggleAccess = (empId) => {
    setEmployees(employees.map(emp => {
      if (emp.id === empId) {
        const nextState = !emp.activeAccess;
        const actionText = nextState ? `Activated access for ${emp.name}` : `Revoked access for ${emp.name}`;
        
        // Log action to System Audit Trail
        const newLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          user: userRole || 'A M Pabel',
          action: actionText,
          severity: nextState ? 'Info' : 'Warning'
        };
        setAuditLogs([newLog, ...auditLogs]);

        return { ...emp, activeAccess: nextState };
      }
      return emp;
    }));
  };

  const handleTogglePermission = (empId, permKey) => {
    setEmployees(employees.map(emp => {
      if (emp.id === empId) {
        const updatedPermissions = {
          ...emp.permissions,
          [permKey]: !emp.permissions?.[permKey]
        };

        const newLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          user: userRole || 'A M Pabel',
          action: `Updated ${permKey} permission for ${emp.name}`,
          severity: 'Info'
        };
        setAuditLogs([newLog, ...auditLogs]);

        return { ...emp, permissions: updatedPermissions };
      }
      return emp;
    }));
  };

  const handleChangeRole = (empId, newRole) => {
    setEmployees(employees.map(emp => {
      if (emp.id === empId) {
        const newLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          user: userRole || 'A M Pabel',
          action: `Designated role ${newRole} to ${emp.name}`,
          severity: 'Info'
        };
        setAuditLogs([newLog, ...auditLogs]);

        return { ...emp, role: newRole };
      }
      return emp;
    }));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/80 via-slate-900 to-[#070913] p-4 sm:p-6 rounded-2xl border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="neon-badge border-purple-400 text-purple-300">SYSTEM ADMINISTRATION</span>
            <span className="text-xs text-slate-300">• Logged in as <strong className="text-white">{userRole}</strong></span>
          </div>
          <h2 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white mt-1">
            Role Assignment & Access Control Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Assign employee designations, toggle granular permissions, manage system offboarding, and track audit history logs.
          </p>
        </div>
      </div>

      {/* Role Matrix & Granular Permissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Column: Staff Access Control Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Creato_Display'] font-bold text-base text-white">Staff Authorization Matrix</h3>
            <span className="text-xs font-semibold text-slate-400">Total System Users: <strong className="text-cyan-300">{employees.length}</strong></span>
          </div>

          <div className="space-y-4">
            {employees.map((emp) => (
              <div
                key={emp.id}
                className={`neon-card p-4 sm:p-5 border-purple-500/20 space-y-3 transition-all ${
                  !emp.activeAccess ? 'opacity-60 border-red-500/40 bg-red-950/10' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  {/* User Avatar & Designation */}
                  <div className="flex items-center gap-3">
                    <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover border border-purple-400" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{emp.name}</h4>
                      <select
                        value={emp.role}
                        onChange={(e) => handleChangeRole(emp.id, e.target.value)}
                        className="bg-slate-900 text-purple-300 text-xs font-bold border border-purple-500/30 rounded-lg p-1 outline-none mt-0.5"
                      >
                        <option value="Studio Founder & Team Captain">Studio Founder & Team Captain</option>
                        <option value="Studio Manager">Studio Manager</option>
                        <option value="HR Manager">HR Manager</option>
                        <option value="Creative Lead / Director">Creative Lead / Director</option>
                        <option value="Lead Motion Designer & 3D Animator">Lead Motion Designer</option>
                        <option value="Senior Video Editor & Colorist">Senior Video Editor</option>
                        <option value="Lead Fullstack & WebGL Developer">Lead Developer</option>
                      </select>
                    </div>
                  </div>

                  {/* 1-Click Access Activation / Revocation */}
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${emp.activeAccess ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                      {emp.activeAccess ? 'Active Access' : 'Revoked / Offboarded'}
                    </span>

                    <button
                      onClick={() => handleToggleAccess(emp.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                        emp.activeAccess
                          ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20'
                          : 'bg-green-500/10 border border-green-500/30 text-green-300 hover:bg-green-500/20'
                      }`}
                    >
                      {emp.activeAccess ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                      <span>{emp.activeAccess ? 'Revoke Access' : 'Activate Access'}</span>
                    </button>
                  </div>

                </div>

                {/* Granular Permission Checkboxes */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Granular Feature Permission Checkboxes:</span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                    {[
                      { key: 'tasks', label: 'Task Control' },
                      { key: 'clients', label: 'Clients Vault' },
                      { key: 'hr', label: 'HR Roster' },
                      { key: 'financial', label: 'Financials' },
                      { key: 'emergency', label: 'Emergency Actions' }
                    ].map(perm => {
                      const isChecked = emp.permissions?.[perm.key] || false;
                      return (
                        <label
                          key={perm.key}
                          className={`flex items-center gap-2 p-2 rounded-lg border text-[11px] font-semibold cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-purple-950/40 border-purple-500/40 text-purple-300'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleTogglePermission(emp.id, perm.key)}
                            className="accent-purple-400 w-3.5 h-3.5 cursor-pointer"
                          />
                          <span className="truncate">{perm.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right Column: System Audit Trail Log */}
        <div className="lg:col-span-4 space-y-4">
          <div className="neon-card p-5 border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <h3 className="font-['Creato_Display'] text-sm font-bold text-white">System Audit Trail Log</h3>
              </div>
              <span className="neon-badge text-[9px]">LIVE LOGS</span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono text-purple-300 font-semibold">{log.timestamp}</span>
                    <span className="font-bold text-slate-300">{log.user}</span>
                  </div>
                  <p className="text-slate-200 font-medium text-[11px] leading-relaxed">{log.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
