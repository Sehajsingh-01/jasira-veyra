'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles, RotateCcw, Feather, Moon, BookOpen } from 'lucide-react';

interface Spread {
  category: string;
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
}

export function BookViewer() {
  const [view, setView] = useState<'cover' | 'spread'>('spread');
  const [currentSpread, setCurrentSpread] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Instant navigation to spread
  const goToSpread = (idx: number) => {
    setCurrentSpread(idx);
    setView('spread');
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToCover = () => {
    setView('cover');
  };

  // Turn to Next Page
  const handleNextPage = () => {
    if (view === 'cover') {
      goToSpread(0);
      return;
    }
    if (currentSpread < SPREADS.length - 1) {
      goToSpread(currentSpread + 1);
    }
  };

  // Turn to Previous Page
  const handlePrevPage = () => {
    if (view === 'spread') {
      if (currentSpread > 0) {
        goToSpread(currentSpread - 1);
      } else {
        goToCover();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextPage();
      if (e.key === 'ArrowLeft') handlePrevPage();
      if (e.key === 'Escape') goToCover();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, currentSpread]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-2 sm:py-4">
      {/* Unified Direct Navigation Tabs (Always Visible, 100% Responsive) */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-6 sm:mb-8 z-20 px-2 max-w-4xl">
        {/* Cover Tab */}
        <button
          type="button"
          onClick={goToCover}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 min-h-[42px] text-xs sm:text-sm font-ui tracking-wider uppercase rounded-full transition-all duration-150 cursor-pointer touch-manipulation ${
            view === 'cover'
              ? 'bg-warm-gold text-midnight font-bold shadow-[0_0_20px_rgba(212,168,83,0.5)] scale-105'
              : 'bg-midnight/90 text-cream/70 border border-warm-gold/30 hover:text-warm-gold hover:border-warm-gold/60'
          }`}
        >
          <BookOpen size={14} className="pointer-events-none text-current" />
          <span className="pointer-events-none font-medium">Cover</span>
        </button>

        <div className="w-[1px] h-6 bg-lavender/20 hidden sm:block mx-1" />

        {/* Spread Category Tabs */}
        {SPREADS.map((spread, idx) => {
          const isSelected = view === 'spread' && currentSpread === idx;
          return (
            <button
              key={spread.category}
              type="button"
              onClick={() => goToSpread(idx)}
              className={`px-3.5 sm:px-4 py-2 min-h-[42px] text-[11px] sm:text-xs font-ui tracking-widest rounded-full transition-all duration-150 cursor-pointer touch-manipulation flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-warm-gold text-midnight font-bold shadow-[0_0_20px_rgba(212,168,83,0.5)] scale-105'
                  : 'bg-midnight/70 text-cream/75 border border-lavender/15 hover:text-cream hover:border-warm-gold/40'
              }`}
            >
              <span className="pointer-events-none opacity-60 text-[10px]">{idx + 1}.</span>
              <span className="pointer-events-none">{spread.category}</span>
            </button>
          );
        })}
      </div>

      {/* Book Stage */}
      <div className="relative w-full flex flex-col items-center justify-center min-h-[460px] sm:min-h-[580px]">
        {/* Ambient Desk Table Glow & Shadow */}
        <div className="absolute w-[320px] sm:w-[860px] h-[200px] sm:h-[340px] rounded-full bg-black/60 blur-3xl pointer-events-none -bottom-6 sm:-bottom-8" />

        {/* =========================================================================
            STATE A: PREMIUM BOOK COVER
           ========================================================================= */}
        {view === 'cover' && (
          <div className="flex flex-col items-center w-full animate-fade-in">
            {/* Clickable Book Cover Card */}
            <div
              onClick={() => goToSpread(0)}
              role="button"
              tabIndex={0}
              aria-label="Open Jasira Veyra Journal"
              className="group relative cursor-pointer w-[88vw] max-w-[320px] sm:max-w-[380px] md:max-w-[420px] h-[460px] sm:h-[530px] md:h-[580px] rounded-r-2xl rounded-l-md shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,168,83,0.2)] border border-warm-gold/40 select-none overflow-hidden touch-manipulation mx-auto transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Full-Bleed Cover Art Background */}
              <Image
                src="/images/jasira/portraits/jasira-tea.jpg"
                alt="Jasira Veyra - Book Cover"
                fill
                priority
                quality={100}
                unoptimized
                className="object-cover object-[center_15%] pointer-events-none"
              />

              {/* Dark Vignettes for High Typography Contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-midnight/85 via-midnight/40 to-midnight/95 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-midnight/70 via-transparent to-midnight/50 pointer-events-none" />

              {/* Left Spine Depth Effect */}
              <div
                className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 rounded-l-md bg-gradient-to-r from-[#0B0711] via-[#1F142B] to-transparent z-20 pointer-events-none"
                style={{
                  boxShadow: 'inset 3px 0 10px rgba(0,0,0,0.8), -6px 0 15px rgba(0,0,0,0.7)',
                }}
              >
                {/* Spine Gold Ribs */}
                <div className="flex flex-col justify-around h-full py-14 px-0.5 pointer-events-none">
                  <div className="w-full h-[1px] bg-warm-gold/50" />
                  <div className="w-full h-[1px] bg-warm-gold/50" />
                  <div className="w-full h-[1px] bg-warm-gold/50" />
                </div>
              </div>

              {/* Silk Bookmark Ribbon */}
              <div className="absolute -bottom-8 left-10 sm:left-14 w-5 h-12 bg-gradient-to-b from-[#8B263E] to-[#631B2D] shadow-lg rounded-b-sm transform rotate-2 z-10 border-t border-warm-gold/30 pointer-events-none" />

              {/* Premium Book Cover Content (100% pointer-events-none so touches ALWAYS hit the card!) */}
              <div className="absolute inset-0 pl-8 sm:pl-10 pr-4 sm:pr-6 py-6 sm:py-8 flex flex-col justify-between z-10 pointer-events-none">
                {/* TOP SECTION: Title & Subtitle */}
                <div className="space-y-1 sm:space-y-2 pointer-events-none">
                  {/* Decorative Flower */}
                  <div className="flex items-center gap-2 text-warm-gold/80 mb-1">
                    <span className="text-sm">✿</span>
                  </div>

                  {/* JASIRA VEYRA - Main Title */}
                  <h1
                    className="font-display text-[26px] sm:text-4xl md:text-5xl text-cream font-bold tracking-[0.12em] uppercase leading-[0.95]"
                    style={{
                      textShadow: '0 2px 15px rgba(0,0,0,0.9), 0 0 30px rgba(212,168,83,0.3)',
                    }}
                  >
                    JASIRA<br />VEYRA
                  </h1>

                  {/* Subtitle */}
                  <p className="font-ui text-[9px] sm:text-xs tracking-[0.25em] text-cream/90 uppercase font-medium mt-1">
                    A QUIET SOUL<br />IN A LOUD WORLD.
                  </p>

                  {/* Poetic Quote */}
                  <p className="font-handwritten text-xs sm:text-base text-cream/80 italic leading-snug mt-2 sm:mt-3 max-w-[190px] sm:max-w-[240px]">
                    &quot;I still believe...<br />
                    that flowers can grow<br />
                    in the most forgotten<br />
                    places.&quot;
                  </p>
                </div>

                {/* RIGHT SIDE: Keywords List */}
                <div className="absolute top-6 sm:top-8 right-3 sm:right-5 text-right space-y-0.5 pointer-events-none">
                  {['FLOWERS', 'BOOKS', 'QUIET PLACES', 'KIND PEOPLE', 'A LITTLE MAGIC', 'AND A BETTER', 'TOMORROW...'].map((word, i) => (
                    <p key={i} className="font-ui text-[7px] sm:text-[8px] tracking-[0.2em] text-cream/70 uppercase leading-tight">
                      {word}
                    </p>
                  ))}
                </div>

                {/* Crescent Moon */}
                <div className="absolute top-12 sm:top-16 right-7 sm:right-12 pointer-events-none">
                  <Moon size={20} className="text-cream/50 fill-cream/20 rotate-[-30deg]" />
                </div>

                {/* BOTTOM SECTION: Chapter Info & Signature */}
                <div className="flex items-end justify-between pointer-events-none">
                  <div className="space-y-0.5">
                    <p className="font-ui text-[9px] sm:text-[10px] tracking-[0.2em] text-warm-gold uppercase font-bold">
                      CHAPTER 1
                    </p>
                    <p className="font-ui text-[8px] sm:text-[9px] tracking-[0.15em] text-cream/80 uppercase">
                      A QUIETER BEGINNING.
                    </p>
                    <div className="mt-2 sm:mt-3 space-y-0">
                      <p className="font-ui text-[7px] sm:text-[8px] tracking-[0.15em] text-cream/60 uppercase">
                        SAME GIRL...
                      </p>
                      <p className="font-ui text-[7px] sm:text-[8px] tracking-[0.15em] text-cream/60 uppercase">
                        DIFFERENT DAYS...
                      </p>
                      <p className="font-ui text-[7px] sm:text-[8px] tracking-[0.15em] text-cream/60 uppercase">
                        MORE STORIES...
                      </p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="font-handwritten text-base sm:text-xl text-cream/80 italic">
                      Jasira Veyra
                    </p>
                    <p className="font-ui text-[7px] sm:text-[8px] tracking-[0.15em] text-cream/60 uppercase">
                      SOME PLACES<br />STILL BLOOM.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gold Border Inset */}
              <div className="absolute inset-3 sm:inset-4 left-9 sm:left-11 border border-warm-gold/25 rounded-r-xl rounded-l-sm pointer-events-none z-10" />

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-warm-gold/15 via-transparent to-warm-gold/5 pointer-events-none z-10" />
            </div>

            {/* High-Visibility Primary Action Button: 100% Foolproof Tap Target */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2 z-30">
              <button
                type="button"
                onClick={() => goToSpread(0)}
                className="flex items-center justify-center gap-2.5 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-warm-gold text-midnight hover:bg-cream active:scale-95 font-ui text-xs sm:text-sm tracking-[0.25em] uppercase font-bold shadow-[0_0_30px_rgba(212,168,83,0.5)] hover:shadow-[0_0_45px_rgba(212,168,83,0.8)] transition-all duration-200 cursor-pointer touch-manipulation min-h-[48px]"
              >
                <BookOpen size={16} className="text-midnight shrink-0 pointer-events-none" />
                <span className="pointer-events-none">Read Spreads (Page 1) →</span>
                <Sparkles size={14} className="text-midnight shrink-0 pointer-events-none" />
              </button>
              <p className="font-ui text-[10px] sm:text-[11px] text-warm-gold/80 tracking-widest uppercase font-medium">
                ✦ Tap book cover or button to read ✦
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE B: OPEN BOOK - SPREAD (MOBILE SCROLLABLE, DESKTOP TWO-PAGE)
           ========================================================================= */}
        {view === 'spread' && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <div
              className="relative w-[94vw] max-w-sm sm:w-[680px] md:w-[820px] sm:max-w-none h-[540px] sm:h-[560px] rounded-xl shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden border border-[#5B4030]/50"
              style={{
                background:
                  'linear-gradient(to right, #E5D6B9 0%, #DED0B0 48%, #BDB092 50%, #DED0B0 52%, #E5D6B9 100%)',
              }}
            >
              {/* Center Spine Shadow (hidden on mobile stacked) */}
              <div
                className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-30 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.25) 100%)',
                }}
              />

              {/* Silken Bookmark Ribbon (hidden on mobile) */}
              <div className="hidden sm:block absolute left-1/2 -top-2 w-3 sm:w-4 h-full pointer-events-none z-30 transform -translate-x-1/2">
                <div className="w-full h-full bg-gradient-to-b from-[#8B263E] via-[#6E1C2F] to-[#501321] opacity-75 shadow-md" />
              </div>

              {/* MOBILE: Stacked single page view with full scrollable height */}
              <div ref={mobileScrollRef} className="sm:hidden flex flex-col h-full overflow-y-auto bg-[#F4EAD4] text-ink p-4">
                {/* Top Watermark */}
                <div className="flex items-center justify-between font-ui text-[9px] text-[#8D6860]/80 uppercase tracking-wider mb-3 pb-2 border-b border-[#5B4030]/15 shrink-0">
                  <span>Bloomverse Archive</span>
                  <span className="font-semibold">{SPREADS[currentSpread].category}</span>
                </div>

                {/* Left page content */}
                <div className="mb-4">{SPREADS[currentSpread].leftPage}</div>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-3 my-4 text-[#8D6860]/50 shrink-0">
                  <div className="w-10 h-[1px] bg-[#5B4030]/20" />
                  <span className="text-xs">✦</span>
                  <div className="w-10 h-[1px] bg-[#5B4030]/20" />
                </div>

                {/* Right page content */}
                <div className="mb-4">{SPREADS[currentSpread].rightPage}</div>

                {/* Page Footer */}
                <div className="mt-auto pt-3 border-t border-[#5B4030]/15 flex items-center justify-between font-ui text-[10px] text-[#8D6860]/70 shrink-0">
                  <span>Spread {currentSpread + 1} of {SPREADS.length}</span>
                  <span>Jasira Veyra</span>
                </div>
              </div>

              {/* DESKTOP: Side-by-side two-page spread */}
              {/* LEFT PAGE */}
              <div
                onClick={handlePrevPage}
                className={`hidden sm:flex absolute left-0 top-0 bottom-0 w-1/2 p-6 sm:p-10 flex-col justify-between border-r border-[#5B4030]/20 bg-[#F4EAD4] text-ink z-10 ${
                  currentSpread > 0 ? 'cursor-pointer hover:bg-[#EFE3Ca] transition-colors group' : ''
                }`}
                style={{
                  boxShadow: 'inset -12px 0 20px rgba(0,0,0,0.06)',
                }}
                title={currentSpread > 0 ? 'Click to flip previous page' : ''}
              >
                {/* Top Watermark & Previous Indicator */}
                <div className="flex items-center justify-between font-ui text-[10px] text-[#8D6860]/70 uppercase tracking-wider">
                  <span>Bloomverse Archive</span>
                  {currentSpread > 0 && (
                    <span className="text-[#8D6860] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-semibold">
                      <ChevronLeft size={12} /> Click to Turn
                    </span>
                  )}
                </div>

                {/* Left Page Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar py-3">
                  {SPREADS[currentSpread].leftPage}
                </div>

                {/* Left Page Footer */}
                <div className="pt-3 border-t border-[#5B4030]/15 flex items-center justify-between font-ui text-[11px] text-[#8D6860]/70">
                  <span>Athenaeum Vault</span>
                  <span>{currentSpread * 2 + 1}</span>
                </div>
              </div>

              {/* RIGHT PAGE */}
              <div
                onClick={handleNextPage}
                className={`hidden sm:flex absolute right-0 top-0 bottom-0 w-1/2 p-6 sm:p-10 flex-col justify-between bg-[#F4EAD4] text-ink z-10 ${
                  currentSpread < SPREADS.length - 1 ? 'cursor-pointer hover:bg-[#EFE3Ca] transition-colors group' : ''
                }`}
                style={{
                  boxShadow: 'inset 12px 0 20px rgba(0,0,0,0.06)',
                }}
                title={currentSpread < SPREADS.length - 1 ? 'Click to flip next page' : ''}
              >
                {/* Top Category & Next Indicator */}
                <div className="flex items-center justify-between font-ui text-[10px] text-[#8D6860]/70 uppercase tracking-widest">
                  {currentSpread < SPREADS.length - 1 && (
                    <span className="text-[#8D6860] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-semibold">
                      Click to Turn <ChevronRight size={12} />
                    </span>
                  )}
                  <span className="ml-auto">{SPREADS[currentSpread].category}</span>
                </div>

                {/* Right Page Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar py-3">
                  {SPREADS[currentSpread].rightPage}
                </div>

                {/* Right Page Footer */}
                <div className="pt-3 border-t border-[#5B4030]/15 flex items-center justify-between font-ui text-[11px] text-[#8D6860]/70">
                  <span>{currentSpread * 2 + 2}</span>
                  <span>Jasira Veyra</span>
                </div>
              </div>
            </div>

            {/* Navigation Controls Bar */}
            <div className="flex items-center justify-between w-full max-w-sm sm:max-w-2xl mt-5 sm:mt-8 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full bg-midnight/90 border border-warm-gold/40 backdrop-blur-md shadow-2xl z-20">
              <button
                type="button"
                onClick={handlePrevPage}
                className="flex items-center gap-1 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-ui tracking-wider uppercase text-cream hover:text-warm-gold hover:bg-white/5 transition-all touch-manipulation cursor-pointer min-h-[40px]"
              >
                <ChevronLeft size={14} className="pointer-events-none" />
                <span className="hidden sm:inline pointer-events-none">
                  {currentSpread === 0 ? 'Cover' : 'Previous'}
                </span>
                <span className="sm:hidden pointer-events-none">
                  {currentSpread === 0 ? 'Cover' : 'Prev'}
                </span>
              </button>

              <div className="flex items-center gap-2 sm:gap-4">
                <span className="font-ui text-[10px] sm:text-xs tracking-widest text-warm-gold font-semibold">
                  {currentSpread + 1} / {SPREADS.length}
                </span>

                <button
                  type="button"
                  onClick={goToCover}
                  className="flex items-center gap-1 sm:gap-1.5 px-3.5 py-2 rounded-full border border-warm-gold/60 text-warm-gold hover:bg-warm-gold/20 font-ui text-[10px] sm:text-[11px] tracking-widest uppercase transition-all touch-manipulation cursor-pointer min-h-[40px]"
                >
                  <RotateCcw size={11} className="pointer-events-none" />
                  <span className="pointer-events-none">Cover</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentSpread === SPREADS.length - 1}
                className="flex items-center gap-1 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-ui tracking-wider uppercase text-cream hover:text-warm-gold hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-manipulation cursor-pointer min-h-[40px]"
              >
                <span className="pointer-events-none">Next</span>
                <ChevronRight size={14} className="pointer-events-none" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// RICH JOURNAL SPREADS (OPAQUE PARCHMENT, ZERO BLEED-THROUGH)
// =========================================================================

const SPREADS: Spread[] = [
  // Spread 1: Identity & Observations
  {
    category: 'IDENTITY',
    leftPage: (
      <div className="space-y-3 sm:space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">Journal Entry #01</span>
          <h2 className="font-handwritten text-2xl sm:text-3xl text-[#2D1B3D]">Jasira Veyra</h2>
        </div>
        <p className="font-body text-xs sm:text-sm leading-relaxed text-[#2A211C]">
          &quot;A quiet soul in a loud world.&quot;
        </p>
        <p className="font-body text-[11px] sm:text-xs text-[#2A211C]/80 leading-relaxed">
          I&apos;ve stopped expecting my noticing to matter. People in Duskbloom are drawn to things that ignite the sky
          or raise crystalline shields against the dark. When you can only make small warm light, they ask you to
          keep the little ones calm.
        </p>
        <div className="p-2.5 sm:p-3 bg-[#E5D6B9]/70 rounded border border-[#5B4030]/20 font-handwritten text-sm sm:text-base text-[#8D6860] leading-snug">
          &quot;The flowers went quiet today, and I still don&apos;t know why I&apos;m the only one who noticed.&quot;
        </div>
      </div>
    ),
    rightPage: (
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">Field Equipment</span>
          <Feather size={14} className="text-[#8D6860]" />
        </div>
        <ul className="font-body text-[11px] sm:text-xs space-y-2 text-[#2A211C]/90">
          <li><strong>Spectacles:</strong> Round silver-gold wireframes (Mother&apos;s gift).</li>
          <li><strong>Ribbons:</strong> Twin pink satin bows pinned above ears.</li>
          <li><strong>Ink:</strong> Lilac-distilled duskbloom extract.</li>
          <li><strong>Duty:</strong> Keeper of the Athenaeum Botanical Vaults.</li>
        </ul>
        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded bg-[#DED0B0]/50 border border-[#5B4030]/20">
          <p className="font-handwritten text-xs sm:text-sm text-[#5B4030] leading-relaxed">
            Note to self: The third drawer contains seven pressed lunar roses. They still haven&apos;t withered.
          </p>
        </div>
      </div>
    ),
  },

  // Spread 2: Duskbloom Wood & Lore
  {
    category: 'DUSKBLOOM LORE',
    leftPage: (
      <div className="space-y-3 sm:space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">Topographical Log</span>
          <h2 className="font-display text-xl sm:text-2xl text-[#2D1B3D]">Duskbloom Wood</h2>
        </div>
        <p className="font-body text-[11px] sm:text-xs leading-relaxed text-[#2A211C]/85">
          By day, the canopy is quiet, tinted the soft grey of weathered parchment. But the instant the moon clears the
          treeline, the entire wood remembers what it actually was: every flower opens at once, breathing lilac fog into
          the night.
        </p>
        <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-[11px] font-ui text-[#5B4030]">
          <div className="p-2 bg-white/50 rounded">
            <strong>Bloom Phase:</strong> Midnight to Dawn
          </div>
          <div className="p-2 bg-white/50 rounded">
            <strong>Flora:</strong> Silent Roses
          </div>
        </div>
      </div>
    ),
    rightPage: (
      <div className="space-y-3 sm:space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">Sanctuary Record</span>
          <h2 className="font-display text-xl sm:text-2xl text-[#2D1B3D]">The Grand Athenaeum</h2>
        </div>
        <p className="font-body text-[11px] sm:text-xs leading-relaxed text-[#2A211C]/85">
          Half library, half living conservatory. Roots of monumental ironwood trees weave between ancient bookshelves,
          holding centuries of elven wisdom.
        </p>
        <blockquote className="font-handwritten text-sm sm:text-base text-[#8D6860] border-l-2 border-[#8D6860]/40 pl-3 italic">
          &quot;A book is never truly alone so long as dust motes keep its company.&quot;
        </blockquote>
      </div>
    ),
  },

  // Spread 3: Petal Magic / Verse
  {
    category: 'PETAL MAGIC',
    leftPage: (
      <div className="space-y-3 sm:space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">Magical Theory</span>
          <h2 className="font-display text-xl sm:text-2xl text-[#2D1B3D]">The Verse System</h2>
        </div>
        <p className="font-body text-[11px] sm:text-xs leading-relaxed text-[#2A211C]/85">
          Elves do not cast spells with blades or wands. Magic lives in feeling — a private well inside each of them
          called a Verse, bound to whatever truth they hold closest in their chest.
        </p>
        <div className="space-y-1.5 text-[11px] sm:text-xs font-body text-[#2A211C]/90">
          <p>• <strong>Flame Verses:</strong> Fuelled by wrath.</p>
          <p>• <strong>Barrier Verses:</strong> Born from instinct to protect.</p>
          <p>• <strong>Petal Verses:</strong> Quiet restoration through empathy.</p>
        </div>
      </div>
    ),
    rightPage: (
      <div className="space-y-3 sm:space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">Field Observation</span>
          <h2 className="font-handwritten text-xl sm:text-2xl text-[#2D1B3D]">Restoring Vanished Ink</h2>
        </div>
        <p className="font-body text-[11px] sm:text-xs leading-relaxed text-[#2A211C]/85">
          When my fingertips touch an erased page, lilac light traces the missing calligraphy back into existence. It is
          not recreation; it is remembrance.
        </p>
        <div className="p-2.5 sm:p-3 bg-[#E5D6B9]/70 rounded border border-[#5B4030]/20 text-center">
          <span className="font-handwritten text-base sm:text-lg text-[#8D6860] block mb-1">
            &quot;You cannot fight an ending with a sword.&quot;
          </span>
          <span className="font-ui text-[8px] sm:text-[9px] tracking-wider uppercase text-[#5B4030]/70">
            — Jasira at the Last Page
          </span>
        </div>
      </div>
    ),
  },

  // Spread 4: Mochi & Memories
  {
    category: 'MOCHI & CO.',
    leftPage: (
      <div className="space-y-3 sm:space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">Companion Dossier</span>
          <h2 className="font-handwritten text-2xl sm:text-3xl text-[#2D1B3D]">Mochi</h2>
        </div>
        <p className="font-body text-[11px] sm:text-xs leading-relaxed text-[#2A211C]/85">
          A chubby brown plush companion with ears that swivel toward whatever matters. He refuses to leave my hood
          when it rains.
        </p>
        <div className="p-2 sm:p-2.5 bg-white/50 rounded border border-[#5B4030]/20 space-y-1 text-[11px] sm:text-xs font-body">
          <p><strong>Favorite Food:</strong> Sugar-glazed petals.</p>
          <p><strong>Habit:</strong> Hoarding shiny pebbles.</p>
          <p><strong>Role:</strong> Keeper of Jasira&apos;s courage.</p>
        </div>
      </div>
    ),
    rightPage: (
      <div className="space-y-3 sm:space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">Candid Moment</span>
          <h2 className="font-display text-xl sm:text-2xl text-[#2D1B3D]">A Night in the Square</h2>
        </div>
        <p className="font-body text-[11px] sm:text-xs leading-relaxed text-[#2A211C]/85">
          &quot;Orlei bought us candy. Ren sat beside us, steady as the earth. Mochi had sugar on his whiskers. Nobody
          needed saving.&quot;
        </p>
        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded bg-[#DED0B0]/50 border border-[#5B4030]/20 font-handwritten text-sm sm:text-base text-[#8D6860] leading-snug text-center">
          &quot;Some companions make the quiet days brighter.&quot;
        </div>
      </div>
    ),
  },

  // Spread 5: The Unwritten Rifts
  {
    category: 'THE RIFTS',
    leftPage: (
      <div className="space-y-3 sm:space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">Chronicle of Crisis</span>
          <h2 className="font-display text-xl sm:text-2xl text-[#2D1B3D]">The Vanishing Endings</h2>
        </div>
        <p className="font-body text-[11px] sm:text-xs leading-relaxed text-[#2A211C]/85">
          Something east in the wood was actively unwriting stories — believing that if a story never finished, it
          could never be lost.
        </p>
        <div className="p-2 sm:p-2.5 bg-red-950/10 rounded border border-red-900/20 text-[11px] sm:text-xs font-body text-[#5B4030]">
          <strong>Warning:</strong> Force only deepens the erasure.
        </div>
      </div>
    ),
    rightPage: (
      <div className="space-y-3 sm:space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">Grandmother&apos;s Journal</span>
          <h2 className="font-handwritten text-xl sm:text-2xl text-[#2D1B3D]">Underlined Twice</h2>
        </div>
        <div className="p-2.5 sm:p-3 bg-[#E5D6B9]/80 rounded border border-[#8D6860]/40 font-handwritten text-sm sm:text-base text-[#2D1B3D] leading-relaxed">
          &quot;The wood will not be saved by the loudest power in it. It will be saved by the one who never stopped trying.&quot;
        </div>
      </div>
    ),
  },

  // Spread 6: The Secret Prophecy
  {
    category: 'THE PROPHECY',
    leftPage: (
      <div className="space-y-3 sm:space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">The Final Page</span>
          <h2 className="font-display text-xl sm:text-2xl text-[#2D1B3D]">An Ending Written for You</h2>
        </div>
        <div className="p-2.5 sm:p-3 bg-white/70 rounded border border-[#5B4030]/30 font-handwritten text-xs sm:text-sm text-[#2D1B3D] leading-relaxed">
          &quot;This whole world was written for you... because somebody wanted you to see that your quiet magic has always
          been the realest power in the room.&quot;
        </div>
      </div>
    ),
    rightPage: (
      <div className="h-full flex flex-col justify-between text-center py-2 sm:py-4">
        <div className="space-y-2 sm:space-y-3">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8D6860]">Official Archive Seal</span>
          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-[#8B263E] border-2 border-warm-gold/60 shadow-lg flex items-center justify-center text-warm-gold text-lg sm:text-xl">
            ✦
          </div>
          <h3 className="font-display text-lg sm:text-xl text-[#2D1B3D]">Bloomverse Keeper</h3>
          <p className="font-handwritten text-sm sm:text-base text-[#8D6860]">
            &quot;An ending makes a story permanent.&quot;
          </p>
        </div>

        <div className="pt-3 border-t border-[#5B4030]/20">
          <p className="font-ui text-[8px] sm:text-[9px] tracking-widest uppercase text-[#5B4030]/70">
            End of Volume I · Duskbloom Wood
          </p>
        </div>
      </div>
    ),
  },
];
