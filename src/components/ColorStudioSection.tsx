import React from 'react';
import { PhoneColor, ViewMode } from '../types';
import { Sparkles, Check, Info } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ColorStudioSectionProps {
  currentColor: PhoneColor;
  colors: PhoneColor[];
  onSelectColor: (color: PhoneColor) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenCart: () => void;
}

export const ColorStudioSection: React.FC<ColorStudioSectionProps> = ({
  currentColor,
  colors,
  onSelectColor,
  onViewModeChange,
  onOpenCart,
}) => {
  return (
    <section id="color-studio" className="relative py-24 bg-[#090b11] border-t border-white/5 overflow-hidden">
      {/* Background Subtle Accent */}
      <div
        className="absolute top-1/2 -right-48 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentColor.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Titanium Atelier</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Curated in Grade 5 Titanium
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Each color is bonded to the high-strength titanium frame through physical vapor deposition, creating deep chromatic reflections with exceptional scratch resistance.
          </p>
        </div>

        {/* Color Switcher Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Color Card Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              {/* Exclusive Badge */}
              {currentColor.isExclusive && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Samsung.com Exclusive Edition</span>
                </div>
              )}

              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-10 h-10 rounded-full border-2 border-white/20 shadow-inner flex items-center justify-center"
                  style={{ backgroundColor: currentColor.hex }}
                >
                  <Check className="w-5 h-5 text-white drop-shadow-md" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{currentColor.name}</h3>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Grade 5 Anodized Titanium
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {currentColor.description}
              </p>

              {/* Attributes checklist */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Surface Finish</span>
                  <span className="font-semibold text-white">Satin Micro-Bead Blasted</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Bevel Architecture</span>
                  <span className="font-semibold text-white">Diamond-Cut Ergonomic Chamfer</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Scratch Defense</span>
                  <span className="font-semibold text-cyan-300">Corning® Gorilla® Armor Glass</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Included Stylus</span>
                  <span className="font-semibold text-white">Matching Color-Coded S-Pen</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenCart();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-black font-bold text-xs tracking-wide shadow-lg shadow-cyan-500/20 transition-all text-center"
                >
                  Select & Configure Storage
                </button>
              </div>
            </div>

            {/* Quick Perspective Views Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                3D View:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => onViewModeChange('front')}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium glass-pill text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
                >
                  Display
                </button>
                <button
                  onClick={() => onViewModeChange('back')}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium glass-pill text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => onViewModeChange('spen')}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium glass-pill text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
                >
                  S-Pen Silo
                </button>
                <button
                  onClick={() => onViewModeChange('exploded')}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 transition-all"
                >
                  Exploded Optics
                </button>
              </div>
            </div>
          </div>

          {/* Right: Color Swatches Interactive Selector */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Select Your Finish
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {colors.map((c) => {
                const isSelected = currentColor.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      sounds.playClick();
                      onSelectColor(c);
                    }}
                    className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative group ${
                      isSelected
                        ? 'glass-panel border-cyan-400 shadow-xl shadow-cyan-500/15 scale-[1.02]'
                        : 'glass-panel border-white/10 hover:border-white/20 hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-12 h-12 rounded-xl border-2 border-white/20 shadow-lg flex items-center justify-center"
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && <Check className="w-5 h-5 text-white drop-shadow" />}
                      </div>
                      {c.isExclusive && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Exclusive
                        </span>
                      )}
                    </div>
                    <h5 className="font-extrabold text-base text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {c.name}
                    </h5>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {c.tagline}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
