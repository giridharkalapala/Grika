import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { TrendingInspiration } from './components/TrendingInspiration';
import { UploadDropzone } from './components/UploadDropzone';
import { StyleAnalysisModal } from './components/StyleAnalysisModal';
import { MeasurementForm } from './components/MeasurementForm';
import { RecipeCard } from './components/RecipeCard';
import { SavedProjectsDrawer } from './components/SavedProjectsDrawer';
import { FabricGuideModal } from './components/FabricGuideModal';
import { TRENDING_GARMENTS, STANDARD_SIZES } from './data/trendingGarments';
import { calculateTailorRecipe } from './utils/tailorCalculations';
import { triggerConfetti } from './utils/exportBlueprint';
import { Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'upload' | 'measure' | 'recipe'
  const [unit, setUnit] = useState('cm'); // 'cm' | 'in'
  const [selectedGarment, setSelectedGarment] = useState(TRENDING_GARMENTS[0]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isFabricGuideOpen, setIsFabricGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Sizing & Fit State
  const [measurements, setMeasurements] = useState({
    unit: 'cm',
    chest: 108,
    shoulder: 52,
    sleeve: 26,
    length: 72,
    waist: 84,
    hip: 102
  });
  const [fitPreference, setFitPreference] = useState('boxy');

  // Saved Tech Packs in localStorage
  const [savedProjects, setSavedProjects] = useState(() => {
    try {
      const stored = localStorage.getItem('stitchcraft_saved_blueprints');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Sync saved projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stitchcraft_saved_blueprints', JSON.stringify(savedProjects));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedProjects]);

  // Recalculate tailor recipe dynamically whenever garment, measurements, unit, or fit changes
  const currentRecipe = calculateTailorRecipe(
    selectedGarment,
    measurements,
    unit,
    fitPreference
  );

  // Handle selecting a trending garment
  const handleSelectTrendingGarment = (garment) => {
    setSelectedGarment(garment);
    setUploadedImage({
      url: garment.image,
      fileName: garment.name,
      fileSize: 'CURATED PRESET',
      isCustom: false
    });
    // Update default measurements for this garment
    if (garment.defaultMeasurements) {
      setMeasurements({
        unit: 'cm',
        ...garment.defaultMeasurements
      });
    }
    // Launch AI analysis modal
    setIsAnalysisModalOpen(true);
  };

  // Handle preset sample selection in upload dropzone
  const handleSelectSamplePreset = (preset) => {
    const matched = TRENDING_GARMENTS.find(g => g.category === preset.category) || TRENDING_GARMENTS[0];
    setSelectedGarment({
      ...matched,
      name: preset.name,
      image: preset.url
    });
    setUploadedImage({
      url: preset.url,
      fileName: preset.name,
      fileSize: 'HD SAMPLE',
      isCustom: false
    });
    setIsAnalysisModalOpen(true);
  };

  // Trigger analysis for custom upload
  const handleStartAnalysisForUpload = () => {
    if (!uploadedImage) return;

    // Build custom garment based on uploaded photo
    const customGarment = {
      id: `custom-${Date.now()}`,
      name: uploadedImage.fileName?.replace(/\.[^/.]+$/, "") || "Custom Streetwear Inspo",
      category: "Custom Fit",
      aesthetic: "Personal Style Inspo",
      image: uploadedImage.url,
      tags: ["AI Analyzed", "Custom Drape", "Bespoke Cut"],
      badge: "✨ Custom Inspo",
      detectedAttributes: {
        garmentType: "Custom Streetwear Silhouette",
        fitStyle: "Relaxed Drop-Shoulder",
        collarType: "Ribbed Neckband (3cm)",
        sleeveType: "Comfort Sleeve Cut",
        hemType: "Double Topstitch Clean Hem",
        fabricSuggestion: "Heavyweight French Terry or Ring-spun Cotton (260–300 GSM)",
        estimatedFabricMeters: 1.8,
        estimatedFabricYards: 2.0,
        seamAllowance: "1.2 cm standard",
        difficultyLevel: "Intermediate Tailor",
      },
      blueprintComponents: [
        { id: 'custom-front', name: 'Front Pattern Block', count: 1, baseW: 56, baseH: 72, icon: 'Shirt' },
        { id: 'custom-back', name: 'Back Pattern Block', count: 1, baseW: 56, baseH: 74, icon: 'Shirt' },
        { id: 'custom-sleeves', name: 'Left & Right Sleeves', count: 2, baseW: 42, baseH: 26, icon: 'Scissors' },
        { id: 'custom-collar', name: 'Collar / Neckband', count: 1, baseW: 46, baseH: 4, icon: 'Layers' },
      ]
    };

    setSelectedGarment(customGarment);
    setIsAnalysisModalOpen(true);
  };

  // When analysis modal finishes and user clicks Proceed
  const handleProceedFromAnalysis = (detectedTags) => {
    setIsAnalysisModalOpen(false);
    if (detectedTags) {
      setSelectedGarment(prev => ({
        ...prev,
        detectedAttributes: {
          ...prev.detectedAttributes,
          ...detectedTags
        }
      }));
    }
    setActiveTab('measure');
  };

  // Save project
  const handleSaveProject = () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      garment: selectedGarment,
      recipe: currentRecipe,
      measurements,
      unit,
      fitPreference
    };

    setSavedProjects(prev => [newProject, ...prev]);
    triggerConfetti();
    showToast('✨ Tech-Pack blueprint saved to My Projects!');
  };

  // Load saved project
  const handleLoadProject = (project) => {
    setSelectedGarment(project.garment);
    setMeasurements(project.measurements);
    setUnit(project.unit);
    setFitPreference(project.fitPreference);
    setActiveTab('recipe');
    showToast(`Loaded ${project.garment?.name}`);
  };

  // Delete saved project
  const handleDeleteProject = (id) => {
    setSavedProjects(prev => prev.filter(p => p.id !== id));
    showToast('Blueprint deleted.');
  };

  // Reset to initial
  const handleReset = () => {
    setActiveTab('explore');
    setSelectedGarment(TRENDING_GARMENTS[0]);
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-[#090d18] text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unit={unit}
        setUnit={setUnit}
        savedCount={savedProjects.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onReset={handleReset}
      />

      {/* Main Body Flow */}
      <main className="flex-1 pb-16">
        
        {/* Hero Banner (Shown primarily on explore & upload views) */}
        {(activeTab === 'explore' || activeTab === 'upload') && (
          <HeroBanner
            onStartUpload={() => setActiveTab('upload')}
            onExploreTrending={() => setActiveTab('explore')}
          />
        )}

        {/* View Switcher Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* VIEW 1: Trending Inspo Archive */}
          {activeTab === 'explore' && (
            <div className="space-y-12">
              <TrendingInspiration
                onSelectGarment={handleSelectTrendingGarment}
                currentSelectedId={selectedGarment?.id}
              />

              {/* Direct jump to Upload */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-cyan-900/30 border border-purple-500/30 text-center space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Have a specific runway look, thrift find, or Pinterest fit?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                  Drop your image into our AI Vision scanner to deconstruct the seam geometry in under 5 seconds.
                </p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-cyan-400/20 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Upload & Analyze Custom Fit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* VIEW 2: Upload & Style Analysis Screen */}
          {activeTab === 'upload' && (
            <div className="py-4">
              <UploadDropzone
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
                onStartAnalysis={handleStartAnalysisForUpload}
                onSelectSamplePreset={handleSelectSamplePreset}
              />
            </div>
          )}

          {/* VIEW 3: Measurement & Scaling Input Form */}
          {activeTab === 'measure' && (
            <div className="py-4">
              <MeasurementForm
                measurements={measurements}
                setMeasurements={setMeasurements}
                unit={unit}
                setUnit={setUnit}
                fitPreference={fitPreference}
                setFitPreference={setFitPreference}
                garment={selectedGarment}
                onGenerateRecipe={() => setActiveTab('recipe')}
              />
            </div>
          )}

          {/* VIEW 4: The Tailor Recipe Card Output */}
          {activeTab === 'recipe' && (
            <div className="py-4">
              <RecipeCard
                garment={selectedGarment}
                recipe={currentRecipe}
                unit={unit}
                fitPreference={fitPreference}
                onSaveProject={handleSaveProject}
                isSaved={savedProjects.some(p => p.garment?.name === selectedGarment?.name)}
                onBackToEdit={() => setActiveTab('measure')}
              />
            </div>
          )}

        </div>
      </main>

      {/* Floating Fabric & GSM Guide Pill */}
      <div className="fixed bottom-5 left-5 z-30">
        <button
          onClick={() => setIsFabricGuideOpen(true)}
          className="px-3.5 py-2 rounded-full glass-panel hover:glass-panel-glow border border-purple-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
          <span>Tailor Fabric & GSM Guide</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 bg-[#070a14] text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 STITCHCRAFT // AI Fashion & Bespoke Tailoring Tech-Pack Studio</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFabricGuideOpen(true)} 
              className="hover:text-slate-300 transition-colors"
            >
              Fabric Knowledge Base
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsSavedDrawerOpen(true)} 
              className="hover:text-slate-300 transition-colors"
            >
              Saved Tech-Packs ({savedProjects.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Slide-over Drawers */}
      <StyleAnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        garment={selectedGarment}
        uploadedImage={uploadedImage}
        onProceedToMeasure={handleProceedFromAnalysis}
      />

      <SavedProjectsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedProjects={savedProjects}
        onLoadProject={handleLoadProject}
        onDeleteProject={handleDeleteProject}
      />

      <FabricGuideModal
        isOpen={isFabricGuideOpen}
        onClose={() => setIsFabricGuideOpen(false)}
      />

    </div>
  );
}

