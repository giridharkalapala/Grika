import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Camera, Sparkles, X, AlertCircle, ArrowRight, Wand2 } from 'lucide-react';

export const UploadDropzone = ({ 
  uploadedImage, 
  setUploadedImage, 
  onStartAnalysis,
  onSelectSamplePreset
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  // Sample presets for quick testing
  const samplePresets = [
    {
      name: "Vintage 90s Boxy Tee",
      category: "T-Shirt",
      url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Camp Collar Linen Shirt",
      category: "Shirt",
      url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Multi-Pocket Cargo Pant",
      category: "Pants",
      url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Cropped Heavyweight Hoodie",
      category: "Hoodie",
      url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, WEBP, HEIC)');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 20MB. Please choose a smaller photo.');
      return;
    }

    setErrorMsg('');
    const objectUrl = URL.createObjectURL(file);
    setUploadedImage({
      url: objectUrl,
      fileName: file.name,
      fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      isCustom: true
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setErrorMsg('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
          <Wand2 className="w-3.5 h-3.5" />
          <span>COMPUTER VISION DECONSTRUCTION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Upload Your Fashion Inspo Photo
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Drop a Pinterest save, runway screenshot, or thrift rack snapshot. StitchCraft's neural engine maps seams, fabric weight, and proportions.
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="max-w-2xl mx-auto">
        {!uploadedImage ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
              isDragging
                ? 'border-cyan-400 bg-cyan-500/10 shadow-2xl shadow-cyan-500/20 scale-[1.01]'
                : 'border-purple-500/30 hover:border-purple-500/70 bg-[#101626]/80 hover:bg-[#131b2e]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />

            {/* Glowing Icon Hub */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-cyan-500/30 border border-purple-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-10 h-10 text-cyan-300 animate-bounce" />
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-white">
              Drag & Drop your garment photo here
            </h3>
            <p className="text-xs text-slate-400 mt-1.5">
              Supports JPEG, PNG, WEBP, or HEIC (Up to 20MB)
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                Browse Files
              </span>
              <span className="text-xs text-slate-500">or drop an image</span>
            </div>

            {/* Micro stitch decorative corners */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-purple-400/50 rounded-tl" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-purple-400/50 rounded-tr" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-purple-400/50 rounded-bl" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-purple-400/50 rounded-br" />
          </div>
        ) : (
          /* Uploaded Preview State */
          <div className="glass-panel rounded-3xl p-5 border border-purple-500/30 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              
              {/* Image Preview Box */}
              <div className="relative w-full sm:w-60 h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shrink-0">
                <img
                  src={uploadedImage.url}
                  alt="Garment Preview"
                  className="w-full h-full object-cover"
                />
                
                {/* Laser scan line overlay effect */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400 animate-scan-line opacity-75" />

                <button
                  onClick={handleClearImage}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/70 hover:bg-red-500 text-white transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 flex items-center justify-between">
                  <span>READY FOR SCAN</span>
                  <span>{uploadedImage.fileSize || 'RAW IMAGE'}</span>
                </div>
              </div>

              {/* Ready to scan details */}
              <div className="w-full flex-1 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                      Target Silhouette Uploaded
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {uploadedImage.fileName || "Custom Inspiration Garment"}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    StitchCraft will now scan the neckline depth, armhole drop, body ratio, and recommend pattern dimensions matched to your measurements.
                  </p>
                </div>

                {/* AI Analysis Trigger */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <button
                    onClick={onStartAnalysis}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 group transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
                    <span>Run AI Style & Seam Analysis</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={handleClearImage}
                    className="w-full py-2 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    Choose a different photo
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Error message if any */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick Sample Presets */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs font-mono text-slate-400 mb-3 text-center">
            Don't have a photo? Test with one of these Gen Z presets:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSamplePreset(preset)}
                className="p-2.5 rounded-xl bg-[#131929] hover:bg-[#1a233a] border border-white/5 hover:border-purple-500/40 text-left transition-all group"
              >
                <div className="relative h-20 rounded-lg overflow-hidden mb-2 bg-slate-900">
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-cyan-300">
                    {preset.category}
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-200 truncate group-hover:text-cyan-300">
                  {preset.name}
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

