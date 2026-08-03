import React from 'react';
import { Download, Github, Gamepad2, Star, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedGameSection({ onOpenGameDetails }) {
  const apkDownloadUrl = 'https://github.com/pabeldev/feni-brain-arcade/raw/main/TicTacToe-GenZ-Multiplayer-v1.0.1.apk';
  const githubRepoUrl = 'https://github.com/pabeldev/feni-brain-arcade';

  return (
    <section id="game-feature" className="relative min-h-[85vh] flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070913] via-[#0b0e21] to-[#070913] border-t border-cyan-500/30 overflow-hidden">
      
      {/* Background Neon Glow Orbs */}
      <div className="glow-orb-cyan top-1/4 -left-20 animate-pulse-glow" />
      <div className="glow-orb-blue bottom-10 -right-20 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Single Section Clean Feature Card (Icon Left, Details Right) */}
        <div className="neon-card p-6 sm:p-8 lg:p-10 border-yellow-500/40 relative overflow-hidden bg-slate-950/80 backdrop-blur-xl shadow-[0_0_35px_rgba(0,243,255,0.15)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Official 3D Game Icon */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group max-w-[200px] sm:max-w-[230px] w-full">
                
                {/* Outer Ambient Glow */}
                <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-amber-500 via-yellow-500 to-cyan-500 opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

                {/* Game Icon Container */}
                <div className="relative rounded-[28px] overflow-hidden bg-slate-950/90 border-4 border-amber-400/90 shadow-[0_0_30px_rgba(234,179,8,0.5)] aspect-square p-2.5 flex items-center justify-center">
                  <img
                    src="/tictactoe_game_icon.png"
                    alt="Tic Tac Toe GenZ Multiplayer Official Game Icon"
                    className="w-full h-full object-contain rounded-[20px] drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

              </div>
            </div>

            {/* Right Column: Title, Studio Info, Download CTAs & See Game Details Link */}
            <div className="lg:col-span-8 space-y-4 text-left">
              
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-cyan-500/20 border border-yellow-500/40 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <Gamepad2 className="w-4 h-4 text-yellow-400 animate-bounce" />
                <span className="text-xs font-bold text-yellow-300 tracking-wider uppercase">
                  FEATURED MOBILE GAME • EDP UNIVERSE
                </span>
              </div>

              {/* Title & Studio Credit */}
              <div>
                <h2 className="font-['Creato_Display'] text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Tic Tac Toe: <span className="text-gradient">GenZ Multiplayer</span>
                </h2>
                
                <div className="flex flex-wrap items-center gap-2.5 pt-1.5 text-xs sm:text-sm">
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

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Explore 100 authentic Feni villages, scale from 3x3 to 12x12 boards, unlock arcade avatars & conquer the Minimax AI engine. Developed by <strong className="text-cyan-300 font-bold">EDP Universe</strong> team.
              </p>

              {/* Action Buttons Group */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                
                {/* Download Android APK Button */}
                <a
                  href={apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all border border-emerald-300"
                >
                  <Download className="w-4 h-4 fill-current" />
                  <span>Download APK (Android v1.0.1)</span>
                </a>

                {/* GitHub Developer Link */}
                <a
                  href={githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-button-secondary text-xs py-3 px-4 justify-center"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub Repo</span>
                </a>

                {/* PROMINENT "See Game Details & Gameplay Showcase" Button */}
                <button
                  onClick={onOpenGameDetails}
                  className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 border border-cyan-400/60 font-bold text-xs sm:text-sm py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,243,255,0.25)] transition-all group"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>See Game Details & Gameplay Showcase</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

              {/* Test Release Notice */}
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 bg-slate-900/90 border border-yellow-500/30 text-yellow-300 text-[10px] sm:text-[11px] px-3 py-1 rounded-lg font-medium">
                  <ShieldAlert className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span>🧪 <strong>First Test Release (v1.0.1)</strong>: Uploaded on GitHub by EDP Universe Team (Under Active Construction).</span>
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
