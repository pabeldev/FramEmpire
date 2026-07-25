import React from 'react';
import { Sparkles, ArrowRight, Play, Palette, Film, Code2, CheckCircle2 } from 'lucide-react';
import { AGENCY_INFO } from '../../data/creativeData';

export default function HeroSection({ onExplorePortfolio, onOpenEstimator }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 px-4 overflow-hidden bg-grid-pattern">
      {/* Radial Neon Background Orbs */}
      <div className="glow-orb-cyan -top-20 -left-20 animate-pulse-glow" />
      <div className="glow-orb-blue top-1/3 -right-20 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading & Welcome Message */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Welcome Client Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.2)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
            <span className="text-xs font-bold text-cyan-300 tracking-wide uppercase">FramEmpire • Client Portfolio & Welcome Portal</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="font-['Syne'] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight">
            <span className="text-gradient">FramEmpire</span> <br />
            <span className="text-white font-medium text-3xl sm:text-4xl lg:text-5xl block mt-1">{AGENCY_INFO.tagline}</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {AGENCY_INFO.fullTagline}
          </p>

          {/* 4 Creative Disciplines Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="neon-card p-3 flex items-center gap-2.5 border-blue-500/30">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-white">3D Animation</span>
            </div>
            <div className="neon-card p-3 flex items-center gap-2.5 border-cyan-500/30">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-white">Graphic Design</span>
            </div>
            <div className="neon-card p-3 flex items-center gap-2.5 border-purple-500/30">
              <Film className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold text-white">Video Editing</span>
            </div>
            <div className="neon-card p-3 flex items-center gap-2.5 border-cyan-400/30">
              <Code2 className="w-4 h-4 text-cyan-300" />
              <span className="text-xs font-semibold text-white">Web Dev</span>
            </div>
          </div>

          {/* CTA Button Group */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onExplorePortfolio}
              className="neon-button-primary"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenEstimator}
              className="neon-button-secondary"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Project Estimator</span>
            </button>
          </div>

          {/* Quick Agency Metrics */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-xl">
            <div>
              <p className="text-2xl font-extrabold text-white font-['Syne']">{AGENCY_INFO.completedProjects}+</p>
              <p className="text-xs text-slate-400">Projects Delivered</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-cyan-400 font-['Syne']">{AGENCY_INFO.clientSatisfaction}</p>
              <p className="text-xs text-slate-400">Client Rating</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-blue-400 font-['Syne']">{AGENCY_INFO.activeRenderNodes} Nodes</p>
              <p className="text-xs text-slate-400">GPU Render Cluster</p>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Welcome Card & Creative Reel Preview */}
        <div className="lg:col-span-5 relative">
          
          {/* Main Floating Preview Card */}
          <div className="neon-card p-6 border-cyan-500/40 relative z-10 space-y-5 animate-float shadow-[0_0_50px_rgba(0,243,255,0.15)]">
            
            {/* Card Top Bar */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-bold text-cyan-300 tracking-wider">FRAMEMPIRE REEL 2026</span>
              </div>
              <span className="neon-badge text-[10px]">4K ULTRA HDR</span>
            </div>

            {/* Video Preview Box */}
            <div className="relative rounded-xl overflow-hidden group aspect-video bg-slate-950 border border-cyan-500/30">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                alt="FramEmpire Animation Reel"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-80" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={onExplorePortfolio}
                  className="w-14 h-14 rounded-full bg-cyan-400/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-black ml-1" />
                </button>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="font-semibold text-cyan-300">FramEmpire 3D Animation Showcase</span>
                <span className="bg-black/60 px-2 py-0.5 rounded text-[10px]">01:45</span>
              </div>
            </div>

            {/* Welcome Message Card Body */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/20 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>FramEmpire Client Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated Slack/Teams channel, weekly render reviews, zero-latency feedback proofing, and direct line to Lead Animators & Senior Engineers.
              </p>
            </div>

          </div>

          {/* Secondary Floating Decorative Card */}
          <div className="absolute -bottom-6 -left-6 z-20 neon-card p-4 border-blue-500/50 hidden sm:flex items-center gap-3 shadow-2xl bg-slate-950/90 backdrop-blur-md">
            <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Instant Project Kickoff</p>
              <p className="text-[11px] text-cyan-300/80">Average response: &lt; 2 Hours</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
