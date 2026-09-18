import React, { useState } from 'react';
import { CAMERA_SPECS } from '../data/products';
import { ViewMode } from '../types';
import { Camera, Layers, ZoomIn, Aperture, Eye } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ExplodedCameraSectionProps {
  onViewModeChange: (mode: ViewMode) => void;
}

export const ExplodedCameraSection: React.FC<ExplodedCameraSectionProps> = ({
  onViewModeChange,
}) => {
  const [selectedCamera, setSelectedCamera] = useState(CAMERA_SPECS[0]);
  const [zoomLevel, setZoomLevel] = useState(5);

  return (
    <section id="camera-matrix" className="relative py-24 bg-[#07080d] border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>ProVisual Camera Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              200 Million Pixels. <br />
              <span className="text-gradient-cyan">Folded Tetraprism Optics.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playShutter();
                onViewModeChange('exploded');
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold text-xs shadow-lg shadow-cyan-500/10 transition-all hover:scale-105 active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>Trigger 3D Exploded View</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onViewModeChange('back');
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl glass-panel hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs border border-white/10 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Cluster View</span>
            </button>
          </div>
        </div>

        {/* Camera Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {CAMERA_SPECS.map((cam) => {
            const isSelected = selectedCamera.id === cam.id;
            return (
              <button
                key={cam.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCamera(cam);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected
                    ? 'glass-panel border-cyan-400 shadow-xl shadow-cyan-500/15'
                    : 'glass-panel border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-cyan-500 text-black' : 'bg-white/10 text-slate-300'
                  }`}>
                    {cam.badge}
                  </span>
                  <Aperture className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                </div>
                <h4 className="font-bold text-sm text-white mb-0.5">{cam.title}</h4>
                <p className="text-[11px] text-slate-400 truncate">{cam.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Camera Deep-Dive Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Detail Panel */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
                <span>Selected Optical Module</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                {selectedCamera.title}
              </h3>
              <p className="text-xs font-mono text-cyan-300 mb-4 bg-cyan-950/40 inline-block px-2.5 py-1 rounded border border-cyan-800/50">
                {selectedCamera.subtitle}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {selectedCamera.description}
              </p>

              {/* Optical engineering stats */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="block text-xl font-black text-cyan-300">16-in-1</span>
                  <span className="text-[10px] text-slate-400 uppercase">Pixel Binning</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="block text-xl font-black text-indigo-300">2x OIS</span>
                  <span className="text-[10px] text-slate-400 uppercase">Wider Correction</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="block text-xl font-black text-white">8K 30fps</span>
                  <span className="text-[10px] text-slate-400 uppercase">Pro HDR Video</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs">
              <span className="text-cyan-200 font-medium">
                Want to see the physical lens layers float in 3D?
              </span>
              <button
                onClick={() => {
                  sounds.playShutter();
                  onViewModeChange('exploded');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-400 text-black font-extrabold hover:bg-cyan-300 transition-colors"
              >
                Inspect 3D
              </button>
            </div>
          </div>

          {/* Right: Interactive 100x Space Zoom Simulator */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ZoomIn className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-base font-extrabold text-white">100x Space Zoom Simulator</h4>
                </div>
                <span className="font-mono text-sm font-black text-cyan-300 bg-cyan-500/20 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                  {zoomLevel}x ZOOM
                </span>
              </div>

              {/* Simulated Viewfinder */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/15 bg-black flex items-center justify-center mb-6">
                {/* Simulated Moon / City vista scaled by zoom level */}
                <div
                  className="w-32 h-32 rounded-full transition-all duration-300 flex items-center justify-center text-4xl shadow-2xl relative"
                  style={{
                    transform: `scale(${0.7 + (zoomLevel / 100) * 4.2})`,
                    background: 'radial-gradient(circle at 35% 35%, #e2e8f0 0%, #94a3b8 50%, #475569 85%, #0f172a 100%)',
                    boxShadow: '0 0 50px rgba(226, 232, 240, 0.4)',
                  }}
                >
                  {/* Moon craters detail */}
                  <div className="absolute top-6 left-8 w-6 h-6 rounded-full bg-slate-600/40 blur-[1px]" />
                  <div className="absolute bottom-7 right-8 w-10 h-10 rounded-full bg-slate-700/30 blur-[2px]" />
                  <div className="absolute top-12 right-6 w-4 h-4 rounded-full bg-slate-500/50" />
                </div>

                {/* Viewfinder Reticle Overlays */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-16 h-16 border border-cyan-400/50 rounded-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                  </div>
                  {/* Corner marks */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/60" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/60" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/60" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/60" />
                </div>

                {/* AI Super-Resolution Tag */}
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur border border-white/20 text-[10px] font-mono text-cyan-300">
                  Galaxy AI · Super Resolution Active
                </div>
              </div>

              {/* Zoom Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>1x (Wide)</span>
                  <span>5x (Optical)</span>
                  <span>10x (Lossless)</span>
                  <span>100x (Space Zoom)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={zoomLevel}
                  onChange={(e) => {
                    setZoomLevel(Number(e.target.value));
                    sounds.playClick();
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 text-center">
              Drag slider to experience how Samsung AI reconstructs textures and craters with sub-pixel neural sharpening.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
