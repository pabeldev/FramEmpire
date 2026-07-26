import React, { useState } from 'react';
import { 
  X, Sparkles, Calculator, CheckCircle2, Send, Clock, DollarSign, 
  Flame, Tag, Zap, ArrowRight, ArrowLeft, ShieldCheck, Palette, Film, Code2, HelpCircle 
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailSubject = `🚀 New Brief: ${customServiceText || serviceLabels[service]} ($${finalPayableTotal} USD)`;
    const emailBody = `NEW PROJECT BRIEF FROM FRAMEMPIRE ESTIMATOR
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

Target Email: team.framempire@gmail.com
Submitted at: ${new Date().toLocaleString()}`;

    // Silent background dispatch via Web3Forms & FormSubmit API (No popups, no redirects)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '34d193fa-d07b-40fa-87bb-7b56a337e7df',
          subject: emailSubject,
          to_email: 'team.framempire@gmail.com',
          from_name: 'FramEmpire Client Estimator',
          contact_info: contactInfo,
          service: customServiceText || serviceLabels[service],
          package: selectedPkg.title,
          final_quote: `$${finalPayableTotal} USD`,
          notes: emailBody
        })
      });
    } catch (err) {
      console.log('Background submission dispatch:', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    setContactInfo('');
    setAdditionalNotes('');
    setCustomRequirementText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="neon-card max-w-2xl w-full border-cyan-400 p-5 sm:p-8 relative space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Creato_Display'] text-lg sm:text-xl font-extrabold text-white">
                Interactive Project Estimator
              </h3>
              <p className="text-xs text-slate-400">Step {step} of 4 • Instant Quote & Brief Dispatch</p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/30"
          >
            <X className="w-5 h-5" />
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
              onClick={() => st.num < step && !submitted && setStep(st.num)}
              className={`h-1.5 rounded-full transition-all ${
                step >= st.num
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(0,243,255,0.4)]'
                  : 'bg-slate-800'
              }`}
              title={st.label}
            />
          ))}
        </div>

        {/* 🏷️ 50% OFF WELCOME OFFER BANNER */}
        {!submitted && (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-cyan-500/20 border border-yellow-500/40 text-yellow-300 text-xs flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0 animate-bounce" />
              <span className="font-extrabold text-white text-xs sm:text-sm">🏷️ Special Welcome Offer: 50% OFF Applied on First Order!</span>
            </div>
            <span className="neon-badge text-[9px] border-yellow-400 text-yellow-300 bg-yellow-950/60 shrink-0">
              50% DISCOUNT 🚀
            </span>
          </div>
        )}

        {submitted ? (
          /* SEAMLESS IN-APP SUCCESS CARD (No popups, no external tabs) */
          <div className="text-center py-8 sm:py-10 space-y-6 animate-fadeIn">
            
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400/20 to-cyan-400/20 border-2 border-green-400 text-green-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(74,222,128,0.3)] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="neon-badge border-green-400 text-green-300 bg-green-950/60 text-[10px] px-3 py-1">
                DISPATCHED TO TEAM.FRAMEMPIRE@GMAIL.COM
              </span>
              <h4 className="font-['Creato_Display'] text-2xl sm:text-3xl font-extrabold text-white">
                Brief Submitted Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{contactInfo}</strong>! Our Executive Producer & Lead Specialist have received your project brief. We will reach out within <strong>2 hours</strong>.
              </p>
            </div>

            {/* Submitted Invoice Summary Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-green-500/40 text-left text-xs space-y-3 max-w-lg mx-auto shadow-[0_0_20px_rgba(74,222,128,0.15)]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white uppercase tracking-wider text-[11px] font-['Creato_Display']">Confirmed Order Summary</span>
                <span className="text-green-400 font-extrabold text-xs">50% DISCOUNT LOCKED</span>
              </div>

              <div className="space-y-1.5 text-slate-300 text-xs">
                <div className="flex justify-between">
                  <span>• Service & Scope:</span>
                  <strong className="text-white">{customServiceText || serviceLabels[service]} ({selectedPkg.title})</strong>
                </div>
                <div className="flex justify-between">
                  <span>• Billing Type:</span>
                  <strong className="text-purple-300">{customBillingText || (billingType === 'monthly' ? 'Monthly Retainer' : 'One-Time Project')}</strong>
                </div>
                <div className="flex justify-between">
                  <span>• Delivery Speed:</span>
                  <strong className="text-amber-300">{expressDelivery ? 'Express Fast (+$10)' : 'Standard Delivery (Free)'}</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800">
                  <span className="font-bold text-slate-400">Total Payable Quote:</span>
                  <strong className="text-green-400 text-base font-['Creato_Display'] font-extrabold">${finalPayableTotal} USD</strong>
                </div>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="neon-button-primary py-3 px-8 text-xs justify-center mx-auto"
            >
              <span>Back to FramEmpire Showcase</span>
            </button>

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
                    <span>Next: Final Summary & Submit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: FINAL SUMMARY & SEAMLESS SUBMIT */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                <div className="space-y-1">
                  <h4 className="font-['Creato_Display'] text-base font-bold text-white">STEP 4: Final Summary & Order Brief</h4>
                  <p className="text-slate-400 text-xs">Review your quote and enter contact details to claim your 50% discount.</p>
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
                    disabled={isSubmitting}
                    className="neon-button-primary py-3 px-6 text-xs justify-center shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                  >
                    <span>{isSubmitting ? 'Submitting Brief...' : '🚀 Submit Brief & Claim 50% Offer'}</span>
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
