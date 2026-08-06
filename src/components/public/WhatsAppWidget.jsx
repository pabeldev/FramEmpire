import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCheck, ExternalLink, Bot, HelpCircle, PhoneCall, Globe, ShieldAlert, Clock, UserCheck } from 'lucide-react';
import { AGENCY_INFO } from '../../data/creativeData';

// Knowledgebase & Service Rules for FramEmpire AI Assistant
const KNOWLEDGE_BASE = {
  services: [
    { name: 'Video Editing', rates: 'Single Project: $20 – $300 | Monthly Retainer: $300 – $800/mo' },
    { name: 'Motion Graphics & 3D Animation', rates: 'Single Project: $30 – $400 | Monthly Retainer: $400 – $1,200+/mo' },
    { name: 'Graphic Design & Branding', rates: 'Single Project: $10 – $300 | Monthly Retainer: $300 – $600/mo' },
    { name: 'Next.js / React.js Web Development', rates: 'Single Landing Page: $100 – $300 | Full Multi-Page Web App: $400 – $1,200+' },
    { name: 'Vibe Coding & AI Prototype Builds', rates: 'Single Prototype: $150 – $500 | Retainer Support: $300/mo' }
  ],
  workingHours: {
    startHour: 10, // 10:00 AM
    endHour: 22,   // 10:00 PM
    timeZone: 'Asia/Dhaka', // GMT+6
    formatted: '10:00 AM to 10:00 PM (Bangladesh Time, GMT+6)'
  },
  escalation: {
    person: 'Nabila (Executive Director)',
    phone: '+880 1848-374242',
    email: 'team.framempire@gmail.com',
    whatsappUrl: 'https://wa.me/8801848374242'
  }
};

// Check operational status based on GMT+6 local time
function checkIsWithinWorkingHours() {
  try {
    const now = new Date();
    // Convert current time to Bangladesh Time (Asia/Dhaka)
    const options = { timeZone: 'Asia/Dhaka', hour: 'numeric', hour12: false };
    const bdHour = parseInt(new Intl.DateTimeFormat('en-US', options).format(now), 10);
    return bdHour >= KNOWLEDGE_BASE.workingHours.startHour && bdHour < KNOWLEDGE_BASE.workingHours.endHour;
  } catch (err) {
    const localHour = new Date().getHours();
    return localHour >= 10 && localHour < 22;
  }
}

