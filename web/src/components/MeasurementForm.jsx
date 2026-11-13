import React, { useState } from 'react';
import { STANDARD_SIZES } from '../data/trendingGarments';
import { convertUnit, formatMeasurement } from '../utils/tailorCalculations';
import { Ruler, Sliders, Sparkles, Check, Info, ArrowRight, UserCheck, Flame } from 'lucide-react';

export const MeasurementForm = ({
  measurements,
  setMeasurements,
  unit,
  setUnit,
  fitPreference,
  setFitPreference,
  garment,
  onGenerateRecipe
}) => {
  const [activeHoverField, setActiveHoverField] = useState(null);
  const [sizeMode, setSizeMode] = useState('standard'); // 'standard' | 'custom'
  const [selectedStandardSize, setSelectedStandardSize] = useState('L');

  const isPants = garment?.category === 'Pants';

  // Apply Standard Size Preset
  const handleApplyStandardSize = (sizeKey) => {
    setSelectedStandardSize(sizeKey);
    const preset = STANDARD_SIZES[sizeKey];
    if (!preset) return;

    // Convert values if current unit is inches
    setMeasurements({
      unit,
      chest: unit === 'in' ? convertUnit(preset.chest, 'cm', 'in') : preset.chest,
      shoulder: unit === 'in' ? convertUnit(preset.shoulder, 'cm', 'in') : preset.shoulder,
      sleeve: unit === 'in' ? convertUnit(preset.sleeve, 'cm', 'in') : preset.sleeve,
      length: isPants 
        ? (unit === 'in' ? convertUnit(104, 'cm', 'in') : 104) 
        : (unit === 'in' ? convertUnit(preset.length, 'cm', 'in') : preset.length),
      waist: unit === 'in' ? convertUnit(preset.waist, 'cm', 'in') : preset.waist,
      hip: unit === 'in' ? convertUnit(preset.hip, 'cm', 'in') : preset.hip,
    });
  };

  // Change single field value
  const handleFieldChange = (field, value) => {
    setSizeMode('custom');
    const num = parseFloat(value) || 0;
    setMeasurements(prev => ({
      ...prev,
      [field]: num
    }));
  };

  // Toggle unit and convert all current numbers
  const handleToggleUnit = (newUnit) => {
    if (newUnit === unit) return;
    setUnit(newUnit);

    setMeasurements(prev => ({
      unit: newUnit,
      chest: convertUnit(prev.chest, unit, newUnit),
      shoulder: convertUnit(prev.shoulder, unit, newUnit),
      sleeve: convertUnit(prev.sleeve, unit, newUnit),
      length: convertUnit(prev.length, unit, newUnit),
      waist: convertUnit(prev.waist, unit, newUnit),
      hip: convertUnit(prev.hip, unit, newUnit),
    }));
  };

  const fitOptions = [
    { id: 'boxy', label: 'Boxy Drop-Shoulder', desc: 'Gen Z signature relaxed drape (+14cm ease)', icon: '⚡' },
    { id: 'oversized', label: 'Extreme Oversized', desc: 'Dramatic streetwear runway silhouette (+20cm ease)', icon: '🔥' },
    { id: 'relaxed', label: 'Casual Relaxed', desc: 'Clean comfortable drape (+8cm ease)', icon: '🌊' },
    { id: 'fitted', label: 'Tailored Clean', desc: 'Closer to body contours (+4cm ease)', icon: '✨' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
            <Ruler className="w-3.5 h-3.5" />
            <span>PRECISION MEASUREMENT STUDIO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Personal Measurements & Fit Preference
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Choose standard sizes or enter exact tailor measurements. We scale every pattern block in real time.
          </p>
        </div>

        {/* Unit Switcher */}
        <div className="flex items-center gap-2 bg-[#12182b] p-1.5 rounded-xl border border-white/10 shrink-0 self-start sm:self-auto">
          <span className="text-xs font-mono text-slate-400 px-2">Unit:</span>
          <button
            onClick={() => handleToggleUnit('cm')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              unit === 'cm'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Metric (CM)
          </button>
          <button
            onClick={() => handleToggleUnit('in')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              unit === 'in'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Imperial (Inches)
          </button>
        </div>
      </div>

      {/* Sizing Mode Selection: Standard Size Pills vs Custom Mode */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              Standard Sizing Quick Presets
            </h3>
            <p className="text-xs text-slate-400">
              Click any size to prefill standard measurements, or adjust below for custom fit.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {Object.keys(STANDARD_SIZES).map((sizeKey) => (
              <button
                key={sizeKey}
                onClick={() => handleApplyStandardSize(sizeKey)}
                className={`w-11 h-11 rounded-xl text-xs font-mono font-bold transition-all ${
                  sizeMode === 'standard' && selectedStandardSize === sizeKey
                    ? 'bg-gradient-to-tr from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30 scale-105'
                    : 'bg-[#151c30] hover:bg-[#1c2642] text-slate-300 border border-white/5'
                }`}
              >
                {sizeKey}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs Form & Interactive SVG Mannequin Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Sliders & Number fields */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                Tailor Measurement Values
              </h3>
              <span className="text-[11px] font-mono text-cyan-300">
                Mode: {sizeMode === 'standard' ? `Standard (${selectedStandardSize})` : 'Custom Tailor'}
              </span>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              
              {!isPants ? (
                <>
                  {/* Chest / Bust */}
                  <div
                    onMouseEnter={() => setActiveHoverField('chest')}
                    onMouseLeave={() => setActiveHoverField(null)}
                    className="p-3 rounded-xl bg-[#12182b] border border-white/5 hover:border-purple-500/40 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        Chest / Bust Circumference
                      </label>
                      <span className="font-mono text-cyan-300 font-bold">
                        {formatMeasurement(measurements.chest, unit)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={unit === 'in' ? 30 : 76}
                        max={unit === 'in' ? 58 : 148}
                        step={unit === 'in' ? 0.5 : 1}
                        value={measurements.chest}
                        onChange={(e) => handleFieldChange('chest', e.target.value)}
                        className="w-full accent-purple-500 cursor-pointer"
                      />
                      <input
                        type="number"
                        value={measurements.chest}
                        onChange={(e) => handleFieldChange('chest', e.target.value)}
                        className="w-20 px-2 py-1 bg-black/50 border border-white/10 rounded-lg text-xs font-mono text-right text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Shoulder Width */}
                  <div
                    onMouseEnter={() => setActiveHoverField('shoulder')}
                    onMouseLeave={() => setActiveHoverField(null)}
                    className="p-3 rounded-xl bg-[#12182b] border border-white/5 hover:border-purple-500/40 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        Shoulder Width (Tip-to-Tip)
                      </label>
                      <span className="font-mono text-purple-300 font-bold">
                        {formatMeasurement(measurements.shoulder, unit)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={unit === 'in' ? 14 : 36}
                        max={unit === 'in' ? 26 : 66}
                        step={unit === 'in' ? 0.5 : 1}
                        value={measurements.shoulder}
                        onChange={(e) => handleFieldChange('shoulder', e.target.value)}
                        className="w-full accent-purple-500 cursor-pointer"
                      />
                      <input
                        type="number"
                        value={measurements.shoulder}
                        onChange={(e) => handleFieldChange('shoulder', e.target.value)}
                        className="w-20 px-2 py-1 bg-black/50 border border-white/10 rounded-lg text-xs font-mono text-right text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Sleeve Length */}
                  <div
                    onMouseEnter={() => setActiveHoverField('sleeve')}
                    onMouseLeave={() => setActiveHoverField(null)}
                    className="p-3 rounded-xl bg-[#12182b] border border-white/5 hover:border-purple-500/40 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-pink-400" />
                        Sleeve Length (Shoulder to Cuff)
                      </label>
                      <span className="font-mono text-pink-300 font-bold">
                        {formatMeasurement(measurements.sleeve, unit)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={unit === 'in' ? 7 : 18}
                        max={unit === 'in' ? 32 : 82}
                        step={unit === 'in' ? 0.5 : 1}
                        value={measurements.sleeve}
                        onChange={(e) => handleFieldChange('sleeve', e.target.value)}
                        className="w-full accent-purple-500 cursor-pointer"
                      />
                      <input
                        type="number"
                        value={measurements.sleeve}
                        onChange={(e) => handleFieldChange('sleeve', e.target.value)}
                        className="w-20 px-2 py-1 bg-black/50 border border-white/10 rounded-lg text-xs font-mono text-right text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* Pants specific measurements */
                <>
                  <div
                    onMouseEnter={() => setActiveHoverField('waist')}
                    onMouseLeave={() => setActiveHoverField(null)}
                    className="p-3 rounded-xl bg-[#12182b] border border-white/5 hover:border-purple-500/40 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        Natural Waist Circumference
                      </label>
                      <span className="font-mono text-cyan-300 font-bold">
                        {formatMeasurement(measurements.waist, unit)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={unit === 'in' ? 24 : 60}
                        max={unit === 'in' ? 46 : 118}
                        step={unit === 'in' ? 0.5 : 1}
                        value={measurements.waist}
                        onChange={(e) => handleFieldChange('waist', e.target.value)}
                        className="w-full accent-purple-500 cursor-pointer"
                      />
                      <input
                        type="number"
                        value={measurements.waist}
                        onChange={(e) => handleFieldChange('waist', e.target.value)}
                        className="w-20 px-2 py-1 bg-black/50 border border-white/10 rounded-lg text-xs font-mono text-right text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div
                    onMouseEnter={() => setActiveHoverField('hip')}
                    onMouseLeave={() => setActiveHoverField(null)}
                    className="p-3 rounded-xl bg-[#12182b] border border-white/5 hover:border-purple-500/40 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        Hip / Seat Fullest Point
                      </label>
                      <span className="font-mono text-purple-300 font-bold">
                        {formatMeasurement(measurements.hip, unit)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={unit === 'in' ? 32 : 80}
                        max={unit === 'in' ? 52 : 132}
                        step={unit === 'in' ? 0.5 : 1}
                        value={measurements.hip}
                        onChange={(e) => handleFieldChange('hip', e.target.value)}
                        className="w-full accent-purple-500 cursor-pointer"
                      />
                      <input
                        type="number"
                        value={measurements.hip}
                        onChange={(e) => handleFieldChange('hip', e.target.value)}
                        className="w-20 px-2 py-1 bg-black/50 border border-white/10 rounded-lg text-xs font-mono text-right text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Total Garment Length (Both Tops & Pants) */}
              <div
                onMouseEnter={() => setActiveHoverField('length')}
                onMouseLeave={() => setActiveHoverField(null)}
                className="p-3 rounded-xl bg-[#12182b] border border-white/5 hover:border-purple-500/40 transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {isPants ? 'Total Outseam Length (Waist to Floor)' : 'Total Back Length (High Point Shoulder to Hem)'}
                  </label>
                  <span className="font-mono text-emerald-300 font-bold">
                    {formatMeasurement(measurements.length, unit)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={unit === 'in' ? (isPants ? 32 : 20) : (isPants ? 80 : 50)}
                    max={unit === 'in' ? (isPants ? 48 : 36) : (isPants ? 122 : 92)}
                    step={unit === 'in' ? 0.5 : 1}
                    value={measurements.length}
                    onChange={(e) => handleFieldChange('length', e.target.value)}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <input
                    type="number"
                    value={measurements.length}
                    onChange={(e) => handleFieldChange('length', e.target.value)}
                    className="w-20 px-2 py-1 bg-black/50 border border-white/10 rounded-lg text-xs font-mono text-right text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Fit Silhouette Preference Selector */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Flame className="w-4 h-4 text-pink-400" />
              Tailor Ease & Fit Profile
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {fitOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFitPreference(opt.id)}
                  className={`p-3 rounded-xl text-left transition-all border ${
                    fitPreference === opt.id
                      ? 'bg-purple-600/30 border-purple-500/80 text-white shadow-lg shadow-purple-600/20'
                      : 'bg-[#12182b] hover:bg-[#182038] border-white/5 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{opt.label}</span>
                    <span className="text-sm">{opt.icon}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-1 leading-tight">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Mannequin Silhouette Diagram with Live Guide lines */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                Anatomical Measuring Map
              </h3>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                LIVE GUIDE
              </span>
            </div>

            {/* SVG Mannequin Diagram with interactive lines */}
            <div className="relative w-full aspect-[3/4] max-h-96 mx-auto my-4 bg-[#0a0f1c] rounded-2xl p-4 flex items-center justify-center border border-purple-500/20 blueprint-paper-dark">
              
              <svg viewBox="0 0 200 300" className="w-full h-full max-h-80 drop-shadow-xl">
                {/* Torso & Head Silhouette */}
                <ellipse cx="100" cy="35" rx="16" ry="20" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                <path
                  d="M80,60 C70,68 45,78 40,110 L48,155 L58,150 L56,115 L70,110 L70,180 L62,260 L85,260 L92,185 L108,185 L115,260 L138,260 L130,180 L130,110 L144,115 L142,150 L152,155 L160,110 C155,78 130,68 120,60 Z"
                  fill="#111827"
                  stroke="#334155"
                  strokeWidth="1.5"
                />

                {/* Shoulder Measurement Line */}
                <g className={`transition-opacity duration-300 ${activeHoverField === 'shoulder' ? 'opacity-100' : 'opacity-60'}`}>
                  <line x1="45" y1="72" x2="155" y2="72" stroke="#c084fc" strokeWidth="2" strokeDasharray="3,3" />
                  <circle cx="45" cy="72" r="3" fill="#c084fc" />
                  <circle cx="155" cy="72" r="3" fill="#c084fc" />
                  <text x="100" y="68" fill="#c084fc" fontSize="7" textAnchor="middle" fontFamily="monospace">
                    SHOULDER: {formatMeasurement(measurements.shoulder, unit)}
                  </text>
                </g>

                {/* Chest Measurement Line */}
                <g className={`transition-opacity duration-300 ${activeHoverField === 'chest' ? 'opacity-100' : 'opacity-60'}`}>
                  <line x1="60" y1="100" x2="140" y2="100" stroke="#22d3ee" strokeWidth="2.5" />
                  <circle cx="60" cy="100" r="3.5" fill="#22d3ee" />
                  <circle cx="140" cy="100" r="3.5" fill="#22d3ee" />
                  <text x="100" y="96" fill="#22d3ee" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    CHEST: {formatMeasurement(measurements.chest, unit)}
                  </text>
                </g>

                {/* Sleeve Measurement Line */}
                <g className={`transition-opacity duration-300 ${activeHoverField === 'sleeve' ? 'opacity-100' : 'opacity-60'}`}>
                  <line x1="148" y1="80" x2="162" y2="140" stroke="#f472b6" strokeWidth="2" strokeDasharray="2,2" />
                  <circle cx="148" cy="80" r="3" fill="#f472b6" />
                  <circle cx="162" cy="140" r="3" fill="#f472b6" />
                  <text x="168" y="112" fill="#f472b6" fontSize="7" textAnchor="start" fontFamily="monospace">
                    SLEEVE: {formatMeasurement(measurements.sleeve, unit)}
                  </text>
                </g>

                {/* Waist Measurement Line */}
                <g className={`transition-opacity duration-300 ${activeHoverField === 'waist' ? 'opacity-100' : 'opacity-50'}`}>
                  <line x1="72" y1="135" x2="128" y2="135" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
                  <text x="100" y="132" fill="#38bdf8" fontSize="7" textAnchor="middle" fontFamily="monospace">
                    WAIST: {formatMeasurement(measurements.waist, unit)}
                  </text>
                </g>

                {/* Total Length Arrow */}
                <g className={`transition-opacity duration-300 ${activeHoverField === 'length' ? 'opacity-100' : 'opacity-60'}`}>
                  <line x1="32" y1="65" x2="32" y2="175" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow)" />
                  <circle cx="32" cy="65" r="2.5" fill="#34d399" />
                  <circle cx="32" cy="175" r="2.5" fill="#34d399" />
                  <text x="26" y="125" fill="#34d399" fontSize="7" textAnchor="end" fontFamily="monospace" transform="rotate(-90 26 125)">
                    LENGTH: {formatMeasurement(measurements.length, unit)}
                  </text>
                </g>
              </svg>

              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded">
                Hover any input to isolate
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-purple-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Tailor Master Formula:
              </p>
              <p className="text-[11px] text-slate-400">
                Ease is automatically calculated for comfort, armhole rotation, and natural drape without distorting the garment silhouette.
              </p>
            </div>
          </div>

          {/* Trigger Generate Button */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <button
              onClick={onGenerateRecipe}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 group transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-45 transition-transform" />
              <span>Compile Tailor Recipe Card & Tech-Pack</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

