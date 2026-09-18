import React, { useEffect, useState } from 'react';
import { CartState } from '../types';
import { Sparkles, ShieldCheck, ExternalLink, X } from 'lucide-react';
import { sounds } from '../utils/sound';

interface SamsungRedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartState;
  finalPrice: number;
}

export const SamsungRedirectModal: React.FC<SamsungRedirectModalProps> = ({
  isOpen,
  onClose,
  cart,
  finalPrice,
}) => {
  const [countdown, setCountdown] = useState(3);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const officialStoreUrl = 'https://www.samsung.com/us/smartphones/galaxy-s25-ultra/buy/';

  useEffect(() => {
    if (!isOpen) {
      setCountdown(3);
      setIsRedirecting(false);
      return;
    }

    sounds.playAIChime();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const triggerRedirect = () => {
    setIsRedirecting(true);
    // Open Samsung store in new tab or direct window
    window.open(officialStoreUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl bg-[#090b12] text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white glass-pill"
          aria-label="Close transfer dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Transfer Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-3 shadow-lg shadow-cyan-500/15">
            <Sparkles className="w-7 h-7 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider mb-2">
            <span>Transferring Configuration</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Connecting to Official Samsung Store
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Your custom Galaxy S25 Ultra specifications and bundle perks are being transferred for official fulfillment.
          </p>
        </div>

        {/* Configuration Checklist */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs mb-6">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Device Model</span>
            <span className="font-bold text-white">Galaxy S25 Ultra</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Selected Finish</span>
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border border-white/30"
                style={{ backgroundColor: cart.color.hex }}
              />
              <span className="font-bold text-cyan-300">{cart.color.name}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Storage & RAM</span>
            <span className="font-bold text-white">
              {cart.storage.size} ({cart.storage.ram})
            </span>
          </div>
          {cart.tradeIn && (
            <div className="flex items-center justify-between text-emerald-400">
              <span>Trade-In Credit ({cart.tradeIn.model})</span>
              <span className="font-bold">-\${cart.tradeIn.credit}</span>
            </div>
          )}
          {cart.accessories.filter((a) => a.selected).length > 0 && (
            <div className="flex items-center justify-between text-cyan-300">
              <span>Bundled Accessories</span>
              <span className="font-bold">
                {cart.accessories.filter((a) => a.selected).map((a) => a.name).join(', ')}
              </span>
            </div>
          )}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm">
            <span className="font-bold text-slate-300">Estimated Total</span>
            <span className="font-black text-white text-base">\${finalPrice}</span>
          </div>
        </div>

        {/* Progress Bar & Countdown */}
        <div className="space-y-2 mb-6 text-center">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-cyan-400">
            {countdown > 0
              ? `Redirecting in ${countdown} seconds...`
              : 'Opening official Samsung portal...'}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={officialStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>{isRedirecting ? 'Opening Samsung Store...' : 'Proceed to Samsung.com Store'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl glass-panel hover:bg-white/10 text-slate-300 text-xs font-semibold transition-all"
          >
            Back to Page
          </button>
        </div>

        {/* Security stamp */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Official Samsung Authorized Transfer · 256-Bit SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
};
