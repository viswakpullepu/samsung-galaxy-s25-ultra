import React from 'react';
import { CartState, PhoneColor, StorageOption, TradeInOption } from '../types';
import { STORAGE_OPTIONS, TRADE_IN_OPTIONS } from '../data/products';
import { X, Check, ShoppingBag, ShieldCheck, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/sound';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartState;
  onUpdateColor: (color: PhoneColor) => void;
  onUpdateStorage: (storage: StorageOption) => void;
  onUpdateTradeIn: (tradeIn: TradeInOption | null) => void;
  onToggleAccessory: (id: string) => void;
  onToggleCare: () => void;
  onCheckout: () => void;
  colors: PhoneColor[];
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateColor,
  onUpdateStorage,
  onUpdateTradeIn,
  onToggleAccessory,
  onToggleCare,
  onCheckout,
  colors,
}) => {
  if (!isOpen) return null;

  // Pricing calculations
  const basePrice = cart.storage.price;
  const tradeInDiscount = cart.tradeIn ? cart.tradeIn.credit : 0;
  const accessoriesTotal = cart.accessories
    .filter((a) => a.selected)
    .reduce((sum, item) => sum + item.price, 0);
  const careTotal = cart.samsungCare ? 149 : 0;
  const subtotal = Math.max(0, basePrice - tradeInDiscount + accessoriesTotal + careTotal);
  const monthlyFinance = (subtotal / 36).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-white/10 bg-[#090b12] text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h3 className="font-extrabold text-base tracking-wide text-white">
                Configure & Order
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white glass-pill"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Device Summary Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-xl border border-white/20 shadow-md flex items-center justify-center text-xl shrink-0"
                style={{ backgroundColor: cart.color.hex }}
              >
                📱
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Flagship Selection
                </span>
                <h4 className="font-black text-sm text-white truncate">Galaxy S25 Ultra</h4>
                <p className="text-xs text-slate-400 truncate">
                  {cart.color.name} · {cart.storage.size}
                </p>
              </div>
              <span className="font-bold text-sm text-white">\${cart.storage.price}</span>
            </div>

            {/* 1. Color Selector */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                1. Choose Titanium Finish
              </label>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      sounds.playClick();
                      onUpdateColor(c);
                    }}
                    className={`h-11 rounded-xl transition-all border flex items-center justify-center relative ${
                      cart.color.id === c.id
                        ? 'border-cyan-400 ring-2 ring-cyan-400/50 scale-105'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {cart.color.id === c.id && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-300 font-medium mt-1.5 block">
                {cart.color.name}
              </span>
            </div>

            {/* 2. Storage Capacity */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                2. Storage Capacity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {STORAGE_OPTIONS.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => {
                      sounds.playClick();
                      onUpdateStorage(s);
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      cart.storage.size === s.size
                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300'
                        : 'glass-panel border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span className="block font-black text-sm text-white">{s.size}</span>
                    <span className="block text-[10px] text-slate-400">{s.ram}</span>
                    <span className="block text-xs font-bold mt-1 text-cyan-300">\${s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Trade-In Credit Estimator */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  3. Trade-In Instant Credit
                </label>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Up to \$800 Off
                </span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onUpdateTradeIn(null);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    cart.tradeIn === null
                      ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 font-bold'
                      : 'glass-panel border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>No trade-in device</span>
                  <span>\$0</span>
                </button>

                {TRADE_IN_OPTIONS.map((t) => (
                  <button
                    key={t.model}
                    onClick={() => {
                      sounds.playClick();
                      onUpdateTradeIn(t);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      cart.tradeIn?.model === t.model
                        ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300 font-bold'
                        : 'glass-panel border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span>{t.model}</span>
                    <span className="text-emerald-400 font-extrabold">Save \${t.credit}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Accessories Add-on */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                4. Recommended Galaxy Ecosystem
              </label>
              <div className="space-y-2">
                {cart.accessories.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => {
                      sounds.playClick();
                      onToggleAccessory(acc.id);
                    }}
                    className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center gap-3 ${
                      acc.selected
                        ? 'bg-cyan-500/10 border-cyan-400 text-white'
                        : 'glass-panel border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xl shrink-0">{acc.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-white truncate">{acc.name}</span>
                        {acc.originalPrice > acc.price && (
                          <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.2 rounded border border-red-500/30">
                            Save \${acc.originalPrice - acc.price}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">{acc.subtitle}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-xs text-cyan-300">\${acc.price}</span>
                      <div className={`w-4 h-4 rounded border mt-0.5 ml-auto flex items-center justify-center ${
                        acc.selected ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-600'
                      }`}>
                        {acc.selected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Samsung Care+ */}
            <div
              onClick={() => {
                sounds.playClick();
                onToggleCare();
              }}
              className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                cart.samsungCare
                  ? 'bg-indigo-500/10 border-indigo-400'
                  : 'glass-panel border-white/10 hover:border-white/20'
              }`}
            >
              <ShieldCheck className={`w-5 h-5 mt-0.5 ${cart.samsungCare ? 'text-indigo-400' : 'text-slate-500'}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Samsung Care+ (2 Years)</span>
                  <span className="text-xs font-bold text-indigo-300">+\$149</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Unlimited accidental damage protection, same-day battery replacement & 24/7 priority support.
                </p>
              </div>
              <div className={`w-4 h-4 rounded border shrink-0 mt-1 flex items-center justify-center ${
                cart.samsungCare ? 'bg-indigo-400 border-indigo-400 text-black' : 'border-slate-600'
              }`}>
                {cart.samsungCare && <Check className="w-3 h-3" />}
              </div>
            </div>
          </div>

          {/* Footer & Checkout Action */}
          <div className="p-5 border-t border-white/10 bg-[#07090e] space-y-3">
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Device ({cart.storage.size})</span>
                <span>\${cart.storage.price}</span>
              </div>
              {cart.tradeIn && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Trade-In Discount</span>
                  <span>-\${cart.tradeIn.credit}</span>
                </div>
              )}
              {accessoriesTotal > 0 && (
                <div className="flex justify-between">
                  <span>Accessories</span>
                  <span>\${accessoriesTotal}</span>
                </div>
              )}
              {cart.samsungCare && (
                <div className="flex justify-between">
                  <span>Samsung Care+ (2yr)</span>
                  <span>\$149</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <span className="font-extrabold text-sm text-white">Estimated Subtotal</span>
                <div className="text-right">
                  <span className="font-black text-xl text-white">\${subtotal}</span>
                  <span className="block text-[10px] text-cyan-300 font-medium">
                    Or \${monthlyFinance}/mo for 36 mos (0% APR)
                  </span>
                </div>
              </div>
            </div>

            {/* Official Samsung Store Redirect CTA */}
            <button
              onClick={() => {
                sounds.playAIChime();
                onCheckout();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-black font-extrabold text-xs tracking-wide shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Order on Official Samsung Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <p className="text-[10px] text-center text-slate-500">
              Free Express Shipping · 15-Day Return Guarantee · Official Manufacturer Warranty
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
