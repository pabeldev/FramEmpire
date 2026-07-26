import React, { useState } from 'react';
import { 
  X, Sparkles, Calculator, CheckCircle2, Send, Clock, DollarSign, 
  Flame, Tag, Zap, ArrowRight, ArrowLeft, ShieldCheck, Palette, Film, Code2, Download, Printer, Copy, Check, FileText, MessageSquare, CreditCard 
} from 'lucide-react';
import { AGENCY_INFO } from '../../data/creativeData';

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
  
  const [copiedInvoice, setCopiedInvoice] = useState(false);
  const [invoiceId, setInvoiceId] = useState('');
  const [issueDate, setIssueDate] = useState('');

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
  const totalDiscount = baseOriginal - baseDiscounted;

  const serviceLabels = {
    'graphic-design': 'Graphic Design',
    'motion-graphics': 'Motion Graphics',
    'video-editing': 'Video Editing',
    'web-dev': 'Web Design & Dev'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const stamp = Math.floor(100000 + Math.random() * 900000);
    const generatedId = `#INV-${stamp}`;
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    
    setInvoiceId(generatedId);
    setIssueDate(today);

    const emailSubject = `🚀 New Brief & Auto Invoice ${generatedId}: ${customServiceText || serviceLabels[service]} ($${finalPayableTotal} USD)`;
    const emailBody = `FRAMEMPIRE OFFICIAL AUTO-GENERATED INVOICE (${generatedId})
------------------------------------------------------
Client Contact: ${contactInfo}
Service Needed: ${customServiceText || serviceLabels[service]}
Package Selected: ${selectedPkg.title} (${selectedPkg.desc})
Billing Model: ${customBillingText || (billingType === 'monthly' ? 'Monthly Retainer' : 'One-Time Project')}
Delivery Speed: ${expressDelivery ? 'Express Fast Delivery (+$10 USD)' : 'Standard Delivery (Free)'}

INVOICE FINANCIAL BREAKDOWN:
- Subtotal Original: $${finalOriginalTotal} USD
- Welcome Offer Discount: 50% OFF (-$${totalDiscount} USD)
- Express Speed Surcharge: $${expressSurcharge} USD
- TOTAL PAYABLE QUOTE: $${finalPayableTotal} USD ${billingType === 'monthly' ? '/ month' : ''}

CUSTOM REQUIREMENTS:
${customRequirementText || 'None'}

ADDITIONAL NOTES:
${additionalNotes || 'None'}

Issue Date: ${today}
Studio: FramEmpire (A Revolution of Animation)`;

    // Silent background API dispatch
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '34d193fa-d07b-40fa-87bb-7b56a337e7df',
          subject: emailSubject,
          to_email: 'team.framempire@gmail.com',
          from_name: 'FramEmpire Auto Invoice System',
          invoice_id: generatedId,
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

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleCopyInvoiceRef = () => {
    navigator.clipboard.writeText(`${invoiceId} - Quote: $${finalPayableTotal} USD for ${customServiceText || serviceLabels[service]}`);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 3000);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn print:bg-white print:p-0">
      <div className="neon-card max-w-2xl w-full border-cyan-400 p-5 sm:p-7 relative space-y-5 max-h-[92vh] overflow-y-auto print:max-h-none print:border-0 print:shadow-none print:bg-white print:text-black print:w-full">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-['Creato_Display'] text-base sm:text-lg font-extrabold text-white">
                Interactive Project Estimator & Auto-Invoice
              </h3>
              <p className="text-[11px] text-slate-400">Step {step} of 4 • Instant Single-Page Invoice Template</p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Step Progress Tracker Bar */}
        {!submitted && (
          <div className="grid grid-cols-4 gap-2 print:hidden">
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
        )}

        {/* 🏷️ 50% OFF WELCOME OFFER BANNER */}
        {!submitted && (
          <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-cyan-500/20 border border-yellow-500/40 text-yellow-300 text-xs flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(234,179,8,0.15)] print:hidden">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0 animate-bounce" />
              <span className="font-extrabold text-white text-xs">🏷️ Special Welcome Offer: 50% OFF Applied on First Order!</span>
            </div>
            <span className="neon-badge text-[8px] border-yellow-400 text-yellow-300 bg-yellow-950/60 shrink-0">
              50% DISCOUNT 🚀
            </span>
          </div>
        )}

        {submitted ? (
          /* OFFICIAL HIGH-CONVERTING SINGLE-PAGE INVOICE HTML TEMPLATE */
          <div className="space-y-4 animate-fadeIn print:space-y-3">
            
            {/* Top Action Bar (Hidden in Print) */}
            <div className="flex items-center justify-between bg-slate-900/90 border border-cyan-500/30 p-3 rounded-xl print:hidden">
              <div className="flex items-center gap-2 text-xs text-green-400 font-bold">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Single-Page Invoice Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintInvoice}
                  className="neon-button-primary py-1.5 px-3 text-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Download PDF / Print</span>
                </button>
                <button
                  onClick={handleResetAndClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* SINGLE-PAGE CRISP INVOICE CONTAINER */}
            <div className="print-invoice-area p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs space-y-4 print:bg-white print:text-black print:p-0 print:border-0">
              
              {/* HEADER SECTION */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4 print:border-slate-300">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400 print:text-black" />
                    <span className="font-['Creato_Display'] text-xl font-black text-white print:text-black tracking-wider">
                      {AGENCY_INFO.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-cyan-300 print:text-slate-600 font-medium">
                    {AGENCY_INFO.subtitle} • {AGENCY_INFO.tagline}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase print:bg-amber-100 print:text-amber-800 print:border-amber-400">
                    PENDING APPROVAL / UNPAID
                  </span>
                  <p className="font-mono text-xs font-bold text-white print:text-black">{invoiceId}</p>
                  <p className="text-[10px] text-slate-400 print:text-slate-600">Issue Date: {issueDate}</p>
                </div>
              </div>

              {/* CLIENT & SERVICE SUMMARY BANNERS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 print:bg-slate-50 print:border-slate-300 space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Client Details:</span>
                  <p className="font-bold text-white print:text-black text-xs">{contactInfo}</p>
                  <p className="text-[10px] text-cyan-400 print:text-slate-700">Discipline: <strong>{customServiceText || serviceLabels[service]}</strong></p>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-cyan-500/10 border border-yellow-500/30 text-yellow-300 print:bg-amber-50 print:border-amber-300 print:text-amber-900 space-y-1 flex flex-col justify-center">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
                    <span className="font-extrabold text-xs">🎉 Welcome Offer Applied!</span>
                  </div>
                  <p className="text-[10px] text-slate-300 print:text-slate-700">50% OFF First Month / Project Discount Claimed.</p>
                </div>
              </div>

              {/* ITEMIZED ITEMIZATION TABLE */}
              <div className="space-y-2">
                <div className="border border-slate-800 rounded-xl overflow-hidden print:border-slate-300">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-slate-300 border-b border-slate-800 print:bg-slate-100 print:text-black font-bold">
                        <th className="p-2.5">Item Description</th>
                        <th className="p-2.5">Delivery Type</th>
                        <th className="p-2.5 text-right">Base Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 print:divide-slate-200">
                      <tr>
                        <td className="p-2.5">
                          <strong className="text-white print:text-black block">{selectedPkg.title}</strong>
                          <span className="text-[10px] text-slate-400 print:text-slate-600">{selectedPkg.desc}</span>
                        </td>
                        <td className="p-2.5 text-purple-300 print:text-purple-800 font-medium">
                          {customBillingText || (billingType === 'monthly' ? 'Monthly Retainer' : 'One-Time Project')}
                        </td>
                        <td className="p-2.5 text-right font-semibold text-slate-400 line-through">
                          ${baseOriginal} USD
                        </td>
                      </tr>

                      <tr>
                        <td className="p-2.5">
                          <strong className="text-white print:text-black block">
                            {expressDelivery ? '⚡ Express Fast Turnaround (24-48 hrs)' : '🐢 Standard Delivery Timeline'}
                          </strong>
                        </td>
                        <td className="p-2.5 text-slate-400 print:text-slate-600">
                          {expressDelivery ? 'Rush Speed' : 'Standard'}
                        </td>
                        <td className="p-2.5 text-right font-semibold text-amber-400 print:text-amber-700">
                          {expressDelivery ? '+$10 USD' : '$0 USD'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FINANCIAL SUMMARY TOTALS */}
              <div className="flex justify-end pt-1">
                <div className="w-full sm:w-64 space-y-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 print:bg-slate-50 print:border-slate-300 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal Original:</span>
                    <span className="font-semibold line-through">${finalOriginalTotal} USD</span>
                  </div>

                  <div className="flex justify-between text-green-400 font-bold">
                    <span>50% Welcome Discount:</span>
                    <span>-${totalDiscount} USD</span>
                  </div>

                  <div className="flex justify-between text-sm font-extrabold border-t border-slate-800 pt-2 print:border-slate-300 text-white print:text-black">
                    <span>Total Amount Due:</span>
                    <span className="text-green-400 print:text-green-700 font-['Creato_Display']">${finalPayableTotal} USD</span>
                  </div>
                </div>
              </div>

              {/* CUSTOM NOTES & INSTRUCTIONS SECTION */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-slate-50 print:border-slate-300 space-y-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Custom Client Notes & Instructions:</span>
                <p className="text-slate-300 print:text-slate-700 italic text-[11px]">
                  {customRequirementText || additionalNotes || "No custom notes added."}
                </p>
              </div>

              {/* FOOTER & NEXT STEPS CTA */}
              <div className="pt-2 border-t border-slate-800 print:border-slate-300 space-y-3">
                <p className="text-[10px] text-slate-400 print:text-slate-600 italic">
                  * Note: This is an automated estimated quote. Final invoice will be confirmed upon brief review.
                </p>

                {/* Interactive Action Buttons (Hidden in Print) */}
                <div className="flex flex-wrap items-center gap-2 print:hidden">
                  <button
                    onClick={() => alert(`Redirecting to secure checkout for Quote ${invoiceId}...`)}
                    className="neon-button-primary py-2 px-4 text-xs font-extrabold"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>💳 Pay Now / Claim Offer (${finalPayableTotal} USD)</span>
                  </button>

                  <a
                    href={`https://wa.me/8801700000000?text=${encodeURIComponent(`Hi FramEmpire Studio, I submitted brief ${invoiceId} for ${serviceLabels[service]} ($${finalPayableTotal} USD). I would like to discuss custom adjustments.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-green-950/80 border border-green-500/40 text-green-300 hover:text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                    <span>📲 Connect via WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-500 print:text-slate-600 pt-1">
                  <span>Support: team.framempire@gmail.com</span>
                  <span>© {new Date().getFullYear()} FramEmpire Studio. All rights reserved.</span>
                </div>
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
                  <p className="text-slate-400 text-xs">Review your quote and enter contact details to claim your 50% discount and generate invoice.</p>
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
                    <span>{isSubmitting ? 'Generating Invoice...' : '🚀 Submit Brief & Generate Single-Page Invoice'}</span>
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
