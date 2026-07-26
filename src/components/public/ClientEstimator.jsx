import React, { useState } from 'react';
import { 
  X, Sparkles, Calculator, CheckCircle2, Send, Clock, DollarSign, 
  Flame, Tag, Zap, ArrowRight, ArrowLeft, ShieldCheck, Palette, Film, Code2, Mail, ExternalLink 
} from 'lucide-react';

export default function ClientEstimator({ isOpen, onClose, initialService = 'graphic-design' }) {
  const [step, setStep] = useState(1); // 1: Service, 2: Billing, 3: Scope & Packages, 4: Summary & Submit

  // Wizard Data State
  const [service, setService] = useState(initialService);
  const [customServiceText, setCustomServiceText] = useState('');
  
  const [billingType, setBillingType] = useState('project');
  const [customBillingText, setCustomBillingText] = useState('');

  const [packageId, setPackageId] = useState('starter');
  const [expressDelivery, setExpressDelivery] = useState(false);
  const [customRequirementText, setCustomRequirementText] = useState('');

  const [additionalNotes, setAdditionalNotes] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Dynamic Service-Specific Packages Data
  const servicePackagesMap = {
    'graphic-design': [
      { id: 'starter', title: '🚀 Starter Task', desc: '1 Social Post / Banner / Resize / Background Removal.', original: 10, discounted: 5, badge: '$5 TRIAL' },
      { id: 'standard', title: '📦 Standard Branding Pack', desc: 'Logo Design, Social Media Kit, Style Guide.', original: 300, discounted: 150, badge: '50% OFF' },
      { id: 'retainer', title: '🔁 Monthly Design Retainer', desc: '15-20 Social Media Graphics + Ads Banners/mo.', original: 300, discounted: 150, badge: 'FIRST MONTH 50% OFF' },
    ],
    'motion-graphics': [
      { id: 'starter', title: '🚀 Micro Motion', desc: 'Logo Animation / Animated Icon / Lower Thirds.', original: 30, discounted: 15, badge: '$15 TRIAL' },
      { id: 'standard', title: '🎬 Social Reel / Shorts Motion', desc: '15–30 sec Kinetic Motion Graphics Video.', original: 100, discounted: 50, badge: '50% OFF' },
      { id: 'retainer', title: '📺 Full Explainer / Promo', desc: '60 sec+ 2D/3D Animation Video.', original: 400, discounted: 200, badge: '50% OFF' },
    ],
    'video-editing': [
      { id: 'starter', title: '🚀 Reel / Short Video', desc: 'TikTok, Reel, Shorts (under 1 min, Subtitles, Hooks).', original: 20, discounted: 10, badge: '$10 TRIAL' },
      { id: 'standard', title: '📹 Standard YouTube / Promo', desc: 'Vlogs, Commercial Ads, Explainer (5–10 mins).', original: 80, discounted: 40, badge: '50% OFF' },
      { id: 'retainer', title: '🏢 Corporate / Long-form', desc: 'Advanced Editing, DaVinci Color Grade, Audio Cleanup.', original: 300, discounted: 150, badge: '50% OFF' },
    ],
    'web-dev': [
      { id: 'starter', title: '🚀 Single Landing Page', desc: 'UI Design or Figma-to-Code Landing Page.', original: 100, discounted: 50, badge: '50% OFF' },
      { id: 'standard', title: '🌐 Full Multi-Page Website', desc: 'Full Web Design & Development App.', original: 400, discounted: 200, badge: '50% OFF' },
      { id: 'retainer', title: '🛠️ Monthly Web Maintenance', desc: 'Bug Fixes, Updates, Design Tweaks.', original: 200, discounted: 100, badge: 'FIRST MONTH 50% OFF' },
    ]
  };

  const currentPackages = servicePackagesMap[service] || servicePackagesMap['graphic-design'];
  const selectedPkg = currentPackages.find(p => p.id === packageId) || currentPackages[0];

  // Pricing Engine
  const baseOriginal = selectedPkg.original;
  const baseDiscounted = selectedPkg.discounted;
  const expressSurcharge = expressDelivery ? 10 : 0;

  const finalOriginalTotal = baseOriginal + expressSurcharge;
  const finalPayableTotal = baseDiscounted + expressSurcharge;

  const serviceLabels = {
    'graphic-design': 'Graphic Design',
    'motion-graphics': 'Motion Graphics',
    'video-editing': 'Video Editing',
    'web-dev': 'Web Design & Dev'
  };

  const emailSubject = `🚀 New FramEmpire Brief: ${customServiceText || serviceLabels[service]} ($${finalPayableTotal} USD)`;
  const emailBody = `
NEW PROJECT BRIEF FROM FRAMEMPIRE ESTIMATOR
-------------------------------------------
Client Contact: ${contactInfo}
Service Needed: ${customServiceText || serviceLabels[service]}
Package Selected: ${selectedPkg.title} (${selectedPkg.desc})
Billing Type: ${customBillingText || (billingType === 'monthly' ? 'Monthly Retainer' : 'One-Time Project')}
Delivery Speed: ${expressDelivery ? 'Express Fast Delivery (+$10 USD)' : 'Standard Delivery (Free)'}

PRICE QUOTE:
- Original Price: $${finalOriginalTotal} USD
- Final Payable (50% OFF Claimed): $${finalPayableTotal} USD ${billingType === 'monthly' ? '/ month' : ''}

CUSTOM REQUIREMENTS:
${customRequirementText || 'None'}

ADDITIONAL NOTES:
${additionalNotes || 'None'}

Submitted at: ${new Date().toLocaleString()}
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // 1. Submit via FormSubmit AJAX to team.framempire@gmail.com
      const res = await fetch('https://formsubmit.co/ajax/team.framempire@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _template: "table",
          _captcha: "false",
          clientContact: contactInfo,
          serviceNeeded: customServiceText || serviceLabels[service],
          packageSelected: selectedPkg.title,
          billingType: customBillingText || billingType,
          deliverySpeed: expressDelivery ? 'Express Fast (+$10)' : 'Standard (Free)',
          finalPayableQuote: `$${finalPayableTotal} USD`,
          customRequirements: customRequirementText || 'None',
          additionalNotes: additionalNotes || 'None'
        })
      });

      const data = await res.json();
      console.log('FormSubmit Response:', data);
    } catch (err) {
      console.error('Email API dispatch error:', err);
    }

    // 2. Open Direct Mail Client as guaranteed fallback
    const mailtoUrl = `mailto:team.framempire@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, '_blank');

    setIsSending(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="neon-card max-w-2xl w-full border-cyan-400 p-5 sm:p-7 relative space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Top Wizard Bar & Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-['Creato_Display'] text-base sm:text-lg font-extrabold text-white">
                Interactive Project Estimator
              </h3>
              <p className="text-[11px] text-slate-400">Target Email: <strong className="text-cyan-300">team.framempire@gmail.com</strong></p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Step Progress Tracker Bar */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { num: 1, label: "1. Service" },
            { num: 2, label: "2. Billing" },
            { num: 3, label: "3. Scope" },
            { num: 4, label: "4. Summary" },
          ].map(st => (
            <div
              key={st.num}
              onClick={() => st.num < step && setStep(st.num)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                step >= st.num
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(0,243,255,0.4)]'
                  : 'bg-slate-800'
              }`}
              title={st.label}
            />
          ))}
        </div>

        {/* 🏷️ 50% OFF WELCOME OFFER BANNER */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-cyan-500/20 border border-yellow-500/40 text-yellow-300 text-xs flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0 animate-bounce" />
            <span className="font-extrabold text-white text-xs">🏷️ Special Welcome Offer: 50% OFF Sent to team.framempire@gmail.com!</span>
          </div>
          <span className="neon-badge text-[8px] border-yellow-400 text-yellow-300 bg-yellow-950/60 shrink-0">
            CLAIM OFFER 🚀
          </span>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 text-green-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="font-['Creato_Display'] text-2xl font-extrabold text-white">Project Brief Dispatched!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Brief sent to <strong className="text-cyan-300">team.framempire@gmail.com</strong>.
              </p>
            </div>

            {/* FormSubmit First-Time Activation Notice Card */}
            <div className="p-4 rounded-2xl bg-yellow-950/40 border border-yellow-500/40 max-w-lg mx-auto text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-yellow-300 font-bold">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>📌 IMPORTANT FOR FIRST-TIME EMAIL RECEIPT:</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                FormSubmit requires a <strong>1-time activation confirmation</strong> on new email addresses. Please check <strong className="text-white">team.framempire@gmail.com</strong> inbox (or Spam) once and click <em>"Activate Form"</em>.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`mailto:team.framempire@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                  className="neon-button-primary py-2 px-4 text-[11px]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via Gmail App Now</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                    onClose();
                  }}
                  className="px-3 py-2 text-[11px] text-slate-400 hover:text-white"
                >
                  Close Window
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="space-y-5 text-xs text-slate-300">
            
            {/* STEP 1: SERVICE SELECTION */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-1">
                  <h4 className="font-['Creato_Display'] text-base font-bold text-white">STEP 1: Which service do you need?</h4>
                  <p className="text-slate-400 text-xs">Select your main creative discipline to load customized packages.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'graphic-design', icon: Palette, title: '🎨 Graphic Design', desc: 'Logos, Social Media Kits, Brand Guides, Vector Art', startPrice: 'Starts at $5' },
                    { id: 'motion-graphics', icon: Sparkles, title: '🎬 Motion Graphics', desc: '3D Kinetic Animation, Micro Motion, Octane Renders', startPrice: 'Starts at $15' },
                    { id: 'video-editing', icon: Film, title: '✂️ Video Editing', desc: 'Shorts, Reels, YouTube Commercials, DaVinci Color Grade', startPrice: 'Starts at $10' },
                    { id: 'web-dev', icon: Code2, title: '🌐 Web Design / Dev', desc: 'Landing Pages, WebGL Apps, Responsive Web Architecture', startPrice: 'Starts at $20' },
                  ].map((s) => {
                    const isSelected = service === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => {
                          setService(s.id);
                          setPackageId('starter');
                        }}
                        className={`p-4 rounded-xl border cursor-pointer space-y-1.5 transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                            : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white">{s.title}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            {s.startPrice}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{s.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-1 pt-2">
                  <label className="font-semibold text-slate-400 text-[11px]">
                    🔳 Don't see what you need? Type your required service here:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3D NFT Asset Rendering or Product Packaging Design..."
                    value={customServiceText}
                    onChange={(e) => setCustomServiceText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="neon-button-primary py-2.5 px-5 text-xs"
                  >
                    <span>Next: Select Billing Type</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SELECT BILLING TYPE */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-1">
                  <h4 className="font-['Creato_Display'] text-base font-bold text-white">STEP 2: Select Billing Type</h4>
                  <p className="text-slate-400 text-xs">Choose whether this is a single project or a monthly subscription.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setBillingType('project')}
                    className={`p-4 rounded-2xl border cursor-pointer space-y-2 transition-all ${
                      billingType === 'project'
                        ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">🎯 One-Time Project</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${billingType === 'project' ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'}`} />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Best for single deliverables (e.g. 1 logo, 1 banner, 1 video cut or 1 web page).
                    </p>
                  </div>

                  <div
                    onClick={() => setBillingType('monthly')}
                    className={`p-4 rounded-2xl border cursor-pointer space-y-2 transition-all ${
                      billingType === 'monthly'
                        ? 'bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">🔄 Monthly Subscription / Retainer</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${billingType === 'monthly' ? 'border-purple-400 bg-purple-400' : 'border-slate-600'}`} />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Continuous monthly design/motion/editing support for your growing brand.
                    </p>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="font-semibold text-slate-400 text-[11px]">
                    🔳 Need Custom Billing? (e.g., Hourly, Milestone-based):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Milestone-based payment upon 50% project delivery..."
                    value={customBillingText}
                    onChange={(e) => setCustomBillingText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="neon-button-primary py-2.5 px-5 text-xs"
                  >
                    <span>Next: Select Scope & Packages</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DYNAMIC SERVICE-SPECIFIC SCOPE & PACKAGES */}
            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-1">
                  <h4 className="font-['Creato_Display'] text-base font-bold text-white">
                    STEP 3: Select Package & Scope for <span className="text-cyan-400">{serviceLabels[service]}</span>
                  </h4>
                  <p className="text-slate-400 text-xs">50% Welcome Discount is automatically applied on all base packages.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentPackages.map((pkg) => {
                    const isSelected = packageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setPackageId(pkg.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer space-y-2 transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                            : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">{pkg.title}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              {pkg.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-300 leading-relaxed">{pkg.desc}</p>
                        </div>

                        <div className="text-xs font-bold pt-2 border-t border-slate-800/80">
                          <span className="line-through text-slate-500 mr-2">${pkg.original}</span>
                          <span className="text-green-400 text-sm font-extrabold font-['Creato_Display']">
                            ${pkg.discounted} USD {billingType === 'monthly' ? '/mo' : ''}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 pt-1">
                  <label className="font-bold text-white uppercase text-[11px] tracking-wider block">
                    Select Delivery Speed
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setExpressDelivery(false)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        !expressDelivery
                          ? 'bg-slate-900 border-cyan-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-xs block">🐢 Standard Delivery</span>
                        <span className="text-[10px] text-slate-400">Regular Timeline</span>
                      </div>
                      <span className="text-xs font-bold text-green-400">FREE</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpressDelivery(true)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        expressDelivery
                          ? 'bg-slate-900 border-amber-400 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-xs block">⚡ Express Fast Delivery</span>
                        <span className="text-[10px] text-slate-400">24-48 Hour Turnaround</span>
                      </div>
                      <span className="text-xs font-bold text-amber-400">+$10 USD</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <label className="font-semibold text-slate-400 text-[11px]">
                    🔳 I have specific requirements / Not listed above:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe dimensions, reference links, specific software, or custom instructions here..."
                    value={customRequirementText}
                    onChange={(e) => setCustomRequirementText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="neon-button-primary py-2.5 px-5 text-xs"
                  >
                    <span>Next: Final Summary & Email Brief</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: FINAL SUMMARY & LEAD CAPTURE */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                <div className="space-y-1">
                  <h4 className="font-['Creato_Display'] text-base font-bold text-white">STEP 4: Send Brief to team.framempire@gmail.com</h4>
                  <p className="text-slate-400 text-xs">Review summary and submit to automatically dispatch brief to team.framempire@gmail.com.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-xs text-white font-['Creato_Display']">🛍️ YOUR ESTIMATED SUMMARY</span>
                    <span className="text-[10px] font-bold text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full border border-green-500/30">
                      50% OFF APPLIED
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">• Selected Service:</span>
                      <span className="font-bold text-white">{customServiceText || serviceLabels[service]}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">• Package & Scope:</span>
                      <span className="font-bold text-cyan-300">{selectedPkg.title}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">• Billing Model:</span>
                      <span className="font-bold text-purple-300">{customBillingText || (billingType === 'monthly' ? 'Monthly Retainer' : 'One-Time Project')}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">• Delivery Speed:</span>
                      <span className="font-bold text-amber-300">{expressDelivery ? 'Express Fast (+$10 USD)' : 'Standard Delivery (Free)'}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Original Estimated Price</span>
                      <span className="line-through text-slate-500 font-bold text-sm">${finalOriginalTotal} USD</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-green-400 font-bold uppercase block">Final Payable Quote</span>
                      <span className="font-['Creato_Display'] text-2xl font-extrabold text-green-400">
                        ${finalPayableTotal} USD {billingType === 'monthly' ? '/mo' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 text-xs">
                    ✍️ Additional Project Notes / Instructions (Optional):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need dynamic subtitles, fast pacing, or specific brand colors..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 text-xs">
                    📧 Your Contact Information (Required):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Email Address or Direct WhatsApp Number..."
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400 font-semibold"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="neon-button-primary py-3 px-6 text-xs justify-center shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                  >
                    <span>{isSending ? 'Sending to team.framempire@gmail.com...' : '🚀 Send Brief to team.framempire@gmail.com'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
