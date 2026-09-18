import React from 'react';
import { PhoneColor, ViewMode } from '../types';
import { Phone3DCanvas } from './Phone3DCanvas';
import { Sparkles, Shield, Cpu, Camera, PenTool, ShoppingCart, ArrowDown } from 'lucide-react';
import { sounds } from '../utils/sound';

interface HeroSectionProps {
  currentColor: PhoneColor;
  colors: PhoneColor[];
  onSelectColor: (color: PhoneColor) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenCart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentColor,
  colors,
  onSelectColor,
  viewMode,
  onViewModeChange,
  onOpenCart,
}) => {
  return (
    <section id="overview" className="relative min-h-screen pt-20 pb-16 flex flex-col justify-between overflow-hidden bg-[#07090e]">
      {/* Dynamic Background Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/10 via-indigo-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header Typography */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4 animate-float shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Galaxy AI is Here · 2025 Flagship Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-gradient-titanium mb-4">
          GALAXY S25 ULTRA
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Forged with aerospace-grade Grade 5 Titanium. Driven by the Snapdragon® 8 Elite.
          <span className="text-cyan-300 font-medium"> A masterpiece of engineering in your hands.</span>
        </p>
      </div>

      {/* Centerpiece 3D Canvas Stage */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 my-auto h-[480px] sm:h-[580px] md:h-[640px] flex items-center justify-center">
        {/* Left Floating Feature Badges */}
        <div className="hidden lg:flex flex-col gap-4 absolute left-6 z-20 max-w-xs">
          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Grade 5 Titanium</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aerospace alloy sculpted with diamond-cut chamfered edges and anti-scratch satin finish.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all shadow-xl">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Snapdragon® 8 Elite</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom Oryon CPU architecture with 45% faster NPU for real-time generative intelligence.
            </p>
          </div>
        </div>

        {/* The 3D Interactive Phone Model */}
        <div className="w-full h-full">
          <Phone3DCanvas
            color={currentColor}
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
          />
        </div>

        {/* Right Floating Feature Badges */}
        <div className="hidden lg:flex flex-col gap-4 absolute right-6 z-20 max-w-xs text-right">
          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl flex flex-col items-end">
            <div className="flex items-center gap-3 mb-1.5">
              <h4 className="text-sm font-bold text-white">200MP Quad Zoom</h4>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Camera className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              5x optical periscope lens with folded tetraprism optics and AI-assisted 100x Space Zoom.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all shadow-xl flex flex-col items-end">
            <div className="flex items-center gap-3 mb-1.5">
              <h4 className="text-sm font-bold text-white">Embedded S-Pen</h4>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <PenTool className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              2.8ms ultra-low latency with AI Handwriting Assist and Bluetooth Air Gesture controls.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Color Selector Bar & Call To Action */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Real-time Color Switcher */}
        <div className="glass-panel px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pr-1 border-r border-white/10">
            Finish
          </span>
          <div className="flex items-center gap-2.5">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectColor(c);
                }}
                className={`group relative w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                  currentColor.id === c.id
                    ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#080a0f] scale-110'
                    : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={c.name}
              >
                {c.isExclusive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border border-black" />
                )}
              </button>
            ))}
          </div>
          <span className="text-xs font-semibold text-white ml-2 min-w-[140px] truncate">
            {currentColor.name}
          </span>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playShutter();
              onViewModeChange('exploded');
            }}
            className="px-5 py-3 rounded-xl glass-panel hover:bg-white/10 text-white font-semibold text-xs transition-all border border-white/15 hover:border-cyan-500/40"
          >
            Explode 3D Camera Matrix
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenCart();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-black font-extrabold text-xs shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Customize & Order</span>
          </button>
        </div>
      </div>

      {/* Down arrow hint */}
      <div className="hidden md:flex justify-center mt-6">
        <a
          href="#color-studio"
          className="text-slate-500 hover:text-cyan-400 transition-colors animate-bounce p-2"
          aria-label="Scroll to next section"
        >
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
