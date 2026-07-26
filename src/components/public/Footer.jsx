import React from 'react';
import { Sparkles, Heart, Globe, Cpu } from 'lucide-react';
import { AGENCY_INFO } from '../../data/creativeData';

export default function Footer({ onOpenEstimator }) {
  return (
    <footer className="bg-[#04060d] border-t border-cyan-500/20 pt-16 pb-12 px-4 relative text-xs text-slate-400">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Studio Info */}
          <div className="space-y-4 md:col-span-1">
            <img 
              src="/framempire_logo_white.png" 
              alt="FramEmpire Studio" 
              className="h-12 md:h-16 object-contain max-w-[260px]" 
            />
            <p className="text-slate-400 leading-relaxed text-xs">
              {AGENCY_INFO.subtitle}
            </p>
            <div className="flex items-center gap-2 text-cyan-400 text-[11px] font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Octane 3D Render Cluster Online (24 Nodes)</span>
            </div>
          </div>

          {/* Col 2: Creative Disciplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-['Creato_Display']">Disciplines</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">3D Motion Graphics & Animation</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Graphic Design & Brand Identity</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Commercial Video Editing</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Interactive WebGL & React Apps</a></li>
            </ul>
          </div>

          {/* Col 3: Client Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-['Creato_Display']">Client Portal</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenEstimator} className="hover:text-cyan-300 transition-colors text-left">Interactive Project Estimator</button></li>
              <li><a href="#portfolio" className="hover:text-cyan-300 transition-colors">Showcase Reel 2026</a></li>
              <li><a href="#about" className="hover:text-cyan-300 transition-colors">About FramEmpire</a></li>
            </ul>
          </div>

          {/* Col 4: Studio Specs & Direct Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-['Creato_Display']">Direct Contact</h4>
            <p className="text-slate-300 font-medium">
              Phone: <a href="tel:+8801615288259" className="text-cyan-400 font-bold hover:underline">+880 1615-288259</a>
            </p>
            <p className="text-slate-300 font-medium">
              Mail: <a href="mailto:team.framempire@gmail.com" className="text-cyan-400 font-bold hover:underline">team.framempire.com</a>
            </p>
            <p className="text-slate-300 font-medium">
              WhatsApp: <a href={AGENCY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">Direct WhatsApp Chat</a>
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="neon-badge text-[9px] py-1 px-3">EST. {AGENCY_INFO.established}</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Clean FramEmpire Credits */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} <strong className="text-white">FramEmpire Studio</strong>. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Designed & Engineered by</span>
            <strong className="text-cyan-400 font-['Creato_Display']">FramEmpire</strong>
          </div>
        </div>

      </div>
    </footer>
  );
}
