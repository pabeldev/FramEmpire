import React, { useState } from 'react';
import { X, Sparkles, Calculator, CheckCircle2, Send, Clock, DollarSign } from 'lucide-react';

export default function ClientEstimator({ isOpen, onClose, initialService = 'motion-graphics' }) {
  const [category, setCategory] = useState(initialService);
  const [scale, setScale] = useState('medium');
  const [urgency, setUrgency] = useState('standard');
  const [addons, setAddons] = useState({
    render4k: true,
    sourceFiles: true,
    socialCutdowns: false,
    webGL: false,
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Pricing math logic
  const basePrices = {
    'graphic-design': 3500,
    'motion-graphics': 6500,
    'video-editing': 4800,
    'web-dev': 8500,
  };

  const scaleMultipliers = {
    small: 0.7,
    medium: 1.0,
    large: 1.6,
  };

  const urgencyMultipliers = {
    relaxed: 0.9,
    standard: 1.0,
    rush: 1.35,
  };

  let totalCost = Math.round(
    basePrices[category] * scaleMultipliers[scale] * urgencyMultipliers[urgency]
  );

  if (addons.render4k) totalCost += 800;
  if (addons.sourceFiles) totalCost += 600;
  if (addons.socialCutdowns) totalCost += 1200;
  if (addons.webGL) totalCost += 2500;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="neon-card max-w-2xl w-full border-cyan-400 p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Syne'] text-xl font-bold text-white">Interactive Project Estimator</h3>
              <p className="text-xs text-slate-400">Configure scope & get instant studio quote</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-['Syne'] text-2xl font-bold text-white">Project Brief Submitted!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Our Executive Producer & Lead Designers have received your brief. We will reach out on Slack/Email within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-300">
            
            {/* 1. Category Selector */}
            <div className="space-y-2">
              <label className="font-bold text-white uppercase text-[11px] tracking-wider block">
                1. Select Creative Discipline
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'graphic-design', label: 'Graphic Design' },
                  { id: 'motion-graphics', label: 'Motion Graphics' },
                  { id: 'video-editing', label: 'Video Editing' },
                  { id: 'web-dev', label: 'Web Dev' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className={`py-2.5 px-3 rounded-xl font-semibold border transition-all ${
                      category === item.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Scale & Scope */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-bold text-white uppercase text-[11px] tracking-wider block">
                  2. Project Scale
                </label>
                <select
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-xs text-cyan-300 font-semibold outline-none focus:border-cyan-400"
                >
                  <option value="small">Focused (Single Asset / Quick Edit)</option>
                  <option value="medium">Standard Studio Campaign (Recommended)</option>
                  <option value="large">Enterprise / Full Brand & Motion System</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-white uppercase text-[11px] tracking-wider block">
                  3. Delivery Urgency
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-xs text-cyan-300 font-semibold outline-none focus:border-cyan-400"
                >
                  <option value="relaxed">Flexible (3-4 Weeks)</option>
                  <option value="standard">Standard Sprint (2 Weeks)</option>
                  <option value="rush">Express Rush Sprint (&lt; 7 Days)</option>
                </select>
              </div>
            </div>

            {/* 4. Addons Checkboxes */}
            <div className="space-y-2">
              <label className="font-bold text-white uppercase text-[11px] tracking-wider block">
                4. Production Add-ons
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/40">
                  <input
                    type="checkbox"
                    checked={addons.render4k}
                    onChange={(e) => setAddons({ ...addons, render4k: e.target.checked })}
                    className="accent-cyan-400"
                  />
                  <span>4K ProRes / Master Export (+$800)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/40">
                  <input
                    type="checkbox"
                    checked={addons.sourceFiles}
                    onChange={(e) => setAddons({ ...addons, sourceFiles: e.target.checked })}
                    className="accent-cyan-400"
                  />
                  <span>C4D / AE Open Project Files (+$600)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/40">
                  <input
                    type="checkbox"
                    checked={addons.socialCutdowns}
                    onChange={(e) => setAddons({ ...addons, socialCutdowns: e.target.checked })}
                    className="accent-cyan-400"
                  />
                  <span>9:16 Social Cutdowns (+$1,200)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/40">
                  <input
                    type="checkbox"
                    checked={addons.webGL}
                    onChange={(e) => setAddons({ ...addons, webGL: e.target.checked })}
                    className="accent-cyan-400"
                  />
                  <span>Three.js / WebGL Integration (+$2,500)</span>
                </label>
              </div>
            </div>

            {/* Estimated Quote Total Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border border-cyan-400 flex items-center justify-between shadow-[0_0_25px_rgba(0,243,255,0.25)]">
              <div>
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block">Estimated Budget</span>
                <span className="font-['Syne'] text-2xl font-extrabold text-white">
                  ${totalCost.toLocaleString()} <span className="text-xs text-slate-400 font-normal">USD</span>
                </span>
              </div>

              <button
                type="submit"
                className="neon-button-primary py-2.5 px-5 text-xs"
              >
                <span>Submit Brief</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
