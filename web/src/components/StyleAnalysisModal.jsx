import React, { useState, useEffect } from 'react';
import { Sparkles, Check, CheckCircle2, Cpu, Scissors, Layers, Eye, RefreshCw, ArrowRight, X, Sliders } from 'lucide-react';

export const StyleAnalysisModal = ({ 
  isOpen, 
  onClose, 
  garment, 
  uploadedImage, 
  onProceedToMeasure 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [detectedTags, setDetectedTags] = useState(null);

  const analysisPhases = [
    { label: "Segmenting foreground silhouette & contour edges...", icon: Eye, color: "text-purple-400" },
    { label: "Detecting stitch lines & hem construction geometry...", icon: Scissors, color: "text-cyan-400" },
    { label: "Isolating collar, yoke & sleeve drop angles...", icon: Layers, color: "text-pink-400" },
    { label: "Synthesizing fabric GSM & yardage estimations...", icon: Cpu, color: "text-emerald-400" },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setIsAnalyzing(true);
      return;
    }

    setIsAnalyzing(true);
    setCurrentStepIndex(0);

    // Sequence through the 4 steps with timed state updates
    const t1 = setTimeout(() => setCurrentStepIndex(1), 700);
    const t2 = setTimeout(() => setCurrentStepIndex(2), 1500);
    const t3 = setTimeout(() => setCurrentStepIndex(3), 2300);
    const t4 = setTimeout(() => {
      setIsAnalyzing(false);
      // Initialize detected attributes
      setDetectedTags({
        garmentType: garment?.detectedAttributes?.garmentType || 'Oversized Streetwear Tee',
        fitStyle: garment?.detectedAttributes?.fitStyle || 'Drop-Shoulder Boxy',
        collarType: garment?.detectedAttributes?.collarType || 'Ribbed Crewneck (3.2cm)',
        sleeveType: garment?.detectedAttributes?.sleeveType || 'Elbow-Length Drop Sleeve',
        fabricSuggestion: garment?.detectedAttributes?.fabricSuggestion || '280 GSM Heavy French Terry Cotton',
        estimatedFabricMeters: garment?.detectedAttributes?.estimatedFabricMeters || 1.6,
        difficultyLevel: garment?.detectedAttributes?.difficultyLevel || 'Beginner Friendly',
        seamAllowance: garment?.detectedAttributes?.seamAllowance || '1.2 cm standard',
      });
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen, garment]);

  if (!isOpen) return null;

  const imageUrl = uploadedImage?.url || garment?.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel-glow bg-[#0e1322] rounded-3xl border border-purple-500/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#12182b]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 text-white">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                AI Vision Pattern Analysis
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {isAnalyzing ? "SCANNING..." : "COMPLETED"}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {garment?.name || "Target Garment Deconstruction"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Main Visual Scanning Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Image with Neural Laser Sweep and Bounding Nodes */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden bg-slate-950 border border-purple-500/30 aspect-[3/4] max-h-80 mx-auto w-full group">
              <img
                src={imageUrl}
                alt="Garment scanning"
                className="w-full h-full object-cover filter contrast-105"
              />

              {/* Laser scanning beam */}
              {isAnalyzing && (
                <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scan-line z-20" />
              )}

              {/* Blueprint Grid Overlay */}
              <div className="absolute inset-0 blueprint-grid-dense pointer-events-none opacity-40" />

              {/* Neural Detection Nodes & Lines */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Node 1: Collar */}
                <div className="absolute top-[22%] left-[45%] -translate-x-1/2 flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-black/80 text-cyan-300 border border-cyan-500/40">
                    Collar Node #1
                  </span>
                </div>

                {/* Node 2: Shoulder drop */}
                <div className="absolute top-[30%] left-[18%] flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-black/80 text-purple-300 border border-purple-500/40">
                    Drop-Shoulder ∠18°
                  </span>
                </div>

                {/* Node 3: Chest Ratio */}
                <div className="absolute top-[48%] left-[50%] -translate-x-1/2 flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-black/80 text-pink-300 border border-pink-500/40">
                    Boxy Width Ratio 1.28
                  </span>
                </div>

                {/* Node 4: Hem Stitch */}
                <div className="absolute bottom-[15%] left-[30%] flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-black/80 text-emerald-300 border border-emerald-500/40">
                    Double Topstitch Hem
                  </span>
                </div>
              </div>

              {/* Bottom status badge */}
              <div className="absolute bottom-2 inset-x-2 p-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300 flex items-center justify-between">
                <span>CONTOUR RESOLUTION</span>
                <span>2160 × 2880 px</span>
              </div>
            </div>

            {/* Right Column: Step by Step Scanner Progress & Detected Specs */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Sequential Steps Indicator */}
              <div className="space-y-2.5 bg-[#12182b] p-4 rounded-2xl border border-white/5">
                <p className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Vision Pipeline Steps
                </p>

                {analysisPhases.map((phase, idx) => {
                  const Icon = phase.icon;
                  const isDone = idx < currentStepIndex || !isAnalyzing;
                  const isCurrent = idx === currentStepIndex && isAnalyzing;

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-2 rounded-xl text-xs transition-all ${
                        isCurrent
                          ? 'bg-purple-600/20 border border-purple-500/40 text-white font-medium'
                          : isDone
                          ? 'text-slate-300'
                          : 'text-slate-500 opacity-50'
                      }`}
                    >
                      <div className={`p-1 rounded-lg ${isDone ? 'text-emerald-400 bg-emerald-500/10' : isCurrent ? 'text-cyan-400 animate-spin' : 'text-slate-600'}`}>
                        {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <span className="flex-1 font-mono">{phase.label}</span>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-cyan-400 animate-pulse">
                          PROCESSING...
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Results Breakdown once scan is complete */}
              {!isAnalyzing && detectedTags && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-cyan-950/30 border border-cyan-500/30 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300 font-mono uppercase tracking-wide">
                      ⚡ Synthesized Garment DNA
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      98.4% Confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-[10px] text-slate-400 block font-mono">Garment Classification</span>
                      <span className="font-semibold text-white">{detectedTags.garmentType}</span>
                    </div>

                    <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-[10px] text-slate-400 block font-mono">Fit Silhouette</span>
                      <span className="font-semibold text-purple-300">{detectedTags.fitStyle}</span>
                    </div>

                    <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-[10px] text-slate-400 block font-mono">Collar Geometry</span>
                      <span className="font-semibold text-white truncate">{detectedTags.collarType}</span>
                    </div>

                    <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-[10px] text-slate-400 block font-mono">Est. Fabric Yardage</span>
                      <span className="font-semibold text-cyan-300">{detectedTags.estimatedFabricMeters} Meters</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 text-xs">
                    <span className="text-[10px] text-slate-400 block font-mono">Recommended Fabric & GSM</span>
                    <p className="text-slate-200 font-medium mt-0.5">{detectedTags.fabricSuggestion}</p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#12182b] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onProceedToMeasure(detectedTags);
            }}
            disabled={isAnalyzing}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isAnalyzing
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-lg shadow-purple-600/30'
            }`}
          >
            <span>Proceed to Measurement & Scaling</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

