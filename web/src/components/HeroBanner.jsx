import React from 'react';
import { Sparkles, ArrowRight, UploadCloud, Layers, Cpu, Compass, CheckCircle2 } from 'lucide-react';

export const HeroBanner = ({ onStartUpload, onExploreTrending }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-white/5">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Pill */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mono backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold text-cyan-300">GEN Z STREETWEAR ARCHIVE</span>
            <span className="text-slate-400">|</span>
            <span>Zero Guesswork Custom Tailoring</span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Turn Pinterest & TikTok Fit Inspo into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Tailor-Ready Blueprints
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Upload any photo of a vintage tee, boxy shirt, or cargo silhouette. StitchCraft's AI deconstructs the seam geometry, estimates fabric yield, and generates a printable <span className="text-cyan-300 font-semibold">Tech-Pack Recipe Card</span> tailored to your exact measurements.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartUpload}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <UploadCloud className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Upload Inspo Photo</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreTrending}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#141b2e] hover:bg-[#1a233b] border border-white/10 hover:border-purple-500/30 text-slate-200 font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Browse 6 Trending Fits</span>
          </button>
        </div>

        {/* Feature Badges Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="glass-panel p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">AI Vision Scan</p>
              <p className="text-[11px] text-slate-400 font-mono">Silhouette & Seams</p>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Pattern Blocks</p>
              <p className="text-[11px] text-slate-400 font-mono">Front, Back, Sleeves</p>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Custom Scaling</p>
              <p className="text-[11px] text-slate-400 font-mono">CM & Inch Auto-Ease</p>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Share via WhatsApp</p>
              <p className="text-[11px] text-slate-400 font-mono">Instant Tailor Spec</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

