import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCheck, ExternalLink, Bot, HelpCircle, PhoneCall, FileText } from 'lucide-react';
import { AGENCY_INFO } from '../../data/creativeData';

// Smart FAQ Knowledgebase & Automated Auto-Reply Answers
const FAQ_ITEMS = [
  {
    id: 'pricing',
    label: '💰 Pricing & Discounts',
    question: 'What is your pricing & discount policy?',
    keywords: ['pricing', 'price', 'cost', 'discount', 'wel50', 'wel30', 'coupon', 'rate'],
    answer: 'FramEmpire offers competitive project pricing starting from $250 for Graphic Design up to $1,200+ for 3D Motion Graphics & Animation.\n\n🎉 You can also use coupon codes like WEL50 (50% OFF) or WEL30 (30% OFF) inside our Project Estimator!'
  },
  {
    id: 'delivery',
    label: '⏱️ Project Turnaround',
    question: 'How long does a 3D animation or video project take?',
    keywords: ['time', 'long', 'delivery', 'turnaround', 'duration', 'lead time', 'days', 'weeks'],
    answer: 'Standard Turnaround Times:\n• Graphic Design: 1–2 Weeks\n• Commercial Video Editing: 1–2 Weeks\n• 3D Motion Graphics & Animation: 2–3 Weeks\n• Web Architecture & Development: 2–4 Weeks 🚀'
  },
  {
    id: 'order',
    label: '📋 Submit Brief & Invoice',
    question: 'How do I submit a project brief and generate an invoice?',
    keywords: ['brief', 'order', 'submit', 'invoice', 'estimate', 'estimator', 'pdf', 'bill'],
    answer: 'Click the "Project Estimator" button in our top menu! Select your desired services, enter your project details, and our system will automatically generate a downloadable PDF invoice for you! 📄'
  },
  {
    id: 'payment',
    label: '💳 Payment Methods',
    question: 'Which payment methods do you accept?',
    keywords: ['payment', 'pay', 'bkash', 'nagad', 'wire', 'bank', 'transfer', 'card'],
    answer: 'We accept:\n• bKash Personal / Merchant (+8801615288259)\n• Nagad (+8801615288259)\n• International Bank Wire Transfer\n• Direct Card Payments 💳'
  },
  {
    id: 'contact',
    label: '📞 Studio Direct Line',
    question: 'How can I contact the creative team directly?',
    keywords: ['contact', 'call', 'phone', 'human', 'whatsapp', 'email', 'mail', 'team', 'number'],
    answer: 'Direct Studio Line: +880 1615-288259\nEmail: team.framempire@gmail.com\nWhatsApp: +8801615288259 📱'
  }
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [unreadBadge, setUnreadBadge] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  // Real-Time In-Web Chat History State
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'agent',
      text: 'Welcome to FramEmpire Studio! 👋 Select an FAQ below or type a message for instant automated answers.',
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef(null);
  const phoneRaw = '8801615288259'; // Official WhatsApp direct number

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

  // Process User Input or FAQ Selection with Instant Auto-Reply Engine
  const processMessageSubmission = (userText) => {
    if (!userText.trim()) return;

    const trimmedText = userText.trim();

    // 1. Add User Question Bubble immediately
    const userMsgObj = {
      id: Date.now(),
      sender: 'user',
      text: trimmedText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsgObj]);
    setMessage('');
    setIsTyping(true);

    // 2. Background Dispatch to team.framempire@gmail.com
    try {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '5642e1ed-ed24-4f81-9b16-e41ceb325257',
          subject: '⚡ In-Website Chat Query - FramEmpire',
          from_name: 'FramEmpire AI Assistant',
          to_email: 'team.framempire@gmail.com',
          message: `In-Website Message:\n"${trimmedText}"\n\nClient Phone: +880 1615-288259`
        })
      }).catch(() => {});
    } catch (err) {
      // silent catch
    }

    // 3. Find Matching Smart FAQ Auto-Reply or Default Response
    const lowerText = trimmedText.toLowerCase();
    const matchedFaq = FAQ_ITEMS.find((item) =>
      item.keywords.some((kw) => lowerText.includes(kw))
    );

    const autoReplyText = matchedFaq
      ? matchedFaq.answer
      : `Thank you for reaching out! 🚀 Our creative team has received your message: "${trimmedText}". We will analyze your requirements and get back to you shortly!\n\nDirect Hotline: +880 1615-288259`;

    // 4. Trigger Auto-Reply after realistic 800ms delay
    setTimeout(() => {
      setIsTyping(false);
      const autoReplyObj = {
        id: Date.now() + 1,
        sender: 'agent',
        text: autoReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory((prev) => [...prev, autoReplyObj]);
    }, 800);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    processMessageSubmission(message);
  };

  const handleFaqClick = (faqItem) => {
    processMessageSubmission(faqItem.question);
  };

  const openExternalWhatsApp = () => {
    const text = encodeURIComponent('Hi FramEmpire Studio! I want to discuss a project.');
    window.open(`https://wa.me/${phoneRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
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
                  alt="A M Pabel - FramEmpire Creative Lead"
                  className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover shadow-md shrink-0"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm font-['Creato_Display'] flex items-center gap-1.5">
                  <span>A M Pabel</span>
                  <CheckCheck className="w-4 h-4 text-cyan-400" />
                </h4>
                <p className="text-[11px] text-cyan-300/90 font-medium">Founder & Creative Director • Online</p>
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

          {/* Messages Scroll Area */}
          <div className="p-4 space-y-3 bg-[#060814]/95 text-xs h-[320px] overflow-y-auto custom-scrollbar">
            <div className="text-center">
              <span className="bg-slate-900/90 text-cyan-400 text-[10px] px-3 py-1 rounded-full border border-cyan-500/30 font-semibold inline-flex items-center gap-1.5">
                <img src="/ampabel.jpg" alt="A M Pabel" className="w-3.5 h-3.5 rounded-full object-cover border border-cyan-400" />
                <span>A M Pabel • Live Studio Support</span>
              </span>
            </div>

            {/* Render In-Web Chat Messages */}
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'agent' && (
                  <img 
                    src="/ampabel.jpg" 
                    alt="A M Pabel" 
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
                <img src="/ampabel.jpg" alt="A M Pabel" className="w-4 h-4 rounded-full border border-cyan-400 object-cover animate-bounce" />
                <span className="animate-pulse">A M Pabel is typing answer...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Interactive FAQ Quick Question Buttons */}
          <div className="p-3 bg-[#080b17] border-t border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-cyan-400" />
                <span>Frequently Asked Questions:</span>
              </span>
              <span className="text-[9px] text-cyan-400">Click for instant answer</span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto no-scrollbar">
              {FAQ_ITEMS.map((faq) => (
                <button
                  key={faq.id}
                  type="button"
                  onClick={() => handleFaqClick(faq)}
                  className="bg-slate-900 hover:bg-cyan-950 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 text-[11px] py-1 px-2.5 rounded-full border border-slate-800 transition-all font-medium text-left"
                >
                  {faq.label}
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
              placeholder="Ask a question or type keywords..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-400 text-slate-100 text-xs px-3.5 py-2.5 rounded-xl outline-none placeholder-slate-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold p-2.5 rounded-xl shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all shrink-0"
              title="Send In-Website Message"
              aria-label="Send In-Website Message"
            >
              <Send className="w-4 h-4 fill-current" />
            </button>
          </form>

          {/* Optional External WhatsApp Link Bar */}
          <div className="bg-[#050711] py-1.5 px-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span>Direct WhatsApp: +880 1615-288259</span>
            <button
              type="button"
              onClick={openExternalWhatsApp}
              className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>WhatsApp App</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

        </div>
      )}

      {/* Always-On-Display Floating Action Button */}
      <button
        onClick={handleOpen}
        className="relative group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 p-3.5 sm:p-4 rounded-full shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:shadow-[0_0_40px_rgba(0,243,255,0.8)] hover:scale-110 transition-all duration-300 border-2 border-cyan-300"
        aria-label="Open In-Website FAQ & Live Assistant Chat"
        title="Open FAQ & Live Assistant Chat"
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
          💬 FAQ & Auto-Reply Live Chat
        </span>
      </button>

    </div>
  );
}
