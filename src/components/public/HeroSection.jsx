import React from 'react';
import { Sparkles, ArrowRight, Play, Palette, Film, Code2, CheckCircle2 } from 'lucide-react';
import { AGENCY_INFO } from '../../data/creativeData';

export default function HeroSection({ onExplorePortfolio, onOpenEstimator }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 overflow-hidden bg-grid-pattern">
      {/* Radial Neon Background Orbs */}
      <div className="glow-orb-cyan -top-20 -left-20 animate-pulse-glow" />
      <div className="glow-orb-blue top-1/3 -right-20 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Heading & Welcome Message */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
          
          {/* Welcome Client Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.2)]">
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-cyan-400"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-cyan-300 tracking-wide uppercase">FramEmpire • Client Portfolio & Portal</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="font-['Creato_Display'] text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight">
            <span className="text-gradient">FramEmpire</span> <br />
            <span className="text-white font-medium text-2xl sm:text-4xl lg:text-5xl block mt-1">{AGENCY_INFO.tagline}</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
            {AGENCY_INFO.fullTagline}
          </p>

          {/* 4 Creative Disciplines Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
            <div className="neon-card p-2.5 sm:p-3 flex items-center gap-2 border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-white">3D Animation</span>
            </div>
            <div className="neon-card p-2.5 sm:p-3 flex items-center gap-2 border-cyan-500/30">
              <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-white">Graphic Design</span>
            </div>
            <div className="neon-card p-2.5 sm:p-3 flex items-center gap-2 border-purple-500/30">
              <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-white">Video Editing</span>
            </div>
            <div className="neon-card p-2.5 sm:p-3 flex items-center gap-2 border-cyan-400/30">
              <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-white">Web Dev</span>
            </div>
          </div>

          {/* CTA Button Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <button
              onClick={onExplorePortfolio}
              className="neon-button-primary justify-center w-full sm:w-auto"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenEstimator}
              className="neon-button-secondary justify-center w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Project Estimator</span>
            </button>
          </div>

          {/* Quick Agency Metrics */}
          <div className="pt-4 sm:pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl">
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-['Creato_Display']">{AGENCY_INFO.completedProjects}+</p>
              <p className="text-[11px] sm:text-xs text-slate-400">Projects Delivered</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-['Creato_Display']">{AGENCY_INFO.clientSatisfaction}</p>
              <p className="text-[11px] sm:text-xs text-slate-400">Client Rating</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-blue-400 font-['Creato_Display']">{AGENCY_INFO.activeRenderNodes} Nodes</p>
              <p className="text-[11px] sm:text-xs text-slate-400">GPU Render Cluster</p>
            </div>
          </div>

        </div>

        {/* Right Column: Vimeo Video Preview Showcase */}
        <div className="lg:col-span-5 relative mt-4 lg:mt-0">
          
          {/* Main Floating Video Card */}
          <div className="neon-card p-4 sm:p-6 border-cyan-500/40 relative z-10 space-y-4 sm:space-y-5 animate-float shadow-[0_0_40px_rgba(0,243,255,0.12)]">
            
            {/* Card Top Bar */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[11px] sm:text-xs font-bold text-cyan-300 tracking-wider">SHIKOR TV – CANADA THRILL AD</span>
              </div>
              <span className="neon-badge text-[9px]">VIMEO SHOWCASE</span>
            </div>

            {/* Vimeo Live Video Player Box */}
            <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 border border-cyan-500/30 shadow-2xl">
              <iframe
                src="https://player.vimeo.com/video/1133437679?badge=0&autopause=0&player_id=0&app_id=58479"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                title="Shikor TV – Canada Thrill Ad"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Video Guarantee & Info */}
            <div className="bg-slate-900/80 p-3.5 sm:p-4 rounded-xl border border-cyan-500/20 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>FramEmpire Video Post-Production</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                Featured commercial production cut for <strong>Shikor TV – Canada Thrill Ad</strong>. Produced & color graded by FramEmpire Studio.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
