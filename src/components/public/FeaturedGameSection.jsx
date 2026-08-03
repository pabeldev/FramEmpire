import React, { useState } from 'react';
import { Download, Github, Gamepad2, Star, ShieldAlert, MapPin, Cpu, UserCheck, Award, X, Sparkles, ExternalLink } from 'lucide-react';

export default function FeaturedGameSection() {
  const [lightboxImage, setLightboxImage] = useState(null);

  const gameScreenshots = [
    {
      url: '/game_ss1.png',
      alt: 'Tic Tac Toe GenZ Multiplayer - Start Screen & Board Engine'
    },
    {
      url: '/game_ss2.png',
      alt: 'Tic Tac Toe GenZ Multiplayer - 100 Authentic Feni Villages Map'
    },
    {
      url: '/game_ss3.png',
      alt: 'Tic Tac Toe GenZ Multiplayer - Player Profile Hub & Metrics'
    }
  ];

  const apkDownloadUrl = 'https://github.com/pabeldev/feni-brain-arcade/raw/main/TicTacToe-GenZ-Multiplayer-v1.0.1.apk';
  const githubRepoUrl = 'https://github.com/pabeldev/feni-brain-arcade';

  return (
    <section id="game-feature" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-[#070913] via-[#0b0e21] to-[#070913] border-t border-cyan-500/30 overflow-hidden">
      
      {/* Background Neon Glow Orbs */}
      <div className="glow-orb-cyan top-1/4 -left-20 animate-pulse-glow" />
      <div className="glow-orb-blue bottom-10 -right-20 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        
        {/* Play Store Style Header Section (Title & Details Left, Game Icon Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-cyan-500/20 pb-10">
          
          {/* Left Side: Game Title, Developer, Ratings, Buttons */}
          <div className="md:col-span-8 space-y-5 text-left">
            
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-cyan-500/20 border border-yellow-500/40 px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.25)]">
              <Gamepad2 className="w-4 h-4 text-yellow-400 animate-bounce" />
              <span className="text-xs font-bold text-yellow-300 tracking-wider uppercase">
                FEATURED GAME RELEASE • EDP UNIVERSE
              </span>
            </div>

            {/* Main Game Title */}
            <div>
              <h2 className="font-['Creato_Display'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Tic Tac Toe: <span className="text-gradient">GenZ Multiplayer</span>
              </h2>
              
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm">
                <span className="text-cyan-300 font-bold hover:underline">EDP Universe</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Game Development Team</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold">Contains Minimax AI Engine</span>
              </div>
            </div>

            {/* Quick Metrics Bar (Play Store Style Ratings) */}
            <div className="flex items-center gap-6 py-2 border-y border-slate-800/80 max-w-md">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <p className="text-[11px] text-slate-400">1.2K Reviews</p>
              </div>

              <div className="h-7 w-px bg-slate-800" />

              <div className="space-y-0.5">
                <p className="font-extrabold text-white text-sm">100 Villages</p>
                <p className="text-[11px] text-slate-400">Feni Map Campaign</p>
              </div>

              <div className="h-7 w-px bg-slate-800" />

              <div className="space-y-0.5">
                <p className="font-extrabold text-cyan-400 text-sm">Android APK</p>
                <p className="text-[11px] text-slate-400">v1.0.1 Download</p>
              </div>
            </div>

            {/* Action Buttons Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              {/* Direct APK Download Button */}
              <a
                href={apkDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all duration-300 border border-emerald-300"
              >
                <Download className="w-5 h-5 fill-current" />
                <span>Download APK (Android v1.0.1)</span>
              </a>

              {/* GitHub Developer Link */}
              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button-secondary text-sm py-3.5 px-5 justify-center"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub Repository</span>
              </a>
            </div>

            {/* Test Release Notice */}
            <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-yellow-500/30 text-yellow-300/90 px-3.5 py-1.5 rounded-xl text-xs font-medium">
              <ShieldAlert className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>🧪 <strong>First Test Release</strong>: Uploaded on GitHub for testing & developer feedback (Under Active Construction).</span>
            </div>

          </div>

          {/* Right Side: Official Game Icon (Play Store Banner Style) */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative group max-w-[240px] sm:max-w-[280px] w-full">
              
              {/* Outer Amber/Cyan Glow Aura */}
              <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-r from-amber-500 via-yellow-500 to-cyan-500 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500" />

              {/* Game Icon Box */}
              <div className="relative rounded-[32px] overflow-hidden bg-slate-950/80 border-4 border-amber-400/90 shadow-[0_0_40px_rgba(234,179,8,0.45)] aspect-square p-3 flex items-center justify-center">
                <img
                  src="/tictactoe_game_icon.png"
                  alt="Tic Tac Toe GenZ Multiplayer Official Game Icon"
                  className="w-full h-full object-contain rounded-[22px] drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

            </div>
          </div>

        </div>

        {/* Play Store Style Horizontal Screenshot Gallery Strip */}
        <div className="space-y-4 text-left">
          
          <div className="flex items-center justify-between">
            <h3 className="font-['Creato_Display'] text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Gameplay & Feature Screenshots</span>
            </h3>
            <span className="text-xs text-slate-400">Click any screenshot to expand</span>
          </div>

          {/* Screenshots Gallery Scroll */}
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 custom-scrollbar no-scrollbar scroll-smooth">
            {gameScreenshots.map((screen, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImage(screen)}
                className="relative flex-none w-[200px] sm:w-[240px] aspect-[9/19] rounded-2xl overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-pointer group transition-all duration-300 hover:scale-[1.03] bg-slate-950"
              >
                <img
                  src={screen.url}
                  alt={screen.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Hover Dark Vignette & Magnify Icon */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-cyan-500/80 text-black font-bold text-xs shadow-lg">
                    🔍 View Full
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* "About this game" & Key Highlights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left pt-4">
          
          {/* About Game Description */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-['Creato_Display'] text-xl font-bold text-white">
                About this game
              </h3>
              <span className="neon-badge text-[9px]">EDP UNIVERSE</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              If you are a fan of Tic Tac Toe, prepare for a revolutionary GenZ multiplayer experience! Built with an unbeatable Minimax AI engine and dynamic grid expansion from standard 3x3 up to 12x12 boards, this game takes traditional puzzle strategy to a whole new level.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed">
              Journey across <strong className="text-cyan-300">100 authentic Feni villages</strong> on an interactive campaign map, unlock arcade avatars (Tiger, Robot, Alien, Dragon), customize audio tracks, and track your win rate metrics in your personal Player Profile Hub!
            </p>
          </div>

          {/* Key Feature Badges Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <div className="neon-card p-3.5 border-yellow-500/30 space-y-1">
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs">
                <MapPin className="w-4 h-4" />
                <span>100 Feni Villages</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-snug">
                Betagaon, Madhuai, Sundarpur, Maruar Char & local campaign levels.
              </p>
            </div>

            <div className="neon-card p-3.5 border-cyan-500/30 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Cpu className="w-4 h-4" />
                <span>3x3 to 12x12 Boards</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-snug">
                Powered by unbeatable Minimax AI & multi-board logic.
              </p>
            </div>

            <div className="neon-card p-3.5 border-purple-500/30 space-y-1">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                <UserCheck className="w-4 h-4" />
                <span>Arcade Profile Hub</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-snug">
                Unlock 8+ arcade avatars, track win rates & gameplay metrics.
              </p>
            </div>

            <div className="neon-card p-3.5 border-blue-500/30 space-y-1">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                <Award className="w-4 h-4" />
                <span>EDP Universe Team</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-snug">
                Designed & engineered by EDP Universe Game Development Team.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal for Screenshot Zoom */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-sm w-full bg-slate-950 rounded-3xl p-2 border border-cyan-400/50 shadow-2xl">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-cyan-500 text-black font-bold shadow-lg hover:scale-110 transition-transform z-10"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage.url}
              alt={lightboxImage.alt}
              className="w-full h-auto rounded-2xl max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

    </section>
  );
}
