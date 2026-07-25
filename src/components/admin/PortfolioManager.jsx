import React, { useState } from 'react';
import { Plus, Trash2, Video, Film, Eye, Sparkles, ExternalLink, CheckCircle2, Upload, FileText, Image, Layers } from 'lucide-react';

// Helper function to extract or format Embed URLs for YouTube, Vimeo, Behance, or Local Files
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
    return url;
  }

  return url;
}

export default function PortfolioManager({ projects, onAddProject, onDeleteProject, showAddModalDirectly, setShowAddModalDirectly }) {
  const [showAddModalInternal, setShowAddModalInternal] = useState(false);
  const showAddModal = showAddModalDirectly || showAddModalInternal;

  const setShowAddModal = (val) => {
    setShowAddModalInternal(val);
    if (setShowAddModalDirectly) setShowAddModalDirectly(val);
  };

  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'Motion Graphics',
    categoryKey: 'motion-graphics',
    platform: 'youtube', // 'youtube' | 'vimeo' | 'behance' | 'file'
    embedUrl: '',
    image: '',
    summary: '',
    stats: '100% Client Rating',
    deliverables: '3D Render, Motion Graphics, Sound Design',
    fileName: '',
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

  // File Upload Handler (Data URL / Blob for local file upload)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        embedUrl: fileUrl,
        image: file.type.startsWith('image/') ? fileUrl : formData.image,
        fileName: file.name,
        platform: 'file',
      });
      setPreviewEmbed(fileUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || (!formData.embedUrl && !formData.image)) return;

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
      videoPreview: formData.platform === 'file' || formData.platform === 'direct' ? formattedEmbed : '',
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
      fileName: '',
    });
    setPreviewEmbed('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/80 p-5 rounded-2xl border border-cyan-500/20">
        <div>
          <h2 className="font-['Creato_Display'] text-xl font-bold text-white">Portfolio & File Upload Manager</h2>
          <p className="text-xs text-slate-400">Upload video files or embed projects from YouTube, Vimeo & Behance to the live website</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="neon-button-primary py-2.5 px-5 text-xs shrink-0 shadow-[0_0_20px_rgba(0,243,255,0.4)]"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add / Upload Project</span>
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
                    {proj.platform || 'Direct File'}
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
                className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/30 border border-red-500/20 text-xs transition-colors flex items-center gap-1"
                title="Delete Project"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal with File Upload & Live Embed Preview */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="neon-card max-w-2xl w-full border-cyan-400 p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,243,255,0.25)]">
            
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div>
                <h3 className="font-['Creato_Display'] text-xl font-bold text-white">+ Add / Upload Project to Portfolio</h3>
                <p className="text-xs text-slate-400">Upload video/image files or paste YouTube, Vimeo, Behance links</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/30"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              {/* Project Title & Client */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FramEmpire 3D Character Reel"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Marvel Studios / Commercial"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Category & Platform Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Discipline Category</label>
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
                    <option value="motion-graphics">3D Motion Graphics & Animation</option>
                    <option value="video-editing">Video Editing</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="web-dev">Web Development</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Project Source Type</label>
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { id: 'youtube', label: 'YouTube' },
                      { id: 'vimeo', label: 'Vimeo' },
                      { id: 'behance', label: 'Behance' },
                      { id: 'file', label: 'Upload File' },
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

              {/* Local File Upload Dropzone (When 'file' is selected) */}
              {formData.platform === 'file' ? (
                <div className="space-y-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Upload Video or Image File</label>
                  <div className="border-2 border-dashed border-cyan-500/40 rounded-2xl p-6 text-center bg-slate-950/80 hover:border-cyan-400 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      accept="video/*,image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
                    <p className="font-bold text-white text-xs">
                      {formData.fileName ? `Uploaded: ${formData.fileName}` : 'Click or Drag MP4 Video / Image File Here'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">Supports MP4, MOV, WebM, PNG, JPG files</p>
                  </div>
                </div>
              ) : (
                /* Embed URL Input (YouTube, Vimeo, Behance) */
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                    {formData.platform.toUpperCase()} Embed or Watch Link *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder={
                      formData.platform === 'youtube'
                        ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        : formData.platform === 'vimeo'
                        ? 'https://vimeo.com/76979871'
                        : 'https://www.behance.net/gallery/12345/Project-Name'
                    }
                    value={formData.embedUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-cyan-300 font-mono outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              {/* Cover Poster Image URL */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Cover Poster Thumbnail Image URL</label>
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
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Live Media Preview</span>
                  <div className="aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
                    {formData.platform === 'file' ? (
                      previewEmbed.includes('data:image') || previewEmbed.match(/\.(jpeg|jpg|gif|png)$/) ? (
                        <img src={previewEmbed} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <video src={previewEmbed} controls autoPlay className="w-full h-full object-cover" />
                      )
                    ) : (
                      <iframe
                        src={previewEmbed}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embed Preview"
                      />
                    )}
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
