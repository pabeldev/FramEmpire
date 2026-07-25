import React from 'react';
import { Sparkles, Globe, MapPin, Award, ExternalLink, Palette, Film, Code2, Feather } from 'lucide-react';

export default function TeamCaptainSection() {
  return (
    <section id="captain" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070913] relative border-t border-cyan-500/20 overflow-hidden">
      
      {/* Background Soft Glow Orbs */}
      <div className="glow-orb-cyan top-10 left-10 opacity-20 pointer-events-none" />
      <div className="glow-orb-blue bottom-10 right-10 opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 relative z-10">
        
        {/* Section Header Badge */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="neon-badge border-cyan-400/40 text-cyan-300">LEADERSHIP & VISION</span>
          <h2 className="font-['Creato_Display'] text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet Our <span className="text-gradient">Team Captain</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Driving creative excellence, 3D motion innovation, and design leadership at FramEmpire.
          </p>
        </div>

        {/* Dark Neumorphism Main Captain Card */}
        <div className="rounded-3xl p-6 sm:p-10 lg:p-12 transition-all duration-700 ease-out relative overflow-hidden bg-[#070a14] border border-cyan-500/20 shadow-[16px_16px_36px_#030409,-16px_-16px_36px_#0b101f] hover:shadow-[20px_20px_45px_#020307,-20px_-20px_45px_#0c1224]">
          
          {/* Subtle Neumorphic Inset Frame Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Neumorphic Portrait Avatar Box */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
              
              <div className="relative group">
                {/* Neumorphic Outer Circular Ring with Smooth Hover Scale */}
                <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full p-2.5 bg-[#070a14] shadow-[10px_10px_25px_#030409,-10px_-10px_25px_#0b101f] border border-cyan-500/30 transition-transform duration-700 ease-out group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-[inset_4px_4px_10px_rgba(0,0,0,0.6)]">
                    <img
                      src="/ampabel.jpg"
                      alt="A M Pabel - Studio Founder & Team Captain"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                {/* Floating Captain Badge */}
                <div className="absolute -bottom-2 right-4 sm:right-6 bg-gradient-to-r from-cyan-400 to-blue-600 text-black px-3 py-1 rounded-full text-[10px] font-extrabold shadow-[0_0_15px_rgba(0,243,255,0.4)] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-black" />
                  <span>STUDIO CAPTAIN</span>
                </div>
              </div>

              {/* Quick Profile Meta */}
              <div className="space-y-1 pt-2">
                <h3 className="font-['Creato_Display'] text-xl sm:text-2xl font-extrabold text-white">
                  A M Pabel
                </h3>
                <p className="text-xs text-cyan-300 font-semibold flex items-center justify-center gap-1">
                  <Feather className="w-3.5 h-3.5" />
                  <span>Graphic Designer • Animator • Digital Creator</span>
                </p>
                <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dhaka, Bangladesh</span>
                </p>
              </div>

            </div>

            {/* Right: Bio & Neumorphic Interactive Card Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Official Bio Paragraph (Cleaned without repeating website URL in text) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#060812] shadow-[inset_6px_6px_14px_#030409,inset_-6px_-6px_14px_#0b101f] border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">FOUNDER'S PROFILE</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  A M Pabel is a skilled graphic designer, animator, and digital content creator based in Dhaka, Bangladesh. He operates his professional portfolio and frequently shares design insights within the creative community.
                </p>
              </div>

              {/* Core Skill Disciplines Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#070a14] shadow-[4px_4px_10px_#030409,-4px_-4px_10px_#0b101f] border border-cyan-500/20 flex items-center gap-2.5 transition-all duration-300 hover:border-cyan-400">
                  <Palette className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-white block">Graphic Design</span>
                    <span className="text-[9px] text-slate-400">Brand & Vector Art</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#070a14] shadow-[4px_4px_10px_#030409,-4px_-4px_10px_#0b101f] border border-blue-500/20 flex items-center gap-2.5 transition-all duration-300 hover:border-blue-400">
                  <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-white block">3D Animation</span>
                    <span className="text-[9px] text-slate-400">Motion Kinetics</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#070a14] shadow-[4px_4px_10px_#030409,-4px_-4px_10px_#0b101f] border border-purple-500/20 flex items-center gap-2.5 col-span-2 sm:col-span-1 transition-all duration-300 hover:border-purple-400">
                  <Code2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-white block">Digital Content</span>
                    <span className="text-[9px] text-slate-400">Web & Creative Tech</span>
                  </div>
                </div>
              </div>

              {/* Neumorphic Action Links (User's Exact Links Only) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://ampabel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:scale-105 transition-transform duration-300 flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit ampabel.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://portfolio.ampabel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#070a14] text-cyan-300 font-bold text-xs shadow-[6px_6px_14px_#030409,-6px_-6px_14px_#0b101f] border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 flex items-center gap-2"
                >
                  <span>Interactive Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
