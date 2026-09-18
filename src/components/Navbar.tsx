import React, { useState, useEffect } from 'react';
import { ShoppingBag, Volume2, VolumeX, Sparkles, ChevronRight } from 'lucide-react';
import { CartState } from '../types';
import { sounds } from '../utils/sound';

interface NavbarProps {
  cart: CartState;
  onOpenCart: () => void;
  onPreOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, onOpenCart, onPreOrderClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
  };

  // Calculate cart total items
  const itemCount = 1 + cart.accessories.filter((a) => a.selected).length + (cart.samsungCare ? 1 : 0);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3.5 ${
        isScrolled
          ? 'bg-[#080a0f]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => sounds.playClick()}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-sm tracking-tighter">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-sm sm:text-base tracking-wider flex items-center gap-1.5">
                GALAXY S25 ULTRA
                <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <Sparkles className="w-2.5 h-2.5" /> AI TITAN
                </span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 -mt-1 hidden sm:block">
                Powered by Snapdragon® 8 Elite
              </span>
            </div>
          </a>
        </div>

        {/* Center Quick Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a
            href="#overview"
            onClick={() => sounds.playClick()}
            className="hover:text-cyan-400 transition-colors py-1"
          >
            Overview
          </a>
          <a
            href="#color-studio"
            onClick={() => sounds.playClick()}
            className="hover:text-cyan-400 transition-colors py-1"
          >
            Titanium Studio
          </a>
          <a
            href="#camera-matrix"
            onClick={() => sounds.playClick()}
            className="hover:text-cyan-400 transition-colors py-1"
          >
            200MP Quad Zoom
          </a>
          <a
            href="#galaxy-ai"
            onClick={() => sounds.playClick()}
            className="hover:text-cyan-400 transition-colors py-1 flex items-center gap-1 text-cyan-300"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Galaxy AI
          </a>
          <a
            href="#performance"
            onClick={() => sounds.playClick()}
            className="hover:text-cyan-400 transition-colors py-1"
          >
            Performance
          </a>
        </nav>

        {/* Right Actions: Sound Toggle + Cart Drawer + Pre-Order Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Sound FX Toggle */}
          <button
            onClick={toggleAudio}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white glass-pill hover:border-cyan-500/40 transition-colors"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Dynamic Cart Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenCart();
            }}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel hover:border-white/20 transition-all text-xs font-semibold text-white shadow-lg"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">${cart.storage.price}</span>
            {itemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-black font-black text-[11px] flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* Pre-Order CTA */}
          <button
            onClick={() => {
              sounds.playClick();
              onPreOrderClick();
            }}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <span>Order Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
