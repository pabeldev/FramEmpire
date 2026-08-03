import React, { useState } from 'react';
import { Download, Github, Gamepad2, Sparkles, Smartphone, ShieldAlert, Award, MapPin, Cpu, UserCheck } from 'lucide-react';

export default function FeaturedGameSection() {
  const [activeScreen, setActiveScreen] = useState(0);

  const gameScreenshots = [
    {
      url: '/game_ss1.png',
      title: 'Game Start & Custom Boards',
      desc: '3x3 to 12x12 boards powered by Minimax AI engine.'
    },
    {
      url: '/game_ss2.png',
      title: '100 Authentic Feni Villages Map',
      desc: 'Progress through Betagaon, Madhuai, Sundarpur & more.'
    },
    {
      url: '/game_ss3.png',
      title: 'Player Profile Hub & Metrics',
      desc: 'Custom arcade avatars, win rate tracking & audio settings.'
    }
  ];

  const apkDownloadUrl = 'https://github.com/pabeldev/feni-brain-arcade/raw/main/TicTacToe-GenZ-Multiplayer-v1.0.1.apk';
  const githubRepoUrl = 'https://github.com/pabeldev/feni-brain-arcade';

  return (
    <section id="game-feature" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-[#070913] via-[#0b0e21] to-[#070913] border-t border-cyan-500/30 overflow-hidden">
      
      {/* Background Neon Orbs */}
      <div className="glow-orb-cyan top-1/4 -left-20 animate-pulse-glow" />
      <div className="glow-orb-blue bottom-10 -right-20 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Top Header Badge & Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-cyan-500/20 border border-yellow-500/40 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.25)]">
            <Gamepad2 className="w-4 h-4 text-yellow-400 animate-bounce" />
            <span className="text-xs font-bold text-yellow-300 tracking-wider uppercase">
              FEATURED MOBILE GAME • BY EDP UNIVERSE
            </span>
          </div>

          <h2 className="font-['Creato_Display'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Tic Tac Toe: <span className="text-gradient">GenZ Multiplayer</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Explore 100 authentic Feni villages, scale from 3x3 to 12x12 boards, unlock arcade avatars & conquer the Minimax AI engine. Developed by the <strong className="text-cyan-300 font-bold">EDP Universe</strong> Game Development Team!
          </p>

          {/* Early Access Notice Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-yellow-500/30 text-yellow-300/90 px-3.5 py-1.5 rounded-xl text-xs font-medium max-w-lg mx-auto">
            <ShieldAlert className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>🧪 <strong>Test Release (v1.0.1)</strong>: First upload on GitHub for testing & developer feedback.</span>
          </div>

        </div>

        {/* Play Store Style Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Phone Screenshot Display */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="relative mx-auto max-w-[300px] sm:max-w-[320px] rounded-[38px] p-3 bg-gradient-to-b from-yellow-400/40 via-cyan-500/30 to-purple-600/40 shadow-[0_0_40px_rgba(0,243,255,0.3)] border border-cyan-400/50">
              <div className="relative rounded-[30px] overflow-hidden bg-slate-950 aspect-[9/18.5] shadow-2xl border-2 border-slate-900">
                
                {/* Phone Speaker Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-8 h-1 bg-slate-800 rounded-full" />
                </div>

                <img
                  src={gameScreenshots[activeScreen].url}
                  alt={gameScreenshots[activeScreen].title}
                  className="w-full h-full object-cover transition-all duration-500"
                />

                {/* Screenshot Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-left z-10">
                  <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider block">
                    Screen {activeScreen + 1} of 3
                  </span>
                  <h4 className="font-bold text-white text-xs font-['Creato_Display']">
                    {gameScreenshots[activeScreen].title}
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    {gameScreenshots[activeScreen].desc}
                  </p>
                </div>

              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex justify-center gap-3 pt-2">
              {gameScreenshots.map((screen, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveScreen(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    activeScreen === idx
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,243,255,0.3)]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Screen {idx + 1}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Game Features & Download CTA Buttons */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              <div className="neon-card p-4 border-yellow-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs">
                  <MapPin className="w-4 h-4" />
                  <span>100 Feni Villages Map</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Conquer 100 authentic local villages including Betagaon, Madhuai, Maruar Char & Sundarpur.
                </p>
              </div>

              <div className="neon-card p-4 border-cyan-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <Cpu className="w-4 h-4" />
                  <span>Unbeatable Minimax AI</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Scale board sizes dynamically from standard 3x3 up to massive 12x12 grid battlegrounds.
                </p>
              </div>

              <div className="neon-card p-4 border-purple-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                  <UserCheck className="w-4 h-4" />
                  <span>Profile Hub & Avatars</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Unlock arcade avatars (Tiger, Robot, Alien, Dragon) & track win rates, matches and playtime.
                </p>
              </div>

              <div className="neon-card p-4 border-blue-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <Award className="w-4 h-4" />
                  <span>EDP Universe Studio</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Engineered by EDP Universe Game Development Team as a premier GenZ multiplayer arcade experience.
                </p>
              </div>

            </div>

            {/* Action Buttons Group */}
            <div className="pt-3 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                
                {/* Download Android APK Button */}
                <a
                  href={apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all duration-300 border border-emerald-300"
                >
                  <Download className="w-5 h-5 fill-current" />
                  <span>Download APK (v1.0.1 for Android)</span>
                </a>

                {/* GitHub Developers Link */}
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

              <p className="text-[11px] text-slate-400 italic">
                * Note: Free APK download available for Android devices. Source code & updates hosted on GitHub for developers.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
