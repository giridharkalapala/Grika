import React from 'react';
import { Scissors, Sparkles, FolderHeart, Ruler, RefreshCw, Layers } from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  unit, 
  setUnit, 
  savedCount = 0, 
  onOpenSaved,
  onReset 
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-purple-500/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/25">
            <div className="w-full h-full bg-[#0d111d] rounded-[10px] flex items-center justify-center group-hover:bg-opacity-80 transition-colors">
              <Scissors className="w-5 h-5 text-cyan-400 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-wider text-white">
                STITCH<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">CRAFT</span>
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                AI v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Inspo-to-Tailor Blueprint Studio
            </p>
          </div>
        </div>

        {/* Center Nav tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121829]/80 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'explore'
                ? 'bg-purple-600/30 text-white border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Trending Inspo
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'upload'
                ? 'bg-purple-600/30 text-white border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Upload & Scan
          </button>
          <button
            onClick={() => setActiveTab('measure')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'measure'
                ? 'bg-purple-600/30 text-white border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sizing Studio
          </button>
          <button
            onClick={() => setActiveTab('recipe')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'recipe'
                ? 'bg-gradient-to-r from-purple-600/40 to-cyan-500/40 text-cyan-200 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Recipe Card
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Unit Toggle: IN vs CM */}
          <div className="flex items-center bg-[#131929] border border-white/10 rounded-lg p-0.5 text-xs font-mono">
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                unit === 'cm'
                  ? 'bg-purple-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                unit === 'in'
                  ? 'bg-purple-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              IN
            </button>
          </div>

          {/* Saved Projects Button */}
          <button
            onClick={onOpenSaved}
            className="relative p-2 rounded-lg bg-[#131929] hover:bg-[#1a233a] border border-white/10 text-slate-300 hover:text-white transition-all"
            title="Saved Blueprints"
          >
            <FolderHeart className="w-4 h-4 text-purple-400" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-[#0c0f17] text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {savedCount}
              </span>
            )}
          </button>

          {/* New Scan CTA */}
          <button
            onClick={() => setActiveTab('upload')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-medium shadow-md shadow-purple-600/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Scan Inspo</span>
          </button>
        </div>

      </div>
    </header>
  );
};

