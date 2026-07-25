import React, { useState } from 'react';
import { Play, ExternalLink, X, Film, Palette, Sparkles, Code2, CheckCircle, Tag, Video, Globe } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../../data/creativeData';

// Helper to auto-generate thumbnail, live embed iframe, or live website preview
export function getCardMediaPreview(project) {
  // 1. Behance Direct Embed Preview (Live Iframe in Card)
  if (project.platform === 'behance' || (project.embedUrl && project.embedUrl.includes('behance.net'))) {
    return {
      type: 'iframe',
      url: project.embedUrl
    };
  }

  // 2. YouTube Auto Thumbnail
  if (project.platform === 'youtube' || (project.embedUrl && project.embedUrl.includes('youtube.com'))) {
    let videoId = '';
    if (project.embedUrl.includes('embed/')) {
      videoId = project.embedUrl.split('embed/')[1]?.split('?')[0];
    } else if (project.embedUrl.includes('watch?v=')) {
      videoId = project.embedUrl.split('watch?v=')[1]?.split('&')[0];
    }
    if (videoId) {
      return {
        type: 'image',
        url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      };
    }
  }

  // 3. Web Development Live Site Iframe Preview (Renders site hero/welcome page)
  if (project.liveUrl || project.platform === 'web') {
    return {
      type: 'web-iframe',
      url: project.liveUrl,
      fallbackImage: `https://api.microlink.io/?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&embed=screenshot.url`
    };
  }

  // 4. Direct Video MP4
  if (project.videoPreview) {
    return {
      type: 'video',
      url: project.videoPreview
    };
  }

  // 5. Default Fallback
  return {
    type: 'image',
    url: project.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
  };
}

export default function PortfolioSection({ projects = PORTFOLIO_PROJECTS }) {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.categoryKey === filter);

  return (
    <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070913]/90 relative border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6 sm:pb-8">
          <div className="space-y-2 sm:space-y-3">
            <span className="neon-badge">FEATURED WORK SHOWCASE</span>
            <h2 className="font-['Creato_Display'] text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Selected <span className="text-gradient">Client Showcase & Motion Reels</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Explore our live web platforms, commercial video cuts, Behance motion systems, and graphic design identity.
            </p>
          </div>

          {/* Filter Pills with Touch Scroll on Mobile */}
          <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 scrollbar-none no-scrollbar">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'graphic-design', label: 'Graphic Design', icon: Palette },
              { id: 'web-dev', label: 'Web Dev', icon: Code2 },
              { id: 'motion-graphics', label: 'Motion', icon: Sparkles },
              { id: 'video-editing', label: 'Video', icon: Film },
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                      : 'bg-slate-900 border border-cyan-500/20 text-slate-300 hover:border-cyan-400 hover:text-cyan-300'
                  }`}
                >
                  {IconComp && <IconComp className="w-3.5 h-3.5 shrink-0" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const media = getCardMediaPreview(project);

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="neon-card group overflow-hidden border-cyan-500/20 hover:border-cyan-400 cursor-pointer flex flex-col justify-between"
              >
                {/* Media Thumbnail Container (Direct Live Behance / Website Hero Preview) */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  {media.type === 'iframe' ? (
                    <div className="w-full h-full relative">
                      <iframe
                        src={media.url}
                        className="w-full h-full border-0 pointer-events-none"
                        title={project.title}
                      />
                      <div className="absolute inset-0 bg-cyan-950/10 group-hover:bg-cyan-950/20 transition-colors" />
                    </div>
                  ) : media.type === 'web-iframe' ? (
                    <div className="w-full h-full relative overflow-hidden bg-slate-900">
                      <iframe
                        src={media.url}
                        className="w-[1280px] h-[800px] border-0 pointer-events-none origin-top-left scale-[0.3] sm:scale-[0.32] lg:scale-[0.35]"
                        title={project.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-cyan-950/10 group-hover:bg-cyan-950/20 transition-colors" />
                    </div>
                  ) : media.type === 'video' ? (
                    <video
                      src={media.url}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={media.url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Badge & Platform Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                    <span className="neon-badge text-[9px] bg-slate-950/80 backdrop-blur-md">
                      {project.category}
                    </span>
                    {project.platform && (
                      <span className="bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                        {project.platform}
                      </span>
                    )}
                  </div>

                  {/* Play / Visit Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.8)]">
                      {project.liveUrl ? (
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black ml-0.5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center justify-between text-xs text-cyan-400">
                      <span className="font-semibold">{project.client}</span>
                      <span className="text-slate-500">{project.year}</span>
                    </div>
                    <h3 className="font-['Creato_Display'] text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  {/* Deliverables Tags & View CTA */}
                  <div className="pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 truncate max-w-[150px]">
                      {project.stats}
                    </span>
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                      <span>{project.liveUrl ? 'Visit Website' : 'Open Embed'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Project Detail Lightbox Modal with Full Live Embed / Website Hero View */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
            <div className="neon-card max-w-4xl w-full max-h-[92vh] overflow-y-auto border-cyan-400 p-4 sm:p-8 relative space-y-4 sm:space-y-6">
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/30 transition-colors z-10"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="neon-badge text-[9px] sm:text-[10px]">{selectedProject.category}</span>
                  {selectedProject.platform && (
                    <span className="neon-badge text-[9px] sm:text-[10px] border-blue-500/40 text-blue-300 bg-blue-950/40">
                      {selectedProject.platform === 'web' ? 'LIVE WEBSITE PLATFORM' : `EMBED: ${selectedProject.platform.toUpperCase()}`}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">Client: <strong className="text-cyan-300">{selectedProject.client}</strong></span>
                </div>
                <h2 className="font-['Creato_Display'] text-xl sm:text-3xl font-extrabold text-white">
                  {selectedProject.title}
                </h2>
              </div>

              {/* Live Website / Embed Video / Behance Preview Box inside Modal */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-cyan-500/30">
                {selectedProject.liveUrl ? (
                  <div className="w-full h-full relative flex flex-col">
                    {/* Website Browser Header Simulation */}
                    <div className="bg-slate-950 px-4 py-2 border-b border-cyan-500/20 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        <span className="ml-2 font-mono text-[11px] text-cyan-300 font-semibold">{selectedProject.liveUrl}</span>
                      </div>

                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neon-button-primary py-1 px-3 text-[11px] flex items-center gap-1"
                      >
                        <span>Open Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Live Website Hero / Page Iframe Preview */}
                    <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-900">
                      <iframe
                        src={selectedProject.liveUrl}
                        className="w-full h-full border-0"
                        title={selectedProject.title}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ) : selectedProject.embedUrl ? (
                  <iframe
                    src={selectedProject.embedUrl}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedProject.title}
                  />
                ) : selectedProject.videoPreview ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs text-slate-300">
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="font-bold text-xs sm:text-sm text-white font-['Creato_Display']">Project Scope & Summary</h4>
                  <p className="leading-relaxed text-slate-300">{selectedProject.summary}</p>
                  
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-300 font-bold hover:underline text-xs pt-1"
                    >
                      <Globe className="w-4 h-4" />
                      <span>{selectedProject.liveUrl}</span>
                    </a>
                  )}

                  <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/20 mt-2">
                    <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">Performance Stats</span>
                    <span className="text-xs sm:text-sm font-extrabold text-white">{selectedProject.stats}</span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h4 className="font-bold text-xs sm:text-sm text-white font-['Creato_Display']">Studio Deliverables</h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {selectedProject.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-medium text-slate-200 text-xs">{d}</span>
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
