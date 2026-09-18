import React, { useState } from 'react';
import { PHONE_COLORS, STORAGE_OPTIONS, ACCESSORY_OPTIONS } from './data/products';
import { PhoneColor, StorageOption, TradeInOption, CartState, ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ColorStudioSection } from './components/ColorStudioSection';
import { ExplodedCameraSection } from './components/ExplodedCameraSection';
import { GalaxyAIPlayground } from './components/GalaxyAIPlayground';
import { PerformanceSection } from './components/PerformanceSection';
import { CartDrawer } from './components/CartDrawer';
import { SamsungRedirectModal } from './components/SamsungRedirectModal';
import { Footer } from './components/Footer';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  // Global Phone State
  const [currentColor, setCurrentColor] = useState<PhoneColor>(PHONE_COLORS[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('hero');

  // Dynamic Cart State
  const [cart, setCart] = useState<CartState>({
    color: PHONE_COLORS[0],
    storage: STORAGE_OPTIONS[1], // 512GB default popular
    tradeIn: null,
    accessories: ACCESSORY_OPTIONS,
    samsungCare: false,
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);

  // Sync color changes across page & 3D model
  const handleSelectColor = (color: PhoneColor) => {
    setCurrentColor(color);
    setCart((prev) => ({ ...prev, color }));
  };

  const handleUpdateStorage = (storage: StorageOption) => {
    setCart((prev) => ({ ...prev, storage }));
  };

  const handleUpdateTradeIn = (tradeIn: TradeInOption | null) => {
    setCart((prev) => ({ ...prev, tradeIn }));
  };

  const handleToggleAccessory = (id: string) => {
    setCart((prev) => ({
      ...prev,
      accessories: prev.accessories.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      ),
    }));
  };

  const handleToggleCare = () => {
    setCart((prev) => ({ ...prev, samsungCare: !prev.samsungCare }));
  };

  // Checkout handling
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsRedirectModalOpen(true);

    // Festive confetti blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#6366f1', '#f59e0b', '#ffffff'],
    });
  };

  // Calculate final price
  const basePrice = cart.storage.price;
  const tradeDiscount = cart.tradeIn ? cart.tradeIn.credit : 0;
  const accTotal = cart.accessories.filter((a) => a.selected).reduce((s, a) => s + a.price, 0);
  const careCost = cart.samsungCare ? 149 : 0;
  const finalCalculatedPrice = Math.max(0, basePrice - tradeDiscount + accTotal + careCost);

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Fixed Navigation Header */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onPreOrderClick={() => setIsCartOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        {/* 1. 3D Masterpiece Hero Section */}
        <HeroSection
          currentColor={currentColor}
          colors={PHONE_COLORS}
          onSelectColor={handleSelectColor}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 2. Grade 5 Titanium Studio */}
        <ColorStudioSection
          currentColor={currentColor}
          colors={PHONE_COLORS}
          onSelectColor={handleSelectColor}
          onViewModeChange={setViewMode}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 3. 200MP Quad-Camera Matrix & Space Zoom */}
        <ExplodedCameraSection
          onViewModeChange={setViewMode}
        />

        {/* 4. Interactive Galaxy AI Suite */}
        <GalaxyAIPlayground />

        {/* 5. Snapdragon 8 Elite Architecture & Cooling */}
        <PerformanceSection
          onViewModeChange={setViewMode}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Dynamic Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateColor={handleSelectColor}
        onUpdateStorage={handleUpdateStorage}
        onUpdateTradeIn={handleUpdateTradeIn}
        onToggleAccessory={handleToggleAccessory}
        onToggleCare={handleToggleCare}
        onCheckout={handleProceedToCheckout}
        colors={PHONE_COLORS}
      />

      {/* Transfer & Redirect Modal to Official Samsung Store */}
      <SamsungRedirectModal
        isOpen={isRedirectModalOpen}
        onClose={() => setIsRedirectModalOpen(false)}
        cart={cart}
        finalPrice={finalCalculatedPrice}
      />
    </div>
  );
};
