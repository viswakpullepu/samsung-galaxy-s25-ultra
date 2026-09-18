import React, { useState, useRef } from 'react';
import { Sparkles, Search, Sliders, Mic, FileText, Check, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/sound';

export const GalaxyAIPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'circle' | 'photo' | 'translate' | 'note'>('circle');

  // Circle-to-Search state
  const [hasCircled, setHasCircled] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Photo Edit split slider state
  const [sliderPos, setSliderPos] = useState(50);

  // Translation demo state
  const [transLang, setTransLang] = useState<'korean' | 'spanish' | 'japanese'>('korean');

  // Note Assist demo state
  const [isSummarized, setIsSummarized] = useState(false);

  // Reset drawing
  const resetCircle = () => {
    setHasCircled(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Canvas drawing handlers
  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    sounds.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 10;
    ctx.beginPath();

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const handleEndDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setHasCircled(true);
      sounds.playAIChime();
    }
  };

  return (
    <section id="galaxy-ai" className="relative py-24 bg-[#080a10] border-t border-white/5 overflow-hidden">
      {/* Prismatic Nebula Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/10 via-indigo-600/15 to-pink-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/40 text-xs font-bold text-cyan-300 mb-4 shadow-lg shadow-cyan-500/15">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Galaxy AI Interactive Suite</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Intelligence That Anticipates You.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Test the live capabilities of the Galaxy S25 Ultra AI engine right here in your browser.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('circle');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'circle'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 scale-105'
                : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-500/30'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Circle to Search</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('photo');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'photo'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 scale-105'
                : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-500/30'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Generative Photo Edit</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('translate');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'translate'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 scale-105'
                : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-500/30'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Live Call Translate</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('note');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'note'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 scale-105'
                : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-500/30'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>AI Note Assist</span>
          </button>
        </div>

        {/* Interactive Playgrounds */}
        <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative min-h-[440px] flex flex-col justify-center">
          {/* TAB 1: CIRCLE TO SEARCH WITH GOOGLE */}
          {activeTab === 'circle' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Search className="w-5 h-5 text-cyan-400" />
                    Circle to Search with Google
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Draw a circle around the luxury timepiece below using your mouse or finger.
                  </p>
                </div>
                {hasCircled && (
                  <button
                    onClick={resetCircle}
                    className="self-start sm:self-auto text-xs text-cyan-400 hover:underline"
                  >
                    Reset & Circle Again
                  </button>
                )}
              </div>

              {/* Interactive Target Canvas */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#121622] to-[#0a0d15] flex items-center justify-center select-none">
                {/* Simulated Photo Subject */}
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-amber-400/20 via-cyan-500/20 to-indigo-500/20 border-2 border-cyan-400/30 flex items-center justify-center text-6xl shadow-2xl mb-3">
                    ⌚
                  </div>
                  <h4 className="text-sm font-bold text-white">Galaxy Watch Ultra</h4>
                  <p className="text-xs text-slate-400">Titanium Cushion Case · 100m Water Resist</p>
                </div>

                {/* Drawing Canvas Overlay */}
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={320}
                  onMouseDown={handleStartDraw}
                  onMouseMove={handleDraw}
                  onMouseUp={handleEndDraw}
                  onTouchStart={handleStartDraw}
                  onTouchMove={handleDraw}
                  onTouchEnd={handleEndDraw}
                  className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                />

                {/* Draw Hint Prompt */}
                {!hasCircled && !isDrawing && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/70 border border-cyan-500/30 text-xs text-cyan-300 pointer-events-none flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                    <span>Click & drag to circle the watch</span>
                  </div>
                )}

                {/* Simulated Google Search Results Card */}
                {hasCircled && (
                  <div className="absolute inset-x-4 bottom-4 z-20 glass-panel p-4 rounded-xl border border-cyan-400 shadow-2xl bg-[#090c14]/95 animate-in fade-in slide-in-from-bottom duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        Google Search AI Result
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">0.12s Instant Match</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">⌚</div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-white">
                          Samsung Galaxy Watch Ultra (Titanium Gray, 47mm LTE)
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Dual-frequency GPS · 3nm Processor · \$649 at Samsung.com
                        </div>
                      </div>
                      <button
                        onClick={() => sounds.playClick()}
                        className="px-3 py-1.5 rounded-lg bg-cyan-400 text-black text-xs font-extrabold flex items-center gap-1 hover:bg-cyan-300 transition-colors"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: GENERATIVE PHOTO EDIT */}
          {activeTab === 'photo' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-cyan-400" />
                  Generative Edit & Fill
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Drag the slider to compare original capture vs AI Generative object removal and lighting synthesis.
                </p>
              </div>

              {/* Split Viewer Container */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/15 bg-slate-950 select-none">
                {/* Background Image: Clean Vista with AI fill */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-900 text-center p-6">
                  <div className="space-y-2">
                    <div className="text-5xl">🏔️✨</div>
                    <h4 className="text-base font-bold text-white">Generative AI Restored Horizon</h4>
                    <p className="text-xs text-cyan-300">
                      Unwanted distractions eliminated. Background seamlessly extended.
                    </p>
                  </div>
                </div>

                {/* Left Overlay Image: Original with clutter, clipped by slider */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-r-2 border-cyan-400"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div className="absolute inset-0 w-[800px] flex items-center justify-center text-center p-6">
                    <div className="space-y-2">
                      <div className="text-5xl">🏔️🗑️🚧</div>
                      <h4 className="text-base font-bold text-slate-300">Original Unedited Photo</h4>
                      <p className="text-xs text-slate-400">
                        Contains utility poles and background crowd clutter.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Drag Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-400 text-black font-black text-xs flex items-center justify-center shadow-xl">
                    ↔
                  </div>
                </div>

                {/* Range Input on Top */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => {
                    setSliderPos(Number(e.target.value));
                    sounds.playClick();
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />

                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur text-[10px] font-bold text-slate-300">
                  Original
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-cyan-500/30 backdrop-blur text-[10px] font-bold text-cyan-300">
                  Galaxy AI Generative Fill
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE CALL TRANSLATE */}
          {activeTab === 'translate' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Mic className="w-5 h-5 text-cyan-400" />
                    Live Call & Voice Interpreter
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Two-way conversational speech translated in real-time right on the Snapdragon NPU.
                  </p>
                </div>

                {/* Language Picker */}
                <div className="flex items-center gap-1.5">
                  {(['korean', 'spanish', 'japanese'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        sounds.playClick();
                        setTransLang(lang);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                        transLang === lang
                          ? 'bg-cyan-500 text-black'
                          : 'glass-pill text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Simulation */}
              <div className="space-y-4">
                {/* Caller bubble (You - English) */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
                    You
                  </div>
                  <div className="glass-panel p-3.5 rounded-2xl rounded-tl-sm border border-cyan-500/30 max-w-md">
                    <p className="text-xs text-white">
                      "Hello! I am inquiring about booking a private showroom viewing of the Galaxy S25 Ultra."
                    </p>
                    <span className="text-[10px] text-cyan-400 font-medium mt-1 block">
                      English (Live Transcribed)
                    </span>
                  </div>
                </div>

                {/* Voice waveform simulation */}
                <div className="flex items-center justify-center gap-1 py-1">
                  {[4, 12, 24, 16, 8, 28, 18, 10, 20, 6].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-cyan-400 rounded-full animate-pulse"
                      style={{
                        height: `${h}px`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  ))}
                  <span className="text-[10px] text-cyan-300 font-mono ml-2">
                    Snapdragon NPU Processing (12ms latency)
                  </span>
                </div>

                {/* Recipient bubble (Translated Output) */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="glass-panel p-3.5 rounded-2xl rounded-tr-sm border border-indigo-500/30 max-w-md text-right bg-indigo-950/20">
                    <p className="text-xs text-white">
                      {transLang === 'korean' && '안녕하세요! 갤럭시 S25 울트라 비공개 쇼룸 관람 예약 안내를 도와드리겠습니다.'}
                      {transLang === 'spanish' && '¡Hola! Con mucho gusto le ayudaré a reservar una visita privada para conocer el Galaxy S25 Ultra.'}
                      {transLang === 'japanese' && 'こんにちは！Galaxy S25 Ultraのプライベートショールーム観覧のご予約をご案内いたします。'}
                    </p>
                    <span className="text-[10px] text-indigo-400 font-medium mt-1 block capitalize">
                      {transLang} (Neural AI Synthesized Voice)
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs">
                    Store
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI NOTE ASSIST */}
          {activeTab === 'note' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    S-Pen & Note Assist AI
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Transforms raw handwritten thoughts into structured executive briefs in one touch.
                  </p>
                </div>
                <button
                  onClick={() => {
                    sounds.playAIChime();
                    setIsSummarized(!isSummarized);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSummarized ? 'Show Raw Notes' : 'Auto-Format with AI'}</span>
                </button>
              </div>

              {/* Note Paper Canvas */}
              <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 font-mono text-xs">
                {!isSummarized ? (
                  <div className="space-y-3 text-slate-300">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">
                      Raw S-Pen Scribbles (Recorded 09:30 AM)
                    </div>
                    <p className="text-amber-200/80 italic font-sans text-sm">
                      "meeting with camera team - need titanium bezel flush with gorilla glass 200mp needs wider OIS 5x periscope tetraprism ready for mass production s-pen latency dropped to 2.8ms battery 5000mah confirmed"
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold uppercase">
                      <Check className="w-3.5 h-3.5" />
                      Galaxy AI Structured Summary
                    </div>
                    <h5 className="font-sans font-bold text-white text-sm">
                      S25 Ultra Engineering Deliverables:
                    </h5>
                    <ul className="space-y-1.5 text-slate-300 font-sans text-xs list-disc pl-4">
                      <li><strong>Chassis:</strong> Grade 5 Titanium bezel seated completely flush with Corning Gorilla Armor.</li>
                      <li><strong>Optics:</strong> 200MP Wide sensor paired with 2x wider optical stabilization (OIS).</li>
                      <li><strong>Telephoto:</strong> 50MP 5x Tetraprism periscope module approved for final tooling.</li>
                      <li><strong>S-Pen Stylus:</strong> Digitizer response tuned down to 2.8ms ultra-low latency.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
