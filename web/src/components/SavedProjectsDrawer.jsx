import React from 'react';
import { X, FolderHeart, Trash2, ArrowRight, Download, Calendar, Layers } from 'lucide-react';

export const SavedProjectsDrawer = ({
  isOpen,
  onClose,
  savedProjects,
  onLoadProject,
  onDeleteProject
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c101d] border-l border-purple-500/30 text-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#11172a]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <FolderHeart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Saved Tech-Packs</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {savedProjects.length} Custom Blueprints
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

          {/* Projects List */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {savedProjects.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-slate-500">
                  <FolderHeart className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-white">No saved blueprints yet</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  When you generate a tailor recipe card, click "Save to My Projects" to save it for quick tailor reference anytime.
                </p>
              </div>
            ) : (
              savedProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-2xl bg-[#141b2e] border border-white/5 hover:border-purple-500/40 transition-all space-y-3 group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={project.garment?.image || project.imageUrl}
                      alt={project.garment?.name}
                      className="w-16 h-20 rounded-xl object-cover bg-slate-900 shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-purple-400 uppercase">
                          {project.garment?.category || 'Garment'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.savedAt}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white truncate mt-0.5 group-hover:text-cyan-300 transition-colors">
                        {project.garment?.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Fit: <span className="text-slate-200 capitalize font-medium">{project.fitPreference}</span> • Chest: <span className="font-mono text-cyan-300 font-semibold">{project.recipe?.bodyFitSummary?.calculatedChest}{project.unit}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onDeleteProject(project.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete saved blueprint"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        onLoadProject(project);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600/40 hover:bg-purple-600 text-white text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <span>Load Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

