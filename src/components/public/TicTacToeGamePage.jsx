import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Github, Gamepad2, Star, ShieldAlert, MapPin, Cpu, UserCheck, Award, X, Sparkles, ChevronLeft, ChevronRight, Share2, Check, ExternalLink } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from './Footer';

export default function TicTacToeGamePage({ onBackToHome, onOpenEstimator }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const gameScreenshots = [
    {
      url: '/game_ss1.png',
      title: 'Game Start & Custom Board Engine',
      subtitle: 'Dynamic 3x3 to 12x12 boards powered by unbeatable Minimax AI engine.',
      badge: 'Minimax AI • 12x12 Grid'
    },
    {
      url: '/game_ss2.png',
      title: '100 Authentic Feni Villages Campaign Map',
      subtitle: 'Conquer local villages including Betagaon, Madhuai, Sundarpur & Maruar Char.',
      badge: '100 Villages • Campaign Map'
    },
    {
      url: '/game_ss3.png',
      title: 'Player Profile Hub & Performance Metrics',
      subtitle: 'Unlock arcade avatars (Tiger, Robot, Alien, Dragon) & track win rates.',
      badge: 'Arcade Avatars • Win Rate'
    }
  ];

  const apkDownloadUrl = 'https://github.com/pabeldev/feni-brain-arcade/raw/main/TicTacToe-GenZ-Multiplayer-v1.0.1.apk';
  const githubRepoUrl = 'https://github.com/pabeldev/feni-brain-arcade';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#060813] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Top Floating Bar */}
      <nav className="fixed top-2 left-0 right-0 z-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto bg-[#070913]/90 backdrop-blur-xl border border-cyan-500/30 rounded-full px-4 py-2.5 flex items-center justify-between shadow-[0_0_25px_rgba(0,0,0,0.8)]">
          
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-slate-300 hover:text-white text-xs sm:text-sm font-bold bg-slate-900/90 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-400 px-3.5 py-1.5 rounded-full transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Back to FramEmpire Studio</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-slate-900 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-bold">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>EDP UNIVERSE</span>
            </span>

            <a
              href={apkDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button-primary text-xs py-1.5 px-3.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download APK</span>
            </a>
          </div>

        </div>
      </nav>

      {/* Main Page Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Play Store Style Master Header Banner */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Left Column: Official 3D Game Icon */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative group max-w-[240px] sm:max-w-[280px] w-full">
              
              {/* Outer Amber/Cyan Glow Aura */}
              <div className="absolute -inset-1 rounded-[38px] bg-gradient-to-r from-amber-500 via-yellow-500 to-cyan-500 opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

              {/* Game Icon Box */}
              <div className="relative rounded-[32px] overflow-hidden bg-slate-950 border-4 border-amber-400/90 shadow-[0_0_40px_rgba(234,179,8,0.5)] aspect-square p-3 flex items-center justify-center">
                <img
                  src="/tictactoe_game_icon.png"
                  alt="Tic Tac Toe GenZ Multiplayer Official Game Icon"
                  className="w-full h-full object-contain rounded-[24px] drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Title, Ratings, Developer, CTAs */}
          <div className="lg:col-span-8 space-y-5 text-left">
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-cyan-500/20 border border-yellow-500/40 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.25)]">
              <Gamepad2 className="w-4 h-4 text-yellow-400 animate-bounce" />
              <span className="text-xs font-bold text-yellow-300 tracking-wider uppercase">
                OFFICIAL GAME LANDING PAGE • EDP UNIVERSE
              </span>
            </div>

            <div>
              <h1 className="font-['Creato_Display'] text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Tic Tac Toe: <span className="text-gradient">GenZ Multiplayer</span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm">
                <span className="text-cyan-300 font-bold">EDP Universe</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">Game Development Team</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>4.9★ (1.2K Reviews)</span>
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              The ultimate GenZ puzzle strategy game! Explore 100 authentic Feni villages, scale from 3x3 up to 12x12 boards, unlock arcade avatars & conquer the Minimax AI engine. Developed by the <strong className="text-cyan-300 font-bold">EDP Universe</strong> team.
            </p>

            {/* Action Buttons Group */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href={apkDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all border border-emerald-300"
              >
                <Download className="w-5 h-5 fill-current" />
                <span>Download APK (v1.0.1 for Android)</span>
              </a>

              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button-secondary text-sm py-3.5 px-5 justify-center"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub Repository</span>
              </a>

              <button
                onClick={handleShare}
                className="px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors flex items-center justify-center gap-2 text-sm font-bold"
              >
                {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-cyan-400" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Page'}</span>
              </button>
            </div>

            {/* Test Release Notice */}
            <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-yellow-500/30 text-yellow-300/90 px-3.5 py-1.5 rounded-xl text-xs font-medium">
              <ShieldAlert className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>🧪 <strong>First Test Release (v1.0.1)</strong>: Uploaded on GitHub for testing & developer feedback (Under Active Construction).</span>
            </div>

          </div>

        </section>

        {/* Screenshots Showcase Carousel & Lightbox */}
        <section className="max-w-7xl mx-auto space-y-6 text-left border-t border-slate-800/80 pt-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="neon-badge text-[10px]">GAMEPLAY SHOWCASE</span>
              <h2 className="font-['Creato_Display'] text-2xl sm:text-3xl font-extrabold text-white pt-1">
                Game Screenshots & UI Preview
              </h2>
            </div>

            {/* Screenshot Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {gameScreenshots.map((screen, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                    activeSlide === idx
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {screen.title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Phone Slider Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative max-w-[280px] sm:max-w-[310px] w-full rounded-[38px] p-3 bg-gradient-to-b from-yellow-400/40 via-cyan-500/30 to-purple-600/40 shadow-[0_0_40px_rgba(0,243,255,0.3)] border border-cyan-400/50 group">
                <div className="relative rounded-[30px] overflow-hidden bg-slate-950 aspect-[9/18.5] shadow-2xl border-2 border-slate-900">
                  
                  {/* Phone Speaker Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-b-xl z-20 flex items-center justify-center">
                    <div className="w-8 h-1 bg-slate-800 rounded-full" />
                  </div>

                  <img
                    src={gameScreenshots[activeSlide].url}
                    alt={gameScreenshots[activeSlide].title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 z-10 space-y-1">
                    <span className="neon-badge text-[9px] border-amber-400 text-amber-300">
                      {gameScreenshots[activeSlide].badge}
                    </span>
                    <h4 className="font-bold text-white text-xs font-['Creato_Display']">
                      {gameScreenshots[activeSlide].title}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      {gameScreenshots[activeSlide].subtitle}
                    </p>
                  </div>

                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-4 pt-3">
                <button
                  onClick={() => setActiveSlide((prev) => (prev - 1 + gameScreenshots.length) % gameScreenshots.length)}
                  className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <span className="text-xs font-bold text-cyan-300">
                  {activeSlide + 1} / {gameScreenshots.length}
                </span>

                <button
                  onClick={() => setActiveSlide((prev) => (prev + 1) % gameScreenshots.length)}
                  className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Screenshots Grid View */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {gameScreenshots.map((screen, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(screen)}
                  className="relative aspect-[9/18] rounded-2xl overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-400 shadow-xl cursor-pointer group transition-all duration-300 hover:scale-105 bg-slate-950"
                >
                  <img src={screen.url} alt={screen.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-bold text-cyan-300 bg-slate-900/90 px-3 py-1.5 rounded-full border border-cyan-400">
                      🔍 Expand
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </section>

        {/* Detailed Game Features & Mechanics Grid */}
        <section className="max-w-7xl mx-auto space-y-6 text-left border-t border-slate-800/80 pt-10">
          <div>
            <span className="neon-badge text-[10px]">GAME MECHANICS & FEATURES</span>
            <h2 className="font-['Creato_Display'] text-2xl sm:text-3xl font-extrabold text-white pt-1">
              Everything You Need to Know
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="neon-card p-5 border-yellow-500/30 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base font-['Creato_Display']">100 Feni Villages Map</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Explore 100 authentic local villages on an interactive campaign map including Betagaon, Madhuai, Sundarpur & Maruar Char.
              </p>
            </div>

            <div className="neon-card p-5 border-cyan-500/30 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base font-['Creato_Display']">3x3 to 12x12 Boards</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Scale board sizes dynamically from standard 3x3 up to massive 12x12 grid battlegrounds against unbeatable Minimax AI.
              </p>
            </div>

            <div className="neon-card p-5 border-purple-500/30 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base font-['Creato_Display']">Profile Hub & Avatars</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Unlock arcade avatars (Tiger, Robot, Alien, Dragon), track win rates, total matches & customize audio settings.
              </p>
            </div>

            <div className="neon-card p-5 border-blue-500/30 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base font-['Creato_Display']">EDP Universe Team</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Engineered by EDP Universe Game Development Team as a premier GenZ multiplayer puzzle experience.
              </p>
            </div>

          </div>

        </section>

      </main>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-sm w-full bg-slate-950 rounded-3xl p-2 border border-cyan-400/50 shadow-2xl">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-cyan-500 text-black font-bold shadow-lg hover:scale-110 transition-transform z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={lightboxImage.url} alt={lightboxImage.title} className="w-full h-auto rounded-2xl max-h-[80vh] object-contain" />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer onOpenEstimator={onOpenEstimator} />

    </div>
  );
}
