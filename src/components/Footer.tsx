import React from 'react';
import { Sparkles, ArrowUp, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050609] border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top brand row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center p-0.5 text-black font-black text-xs">
                S
              </div>
              <span className="text-white font-extrabold text-base tracking-wider">
                GALAXY S25 ULTRA
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                AI TITAN
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Engineered with Grade 5 Titanium, 200MP ProVisual Camera Matrix, and custom Qualcomm Snapdragon 8 Elite for Galaxy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.samsung.com/us/smartphones/galaxy-s25-ultra/buy/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="px-4 py-2 rounded-xl glass-panel hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/15 hover:border-cyan-500/40 flex items-center gap-1.5 transition-all"
            >
              <span>Official Samsung Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl glass-panel hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center border border-white/15 transition-all"
              aria-label="Scroll back to top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legal Disclaimers & Notes */}
        <div className="py-8 space-y-3 text-[11px] text-slate-500 leading-relaxed border-b border-white/5">
          <p>
            * Galaxy AI features availability may vary by network provider, region, and language. Certain AI features require a Samsung Account or Google Account login. Circle to Search with Google is a trademark of Google LLC.
          </p>
          <p>
            * Titanium is applied on the exterior frame only. Grade 5 Titanium alloy (Ti-6Al-4V) provides high strength-to-weight ratio. Back glass features Corning® Gorilla® Armor with anti-reflective optical coating.
          </p>
          <p>
            * Trade-in values are estimates and subject to device verification by Samsung Electronics. 100x Space Zoom includes 5x optical zoom and 100x digital zoom with AI Super Resolution technology.
          </p>
        </div>

        {/* Bottom Copyright & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Samsung Electronics Co., Ltd. All rights reserved. Created for Samsung S25 Ultra Showcase Challenge.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Three.js 3D & Next-Gen WebGL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
