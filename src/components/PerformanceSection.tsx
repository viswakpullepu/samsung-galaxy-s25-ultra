import React, { useState } from 'react';
import { ViewMode } from '../types';
import { Cpu, Zap, Flame, ShieldCheck, Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

interface PerformanceSectionProps {
  onViewModeChange: (mode: ViewMode) => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({
  onViewModeChange,
}) => {
  const [coolingActive, setCoolingActive] = useState(true);

  return (
    <section id="performance" className="relative py-24 bg-[#06070b] border-t border-white/5 overflow-hidden">
      {/* Background Tech Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-3">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Silicon Masterpiece</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Snapdragon® 8 Elite for Galaxy
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Custom-binned for Samsung with up to 4.47GHz prime clock speeds, desktop-class Adreno GPU architecture, and dual-slice Oryon CPU cores.
          </p>
        </div>

        {/* Benchmarks & Cooling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Core Stats */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-white">+45%</span>
                <span className="text-xs font-semibold text-indigo-400">NPU Velocity</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                45% accelerated Hexagon neural engine executes multi-modal AI inferences directly on device with zero cloud lag.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-white">+40%</span>
                <span className="text-xs font-semibold text-cyan-400">Ray-Tracing GPU</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hardware-accelerated ray tracing and mesh shading for photorealistic reflections in AAA mobile gaming titles.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-white">+37%</span>
                <span className="text-xs font-semibold text-amber-400">Vapor Chamber</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Massive liquid-cooling copper heat spreader prevents throttling during marathon gaming and 8K HDR recording sessions.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-white">5,000mAh</span>
                <span className="text-xs font-semibold text-emerald-400">Intelligent Battery</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                30+ hours video playback with AI power management that adapts refresh rates from 1Hz to 120Hz dynamically.
              </p>
            </div>
          </div>

          {/* Right: Interactive Cooling Visualizer */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Thermal Architecture
                </span>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setCoolingActive(!coolingActive);
                  }}
                  className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all ${
                    coolingActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {coolingActive ? 'Liquid Vapor Active' : 'Heat Dissipation Idle'}
                </button>
              </div>

              <h4 className="text-xl font-bold text-white mb-2">
                Ultra-Thin Liquid Vapor Diffusion
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Engineered between the Grade 5 titanium chassis and the Snapdragon SoC to rapidly dissipate thermal spikes away from the user’s fingertips.
              </p>

              {/* Thermal Heat Map Preview */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center p-4">
                <div
                  className={`w-32 h-24 rounded-xl transition-all duration-700 flex items-center justify-center relative ${
                    coolingActive
                      ? 'bg-gradient-to-r from-cyan-600/30 via-sky-500/20 to-indigo-600/30 border border-cyan-400/40 shadow-cyan-500/30 shadow-2xl'
                      : 'bg-gradient-to-r from-amber-600/40 via-red-500/30 to-rose-600/40 border border-red-500/40 shadow-red-500/30 shadow-2xl'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-white">
                    {coolingActive ? '31.4°C · Stable' : '42.8°C · Uncooled'}
                  </span>
                  {/* Glowing vapor wave */}
                  {coolingActive && (
                    <div className="absolute inset-0 bg-cyan-400/10 rounded-xl animate-pulse" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">View Chipset in 3D:</span>
              <button
                onClick={() => {
                  sounds.playAIChime();
                  onViewModeChange('xray');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trigger X-Ray 3D Core</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
