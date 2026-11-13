import React, { useState } from 'react';
import { TRENDING_GARMENTS } from '../data/trendingGarments';
import { Sparkles, ArrowRight, Tag, Sliders, Scissors, Layers, Check } from 'lucide-react';

export const TrendingInspiration = ({ onSelectGarment, currentSelectedId }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'T-Shirt', 'Shirt', 'Pants', 'Hoodie', 'Jacket'];

  const filteredGarments = selectedCategory === 'All'
    ? TRENDING_GARMENTS
    : TRENDING_GARMENTS.filter(g => g.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header and Filter pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-purple-500/20 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Curated Streetwear Inspo Archive
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Select a viral silhouette to preview instant AI blueprint breakdown or upload your own below.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-[#141b2d] hover:bg-[#1a233b] text-slate-300 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Garments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGarments.map((garment) => {
          const isSelected = currentSelectedId === garment.id;

          return (
            <div
              key={garment.id}
              className={`group relative rounded-2xl overflow-hidden glass-panel transition-all duration-300 flex flex-col ${
                isSelected
                  ? 'ring-2 ring-cyan-400 border-transparent shadow-xl shadow-cyan-500/10'
                  : 'hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5'
              }`}
            >
              {/* Image & Overlay Badges */}
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={garment.image}
                  alt={garment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d111d] via-[#0d111d]/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {garment.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-purple-500/80 text-white font-medium">
                    {garment.category}
                  </span>
                </div>

                {/* Aesthetic label bottom left */}
                <div className="absolute bottom-3 left-3">
                  <p className="text-[11px] font-mono text-purple-300 bg-purple-950/70 px-2 py-0.5 rounded border border-purple-500/20 backdrop-blur-sm">
                    {garment.aesthetic}
                  </p>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {garment.name}
                  </h3>

                  {/* Detected key attributes */}
                  <div className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Fit Silhouette:</span>
                      <span className="font-medium text-slate-200">{garment.detectedAttributes.fitStyle}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Collar / Neck:</span>
                      <span className="font-medium text-slate-200">{garment.detectedAttributes.collarType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Est. Fabric:</span>
                      <span className="font-mono text-cyan-400 font-semibold">{garment.detectedAttributes.estimatedFabricMeters} m ({garment.detectedAttributes.estimatedFabricYards} yd)</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {garment.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-5 pt-3 border-t border-white/10">
                  <button
                    onClick={() => onSelectGarment(garment)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                        : 'bg-[#182035] hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 text-white border border-white/10'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Active Silhouette Selected</span>
                      </>
                    ) : (
                      <>
                        <Scissors className="w-3.5 h-3.5 text-purple-400" />
                        <span>Load & Generate Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-70 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

