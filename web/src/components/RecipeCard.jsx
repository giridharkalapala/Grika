import React, { useState } from 'react';
import { 
  Download, 
  Share2, 
  Printer, 
  Bookmark, 
  Check, 
  Copy, 
  Sparkles, 
  Ruler, 
  Scissors, 
  Layers, 
  FileText, 
  ExternalLink,
  MessageSquare,
  Compass,
  Info
} from 'lucide-react';
import { 
  downloadRecipeCardAsPng, 
  downloadRecipeCardAsPdf, 
  triggerConfetti 
} from '../utils/exportBlueprint';
import { formatMeasurement, createWhatsAppShareUrl } from '../utils/tailorCalculations';

export const RecipeCard = ({
  garment,
  recipe,
  unit,
  fitPreference,
  onSaveProject,
  isSaved,
  onBackToEdit
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const projectId = `SC-${(garment?.id || 'CUSTOM').toUpperCase().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleDownloadPng = async () => {
    setIsExporting(true);
    await downloadRecipeCardAsPng('stitchcraft-recipe-card', `blueprint-${garment?.name?.toLowerCase().replace(/\s+/g, '-')}`);
    setIsExporting(false);
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    await downloadRecipeCardAsPdf('stitchcraft-recipe-card', `tech-pack-${garment?.name?.toLowerCase().replace(/\s+/g, '-')}`);
    setIsExporting(false);
  };

  const handleWhatsAppShare = () => {
    const url = createWhatsAppShareUrl(recipe, garment);
    window.open(url, '_blank');
  };

  const handleCopySummary = () => {
    const text = `StitchCraft Tech-Pack: ${garment?.name} | Fit: ${recipe?.fitPreference} | Chest: ${recipe?.bodyFitSummary?.calculatedChest}${unit} | Length: ${recipe?.bodyFitSummary?.calculatedLength}${unit} | Fabric: ${recipe?.fabricRequirement?.displayRequirement}`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Action Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/10">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Active Tech-Pack Output Ready
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
            {garment?.name} — Master Tailor Blueprint
          </h2>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            title="Send formatted specs to your local tailor via WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp Tailor</span>
          </button>

          {/* Download PNG */}
          <button
            onClick={handleDownloadPng}
            disabled={isExporting}
            className="px-3 py-2 rounded-xl bg-[#141d33] hover:bg-purple-600 border border-white/10 text-white text-xs font-medium flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>PNG</span>
          </button>

          {/* Download PDF */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="px-3 py-2 rounded-xl bg-[#141d33] hover:bg-purple-600 border border-white/10 text-white text-xs font-medium flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>PDF Tech-Pack</span>
          </button>

          {/* Save to Projects */}
          <button
            onClick={onSaveProject}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isSaved
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 shadow-md'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save Project'}</span>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-[#141d33] hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            title="Print blueprint"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* THE PRINTABLE / EXPORTABLE TECH-PACK BLUEPRINT CARD          */}
      {/* ============================================================ */}
      <div
        id="stitchcraft-recipe-card"
        className="rounded-3xl border-2 border-purple-500/30 bg-[#0a0f1d] p-6 sm:p-8 text-slate-100 shadow-2xl relative overflow-hidden blueprint-grid"
      >
        {/* Decorative blueprint corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400" />

        {/* Blueprint Top Header Bar */}
        <div className="border-b border-purple-500/30 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-extrabold tracking-widest text-white">
                STITCH<span className="text-cyan-400">CRAFT</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                PRODUCTION TECH-PACK SPEC // {projectId}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {garment?.name}
            </h1>
            <p className="text-xs font-mono text-purple-300 mt-1">
              Category: <span className="text-white">{garment?.category}</span> | Style: <span className="text-white">{garment?.detectedAttributes?.fitStyle}</span> | Date: <span className="text-slate-400">{currentDate}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-left">
              <span className="text-[9px] font-mono uppercase text-slate-400 block">Fit Ease Profile</span>
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                {fitPreference} ({recipe?.fitPreference === 'boxy' ? '+14cm ease' : '+8cm ease'})
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-left">
              <span className="text-[9px] font-mono uppercase text-slate-400 block">Required Fabric</span>
              <span className="text-xs font-mono font-bold text-white">
                {recipe?.fabricRequirement?.displayRequirement}
              </span>
            </div>
          </div>
        </div>

        {/* Target Body Measurement Benchmarks */}
        <div className="mb-8 p-4 rounded-2xl bg-[#0f1629] border border-white/10">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3 flex items-center gap-2">
            <Ruler className="w-3.5 h-3.5 text-cyan-400" />
            Final Tailored Dimensions (After Ease & Seam Allowance)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-mono">Finished Chest Width</span>
              <span className="text-base font-mono font-bold text-cyan-300">
                {recipe?.bodyFitSummary?.calculatedChest} {recipe?.bodyFitSummary?.unit}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-mono">Cross Shoulder Width</span>
              <span className="text-base font-mono font-bold text-purple-300">
                {recipe?.bodyFitSummary?.calculatedShoulder} {recipe?.bodyFitSummary?.unit}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-mono">Finished Garment Length</span>
              <span className="text-base font-mono font-bold text-emerald-300">
                {recipe?.bodyFitSummary?.calculatedLength} {recipe?.bodyFitSummary?.unit}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-mono">Sleeve / Inseam</span>
              <span className="text-base font-mono font-bold text-pink-300">
                {recipe?.bodyFitSummary?.calculatedSleeve} {recipe?.bodyFitSummary?.unit}
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* VISUAL COMPONENT BREAKDOWN (PATTERN BLOCKS)                  */}
        {/* ============================================================ */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
                Pattern Cutting Blueprint Blocks ({recipe?.totalPieces} Total Pieces)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Unit: {unit === 'in' ? 'Inches (")' : 'Centimeters (cm)'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipe?.scaledComponents?.map((comp, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-4 bg-[#0d1426] border border-purple-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between group"
              >
                {/* Component Title & Cut Count */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 block">PART #{idx + 1}</span>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {comp.name}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Cut {comp.count}×
                  </span>
                </div>

                {/* SVG Pattern Piece Schematic */}
                <div className="h-40 w-full bg-[#080d19] rounded-xl border border-white/5 p-2 flex items-center justify-center relative overflow-hidden blueprint-grid-dense my-2">
                  <svg viewBox="0 0 160 120" className="w-full h-full">
                    {/* Render specific component shape */}
                    {comp.id.includes('front') || comp.id.includes('back') ? (
                      /* Torso block */
                      <g>
                        <path
                          d="M35,25 Q80,40 125,25 L135,105 L25,105 Z"
                          fill="rgba(139, 92, 246, 0.12)"
                          stroke="#a855f7"
                          strokeWidth="1.5"
                          strokeDasharray="4,2"
                        />
                        {/* Grainline arrow */}
                        <line x1="80" y1="45" x2="80" y2="85" stroke="#22d3ee" strokeWidth="1.2" />
                        <polygon points="77,47 80,41 83,47" fill="#22d3ee" />
                        <polygon points="77,83 80,89 83,83" fill="#22d3ee" />
                      </g>
                    ) : comp.id.includes('sleeve') ? (
                      /* Sleeve bell shape */
                      <g>
                        <path
                          d="M30,85 C40,30 120,30 130,85 Z"
                          fill="rgba(34, 211, 238, 0.12)"
                          stroke="#22d3ee"
                          strokeWidth="1.5"
                          strokeDasharray="4,2"
                        />
                        <line x1="80" y1="42" x2="80" y2="78" stroke="#a855f7" strokeWidth="1.2" />
                      </g>
                    ) : comp.id.includes('collar') || comp.id.includes('waistband') || comp.id.includes('cuff') ? (
                      /* Collar or rib band rectangle */
                      <g>
                        <rect
                          x="20"
                          y="42"
                          width="120"
                          height="36"
                          rx="4"
                          fill="rgba(236, 72, 153, 0.12)"
                          stroke="#ec4899"
                          strokeWidth="1.5"
                          strokeDasharray="3,3"
                        />
                        <line x1="80" y1="46" x2="80" y2="74" stroke="#ec4899" strokeWidth="1" />
                      </g>
                    ) : (
                      /* Pocket or generic panel */
                      <g>
                        <path
                          d="M35,30 L125,30 L125,80 L80,100 L35,80 Z"
                          fill="rgba(52, 211, 153, 0.12)"
                          stroke="#34d399"
                          strokeWidth="1.5"
                        />
                        <line x1="80" y1="40" x2="80" y2="80" stroke="#34d399" strokeWidth="1" />
                      </g>
                    )}

                    {/* Width Annotation */}
                    <line x1="20" y1="112" x2="140" y2="112" stroke="#64748b" strokeWidth="1" />
                    <text x="80" y="117" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="monospace">
                      W: {comp.displayWidth} {comp.unitLabel}
                    </text>

                    {/* Height Annotation */}
                    <line x1="12" y1="25" x2="12" y2="105" stroke="#64748b" strokeWidth="1" />
                    <text x="8" y="65" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 8 65)">
                      H: {comp.displayHeight} {comp.unitLabel}
                    </text>
                  </svg>
                </div>

                {/* Dimension Badges */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Cut Block:</span>
                  <span className="font-bold text-cyan-300">
                    {comp.displayWidth} {comp.unitLabel} × {comp.displayHeight} {comp.unitLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* BILL OF MATERIALS (BOM) & STITCH SPECIFICATIONS              */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-purple-500/30">
          
          {/* Bill of Materials Table */}
          <div className="p-5 rounded-2xl bg-[#0d1426] border border-white/10 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Bill of Materials (BOM)
            </h4>
            <div className="space-y-2 text-xs">
              {recipe?.bomList?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-white/5">
                  <div>
                    <span className="font-semibold text-white">{item.item}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">{item.spec}</span>
                  </div>
                  <span className="font-mono text-cyan-300 font-bold">{item.qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Machine & Sewing Tech Specs */}
          <div className="p-5 rounded-2xl bg-[#0d1426] border border-white/10 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <Scissors className="w-3.5 h-3.5 text-purple-400" />
              Tailor Machine & Stitch Spec
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Needle Recommendation:</span>
                <span className="font-mono text-slate-200 font-medium">{recipe?.stitchSpecs?.machineNeedle}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Thread Specification:</span>
                <span className="font-mono text-slate-200 font-medium">{recipe?.stitchSpecs?.threadType}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Seam Allowance:</span>
                <span className="font-mono text-cyan-300 font-semibold">{recipe?.stitchSpecs?.seamType}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Stitch Density (SPI):</span>
                <span className="font-mono text-slate-200 font-medium">{recipe?.stitchSpecs?.stitchDensity}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">Pressing Guidance:</span>
                <span className="font-mono text-slate-200 font-medium">{recipe?.stitchSpecs?.ironingHeat}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Notes & Tailor Disclaimer */}
        <div className="mt-8 pt-6 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>
            Generated by StitchCraft AI Architecture Engine • Pattern precision tolerance ±0.5 cm.
          </p>
          <div className="flex items-center gap-2">
            <span>PRINT CODE: SC-{Date.now().toString().slice(-6)}</span>
            <span>•</span>
            <span>VERIFIED FOR BESPOKE PRODUCTION</span>
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBackToEdit}
          className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          ← Adjust Measurements
        </button>

        <button
          onClick={handleCopySummary}
          className="px-4 py-2 rounded-xl bg-[#141b2e] hover:bg-[#1a233b] border border-white/10 text-xs text-slate-300 flex items-center gap-1.5 transition-all"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedLink ? 'Copied Summary!' : 'Copy Summary Specs'}</span>
        </button>
      </div>

    </div>
  );
};
