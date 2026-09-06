'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, RotateCcw, Feather, Bookmark } from 'lucide-react';

interface Spread {
  category: string;
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
}

export function BookViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [pageTurnDirection, setPageTurnDirection] = useState<'next' | 'prev' | null>(null);
  const [isTurning, setIsTurning] = useState(false);

  // Open 3D Animation
  const handleOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 700);
  };

  const handleClose = () => {
    if (isTurning) return;
    setIsOpen(false);
    setCurrentSpread(0);
  };

  // Turn to Next Page (clicking right page)
  const handleNextPage = () => {
    if (isTurning || currentSpread >= SPREADS.length - 1) return;
    setIsTurning(true);
    setPageTurnDirection('next');
    setTimeout(() => {
      setCurrentSpread((prev) => prev + 1);
      setPageTurnDirection(null);
      setIsTurning(false);
    }, 550);
  };

  // Turn to Previous Page (clicking left page)
  const handlePrevPage = () => {
    if (isTurning || currentSpread <= 0) return;
    setIsTurning(true);
    setPageTurnDirection('prev');
    setTimeout(() => {
      setCurrentSpread((prev) => prev - 1);
      setPageTurnDirection(null);
      setIsTurning(false);
    }, 550);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNextPage();
      if (e.key === 'ArrowLeft') handlePrevPage();
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSpread, isTurning]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-4 select-none">
      {/* Category Tabs (Active when open) */}
      <div
        className={`flex flex-wrap justify-center gap-2 mb-8 transition-all duration-500 z-20 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {SPREADS.map((spread, idx) => (
          <button
            key={spread.category}
            onClick={() => {
              if (currentSpread === idx || isTurning) return;
              setIsTurning(true);
              setPageTurnDirection(idx > currentSpread ? 'next' : 'prev');
              setTimeout(() => {
                setCurrentSpread(idx);
                setPageTurnDirection(null);
                setIsTurning(false);
              }, 400);
            }}
            className={`px-3.5 py-1.5 text-xs font-ui tracking-widest rounded-full transition-all duration-300 ${
              currentSpread === idx
                ? 'bg-warm-gold/25 text-warm-gold border border-warm-gold/60 shadow-[0_0_15px_rgba(212,168,83,0.3)]'
                : 'text-lavender/60 hover:text-lavender hover:bg-white/5 border border-transparent'
            }`}
          >
            {spread.category}
          </button>
        ))}
      </div>

      {/* 3D Master Stage */}
      <div
        className="relative w-full flex flex-col items-center justify-center min-h-[490px] sm:min-h-[580px] overflow-visible"
        style={{ perspective: '2200px' }}
      >
        {/* Ambient Desk Table Glow & Shadow */}
        <div className="absolute w-[680px] sm:w-[860px] h-[340px] rounded-full bg-black/60 blur-3xl pointer-events-none -bottom-8" />

        {/* =========================================================================
            STATE A: 3D CLOSED LEATHER BOOK COVER
           ========================================================================= */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: isOpening ? 1.05 : 1,
              rotateY: isOpening ? -75 : 0,
              opacity: isOpening ? 0.4 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            onClick={handleOpen}
            className="group relative cursor-pointer w-[300px] sm:w-[380px] h-[440px] sm:h-[530px] rounded-r-2xl rounded-l-md shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,168,83,0.15)] border border-warm-gold/40 select-none overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1C1326 0%, #0F0A17 60%, #170E21 100%)',
              transformOrigin: 'left center',
            }}
          >
            {/* Spine Depth & Ribs (Left Edge) */}
            <div
              className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 rounded-l-md bg-gradient-to-r from-[#0B0711] via-[#1F142B] to-[#120B1A] border-r border-warm-gold/40 flex flex-col justify-around py-12"
              style={{
                boxShadow: 'inset 3px 0 10px rgba(0,0,0,0.8), -8px 0 20px rgba(0,0,0,0.7)',
              }}
            >
              <div className="w-full h-1 bg-warm-gold/40 border-t border-b border-black/50" />
              <div className="w-full h-1 bg-warm-gold/40 border-t border-b border-black/50" />
              <div className="w-full h-1 bg-warm-gold/40 border-t border-b border-black/50" />
              <div className="w-full h-1 bg-warm-gold/40 border-t border-b border-black/50" />
            </div>

            {/* Hanging Silk Bookmark Ribbon */}
            <div className="absolute -bottom-10 left-12 w-6 h-14 bg-gradient-to-b from-[#8B263E] to-[#631B2D] shadow-lg rounded-b-sm transform rotate-2 z-10 border-t border-warm-gold/30" />

            {/* Ornate Gold Filigree Corners */}
            <div className="absolute top-4 right-4 text-warm-gold/70 text-2xl select-none">╗</div>
            <div className="absolute bottom-4 right-4 text-warm-gold/70 text-2xl select-none">╝</div>
            <div className="absolute top-4 left-12 text-warm-gold/70 text-2xl select-none">╔</div>
            <div className="absolute bottom-4 left-12 text-warm-gold/70 text-2xl select-none">╚</div>

            {/* Inset Gold Foil Border */}
            <div className="absolute inset-4 sm:inset-5 left-11 sm:left-14 border border-warm-gold/30 rounded-r-xl rounded-l-sm pointer-events-none" />

            {/* Book Cover Core Content */}
            <div className="h-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-12 flex flex-col items-center justify-between text-center relative z-10">
              <div className="flex items-center gap-2 text-warm-gold/70 font-ui text-[10px] tracking-[0.3em] uppercase">
                <span>✦</span>
                <span>Athenaeum Grimoire</span>
                <span>✦</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full border-2 border-warm-gold/40 p-2 relative flex items-center justify-center shadow-[0_0_25px_rgba(212,168,83,0.2)] group-hover:scale-105 transition-transform duration-500">
                  <span className="text-3xl text-warm-gold/80 animate-pulse">❈</span>
                </div>

                <h1
                  className="font-display text-2xl sm:text-3xl text-warm-gold tracking-[0.18em] uppercase max-w-full px-2"
                  style={{
                    textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(212,168,83,0.4)',
                  }}
                >
                  BLOOMVERSE
                </h1>

                <p className="font-handwritten text-xl sm:text-2xl text-cream/80 italic">
                  Journal of Jasira Veyra
                </p>

                <p className="font-ui text-[10px] tracking-[0.25em] text-lavender/60 uppercase">
                  Volume I · The Quiet Verses
                </p>
              </div>

              {/* Cover Bottom Insignia (Clean Antique Tome) */}
              <div className="flex flex-col items-center gap-1.5 opacity-70">
                <div className="w-12 h-[1px] bg-warm-gold/50" />
                <span className="font-ui text-[9px] tracking-[0.3em] uppercase text-warm-gold/80">
                  Royal Athenaeum Grimoire
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Button OUTSIDE the journal (as requested below the book) */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-8 flex flex-col items-center gap-2 z-20"
          >
            <button
              onClick={handleOpen}
              className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-warm-gold/25 via-warm-gold/35 to-warm-gold/25 hover:from-warm-gold hover:to-warm-gold border-2 border-warm-gold/70 text-warm-gold hover:text-midnight shadow-[0_0_30px_rgba(212,168,83,0.35)] hover:shadow-[0_0_45px_rgba(212,168,83,0.7)] font-ui text-xs sm:text-sm tracking-[0.25em] uppercase font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles size={16} className="text-warm-gold group-hover:text-midnight" />
              <span>Click to Open Journal</span>
              <Sparkles size={16} className="text-warm-gold group-hover:text-midnight" />
            </button>
            <p className="font-ui text-[10px] sm:text-xs text-cream/50 tracking-widest uppercase">
              ✦ Tap grimoire or button to unlock the chronicles ✦
            </p>
          </motion.div>
        )}

        {/* =========================================================================
            STATE B: 3D OPEN TWO-PAGE SPREAD WITH INTERACTIVE 3D PAGE TURNING
           ========================================================================= */}
        {isOpen && (
          <motion.div
            initial={{ scale: 0.92, opacity: 0, rotateX: 6 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-[340px] sm:w-[680px] md:w-[800px] h-[470px] sm:h-[550px] rounded-lg shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden border border-[#5B4030]/50"
            style={{
              background:
                'linear-gradient(to right, #E5D6B9 0%, #DED0B0 48%, #BDB092 50%, #DED0B0 52%, #E5D6B9 100%)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Center Spine Shadow Gradient */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-30 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.25) 100%)',
              }}
            />

            {/* Silken Bookmark Ribbon */}
            <div className="absolute left-1/2 -top-2 w-3 sm:w-4 h-full pointer-events-none z-30 transform -translate-x-1/2">
              <div className="w-full h-full bg-gradient-to-b from-[#8B263E] via-[#6E1C2F] to-[#501321] opacity-75 shadow-md" />
            </div>

            {/* ----------------- LEFT PAGE (CLICK TO FLIP PREVIOUS) ----------------- */}
            <div
              onClick={handlePrevPage}
              className={`absolute left-0 top-0 bottom-0 w-1/2 p-6 sm:p-10 flex flex-col justify-between border-r border-[#5B4030]/20 bg-[#F4EAD4] text-ink z-10 ${
                currentSpread > 0 ? 'cursor-pointer hover:bg-[#EFE3CA] transition-colors group' : ''
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

              {/* Left Page Content (100% clean, NO mirrored bleeding text) */}
              <div className="flex-1 overflow-y-auto no-scrollbar py-3">
                {SPREADS[currentSpread].leftPage}
              </div>

              {/* Left Page Footer */}
              <div className="pt-3 border-t border-[#5B4030]/15 flex items-center justify-between font-ui text-[11px] text-[#8D6860]/70">
                <span>Athenaeum Vault</span>
                <span>{currentSpread * 2 + 1}</span>
              </div>
            </div>

            {/* ----------------- RIGHT PAGE (CLICK TO FLIP NEXT) ----------------- */}
            <div
              onClick={handleNextPage}
              className={`absolute right-0 top-0 bottom-0 w-1/2 p-6 sm:p-10 flex flex-col justify-between bg-[#F4EAD4] text-ink z-10 ${
                currentSpread < SPREADS.length - 1 ? 'cursor-pointer hover:bg-[#EFE3CA] transition-colors group' : ''
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

            {/* ----------------- 3D FLIPPING PAGE LEAF ANIMATION ----------------- */}
            <AnimatePresence>
              {pageTurnDirection === 'next' && (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.25, 1, 0.4, 1] }}
                  className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#EDE1C5] shadow-2xl z-20 origin-left pointer-events-none border border-[#5B4030]/30"
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Dynamic Curving Shadow on Turning Page */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
                </motion.div>
              )}

              {pageTurnDirection === 'prev' && (
                <motion.div
                  initial={{ rotateY: -180 }}
                  animate={{ rotateY: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.25, 1, 0.4, 1] }}
                  className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#EDE1C5] shadow-2xl z-20 origin-right pointer-events-none border border-[#5B4030]/30"
                  style={{
                    transformOrigin: 'right center',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/10" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Navigation Controls Bar */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between w-full max-w-2xl mt-8 px-4 py-3 rounded-full bg-midnight/85 border border-warm-gold/40 backdrop-blur-md shadow-2xl"
        >
          <button
            onClick={handlePrevPage}
            disabled={currentSpread === 0 || isTurning}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-ui tracking-wider uppercase text-cream hover:text-warm-gold hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="font-ui text-xs tracking-widest text-warm-gold font-semibold">
              {currentSpread + 1} / {SPREADS.length}
            </span>

            <button
              onClick={handleClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-warm-gold/50 text-warm-gold hover:bg-warm-gold/20 font-ui text-[11px] tracking-widest uppercase transition-all"
            >
              <RotateCcw size={12} />
              <span>Close Journal</span>
            </button>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentSpread === SPREADS.length - 1 || isTurning}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-ui tracking-wider uppercase text-cream hover:text-warm-gold hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </motion.div>
      )}
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
      <div className="space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">Journal Entry #01</span>
          <h2 className="font-handwritten text-3xl text-[#2D1B3D]">Jasira Veyra</h2>
        </div>
        <p className="font-body text-sm leading-relaxed">
          "A quiet soul in a loud world."
        </p>
        <p className="font-body text-xs text-[#2A211C]/80 leading-relaxed">
          I've stopped expecting my noticing to matter. People in Duskbloom are drawn to things that ignite the sky
          or raise crystalline shields against the dark. When you can only make small warm light, they ask you to
          keep the little ones calm.
        </p>
        <div className="p-3 bg-[#E5D6B9]/70 rounded border border-[#5B4030]/20 font-handwritten text-base text-[#8D6860] leading-snug">
          "The flowers went quiet today, and I still don't know why I'm the only one who noticed."
        </div>
      </div>
    ),
    rightPage: (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">Field Equipment</span>
          <Feather size={14} className="text-[#8D6860]" />
        </div>
        <ul className="font-body text-xs space-y-2 text-[#2A211C]/90">
          <li><strong>Spectacles:</strong> Round silver-gold wireframes (Mother's gift).</li>
          <li><strong>Ribbons:</strong> Twin pink satin bows pinned above ears.</li>
          <li><strong>Ink:</strong> Lilac-distilled duskbloom extract.</li>
          <li><strong>Duty:</strong> Keeper of the Athenaeum Botanical Vaults.</li>
        </ul>
        <div className="mt-4 p-3 rounded bg-[#DED0B0]/50 border border-[#5B4030]/20">
          <p className="font-handwritten text-sm text-[#5B4030] leading-relaxed">
            Note to self: The third drawer contains seven pressed lunar roses. They still haven't withered.
          </p>
        </div>
      </div>
    ),
  },

  // Spread 2: Duskbloom Wood & Lore
  {
    category: 'DUSKBLOOM LORE',
    leftPage: (
      <div className="space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">Topographical Log</span>
          <h2 className="font-display text-2xl text-[#2D1B3D]">Duskbloom Wood</h2>
        </div>
        <p className="font-body text-xs leading-relaxed text-[#2A211C]/85">
          By day, the canopy is quiet, tinted the soft grey of weathered parchment. But the instant the moon clears the
          treeline, the entire wood remembers what it actually was: every flower opens at once, breathing lilac fog into
          the night.
        </p>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-ui text-[#5B4030]">
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
      <div className="space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">Sanctuary Record</span>
          <h2 className="font-display text-2xl text-[#2D1B3D]">The Grand Athenaeum</h2>
        </div>
        <p className="font-body text-xs leading-relaxed text-[#2A211C]/85">
          Half library, half living conservatory. Roots of monumental ironwood trees weave between ancient bookshelves,
          holding centuries of elven wisdom.
        </p>
        <blockquote className="font-handwritten text-base text-[#8D6860] border-l-2 border-[#8D6860]/40 pl-3 italic">
          "A book is never truly alone so long as dust motes keep its company."
        </blockquote>
      </div>
    ),
  },

  // Spread 3: Petal Magic / Verse
  {
    category: 'PETAL MAGIC',
    leftPage: (
      <div className="space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">Magical Theory</span>
          <h2 className="font-display text-2xl text-[#2D1B3D]">The Verse System</h2>
        </div>
        <p className="font-body text-xs leading-relaxed text-[#2A211C]/85">
          Elves do not cast spells with blades or wands. Magic lives in feeling — a private well inside each of them
          called a Verse, bound to whatever truth they hold closest in their chest.
        </p>
        <div className="space-y-1.5 text-xs font-body text-[#2A211C]/90">
          <p>• <strong>Flame Verses:</strong> Fuelled by wrath.</p>
          <p>• <strong>Barrier Verses:</strong> Born from instinct to protect.</p>
          <p>• <strong>Petal Verses:</strong> Quiet restoration through empathy.</p>
        </div>
      </div>
    ),
    rightPage: (
      <div className="space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">Field Observation</span>
          <h2 className="font-handwritten text-2xl text-[#2D1B3D]">Restoring Vanished Ink</h2>
        </div>
        <p className="font-body text-xs leading-relaxed text-[#2A211C]/85">
          When my fingertips touch an erased page, lilac light traces the missing calligraphy back into existence. It is
          not recreation; it is remembrance.
        </p>
        <div className="p-3 bg-[#E5D6B9]/70 rounded border border-[#5B4030]/20 text-center">
          <span className="font-handwritten text-lg text-[#8D6860] block mb-1">
            "You cannot fight an ending with a sword."
          </span>
          <span className="font-ui text-[9px] tracking-wider uppercase text-[#5B4030]/70">
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
      <div className="space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">Companion Dossier</span>
          <h2 className="font-handwritten text-3xl text-[#2D1B3D]">Mochi</h2>
        </div>
        <p className="font-body text-xs leading-relaxed text-[#2A211C]/85">
          A chubby brown plush companion with ears that swivel toward whatever matters. He refuses to leave my hood
          when it rains.
        </p>
        <div className="p-2.5 bg-white/50 rounded border border-[#5B4030]/20 space-y-1 text-xs font-body">
          <p><strong>Favorite Food:</strong> Sugar-glazed petals.</p>
          <p><strong>Habit:</strong> Hoarding shiny pebbles.</p>
          <p><strong>Role:</strong> Keeper of Jasira's courage.</p>
        </div>
      </div>
    ),
    rightPage: (
      <div className="space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">Candid Moment</span>
          <h2 className="font-display text-2xl text-[#2D1B3D]">A Night in the Square</h2>
        </div>
        <p className="font-body text-xs leading-relaxed text-[#2A211C]/85">
          "Orlei bought us candy. Ren sat beside us, steady as the earth. Mochi had sugar on his whiskers. Nobody
          needed saving."
        </p>
        <div className="mt-4 p-3 rounded bg-[#DED0B0]/50 border border-[#5B4030]/20 font-handwritten text-base text-[#8D6860] leading-snug text-center">
          "Some companions make the quiet days brighter."
        </div>
      </div>
    ),
  },

  // Spread 5: The Unwritten Rifts
  {
    category: 'THE RIFTS',
    leftPage: (
      <div className="space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">Chronicle of Crisis</span>
          <h2 className="font-display text-2xl text-[#2D1B3D]">The Vanishing Endings</h2>
        </div>
        <p className="font-body text-xs leading-relaxed text-[#2A211C]/85">
          Something east in the wood was actively unwriting stories — believing that if a story never finished, it
          could never be lost.
        </p>
        <div className="p-2.5 bg-red-950/10 rounded border border-red-900/20 text-xs font-body text-[#5B4030]">
          <strong>Warning:</strong> Force only deepens the erasure.
        </div>
      </div>
    ),
    rightPage: (
      <div className="space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">Grandmother's Journal</span>
          <h2 className="font-handwritten text-2xl text-[#2D1B3D]">Underlined Twice</h2>
        </div>
        <div className="p-3 bg-[#E5D6B9]/80 rounded border border-[#8D6860]/40 font-handwritten text-base text-[#2D1B3D] leading-relaxed">
          "The wood will not be saved by the loudest power in it. It will be saved by the one who never stopped trying."
        </div>
      </div>
    ),
  },

  // Spread 6: The Secret Prophecy
  {
    category: 'THE PROPHECY',
    leftPage: (
      <div className="space-y-4">
        <div className="border-b border-[#5B4030]/20 pb-2">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">The Final Page</span>
          <h2 className="font-display text-2xl text-[#2D1B3D]">An Ending Written for You</h2>
        </div>
        <div className="p-3 bg-white/70 rounded border border-[#5B4030]/30 font-handwritten text-sm text-[#2D1B3D] leading-relaxed">
          "This whole world was written for you... because somebody wanted you to see that your quiet magic has always
          been the realest power in the room."
        </div>
      </div>
    ),
    rightPage: (
      <div className="h-full flex flex-col justify-between text-center py-4">
        <div className="space-y-3">
          <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">Official Archive Seal</span>
          <div className="w-14 h-14 mx-auto rounded-full bg-[#8B263E] border-2 border-warm-gold/60 shadow-lg flex items-center justify-center text-warm-gold text-xl">
            ✦
          </div>
          <h3 className="font-display text-xl text-[#2D1B3D]">Bloomverse Keeper</h3>
          <p className="font-handwritten text-base text-[#8D6860]">
            "An ending makes a story permanent."
          </p>
        </div>

        <div className="pt-3 border-t border-[#5B4030]/20">
          <p className="font-ui text-[9px] tracking-widest uppercase text-[#5B4030]/70">
            End of Volume I · Duskbloom Wood
          </p>
        </div>
      </div>
    ),
  },
];
