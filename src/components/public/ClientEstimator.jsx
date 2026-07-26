import React, { useState } from 'react';
import { X, Sparkles, Calculator, CheckCircle2, Send, Clock, DollarSign, Flame, Tag, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ClientEstimator({ isOpen, onClose, initialService = 'graphic-design' }) {
  const [billingType, setBillingType] = useState('project'); // 'project' | 'monthly'
  const [category, setCategory] = useState(initialService);
  const [packageType, setPackageType] = useState('standard'); // 'starter', 'standard', 'retainer', 'custom'
  const [deliverySpeed, setDeliverySpeed] = useState('standard'); // 'standard' | 'express'
  const [submitted, setSubmitted] = useState(false);

  // Client Brief Form State
  const [briefDetails, setBriefDetails] = useState({
    name: '',
    email: '',
    notes: ''
  });

  if (!isOpen) return null;

  // Base Prices (Original Struck-through Prices)
  const packagesData = {
    starter: {
      name: "🚀 Test Us Out – Starter Task",
      desc: "1 Single Social Media Banner, Background Removal, or Simple Touchup Task.",
      originalPrice: 10,
      badge: "LOW-BARRIER TRIAL"
    },
    standard: {
      name: "Standard Campaign / Project",
      desc: "Logo Design, Social Media Kit, Brand Guidelines, or Commercial Cut.",
      originalPrice: 300,
      badge: "MOST POPULAR"
    },
    retainer: {
      name: "Monthly Dedicated Retainer",
      desc: "15-20 Social Media Graphics, Motion Ads & Dedicated Designer Support.",
      originalPrice: 600,
      badge: "MONTHLY SUBSCRIPTION"
    },
    custom: {
      name: "Full Brand & 3D Motion System",
      desc: "Complete 3D Kinetic Animation, Brand System, WebGL App & Source Assets.",
      originalPrice: 1200,
      badge: "ENTERPRISE"
    }
  };

  const selectedPkg = packagesData[packageType] || packagesData.standard;
  let rawPrice = selectedPkg.originalPrice;

  // Adjust raw price based on billing type
  if (billingType === 'monthly' && packageType === 'standard') {
    rawPrice = 500;
  }

  // Express Delivery Speed Surcharge
  const speedCost = deliverySpeed === 'express' ? 30 : 0;
  const originalTotal = rawPrice + speedCost;

  // 50% Welcome Discount Calculation
  const discountedTotal = Math.round(originalTotal * 0.5);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="neon-card max-w-2xl w-full border-cyan-400 p-5 sm:p-8 relative space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Creato_Display'] text-lg sm:text-xl font-extrabold text-white">
                Interactive Project Estimator
              </h3>
              <p className="text-xs text-slate-400">Configure your project scope & claim first-time client discounts</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 🏷️ 50% OFF WELCOME OFFER BANNER */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-cyan-500/20 border border-yellow-500/40 text-yellow-300 text-xs flex items-center justify-between gap-3 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0 animate-bounce" />
            <div>
              <span className="font-extrabold text-white text-xs sm:text-sm block">🏷️ Welcome Offer: 50% OFF</span>
              <span className="text-[11px] text-slate-200">Get 50% OFF on your first month subscription or first project order!</span>
            </div>
          </div>
          <span className="neon-badge text-[9px] border-yellow-400 text-yellow-300 bg-yellow-950/60 shrink-0 hidden sm:inline-block">
            CLAIM OFFER 🚀
          </span>
        </div>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 text-green-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-['Creato_Display'] text-2xl font-extrabold text-white">50% OFF Brief Claimed Successfully!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Our Executive Producer & Lead Specialist have received your brief. We will contact you via email within 2 hours with your locked 50% discount quote.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-300">
            
            {/* 1. PRICING BILLING TYPE SWITCHER */}
            <div className="space-y-2">
              <label className="font-bold text-white uppercase text-[11px] tracking-wider block">
                1. Select Pricing & Billing Type
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setBillingType('project');
                    if (packageType === 'retainer') setPackageType('standard');
                  }}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    billingType === 'project'
                      ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs">One-Time Project</span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${billingType === 'project' ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'}`} />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">Single asset, logo, banner or video edit project</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBillingType('monthly');
                    setPackageType('retainer');
                  }}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    billingType === 'monthly'
                      ? 'bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs">Monthly Retainer / Subscription</span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${billingType === 'monthly' ? 'border-purple-400 bg-purple-400' : 'border-slate-600'}`} />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">Dedicated designer/animator support every month</span>
                </button>
              </div>
            </div>

            {/* 2. CREATIVE SERVICE SELECTOR */}
            <div className="space-y-2">
              <label className="font-bold text-white uppercase text-[11px] tracking-wider block">
                2. Select Creative Service
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'graphic-design', label: 'Graphic Design' },
                  { id: 'motion-graphics', label: 'Motion Graphics' },
                  { id: 'video-editing', label: 'Video Editing' },
                  { id: 'web-dev', label: 'Web Development' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className={`py-2 px-3 rounded-xl font-semibold border text-center transition-all ${
                      category === item.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,243,255,0.3)]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. SCOPE & PACKAGE SELECTION WITH 50% OFF DISCOUNTS */}
            <div className="space-y-2">
              <label className="font-bold text-white uppercase text-[11px] tracking-wider block">
                3. Select Scope & Package (50% OFF Applied)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Option A: Starter Test Task ($5) */}
                <div
                  onClick={() => setPackageType('starter')}
                  className={`p-3.5 rounded-xl border cursor-pointer space-y-1.5 transition-all ${
                    packageType === 'starter'
                      ? 'bg-green-950/30 border-green-400 text-white shadow-[0_0_15px_rgba(74,222,128,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-green-300">🚀 Test Us Out – Starter Task</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                      $5 TRIAL
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    1 Single Social Banner, Background Removal, or Simple Edit to test our quality risk-free.
                  </p>
                  <div className="text-xs font-bold pt-1">
                    <span className="line-through text-slate-500 mr-2">$10</span>
                    <span className="text-green-400 text-sm font-extrabold font-['Creato_Display']">$5 USD</span>
                  </div>
                </div>

                {/* Option B: Standard Package ($150) */}
                <div
                  onClick={() => setPackageType('standard')}
                  className={`p-3.5 rounded-xl border cursor-pointer space-y-1.5 transition-all ${
                    packageType === 'standard'
                      ? 'bg-cyan-950/30 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-cyan-300">Standard Campaign / Project</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      POPULAR
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    Logo Design, Social Media Kit, Brand Guidelines, or Commercial Ad Cut.
                  </p>
                  <div className="text-xs font-bold pt-1">
                    <span className="line-through text-slate-500 mr-2">$300</span>
                    <span className="text-cyan-400 text-sm font-extrabold font-['Creato_Display']">$150 USD</span>
                  </div>
                </div>

                {/* Option C: Monthly Retainer ($300/mo) */}
                <div
                  onClick={() => {
                    setPackageType('retainer');
                    setBillingType('monthly');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer space-y-1.5 transition-all ${
                    packageType === 'retainer'
                      ? 'bg-purple-950/30 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-purple-300">Monthly Dedicated Retainer</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      SUBSCRIPTION
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    15-20 Social Media Graphics + Motion Ads Banners every month with dedicated support.
                  </p>
                  <div className="text-xs font-bold pt-1">
                    <span className="line-through text-slate-500 mr-2">$600</span>
                    <span className="text-purple-400 text-sm font-extrabold font-['Creato_Display']">$300 USD / mo</span>
                  </div>
                </div>

                {/* Option D: Custom Enterprise ($600) */}
                <div
                  onClick={() => setPackageType('custom')}
                  className={`p-3.5 rounded-xl border cursor-pointer space-y-1.5 transition-all ${
                    packageType === 'custom'
                      ? 'bg-blue-950/30 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-blue-300">Custom Full Brand & 3D System</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      ENTERPRISE
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    Full 3D kinetic animation, brand manual, WebGL app & open project source files.
                  </p>
                  <div className="text-xs font-bold pt-1">
                    <span className="line-through text-slate-500 mr-2">$1,200</span>
                    <span className="text-blue-400 text-sm font-extrabold font-['Creato_Display']">$600 USD</span>
                  </div>
                </div>

              </div>
            </div>

            {/* 4. DELIVERY SPEED SELECTOR */}
            <div className="space-y-2">
              <label className="font-bold text-white uppercase text-[11px] tracking-wider block">
                4. Select Delivery Speed
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliverySpeed('standard')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    deliverySpeed === 'standard'
                      ? 'bg-slate-900 border-cyan-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs block">Standard Delivery</span>
                    <span className="text-[10px] text-slate-400">3-5 Business Days</span>
                  </div>
                  <span className="text-xs font-bold text-green-400">FREE</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliverySpeed('express')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    deliverySpeed === 'express'
                      ? 'bg-slate-900 border-amber-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs block">Express Rush Delivery</span>
                    <span className="text-[10px] text-slate-400">24-48 Hours</span>
                  </div>
                  <span className="text-xs font-bold text-amber-400">+$30 USD</span>
                </button>
              </div>
            </div>

            {/* CLIENT BRIEF INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <input
                type="text"
                required
                placeholder="Your Name / Business Name"
                value={briefDetails.name}
                onChange={(e) => setBriefDetails({ ...briefDetails, name: e.target.value })}
                className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
              />
              <input
                type="email"
                required
                placeholder="Your Contact Email / WhatsApp"
                value={briefDetails.email}
                onChange={(e) => setBriefDetails({ ...briefDetails, email: e.target.value })}
                className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            {/* 💰 DYNAMIC QUOTE & DYNAMIC PRICE CALCULATION ENGINE */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-[#070913] border-2 border-cyan-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_25px_rgba(0,243,255,0.25)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block">Estimated Total Quote</span>
                  <span className="bg-green-500/20 text-green-300 border border-green-500/40 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    50% Welcome Discount Applied
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-base sm:text-lg font-bold line-through text-slate-500">
                    ${originalTotal.toLocaleString()} USD
                  </span>
                  <span className="font-['Creato_Display'] text-2xl sm:text-3xl font-extrabold text-green-400">
                    ${discountedTotal.toLocaleString()} USD
                  </span>
                  {billingType === 'monthly' && <span className="text-xs text-purple-300 font-bold">/ month</span>}
                </div>
              </div>

              <button
                type="submit"
                className="neon-button-primary py-3 px-6 text-xs justify-center shrink-0 shadow-[0_0_20px_rgba(0,243,255,0.4)]"
              >
                <span>Submit Brief & Claim Offer 🚀</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
