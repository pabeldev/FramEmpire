import React, { useState } from 'react';
import { Download, Github, Gamepad2, Star, ShieldAlert, MapPin, Cpu, UserCheck, Award, X, Sparkles } from 'lucide-react';

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
    <section id="game-feature" className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center py-8 lg:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070913] via-[#0b0e21] to-[#070913] border-t border-cyan-500/30 overflow-hidden">
      
      {/* Background Neon Glow Orbs */}
      <div className="glow-orb-cyan top-1/4 -left-20 animate-pulse-glow" />
      <div className="glow-orb-blue bottom-10 -right-20 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto w-full space-y-6 sm:space-y-8 relative z-10">
        
        {/* Top Compact 16:9 Showcase Header (Left Info & Right Icon) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Side: Game Title, Developer, Rating, Download Buttons */}
          <div className="md:col-span-8 space-y-3 sm:space-y-4 text-left">
            
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-cyan-500/20 border border-yellow-500/40 px-3.5 py-1 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.2)]">
              <Gamepad2 className="w-3.5 h-3.5 text-yellow-400 animate-bounce" />
              <span className="text-[11px] font-bold text-yellow-300 tracking-wider uppercase">
                FEATURED MOBILE GAME • EDP UNIVERSE
              </span>
            </div>

            {/* Main Game Title */}
            <div>
              <h2 className="font-['Creato_Display'] text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Tic Tac Toe: <span className="text-gradient">GenZ Multiplayer</span>
              </h2>
              
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-cyan-300 font-bold">EDP Universe</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">Game Development Team</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.9★ (1.2K Reviews)</span>
                </span>
              </div>
            </div>

            {/* Action Buttons Group + Test Notice */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              
              {/* Direct APK Download Button */}
              <a
                href={apkDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all border border-emerald-300"
              >
                <Download className="w-4 h-4 fill-current" />
                <span>Download APK (Android v1.0.1)</span>
              </a>

              {/* GitHub Developer Link */}
              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button-secondary text-xs py-2.5 sm:py-3 px-4 justify-center"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub Repository</span>
              </a>

              {/* Test Release Notice Badge */}
              <span className="inline-flex items-center gap-1.5 bg-slate-900/90 border border-yellow-500/30 text-yellow-300 text-[10px] sm:text-[11px] px-3 py-1.5 rounded-lg font-medium">
                <ShieldAlert className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>🧪 Test Release (v1.0.1) by EDP Universe</span>
              </span>

            </div>

          </div>

          {/* Right Side: Official Game Icon */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative group max-w-[150px] sm:max-w-[190px] lg:max-w-[210px] w-full">
              
              {/* Outer Glow Aura */}
              <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-amber-500 via-yellow-500 to-cyan-500 opacity-60 blur-lg group-hover:opacity-100 transition-opacity duration-500" />

              {/* Game Icon Box */}
              <div className="relative rounded-[26px] overflow-hidden bg-slate-950/90 border-3 border-amber-400/90 shadow-[0_0_30px_rgba(234,179,8,0.4)] aspect-square p-2 flex items-center justify-center">
                <img
                  src="/tictactoe_game_icon.png"
                  alt="Tic Tac Toe GenZ Multiplayer Official Game Icon"
                  className="w-full h-full object-contain rounded-[18px] drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Compact 16:9 Row: Screenshots Gallery (Left) + About Game & Features (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2 border-t border-slate-800/80">
          
          {/* Left: Compact Horizontal Screenshots Gallery */}
          <div className="lg:col-span-6 space-y-2 text-left">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Gameplay Screenshots</span>
              </span>
              <span className="text-[10px] text-slate-400">Click to expand preview</span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1 custom-scrollbar no-scrollbar">
              {gameScreenshots.map((screen, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(screen)}
                  className="relative flex-none w-[110px] sm:w-[135px] aspect-[9/18] rounded-xl overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-400 shadow-md cursor-pointer group transition-all duration-300 hover:scale-105 bg-slate-950"
                >
                  <img
                    src={screen.url}
                    alt={screen.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-bold text-cyan-300 bg-slate-900/90 px-2 py-1 rounded-full border border-cyan-400">
                      🔍 Expand
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Compact Game Specs & Highlights */}
          <div className="lg:col-span-6 space-y-3 text-left">
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Explore <strong className="text-cyan-300">100 authentic Feni villages</strong> on an interactive campaign map, scale boards from <strong className="text-amber-300">3x3 to 12x12</strong>, unlock arcade avatars (Tiger, Robot, Alien, Dragon) & conquer the Minimax AI engine!
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="neon-card p-2.5 border-yellow-500/30 space-y-0.5">
                <div className="flex items-center gap-1.5 text-yellow-400 font-bold text-[11px]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>100 Feni Villages</span>
                </div>
                <p className="text-slate-400 text-[10px] leading-tight">Betagaon, Madhuai, Sundarpur campaign.</p>
              </div>

              <div className="neon-card p-2.5 border-cyan-500/30 space-y-0.5">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>3x3 to 12x12 Boards</span>
                </div>
                <p className="text-slate-400 text-[10px] leading-tight">Unbeatable Minimax AI logic engine.</p>
              </div>

              <div className="neon-card p-2.5 border-purple-500/30 space-y-0.5">
                <div className="flex items-center gap-1.5 text-purple-400 font-bold text-[11px]">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Profile Hub & Avatars</span>
                </div>
                <p className="text-slate-400 text-[10px] leading-tight">Unlock avatars & win rate metrics.</p>
              </div>

              <div className="neon-card p-2.5 border-blue-500/30 space-y-0.5">
                <div className="flex items-center gap-1.5 text-blue-400 font-bold text-[11px]">
                  <Award className="w-3.5 h-3.5" />
                  <span>EDP Universe Studio</span>
                </div>
                <p className="text-slate-400 text-[10px] leading-tight">GenZ multiplayer game release.</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal for Screenshot Zoom */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-xs w-full bg-slate-950 rounded-3xl p-2 border border-cyan-400/50 shadow-2xl">
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
