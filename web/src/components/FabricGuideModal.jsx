import React from 'react';
import { X, Layers, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

export const FabricGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const fabrics = [
    {
      name: "Heavy French Terry (380–450 GSM)",
      bestFor: "Oversized Hoodies, Drop-shoulder Sweatshirts",
      drape: "Structured & sculptural",
      shrinkage: "4–6% (Pre-wash essential)",
      needle: "90/14 Ballpoint needle"
    },
    {
      name: "Ring-Spun Cotton Jersey (240–300 GSM)",
      bestFor: "Heavyweight Boxy Tees",
      drape: "Crisp drop-shoulder fold",
      shrinkage: "3–5% across grain",
      needle: "80/12 Jersey / Stretch"
    },
    {
      name: "Linen-Rayon Blend (170–210 GSM)",
      bestFor: "Cuban Camp Collar Shirts",
      drape: "Silky fluid cascade",
      shrinkage: "5% (Cold delicate cycle)",
      needle: "75/11 Sharp Universal"
    },
    {
      name: "Cotton Ripstop / Cordura (260–320 GSM)",
      bestFor: "Articulated Panelled Cargo Pants",
      drape: "Rigid utilitarian volume",
      shrinkage: "Under 2%",
      needle: "90/14 or 100/16 Jeans needle"
    },
    {
      name: "Worsted Wool Twill (280–340 GSM)",
      bestFor: "Double-Pleated Wide Trousers",
      drape: "Heavy liquid puddle",
      shrinkage: "Dry clean only / Steam press",
      needle: "80/12 Microtex needle"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#0e1322] border border-purple-500/30 rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Master Tailor Fabric & GSM Guide</h3>
              <p className="text-xs text-slate-400 font-mono">
                Material selection benchmarks for custom streetwear silhouettes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {fabrics.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#13192b] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-cyan-300">{item.name}</h4>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
                  {item.needle}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Silhouette Suitability:</span>
                  <span>{item.bestFor}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Drape Profile:</span>
                  <span>{item.drape}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Shrinkage: {item.shrinkage}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tailor Pro Tip */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-cyan-950/30 border border-purple-500/30 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white">Fabric Cutting Rule:</p>
            <p className="text-slate-400 mt-0.5">
              Always cut along the lengthwise grainline (parallel to selvage). For oversized tees and drop-shoulder patterns, allow 1.5cm additional sleeve hem for double-turn needle topstitching.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

