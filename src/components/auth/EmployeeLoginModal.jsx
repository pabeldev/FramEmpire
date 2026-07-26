import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, Sparkles, AlertCircle } from 'lucide-react';

export default function EmployeeLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin / Executive');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const ROLE_PASSCODES = {
    'Admin / Executive': 'admin123',
    'Studio Manager': 'manager123',
    'HR Manager': 'hr123',
    'Creative Lead / Designer': 'designer123'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const expectedPasscode = ROLE_PASSCODES[role] || 'admin123';
    
    if (password.trim() === expectedPasscode) {
      onLoginSuccess(role);
      onClose();
      setPassword('');
      setError('');
    } else {
      setError(`Access Denied! Passcode for ${role} is invalid. Try: ${expectedPasscode}`);
    }
  };

  const handleFillDemoPasscode = (selectedRole) => {
    setRole(selectedRole);
    setPassword(ROLE_PASSCODES[selectedRole] || 'admin123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="neon-card max-w-md w-full border-cyan-400 p-6 sm:p-8 relative space-y-6 shadow-[0_0_50px_rgba(0,243,255,0.2)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_20px_rgba(0,243,255,0.4)]">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-['Creato_Display'] text-2xl font-extrabold text-white">FramEmpire Staff Portal</h3>
          <p className="text-xs text-slate-400">Secure Internal Login for Admin, Managers, HR & Designers</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Select Staff Role</label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setError('');
              }}
              className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-cyan-300 font-semibold outline-none focus:border-cyan-400"
            >
              <option value="Admin / Executive">Admin / Executive</option>
              <option value="Studio Manager">Studio Manager</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Creative Lead / Designer">Creative Lead / Designer</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Staff Security Passcode</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                placeholder="Enter security passcode..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="neon-button-primary w-full justify-center py-3 text-xs"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Authenticate & Access Portal</span>
          </button>

        </form>

        {/* Quick Passcode Fill Buttons */}
        <div className="pt-4 border-t border-slate-800 text-center space-y-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Role Passcode Shortcuts:</span>
          
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => handleFillDemoPasscode('Admin / Executive')}
              className="p-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 text-xs font-semibold"
            >
              🔑 Fill Admin (`admin123`)
            </button>
            <button
              onClick={() => handleFillDemoPasscode('Studio Manager')}
              className="p-2 rounded-xl bg-slate-900 border border-blue-500/30 text-blue-300 hover:border-blue-400 text-xs font-semibold"
            >
              💼 Fill Manager (`manager123`)
            </button>
            <button
              onClick={() => handleFillDemoPasscode('HR Manager')}
              className="p-2 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 hover:border-purple-400 text-xs font-semibold"
            >
              👥 Fill HR (`hr123`)
            </button>
            <button
              onClick={() => handleFillDemoPasscode('Creative Lead / Designer')}
              className="p-2 rounded-xl bg-slate-900 border border-yellow-500/30 text-yellow-300 hover:border-yellow-400 text-xs font-semibold"
            >
              🎨 Fill Designer (`designer123`)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
