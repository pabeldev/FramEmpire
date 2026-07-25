import React, { useState } from 'react';
import { Palette, Sparkles, Film, Code2, Check, ArrowUpRight, Clock, Tag } from 'lucide-react';
import { SERVICES } from '../../data/creativeData';

const ICON_MAP = {
  Palette: Palette,
  Sparkles: Sparkles,
  Film: Film,
  Code2: Code2
};

export default function ServicesSection({ onSelectService, onOpenEstimator }) {
  const [activeId, setActiveId] = useState(SERVICES[0].id);

  return (
    <section id="services" className="py-20 px-4 relative bg-[#070913]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="neon-badge">OUR CREATIVE CAPABILITIES</span>
          <h2 className="font-['Syne'] text-3xl sm:text-4xl font-extrabold text-white">
            Specialized Services Built for <span className="text-gradient">Maximum Visual Impact</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From 3D motion renders to high-conversion web applications, our studio delivers end-to-end creative production.
          </p>
        </div>

        {/* 4 Interactive Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Sparkles;
            const isSelected = activeId === service.id;

            return (
              <div
                key={service.id}
                onClick={() => setActiveId(service.id)}
                className={`neon-card p-6 flex flex-col justify-between cursor-pointer group transition-all duration-300 ${
                  isSelected
                    ? 'border-cyan-400 shadow-[0_0_35px_rgba(0,243,255,0.3)] bg-slate-900/90 scale-[1.02]'
                    : 'border-cyan-500/20 hover:border-cyan-500/50'
                }`}
              >
                <div className="space-y-4">
                  {/* Icon & Category */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-['Syne'] text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Key Deliverables:</p>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{service.leadTime}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEstimator(service.id);
                    }}
                    className="flex items-center gap-1 text-cyan-300 font-bold hover:text-white transition-colors"
                  >
                    <span>Estimate</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
