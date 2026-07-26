import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, LogOut, Lock, Menu, X, ArrowRight, Calculator } from 'lucide-react';
import { AGENCY_INFO } from '../data/creativeData';

export default function Navbar({ 
  viewMode, 
  onSignOut, 
  userRole, 
  setUserRole, 
  onOpenEstimator
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 px-4 lg:px-8 ${
      isScrolled 
        ? 'bg-[#070913]/70 backdrop-blur-2xl border-b border-cyan-500/40 shadow-[0_10px_35px_rgba(0,243,255,0.2)] py-2 sm:py-2.5' 
        : 'bg-[#070913]/40 backdrop-blur-xl border-b border-cyan-500/20 py-4 sm:py-5'
    }`}>
      {/* Liquid Glass Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative z-10">
        
        {/* Brand & Logo (+10px Larger Unscrolled, Compact Scrolled State) */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer" 
          onClick={() => onSignOut && viewMode === 'admin' ? onSignOut() : null}
        >
          <img 
            src="/framempire_logo_white.png" 
            alt="FramEmpire Studio" 
            className={`object-contain shrink-0 transition-all duration-300 drop-shadow-[0_0_15px_rgba(0,243,255,0.3)] ${
              isScrolled 
                ? 'h-11 sm:h-13 md:h-16 max-w-[240px] sm:max-w-[280px]' 
                : 'h-14 sm:h-16 md:h-20 max-w-[300px] sm:max-w-[360px]'
            }`} 
          />
          {viewMode === 'admin' && (
            <span className="neon-badge text-[8px] sm:text-[9px] py-0.5 px-1.5 sm:px-2 border-yellow-500/40 text-yellow-400 bg-yellow-950/40 ml-1">
              ADMIN
            </span>
          )}
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
                className="neon-button-secondary py-2 px-3.5 text-xs shadow-[0_0_15px_rgba(0,243,255,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Project Estimator</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:text-white transition-colors"
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
        <div className="md:hidden fixed inset-x-0 top-[75px] bg-[#070913]/98 border-b border-cyan-500/30 backdrop-blur-2xl p-5 space-y-4 shadow-2xl animate-fadeIn">
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
          </div>
        </div>
      )}
    </header>
  );
}
