import React, { useState } from 'react';
import { Plus, Trash2, Video, Film, Eye, Sparkles, ExternalLink, CheckCircle2, Play, Image, Layers } from 'lucide-react';

// Helper function to extract or format Embed URLs for YouTube, Vimeo, Behance
export function getEmbedUrl(url, platform) {
  if (!url) return '';

  if (platform === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0];
    } else if (url.includes('embed/')) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0` : url;
  }

  if (platform === 'vimeo' || url.includes('vimeo.com')) {
    let videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    if (url.includes('player.vimeo.com/video/')) return url;
    return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : url;
  }

  if (platform === 'behance' || url.includes('behance.net')) {
    if (url.includes('embed')) return url;
    return url;
  }

  return url;
}

export default function PortfolioManager({ projects, onAddProject, onDeleteProject }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'Motion Graphics',
    categoryKey: 'motion-graphics',
    platform: 'youtube', // 'youtube' | 'vimeo' | 'behance' | 'direct'
    embedUrl: '',
    image: '',
    summary: '',
    stats: '100% Client Rating',
    deliverables: '3D Render, Motion Graphics, Sound Design',
  });

  const [previewEmbed, setPreviewEmbed] = useState('');

  const handlePlatformChange = (p) => {
    setFormData({ ...formData, platform: p });
    setPreviewEmbed(getEmbedUrl(formData.embedUrl, p));
  };

  const handleUrlChange = (url) => {
    setFormData({ ...formData, embedUrl: url });
    setPreviewEmbed(getEmbedUrl(url, formData.platform));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.embedUrl) return;

    const formattedEmbed = getEmbedUrl(formData.embedUrl, formData.platform);

    const newProj = {
      id: `proj-${Date.now()}`,
      title: formData.title,
      client: formData.client || 'FramEmpire Client',
      category: formData.category,
      categoryKey: formData.categoryKey,
      platform: formData.platform,
      image: formData.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      embedUrl: formattedEmbed,
      videoPreview: formData.platform === 'direct' ? formattedEmbed : '',
      year: new Date().getFullYear().toString(),
      summary: formData.summary || 'Custom FramEmpire animation showcase project.',
      stats: formData.stats,
      deliverables: formData.deliverables.split(',').map(s => s.trim()),
      featured: true,
    };

    onAddProject(newProj);
    setShowAddModal(false);
    setFormData({
      title: '',
      client: '',
      category: 'Motion Graphics',
      categoryKey: 'motion-graphics',
      platform: 'youtube',
      embedUrl: '',
      image: '',
      summary: '',
      stats: '100% Client Rating',
      deliverables: '3D Render, Motion Graphics, Sound Design',
    });
    setPreviewEmbed('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-['Creato_Display'] text-xl font-bold text-white">Portfolio Embed & Project Manager</h2>
          <p className="text-xs text-slate-400">Upload and embed projects directly from YouTube, Vimeo, or Behance to the live public portfolio</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="neon-button-primary py-2 px-4 text-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Embed New Project</span>
        </button>
      </div>

      {/* Projects Grid Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="neon-card p-5 border-cyan-500/20 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              
              {/* Media Thumbnail */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2">
                  <span className="neon-badge text-[9px] bg-black/80">{proj.category}</span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-cyan-950/90 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/30 uppercase">
                    {proj.platform || 'Direct'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-['Creato_Display'] text-base font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-slate-400">Client: <strong className="text-cyan-300">{proj.client}</strong></p>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2">{proj.summary}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{proj.stats}</span>
              <button
                onClick={() => onDeleteProject(proj.id)}
                className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/30 border border-red-500/20 text-xs transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal with Live Embed Preview */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="neon-card max-w-2xl w-full border-cyan-400 p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <h3 className="font-['Creato_Display'] text-xl font-bold text-white">Embed New Project to Portfolio</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              {/* Project Title & Client */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FramEmpire Cyber Reel 2026"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Marvel Studios / Self"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Category & Platform Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Discipline / Category</label>
                  <select
                    value={formData.categoryKey}
                    onChange={(e) => {
                      const key = e.target.value;
                      const catNames = {
                        'motion-graphics': 'Motion Graphics',
                        'video-editing': 'Video Editing',
                        'graphic-design': 'Graphic Design',
                        'web-dev': 'Web Development'
                      };
                      setFormData({ ...formData, categoryKey: key, category: catNames[key] });
                    }}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-cyan-300 font-semibold outline-none focus:border-cyan-400"
                  >
                    <option value="motion-graphics">Motion Graphics & 3D</option>
                    <option value="video-editing">Video Editing</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="web-dev">Web Development</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Embed Platform</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'youtube', label: 'YouTube' },
                      { id: 'vimeo', label: 'Vimeo' },
                      { id: 'behance', label: 'Behance' },
                      { id: 'direct', label: 'Direct Video' },
                    ].map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handlePlatformChange(p.id)}
                        className={`py-2 rounded-lg font-bold border transition-all text-[11px] ${
                          formData.platform === p.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Embed URL Input */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                  {formData.platform.toUpperCase()} Embed or Watch Link
                </label>
                <input
                  type="url"
                  required
                  placeholder={
                    formData.platform === 'youtube'
                      ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                      : formData.platform === 'vimeo'
                      ? 'https://vimeo.com/76979871'
                      : formData.platform === 'behance'
                      ? 'https://www.behance.net/gallery/12345/Project-Name'
                      : 'https://assets.mixkit.co/videos/preview/mixkit-laser-beams-42861-large.mp4'
                  }
                  value={formData.embedUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-cyan-300 font-mono outline-none focus:border-cyan-400"
                />
              </div>

              {/* Cover Image URL */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Cover Poster Thumbnail URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                />
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Project Scope & Description</label>
                <textarea
                  rows="3"
                  placeholder="Describe the animation concept, rendering techniques, or client brief..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                />
              </div>

              {/* Live Preview Box */}
              {previewEmbed && (
                <div className="space-y-2 p-3 rounded-2xl bg-slate-950 border border-cyan-500/30">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Live Embed Preview</span>
                  <div className="aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                      src={previewEmbed}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embed Preview"
                    />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neon-button-primary py-2 px-6 text-xs"
                >
                  Publish to Portfolio
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
