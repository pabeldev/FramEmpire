import React from 'react';
import { Sparkles, Heart, Globe, Cpu, Lock } from 'lucide-react';
import { AGENCY_INFO } from '../../data/creativeData';

export default function Footer({ onOpenEstimator, onOpenLoginModal }) {
  return (
    <footer className="bg-[#04060d] border-t border-cyan-500/20 pt-16 pb-12 px-4 relative text-xs text-slate-400">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Studio Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-['Syne'] font-extrabold text-lg tracking-wider text-white">
                {AGENCY_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {AGENCY_INFO.subtitle}
            </p>
            <div className="flex items-center gap-2 text-cyan-400 text-[11px] font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Octane 3D Render Cluster Online (16 Nodes)</span>
            </div>
          </div>

          {/* Col 2: Creative Disciplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-['Syne']">Disciplines</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">3D Motion Graphics & Animation</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Graphic Design & Brand Identity</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Commercial Video Editing</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Interactive WebGL & React Apps</a></li>
            </ul>
          </div>

          {/* Col 3: Client Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-['Syne']">Client Portal</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenEstimator} className="hover:text-cyan-300 transition-colors text-left">Interactive Project Estimator</button></li>
              <li><a href="#portfolio" className="hover:text-cyan-300 transition-colors">Showcase Reel 2026</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Client Proofing Workspace</a></li>
            </ul>
          </div>

          {/* Col 4: Studio Specs & Staff Portal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-['Syne']">Studio Specs</h4>
            <p className="text-slate-400">Headquarters: Silicon Valley & Remote Worldwide</p>
            <p className="text-slate-400">Direct Inquiries: <span className="text-cyan-300">hello@cybernexus.agency</span></p>
            <div className="pt-2 flex items-center justify-between">
              <span className="neon-badge text-[9px] py-1 px-3">EST. {AGENCY_INFO.established}</span>
              
              {/* Subtle Staff Portal Trigger */}
              <button
                onClick={onOpenLoginModal}
                className="text-[11px] text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Staff Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} CYBERNEXUS Creative Studio. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with</span>
            <span className="text-cyan-400">Neon Blue Gradient Design System</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
