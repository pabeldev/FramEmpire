import React, { useState } from 'react';
import { 
  X, Sparkles, Calculator, CheckCircle2, Send, Clock, DollarSign, 
  Flame, Tag, Zap, ArrowRight, ArrowLeft, ShieldCheck, Palette, Film, Code2, Download, Printer, Copy, Check, FileText, MessageSquare, CreditCard, Ticket 
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

  // Coupon Engine State (Default pre-applied WEL50 = 50%)
  const [couponInput, setCouponInput] = useState('WEL50');
  const [appliedCoupon, setAppliedCoupon] = useState({ 
    code: 'WEL50', 
    percent: 50, 
    isValid: true, 
    message: '🎉 Coupon WEL50 Applied! (50% OFF Discount Added)' 
  });
  const [couponError, setCouponError] = useState('');

  const [additionalNotes, setAdditionalNotes] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [copiedInvoice, setCopiedInvoice] = useState(false);
  const [invoiceId, setInvoiceId] = useState('');
  const [issueDate, setIssueDate] = useState('');

  if (!isOpen) return null;

  // Dynamic Coupon Code Engine
  const handleApplyCoupon = (e) => {
    if (e) e.preventDefault();
    const rawCode = couponInput.trim().toUpperCase();
    if (!rawCode) {
      setAppliedCoupon({ code: '', percent: 0, isValid: false, message: '' });
      setCouponError('Please enter a coupon code.');
      return;
    }

    const matchNumber = rawCode.match(/\d+/);
    let extractedPercent = 0;

    if (matchNumber) {
      extractedPercent = parseInt(matchNumber[0], 10);
    }

    if (extractedPercent > 90) extractedPercent = 90;
    if (extractedPercent < 0) extractedPercent = 0;

    if (extractedPercent > 0) {
      setAppliedCoupon({
        code: rawCode,
        percent: extractedPercent,
        isValid: true,
        message: `🎉 Coupon ${rawCode} Applied! (${extractedPercent}% OFF Discount Added)`
      });
      setCouponError('');
    } else {
      setAppliedCoupon({
        code: rawCode,
        percent: 50,
        isValid: true,
        message: `🎉 Coupon ${rawCode} Applied! (50% OFF Discount Added)`
      });
      setCouponError('');
    }
  };

  // Dynamic Base Packages Data
  const servicePackagesMap = {
    'graphic-design': [
      { id: 'starter', title: 'Starter Branding Task', desc: '1 Social Post / Banner / Resize / Background Removal.', basePrice: 10 },
      { id: 'standard', title: 'Standard Branding Pack', desc: 'Logo Design, Social Media Kit, Style Guide.', basePrice: 300 },
      { id: 'retainer', title: 'Monthly Design Retainer', desc: '15-20 Social Media Graphics + Ads Banners/mo.', basePrice: 300 },
    ],
    'motion-graphics': [
      { id: 'starter', title: 'Micro Motion Asset', desc: 'Logo Animation / Animated Icon / Lower Thirds.', basePrice: 30 },
      { id: 'standard', title: 'Social Reel / Shorts Motion', desc: '15–30 sec Kinetic Motion Graphics Video.', basePrice: 100 },
      { id: 'retainer', title: 'Full Explainer / Promo Motion', desc: '60 sec+ 2D/3D Animation Video.', basePrice: 400 },
    ],
    'video-editing': [
      { id: 'starter', title: 'Reel / Short Video Cut', desc: 'TikTok, Reel, Shorts (under 1 min, Subtitles, Hooks).', basePrice: 20 },
      { id: 'standard', title: 'Standard YouTube / Promo Edit', desc: 'Vlogs, Commercial Ads, Explainer (5–10 mins).', basePrice: 80 },
      { id: 'retainer', title: 'Corporate / Long-form Editing', desc: 'Advanced Editing, DaVinci Color Grade, Audio Cleanup.', basePrice: 300 },
    ],
    'web-dev': [
      { id: 'starter', title: 'Single Landing Page Build', desc: 'UI Design or Figma-to-Code Landing Page.', basePrice: 100 },
      { id: 'standard', title: 'Full Multi-Page Web App', desc: 'Full Web Design & Development Architecture.', basePrice: 400 },
      { id: 'retainer', title: 'Monthly Web Retainer Support', desc: 'Bug Fixes, Updates, Design Tweaks.', basePrice: 200 },
    ]
  };

  const currentPackages = servicePackagesMap[service] || servicePackagesMap['graphic-design'];
  const selectedPkg = currentPackages.find(p => p.id === packageId) || currentPackages[0];

  // Dynamic Calculation Engine
  const baseOriginal = selectedPkg.basePrice;
  const discountPercent = appliedCoupon.isValid ? appliedCoupon.percent : 0;
  const discountAmount = Math.round((baseOriginal * discountPercent) / 100);
  const baseDiscounted = baseOriginal - discountAmount;
  const expressSurcharge = expressDelivery ? 10 : 0;

  const finalOriginalTotal = baseOriginal + expressSurcharge;
  const finalPayableTotal = baseDiscounted + expressSurcharge;

  const serviceLabels = {
    'graphic-design': 'Graphic Design',
    'motion-graphics': 'Motion Graphics',
    'video-editing': 'Video Editing',
    'web-dev': 'Web Design & Dev'
  };

  // WhatsApp Link targeting 01615288259 (+8801615288259)
  const whatsAppUrl = `https://wa.me/8801615288259?text=${encodeURIComponent(
    `Hi FramEmpire Studio, I submitted brief ${invoiceId} for ${customServiceText || serviceLabels[service]} ($${finalPayableTotal} USD with Coupon ${appliedCoupon.code}). I would like to connect on WhatsApp.`
  )}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const stamp = Math.floor(100000 + Math.random() * 900000);
    const generatedId = `FE-INV-${stamp}`;
    const today = new Date().toLocaleDateString('en-GB'); // DD/MM/YYYY
    
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

COUPON & FINANCIAL BREAKDOWN:
- Coupon Code Applied: ${appliedCoupon.code || 'None'} (${discountPercent}% OFF)
- Subtotal Original: $${finalOriginalTotal} USD
- Discount Applied: -${discountPercent}% (-$${discountAmount} USD)
- Express Speed Surcharge: $${expressSurcharge} USD
- TOTAL PAYABLE QUOTE: $${finalPayableTotal} USD ${billingType === 'monthly' ? '/ month' : ''}

CUSTOM REQUIREMENTS:
${customRequirementText || 'None'}

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
          coupon_applied: `${appliedCoupon.code} (${discountPercent}% OFF)`,
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

  // 100% PERFECT MATCH DEDICATED PRINT WINDOW ENGINE (FramEmpire Official Template Layout)
  const handlePrintInvoice = () => {
    const printWin = window.open('', '_blank', 'width=900,height=1150');
    if (!printWin) return;

    const printableHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice ${invoiceId} - FramEmpire Studio</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Montserrat', sans-serif; background: #ffffff; color: #1e293b; margin: 0; padding: 0; }
            @page { size: portrait; margin: 0mm; }
          </style>
        </head>
        <body class="p-0 bg-white">
          <div class="max-w-[800px] mx-auto bg-white min-h-[1100px] relative text-slate-800 text-xs shadow-none border border-slate-200">
            
            <div class="flex justify-between items-stretch">
              <div class="p-8 space-y-4 flex-1">
                <img 
                  src="/framempire_logo_black.png" 
                  alt="FramEmpire Studio" 
                  class="h-14 object-contain mb-2" 
                />

                <div class="pt-1 text-xs space-y-1 text-slate-600">
                  <p><strong class="text-slate-800 font-semibold">Invoice :</strong> ${invoiceId}</p>
                  <p><strong class="text-slate-800 font-semibold">Date :</strong> ${issueDate}</p>
                </div>

                <div class="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div>
                    <h3 class="font-bold text-slate-900 text-sm mb-1">Invoice To:</h3>
                    <div class="w-12 h-0.5 bg-slate-400 mb-2"></div>
                    <p class="font-semibold text-slate-800 text-xs">${contactInfo}</p>
                    <p class="text-[11px] text-slate-500">Service: ${customServiceText || serviceLabels[service]}</p>
                  </div>

                  <div>
                    <h3 class="font-bold text-slate-900 text-sm mb-1">Payment Info:</h3>
                    <p class="text-[11px] text-slate-600"><span class="w-20 inline-block">Account No :</span> 01615288259</p>
                    <p class="text-[11px] text-slate-600"><span class="w-20 inline-block">A/C Name :</span> FramEmpire Studio</p>
                    <p class="text-[11px] text-slate-600"><span class="w-20 inline-block">Bank Details :</span> Bkash / Nagad / Wire</p>
                  </div>
                </div>
              </div>

              <div class="w-28 bg-[#2A2B30] flex items-center justify-center text-white">
                <span class="font-black text-4xl tracking-widest uppercase rotate-90 whitespace-nowrap opacity-90">
                  INVOICE
                </span>
              </div>
            </div>

            <div class="px-8 pt-4">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-[#2A2B30] text-white font-bold">
                    <th class="p-3 w-12 text-center">SL.</th>
                    <th class="p-3">Product Description</th>
                    <th class="p-3 text-right">Price</th>
                    <th class="p-3 text-center w-16">Qty</th>
                    <th class="p-3 text-right w-24">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr class="bg-white">
                    <td class="p-3 text-center font-medium">01.</td>
                    <td class="p-3">
                      <strong class="text-slate-900 block font-semibold">${selectedPkg.title}</strong>
                      <span class="text-[10px] text-slate-500">${selectedPkg.desc} (${customBillingText || billingType})</span>
                    </td>
                    <td class="p-3 text-right font-medium">$${baseOriginal}.00</td>
                    <td class="p-3 text-center">1</td>
                    <td class="p-3 text-right font-bold">$${baseOriginal}.00</td>
                  </tr>

                  <tr class="bg-[#EBEBEB]">
                    <td class="p-3 text-center font-medium">02.</td>
                    <td class="p-3 font-medium">
                      ${expressDelivery ? '⚡ Express Fast Turnaround (24-48 hrs)' : '🐢 Standard Delivery Timeline'}
                    </td>
                    <td class="p-3 text-right font-medium">$${expressSurcharge}.00</td>
                    <td class="p-3 text-center">1</td>
                    <td class="p-3 text-right font-bold">$${expressSurcharge}.00</td>
                  </tr>

                  ${customRequirementText ? `
                  <tr class="bg-white">
                    <td class="p-3 text-center font-medium">03.</td>
                    <td class="p-3 italic text-slate-600">Client Instruction: ${customRequirementText}</td>
                    <td class="p-3 text-right">-</td>
                    <td class="p-3 text-center">-</td>
                    <td class="p-3 text-right">-</td>
                  </tr>
                  ` : ''}

                  <tr class="bg-[#EBEBEB] opacity-40"><td class="p-3 text-center">04.</td><td class="p-3">-</td><td class="p-3 text-right">-</td><td class="p-3 text-center">-</td><td class="p-3 text-right">-</td></tr>
                  <tr class="bg-white opacity-40"><td class="p-3 text-center">05.</td><td class="p-3">-</td><td class="p-3 text-right">-</td><td class="p-3 text-center">-</td><td class="p-3 text-right">-</td></tr>
                </tbody>
              </table>
            </div>

            <div class="px-8 pt-6 flex justify-between items-start">
              <div class="w-7/12 bg-[#2A2B30] text-white p-5 rounded-none space-y-3 text-[11px]">
                <div class="space-y-1 text-slate-300">
                  <p><strong class="text-white">Email :</strong> team.framempire@gmail.com</p>
                  <p><strong class="text-white">Web :</strong> framempire.com</p>
                  <p><strong class="text-white">Address :</strong> Dhaka, Bangladesh</p>
                </div>
                <div class="pt-2 border-t border-slate-700">
                  <strong class="text-white uppercase font-bold text-[10px] block mb-0.5">Terms & Conditions</strong>
                  <p class="text-[10px] text-slate-400 leading-tight">
                    Automated quote invoice. Discount claimed via coupon code ${appliedCoupon.code} (${discountPercent}% OFF).
                  </p>
                </div>
              </div>

              <div class="w-4/12 space-y-4">
                <table class="w-full text-xs text-right border-collapse">
                  <tbody>
                    <tr class="bg-[#EBEBEB]">
                      <td class="p-2 font-medium text-slate-600">Sub Total :</td>
                      <td class="p-2 font-bold text-slate-800">$${finalOriginalTotal}.00</td>
                    </tr>
                    <tr class="bg-white">
                      <td class="p-2 font-medium text-slate-600">Tax :</td>
                      <td class="p-2 font-bold text-slate-800">$0.00</td>
                    </tr>
                    <tr class="bg-[#EBEBEB] text-green-700">
                      <td class="p-2 font-medium">Discount (${appliedCoupon.code}) :</td>
                      <td class="p-2 font-bold">-$${discountAmount}.00</td>
                    </tr>
                    <tr class="bg-[#2A2B30] text-white font-extrabold text-sm">
                      <td class="p-2.5">Total :</td>
                      <td class="p-2.5 text-green-400">$${finalPayableTotal}.00</td>
                    </tr>
                  </tbody>
                </table>

                <div class="pt-8 text-center space-y-1">
                  <div class="w-32 h-0.5 bg-slate-300 mx-auto"></div>
                  <span class="text-[11px] font-bold text-slate-600 block uppercase tracking-wider">Signature</span>
                </div>
              </div>
            </div>

          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 300);
            };
          </script>
        </body>
      </html>
    `;

    printWin.document.open();
    printWin.document.write(printableHTML);
    printWin.document.close();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="neon-card max-w-2xl w-full border-cyan-400 p-5 sm:p-7 relative space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-['Creato_Display'] text-base sm:text-lg font-extrabold text-white">
                Interactive Project Estimator & Auto-Invoice
              </h3>
              <p className="text-[11px] text-slate-400">Step {step} of 4 • Official Studio Invoice Template</p>
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
        )}

        {/* 🏷️ DYNAMIC COUPON APPLIED BANNER */}
        {!submitted && (
          <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-cyan-500/20 border border-yellow-500/40 text-yellow-300 text-xs flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0 animate-bounce" />
              <span className="font-extrabold text-white text-xs">
                🏷️ {appliedCoupon.isValid ? appliedCoupon.message : 'Enter Coupon WEL50, WEL40, or WEL30'}
              </span>
            </div>
            <span className="neon-badge text-[8px] border-yellow-400 text-yellow-300 bg-yellow-950/60 shrink-0">
              {discountPercent}% OFF OFFER 🚀
            </span>
          </div>
        )}

        {submitted ? (
          /* OFFICIAL FRAMEMPIRE TEMPLATE MATCHING SCREEN INVOICE */
          <div className="space-y-4 animate-fadeIn">
            
            {/* Top Action Bar */}
            <div className="flex items-center justify-between bg-slate-900/90 border border-cyan-500/30 p-3 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-green-400 font-bold">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Official Studio Invoice Generated ({appliedCoupon.code} Applied)</span>
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

            {/* OFFICIAL FRAMEMPIRE TEMPLATE SCREEN PREVIEW */}
            <div className="bg-white text-slate-900 rounded-2xl p-5 sm:p-6 text-xs space-y-5 shadow-2xl relative border border-slate-200">
              
              {/* Header Row */}
              <div className="flex justify-between items-stretch border-b border-slate-200 pb-4">
                <div className="space-y-3 flex-1">
                  <img 
                    src="/framempire_logo_black.png" 
                    alt="FramEmpire Studio" 
                    className="h-12 sm:h-14 object-contain" 
                  />

                  <div className="text-xs space-y-0.5 text-slate-600">
                    <p><strong className="text-slate-900">Invoice :</strong> {invoiceId}</p>
                    <p><strong className="text-slate-900">Date :</strong> {issueDate}</p>
                  </div>
                </div>

                <div className="w-20 bg-[#2A2B30] text-white rounded-xl flex items-center justify-center font-black text-lg tracking-widest rotate-90 uppercase">
                  INVOICE
                </div>
              </div>

              {/* Billing Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Invoice To:</h4>
                  <div className="w-8 h-0.5 bg-slate-400 mb-1.5"></div>
                  <p className="font-bold text-slate-900 text-xs">{contactInfo}</p>
                  <p className="text-[11px] text-slate-500">Service: {customServiceText || serviceLabels[service]}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Payment Info:</h4>
                  <p className="text-[11px] text-slate-600"><span className="w-16 inline-block">Account No :</span> 01615288259</p>
                  <p className="text-[11px] text-slate-600"><span className="w-16 inline-block">A/C Name :</span> FramEmpire Studio</p>
                  <p className="text-[11px] text-slate-600"><span className="w-16 inline-block">Bank Details :</span> Bkash / Nagad / Wire</p>
                </div>
              </div>

              {/* Itemization Table */}
              <div className="border border-slate-300 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#2A2B30] text-white font-bold">
                      <th className="p-2.5 w-10 text-center">SL.</th>
                      <th className="p-2.5">Product Description</th>
                      <th className="p-2.5 text-right">Price</th>
                      <th className="p-2.5 text-center w-12">Qty</th>
                      <th className="p-2.5 text-right w-20">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-white">
                      <td className="p-2.5 text-center font-bold">01.</td>
                      <td className="p-2.5">
                        <strong className="text-slate-900 block">{selectedPkg.title}</strong>
                        <span className="text-[10px] text-slate-500">{selectedPkg.desc} ({customBillingText || billingType})</span>
                      </td>
                      <td className="p-2.5 text-right font-medium">${baseOriginal}.00</td>
                      <td className="p-2.5 text-center">1</td>
                      <td className="p-2.5 text-right font-bold">${baseOriginal}.00</td>
                    </tr>

                    <tr className="bg-[#EBEBEB]">
                      <td className="p-2.5 text-center font-bold">02.</td>
                      <td className="p-2.5 font-medium">
                        {expressDelivery ? '⚡ Express Fast Turnaround (24-48 hrs)' : '🐢 Standard Delivery Timeline'}
                      </td>
                      <td className="p-2.5 text-right font-medium">${expressSurcharge}.00</td>
                      <td className="p-2.5 text-center">1</td>
                      <td className="p-2.5 text-right font-bold">${expressSurcharge}.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bottom Totals */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="w-full sm:w-7/12 bg-[#2A2B30] text-white p-3.5 rounded-xl text-[11px] space-y-2">
                  <div className="space-y-0.5 text-slate-300">
                    <p><strong className="text-white">Email :</strong> team.framempire@gmail.com</p>
                    <p><strong className="text-white">Web :</strong> framempire.com</p>
                    <p><strong className="text-white">Address :</strong> Dhaka, Bangladesh</p>
                  </div>
                  <div className="pt-1.5 border-t border-slate-700">
                    <strong className="text-white uppercase font-bold text-[9px] block">Terms & Conditions</strong>
                    <p className="text-[10px] text-slate-400">
                      Automated quote. Coupon {appliedCoupon.code} applied ({discountPercent}% OFF).
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-4/12 space-y-2">
                  <table className="w-full text-xs text-right">
                    <tbody>
                      <tr className="bg-[#EBEBEB]"><td className="p-1.5">Sub Total :</td><td className="p-1.5 font-bold">${finalOriginalTotal}.00</td></tr>
                      <tr className="bg-white"><td className="p-1.5">Tax :</td><td className="p-1.5 font-bold">$0.00</td></tr>
                      <tr className="bg-[#EBEBEB] text-green-700"><td className="p-1.5 font-semibold">Discount ({appliedCoupon.code}) :</td><td className="p-1.5 font-bold">-${discountAmount}.00</td></tr>
                      <tr className="bg-[#2A2B30] text-white font-extrabold text-sm"><td className="p-2">Total :</td><td className="p-2 text-green-400">${finalPayableTotal}.00</td></tr>
                    </tbody>
                  </table>

                  <div className="pt-4 text-center">
                    <div className="w-24 h-0.5 bg-slate-300 mx-auto mb-1"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Signature</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200">
                <button
                  onClick={() => alert(`Redirecting to checkout for ${invoiceId}...`)}
                  className="neon-button-primary py-2 px-4 text-xs font-extrabold"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>💳 Pay Now (${finalPayableTotal} USD)</span>
                </button>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-green-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-green-700 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>📲 Connect via WhatsApp</span>
                </a>
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
                  <p className="text-slate-400 text-xs">Coupon discount automatically applied on all base packages.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentPackages.map((pkg) => {
                    const isSelected = packageId === pkg.id;
                    const pkgDiscounted = pkg.basePrice - Math.round((pkg.basePrice * discountPercent) / 100);
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
                              {discountPercent}% OFF
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-300 leading-relaxed">{pkg.desc}</p>
                        </div>

                        <div className="text-xs font-bold pt-2 border-t border-slate-800/80">
                          <span className="line-through text-slate-500 mr-2">${pkg.basePrice}</span>
                          <span className="text-green-400 text-sm font-extrabold font-['Creato_Display']">
                            ${pkgDiscounted} USD {billingType === 'monthly' ? '/mo' : ''}
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
                    <span>Next: Final Summary & Coupon</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: FINAL SUMMARY & CLEAN SINGLE-INPUT COUPON ENGINE */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                <div className="space-y-1">
                  <h4 className="font-['Creato_Display'] text-base font-bold text-white">STEP 4: Final Summary & Order Brief</h4>
                  <p className="text-slate-400 text-xs">Enter promo coupon code below to claim your discount.</p>
                </div>

                {/* Clean Single Coupon Code Input Box */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-yellow-500/30 space-y-2">
                  <label className="font-bold text-yellow-300 text-xs flex items-center gap-1.5">
                    <Ticket className="w-4 h-4 text-yellow-400" />
                    <span>🎟️ Enter Coupon Code (e.g. WEL50, WEL40, WEL30)</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WEL50"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono uppercase tracking-wider outline-none focus:border-yellow-400 font-bold"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 font-bold text-xs hover:bg-yellow-500/30 transition-colors shrink-0"
                    >
                      Apply Code
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-[11px] text-red-400 font-medium">{couponError}</p>
                  )}
                  {appliedCoupon.isValid && (
                    <p className="text-[11px] text-green-400 font-bold">{appliedCoupon.message}</p>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-xs text-white font-['Creato_Display']">🛍️ YOUR ESTIMATED SUMMARY</span>
                    <span className="text-[10px] font-bold text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full border border-green-500/30">
                      {discountPercent}% OFF APPLIED
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
                      <span className="text-[10px] text-green-400 font-bold uppercase block">Final Payable Quote ({appliedCoupon.code})</span>
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
                    <span>{isSubmitting ? 'Generating Invoice...' : `🚀 Submit Brief & Claim ${discountPercent}% Offer`}</span>
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
