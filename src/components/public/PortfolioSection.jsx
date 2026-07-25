import React, { useState } from 'react';
import { Play, ExternalLink, X, Film, Palette, Sparkles, Code2, CheckCircle, Tag } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../../data/creativeData';

export default function PortfolioSection() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = filter === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.categoryKey === filter);

  return (
    <section id="portfolio" className="py-20 px-4 bg-[#070913]/90 relative border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div className="space-y-3">
            <span className="neon-badge">FEATURED WORK SHOWCASE</span>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl font-extrabold text-white">
              Selected <span className="text-gradient">Client Showcase & Motion Reels</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Explore our latest commercial video cuts, 3D motion animations, graphic identity systems, and web builds.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'motion-graphics', label: 'Motion Graphics', icon: Sparkles },
              { id: 'video-editing', label: 'Video Editing', icon: Film },
              { id: 'graphic-design', label: 'Graphic Design', icon: Palette },
              { id: 'web-dev', label: 'Web Dev', icon: Code2 },
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                      : 'bg-slate-900 border border-cyan-500/20 text-slate-300 hover:border-cyan-400 hover:text-cyan-300'
                  }`}
                >
                  {IconComp && <IconComp className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="neon-card group overflow-hidden border-cyan-500/20 hover:border-cyan-400 cursor-pointer flex flex-col justify-between"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-90" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="neon-badge text-[10px] bg-slate-950/80 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Play Button Overlay for Video / Motion */}
                {(project.videoPreview || project.categoryKey === 'motion-graphics' || project.categoryKey === 'video-editing') && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-[0_0_25px_rgba(0,243,255,0.8)]">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-cyan-400">
                    <span className="font-semibold">{project.client}</span>
                    <span className="text-slate-500">{project.year}</span>
                  </div>
                  <h3 className="font-['Syne'] text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                {/* Deliverables Tags & View CTA */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {project.stats}
                  </span>
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Project Detail Lightbox Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
            <div className="neon-card max-w-3xl w-full max-h-[90vh] overflow-y-auto border-cyan-400 p-6 sm:p-8 relative space-y-6">
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="neon-badge">{selectedProject.category}</span>
                  <span className="text-xs text-slate-400">Client: <strong className="text-cyan-300">{selectedProject.client}</strong></span>
                </div>
                <h2 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedProject.title}
                </h2>
              </div>

              {/* Media Preview Box inside Modal */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-cyan-500/30">
                {selectedProject.videoPreview ? (
                  <video
                    src={selectedProject.videoPreview}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Modal Overview & Deliverables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-white font-['Syne']">Project Scope & Executive Summary</h4>
                  <p className="leading-relaxed text-slate-300">{selectedProject.summary}</p>
                  <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/20">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">Performance Stats</span>
                    <span className="text-sm font-extrabold text-white">{selectedProject.stats}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-white font-['Syne']">Studio Deliverables</h4>
                  <ul className="space-y-2">
                    {selectedProject.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="font-medium text-slate-200">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
