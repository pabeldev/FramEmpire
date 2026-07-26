import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCheck } from 'lucide-react';
import { AGENCY_INFO } from '../../data/creativeData';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [unreadBadge, setUnreadBadge] = useState(true);

  const phoneRaw = '8801615288259'; // Official WhatsApp direct number

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setUnreadBadge(false);
  };

  const handleQuickQuestion = (text) => {
    setMessage(text);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const encodedText = encodeURIComponent(`Hello FramEmpire Studio! 👋\n\n${message.trim()}`);
    const whatsappUrl = `https://wa.me/${phoneRaw}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto select-none">
      
      {/* Interactive WhatsApp In-Web Chat Pop-up Window */}
      {isOpen && (
        <div className="mb-3 w-[90vw] sm:w-[360px] bg-[#090d1a] border border-emerald-500/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.25)] overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          
          {/* WhatsApp Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-[#070913] p-4 flex items-center justify-between border-b border-emerald-500/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/framempire_logo_white.png"
                  alt="FramEmpire Support"
                  className="w-10 h-10 rounded-full bg-slate-950 p-1 border border-emerald-400 object-contain shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm font-['Creato_Display'] flex items-center gap-1.5">
                  <span>FramEmpire Support</span>
                  <CheckCheck className="w-4 h-4 text-emerald-300" />
                </h4>
                <p className="text-[11px] text-emerald-200 font-medium">Typically replies in under 5 mins</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp Message Body */}
          <div className="p-4 space-y-3 bg-[#060814]/95 text-xs max-h-[340px] overflow-y-auto">
            <div className="text-center">
              <span className="bg-slate-900/90 text-slate-400 text-[10px] px-2.5 py-1 rounded-full border border-slate-800">
                Official FramEmpire WhatsApp Channel
              </span>
            </div>

            {/* Official Support Greeting Bubble */}
            <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 p-3.5 rounded-2xl rounded-tl-none border border-emerald-500/30 text-slate-100 space-y-1.5 shadow-md max-w-[88%]">
              <p className="font-semibold text-emerald-300 text-[11px]">FramEmpire Studio Team 👋</p>
              <p className="leading-relaxed">
                Welcome! How can we help with your 3D animation, video editing, graphic design, or web project today?
              </p>
              <span className="text-[9px] text-emerald-400/80 block text-right">Just now • Online</span>
            </div>

            {/* Quick Suggestion Pills */}
            <div className="pt-2 space-y-1.5">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Quick Suggestions:</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickQuestion('Hi! I want to request a project quote for 3D Motion Graphics.')}
                  className="bg-slate-900 hover:bg-emerald-950 hover:border-emerald-400 text-slate-200 hover:text-emerald-300 text-[11px] py-1 px-2.5 rounded-full border border-slate-800 transition-colors"
                >
                  🎬 3D Motion Quote
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickQuestion('Hello! What is your pricing for commercial video editing?')}
                  className="bg-slate-900 hover:bg-emerald-950 hover:border-emerald-400 text-slate-200 hover:text-emerald-300 text-[11px] py-1 px-2.5 rounded-full border border-slate-800 transition-colors"
                >
                  🎥 Video Editing Pricing
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickQuestion('Hi! I need a custom Web App / Graphic Design build.')}
                  className="bg-slate-900 hover:bg-emerald-950 hover:border-emerald-400 text-slate-200 hover:text-emerald-300 text-[11px] py-1 px-2.5 rounded-full border border-slate-800 transition-colors"
                >
                  ⚡ Web & Graphic Design
                </button>
              </div>
            </div>
          </div>

          {/* Message Input & Send Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#090d1a] border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-400 text-slate-100 text-xs px-3.5 py-2.5 rounded-xl outline-none placeholder-slate-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold p-2.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all shrink-0"
              title="Send directly to FramEmpire WhatsApp"
              aria-label="Send WhatsApp Message"
            >
              <Send className="w-4 h-4 fill-current" />
            </button>
          </form>

        </div>
      )}

      {/* Always-On-Display WhatsApp Floating Button */}
      <button
        onClick={handleOpen}
        className="relative group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 p-3.5 sm:p-4 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] hover:scale-110 transition-all duration-300 border-2 border-emerald-300"
        aria-label="Chat on WhatsApp with FramEmpire"
        title="Chat live on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-950" />

        {/* Unread Message Badge Notification */}
        {unreadBadge && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-slate-950 animate-bounce">
            1
          </span>
        )}

        {/* Hover Tooltip */}
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-slate-900 text-emerald-300 font-bold text-xs rounded-xl border border-emerald-500/40 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          💬 Chat on WhatsApp (+880 1615-288259)
        </span>
      </button>

    </div>
  );
}
