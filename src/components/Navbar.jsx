import React, { useState } from 'react';
import { Sparkles, ShieldCheck, LogOut, Lock, Menu, X, ArrowRight, Calculator } from 'lucide-react';
import { AGENCY_INFO } from '../data/creativeData';

export default function Navbar({ 
  viewMode, 
  onSignOut, 
  userRole, 
  setUserRole, 
  onOpenEstimator, 
  onOpenLoginModal 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#070913]/95 backdrop-blur-xl border-b border-cyan-500/20 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer" 
          onClick={() => onSignOut && viewMode === 'admin' ? onSignOut() : null}
        >
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[1px] shadow-[0_0_20px_rgba(0,243,255,0.4)] shrink-0">
            <div className="w-full h-full bg-[#070913] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-['Creato_Display'] font-extrabold text-lg sm:text-xl tracking-wider text-white">
                {AGENCY_INFO.name}
              </span>
              {viewMode === 'admin' ? (
                <span className="neon-badge text-[8px] sm:text-[9px] py-0.5 px-1.5 sm:px-2 border-yellow-500/40 text-yellow-400 bg-yellow-950/40">
                  ADMIN
                </span>
              ) : (
                <span className="neon-badge text-[8px] sm:text-[9px] py-0.5 px-1.5 sm:px-2">STUDIO</span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-cyan-300/60 hidden sm:block">Animation • Motion • Design • Web</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {viewMode === 'public' ? (
          <div className="flex items-center gap-4 lg:gap-6">
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
              <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
              <a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</a>
              <a href="#about" className="hover:text-cyan-400 transition-colors">About Us</a>
              <button 
                onClick={onOpenEstimator}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Estimate Cost
              </button>
            </nav>

            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenEstimator}
                className="neon-button-secondary py-2 px-3.5 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Project Estimator</span>
              </button>

              {/* Discreet Staff Portal Login Button */}
              <button
                onClick={onOpenLoginModal}
                className="text-xs text-slate-400 hover:text-cyan-400 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-1.5"
                title="Internal Employee Login"
              >
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Staff Login</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:text-white transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        ) : (
          /* Admin Header Controls */
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5 bg-slate-950/90 px-2.5 sm:px-3 py-1.5 rounded-xl border border-cyan-500/30">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-transparent text-[11px] sm:text-xs font-bold text-cyan-300 outline-none cursor-pointer max-w-[120px] sm:max-w-none"
              >
                <option value="Admin / Executive" className="bg-slate-900 text-white">Admin / Executive</option>
                <option value="Creative Director" className="bg-slate-900 text-white">Creative Director</option>
                <option value="Motion & Video Lead" className="bg-slate-900 text-white">Motion & Video Lead</option>
                <option value="Senior Developer" className="bg-slate-900 text-white">Senior Developer</option>
              </select>
            </div>

            <button
              onClick={onSignOut}
              className="flex items-center gap-1 py-1.5 px-2.5 sm:px-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-semibold transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        )}

      </div>

      {/* Mobile Drawer Overlay */}
      {viewMode === 'public' && mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#070913]/98 border-b border-cyan-500/30 backdrop-blur-2xl p-5 space-y-4 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-200">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300"
            >
              🚀 Creative Services
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300"
            >
              🎬 Showcase & Portfolio
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300"
            >
              🔥 About FramEmpire
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="neon-button-primary w-full justify-center text-xs py-3"
            >
              <Sparkles className="w-4 h-4" />
              <span>Project Cost Estimator</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLoginModal();
              }}
              className="w-full justify-center py-2.5 text-xs text-slate-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Staff Login Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
