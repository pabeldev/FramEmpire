import React from 'react';
import { Sparkles, Flame, Eye, Film, Layers, Zap, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutSection({ onOpenEstimator }) {
  return (
    <section id="about" className="py-24 px-4 relative bg-[#070913] border-t border-cyan-500/20 overflow-hidden">
      {/* Background Radial Glow Orbs */}
      <div className="glow-orb-cyan top-10 -right-20 animate-pulse-glow" />
      <div className="glow-orb-blue bottom-10 -left-20 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Top Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-cyan-950/80 border border-cyan-400/40 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.25)]">
            <Flame className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
              A REVOLUTION OF ANIMATION
            </span>
          </div>

          <h2 className="font-['Creato_Display'] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient">FramEmpire</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            FramEmpire stands at the forefront of a new era in animation, transforming the way we experience visual storytelling.
          </p>
        </div>

        {/* 4 Eye-Catching Animated Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Visual Storytelling */}
          <div className="neon-card p-8 border-cyan-500/30 hover:border-cyan-400 relative overflow-hidden group space-y-4 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            
            <h3 className="font-['Creato_Display'] text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              Next-Era Visual Storytelling
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              FramEmpire stands at the forefront of a new era in animation, transforming the way we experience visual storytelling. As a revolutionary force in the animation industry, we blend creativity with cutting-edge technology to craft mesmerizing animations that captivate and inspire.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cutting-Edge Animation Tech</span>
            </div>
          </div>

          {/* Card 2: Emotion & Precision */}
          <div className="neon-card p-8 border-blue-500/30 hover:border-blue-400 relative overflow-hidden group space-y-4 shadow-[0_0_30px_rgba(0,102,255,0.1)]">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            
            <h3 className="font-['Creato_Display'] text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              Pushing Boundaries & Evoking Emotion
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              At FramEmpire, we believe in pushing boundaries and redefining the limits of what’s possible. We take pride in creating dynamic, high-quality animations that not only tell stories but evoke emotions, leaving an indelible mark on audiences. Whether it’s 2D or 3D, motion graphics or visual effects, we bring every frame to life with precision and passion.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-blue-400">
              <Layers className="w-4 h-4" />
              <span>2D, 3D, Motion & VFX Precision</span>
            </div>
          </div>

          {/* Card 3: The Movement */}
          <div className="neon-card p-8 border-purple-500/30 hover:border-purple-400 relative overflow-hidden group space-y-4 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Film className="w-6 h-6" />
            </div>
            
            <h3 className="font-['Creato_Display'] text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              More Than a Studio – A Movement
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              Our approach is centered on innovation, always exploring new techniques and ideas to elevate the art of animation. With a team of talented artists, designers, and storytellers, FramEmpire is not just an animation studio – it's a movement. A movement that is revolutionizing the animation industry by combining art, technology, and imagination in ways never seen before.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-purple-400">
              <Award className="w-4 h-4" />
              <span>Art, Tech & Imagination Fusion</span>
            </div>
          </div>

          {/* Card 4: Lasting Impact */}
          <div className="neon-card p-8 border-cyan-400/30 hover:border-cyan-300 relative overflow-hidden group space-y-4 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 border border-cyan-300 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            
            <h3 className="font-['Creato_Display'] text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
              Creators of Visually Stunning Experiences
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              We are more than just a service provider; we are creators of powerful, visually stunning experiences that make a lasting impact. Join us in this revolutionary journey, where every frame tells a story, and every story moves with purpose.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-cyan-300">
              <Sparkles className="w-4 h-4" />
              <span>Every Frame Moves With Purpose</span>
            </div>
          </div>

        </div>

        {/* Highlight Quote Banner Card */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-cyan-950/90 via-blue-950/80 to-purple-950/90 border border-cyan-400/50 shadow-[0_0_50px_rgba(0,243,255,0.3)] text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,243,255,0.6)] animate-pulse">
            <Flame className="w-8 h-8" />
          </div>

          <h3 className="font-['Creato_Display'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wide leading-snug">
            "Welcome to FramEmpire – where animation is not just seen, it’s felt."
          </h3>

          <div className="pt-2">
            <button
              onClick={onOpenEstimator}
              className="neon-button-primary py-3 px-8 text-sm"
            >
              <span>Join the Revolution • Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