// Quick Suggestion Chips
const QUICK_CHIPS = [
  { id: 'services', label: '🚀 Services & Rates', prompt: 'What services do you offer and what are your rates?' },
  { id: 'hours', label: '🕒 Working Hours', prompt: 'What are your operational working hours?' },
  { id: 'human', label: '📞 Executive Support', prompt: 'I want to speak with executive support / Nabila.' },
  { id: 'estimator', label: '📄 Project Estimator', prompt: 'How can I get an instant price estimate or invoice?' }
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [unreadBadge, setUnreadBadge] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [userLang, setUserLang] = useState('auto'); // 'auto' | 'bn' | 'en'
  
  // Real-Time In-Web Chat History
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'agent',
      text: `Welcome to FramEmpire Studio! 👋 I am your official AI Assistant.\n\nWhich language do you prefer? / কোন ভাষায় কথা বলতে স্বাচ্ছন্দ্য বোধ করবেন?\n• English | বাংলা | Banglish`,
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen, isTyping]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setUnreadBadge(false);
  };

  // Rule-based Smart Response Generator following strictly prompt requirements
  const generateAiAssistantResponse = (userText) => {
    const textLower = userText.toLowerCase();
    const isOnline = checkIsWithinWorkingHours();

    // 1. Language Preference Detection & Setting
    if (textLower.includes('bangla') || textLower.includes('বাংলা') || textLower.includes('banglish')) {
      setUserLang('bn');
      return `ধন্যবাদ! আপনি বাংলায় বা বাংলিশে কথা বলতে পারেন। আমি আপনাকে ভিডিও এডিটিং, মোশন গ্রাফিক্স, গ্রাফিক ডিজাইন এবং ওয়েব ডেভেলপমেন্ট সার্ভিসে সাহায্য করার জন্য প্রস্তুত। 🚀\n\nআপনি কী ধরনের প্রজেক্ট করতে চাচ্ছেন?`;
    }
    if (textLower.includes('english') || textLower.includes('en')) {
      setUserLang('en');
      return `Great! We can continue in English. How can FramEmpire Studio assist you with Video Editing, Motion Graphics, Graphic Design, or Web Builds today? 🚀`;
    }

    // 2. Escalation to Executive Support (Nabila) / Complex Queries
    const escalationKeywords = ['nabila', 'human', 'executive', 'director', 'speak to human', 'talk to person', 'call', 'talk', 'manager', 'support team', 'custom project', 'complex', 'conflict', 'issue'];
    const isEscalation = escalationKeywords.some(kw => textLower.includes(kw));

    if (isEscalation) {
      return `For custom requirements, complex queries, or to speak directly with our Executive Support:\n\n👤 Nabila (Executive Director)\n📞 WhatsApp / Phone: ${KNOWLEDGE_BASE.escalation.phone}\n✉️ Email: ${KNOWLEDGE_BASE.escalation.email}\n\nYou can also click the direct WhatsApp button below! 📲`;
    }

    // 3. Operational Hours Check Enforcement
    const hoursKeywords = ['time', 'hour', 'open', 'offline', 'online', 'schedule', 'working hours'];
    const isAskingHours = hoursKeywords.some(kw => textLower.includes(kw));

    if (isAskingHours) {
      return `🕒 Our operational working hours are:\n10:00 AM to 10:00 PM (Bangladesh Time, GMT+6).\n\n${isOnline ? '🟢 We are currently ONLINE and active!' : '🌙 Our team is currently OFFLINE. Please leave your message and we will respond promptly during operational hours.'}`;
    }

    // 4. Pricing / Rates Inquiries
    const pricingKeywords = ['price', 'pricing', 'rate', 'cost', 'pkg', 'package', 'charge', 'dollar', '$', '৳', ' কত', 'দাম'];
    const isPricing = pricingKeywords.some(kw => textLower.includes(kw));

    if (isPricing) {
      return `FramEmpire Standard Service Rates:\n\n• Video Editing: Single $20–$300 | Retainer $300–$800/mo\n• Motion Graphics & 3D: Single $30–$400 | Retainer $400–$1,200+/mo\n• Graphic Design: Single $10–$300 | Retainer $300–$600/mo\n• React/Next.js Web Dev: Single $100–$400 | Retainer $200–$600/mo\n\n🎉 Use coupon code WEL50 for 50% OFF in our top menu "Project Estimator"!`;
    }

    // 5. Offline Hours General Enforcement if outside 10:00 AM - 10:00 PM
    if (!isOnline) {
      return `🌙 Our team is currently offline (Operating Hours: 10:00 AM to 10:00 PM GMT+6).\n\nPlease leave your requirements, name & contact info here or email us at ${KNOWLEDGE_BASE.escalation.email}. We will get back to you as soon as our office opens!`;
    }

    // 6. Default AI Assistant Response (Concise & Direct)
    if (userLang === 'bn' || /[অ-হা-ঢ়]/.test(userText)) {
      return `ধন্যবাদ মেসেজ দেওয়ার জন্য! 🚀 FramEmpire স্টুডিওতে আমরা পেশাদার ভিডিও এডিটিং, ৩D মোশন গ্রাফিক্স, ব্র্যান্ডিং এবং রিয়্যাক্ট/নেক্সট.জেএস ওয়েব ডেভেলপমেন্ট সেবা প্রদান করি।\n\nসরাসরি এক্সিকিউটিভ ডিরেক্টর নাবিলা এর সাথে কথা বলতে কল করুন: ${KNOWLEDGE_BASE.escalation.phone}`;
    }

    return `Thank you for contacting FramEmpire Studio! 🚀 We specialize in Video Editing, 3D Motion Graphics, Graphic Design, and React/Next.js Web Development.\n\nFor instant price quotes, click "Project Estimator" in our top header. To speak with executive support (Nabila), contact: ${KNOWLEDGE_BASE.escalation.phone}.`;
  };

  // Process User Input
  const processMessageSubmission = (userText) => {
    if (!userText.trim()) return;

    const trimmedText = userText.trim();

    // Add User Bubble
    const userMsgObj = {
      id: Date.now(),
      sender: 'user',
      text: trimmedText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsgObj]);
    setMessage('');
    setIsTyping(true);

    // Background Email Notification Dispatch to team.framempire@gmail.com
    try {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '5642e1ed-ed24-4f81-9b16-e41ceb325257',
          subject: '⚡ AI Assistant Customer Query - FramEmpire',
          from_name: 'FramEmpire Website AI Assistant',
          to_email: 'team.framempire@gmail.com',
          message: `Website Live Chat Message:\n"${trimmedText}"\n\nExecutive Contact: Nabila (+880 1848-374242)`
        })
      }).catch(() => {});
    } catch (err) {
      // silent
    }

    // Generate AI Response
    const aiText = generateAiAssistantResponse(trimmedText);

    setTimeout(() => {
      setIsTyping(false);
      const agentReplyObj = {
        id: Date.now() + 1,
        sender: 'agent',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory((prev) => [...prev, agentReplyObj]);
    }, 600);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    processMessageSubmission(message);
  };

  const handleChipClick = (chip) => {
    processMessageSubmission(chip.prompt);
  };

  const openExecutiveWhatsApp = () => {
    const text = encodeURIComponent('Hi Nabila! I reached out via FramEmpire website and would like to discuss a project.');
    window.open(`${KNOWLEDGE_BASE.escalation.whatsappUrl}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto select-none">
      
      {/* 100% In-Website Live Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[390px] bg-[#090d1a] border border-cyan-500/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(0,243,255,0.2)] overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          
          {/* Live Chat Header */}
          <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-[#070913] p-3.5 sm:p-4 flex items-center justify-between border-b border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/ampabel.jpg"
                  alt="FramEmpire AI Support"
                  className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover shadow-md shrink-0"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm font-['Creato_Display'] flex items-center gap-1.5">
                  <span>FramEmpire AI Assistant</span>
                  <CheckCheck className="w-4 h-4 text-cyan-400" />
                </h4>
                <p className="text-[11px] text-cyan-300/90 font-medium">A Revolution of Animation • Online</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close Live Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Operational Hours Ribbon */}
          <div className="bg-[#050814] px-3 py-1.5 border-b border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>10:00 AM – 10:00 PM (GMT+6)</span>
            </span>
            <span className={checkIsWithinWorkingHours() ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {checkIsWithinWorkingHours() ? '🟢 OPEN NOW' : '🌙 OFFLINE (Leave Msg)'}
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="p-4 space-y-3 bg-[#060814]/95 text-xs h-[310px] overflow-y-auto custom-scrollbar">
            
            {/* Render In-Web Chat Messages */}
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'agent' && (
                  <img 
                    src="/ampabel.jpg" 
                    alt="FramEmpire AI" 
                    className="w-7 h-7 rounded-full border border-cyan-400 object-cover shadow-sm shrink-0" 
                  />
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[86%] space-y-1 shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none border border-cyan-400/40'
                      : 'bg-gradient-to-br from-cyan-950/90 via-slate-900 to-slate-950 text-slate-100 rounded-tl-none border border-cyan-500/30'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 text-[9px] opacity-75">
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-cyan-200" />}
                  </div>
                </div>
              </div>
            ))}

            {/* Is Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-cyan-400 text-[11px] font-semibold pt-1">
                <img src="/ampabel.jpg" alt="AI Typing" className="w-4 h-4 rounded-full border border-cyan-400 object-cover animate-bounce" />
                <span className="animate-pulse">FramEmpire AI is typing answer...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="p-2.5 bg-[#080b17] border-t border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-cyan-400" />
                <span>Quick Assistance:</span>
              </span>
              <span className="text-[9px] text-cyan-400">Click to ask</span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-[75px] overflow-y-auto no-scrollbar">
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  className="bg-slate-900 hover:bg-cyan-950 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 text-[11px] py-1 px-2.5 rounded-full border border-slate-800 transition-all font-medium text-left"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* In-Web Message Input Form */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-[#090d1a] border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question or request a service..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-400 text-slate-100 text-xs px-3.5 py-2.5 rounded-xl outline-none placeholder-slate-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold p-2.5 rounded-xl shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all shrink-0"
              title="Send Message"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4 fill-current" />
            </button>
          </form>

          {/* Executive Direct Contact Bar */}
          <div className="bg-[#050711] py-2 px-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-300">
            <div className="space-y-0.5">
              <span className="font-bold text-white block">Executive Support: Nabila</span>
              <span className="text-slate-400">{KNOWLEDGE_BASE.escalation.phone}</span>
            </div>
            <button
              type="button"
              onClick={openExecutiveWhatsApp}
              className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold hover:bg-emerald-500/30 transition-colors flex items-center gap-1"
            >
              <span>WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

        </div>
      )}

      {/* Always-On-Display Floating Action Button */}
      <button
        onClick={handleOpen}
        className="relative group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 p-3.5 sm:p-4 rounded-full shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:shadow-[0_0_40px_rgba(0,243,255,0.8)] hover:scale-110 transition-all duration-300 border-2 border-cyan-300"
        aria-label="Open Official AI Assistant Chat"
        title="Open Official AI Assistant Chat"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-950" />

        {/* Unread Message Badge Notification */}
        {unreadBadge && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-slate-950 animate-bounce">
            1
          </span>
        )}

        {/* Hover Tooltip */}
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-slate-900 text-cyan-300 font-bold text-xs rounded-xl border border-cyan-500/40 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          💬 Official AI Assistant
        </span>
      </button>

    </div>
  );
}
