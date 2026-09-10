'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ROTATING_VERSES = [
  {
    quote: '"A quiet soul in a loud world."',
    shortText: 'A quiet soul in a loud world',
    theme: 'Empathy',
  },
  {
    quote: '"Where flowers remember and quiet magic blooms."',
    shortText: 'Where flowers remember and quiet magic blooms',
    theme: 'Botanical',
  },
  {
    quote: '"Not swords or lightning, but quiet empathy."',
    shortText: 'Not swords or lightning, but quiet empathy',
    theme: 'Kindness',
  },
  {
    quote: '"Seeds planted in stillness outlive empires."',
    shortText: 'Seeds planted in stillness outlive empires',
    theme: 'Memory',
  },
  {
    quote: '"Magic grows in the quietest places."',
    shortText: 'Magic grows in the quietest places',
    theme: 'Sanctuary',
  },
  {
    quote: '"Some companions make the quiet days brighter."',
    shortText: 'Some companions make the quiet days brighter',
    theme: 'Companionship',
  },
  {
    quote: '"The flowers went quiet, and someone listened."',
    shortText: 'The flowers went quiet, and someone listened',
    theme: 'Attunement',
  },
];

/**
 * Custom hook to cycle through verses every 5 seconds (5000ms) with SSR safety
 */
export function useRotatingVerse(intervalMs: number = 5000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_VERSES.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return {
    currentVerse: ROTATING_VERSES[index],
    currentIndex: index,
    totalVerses: ROTATING_VERSES.length,
    setIndex,
  };
}

/**
 * 1. Top Banner (Fixed at the very top of the page / navbar)
 * Sleek iOS dynamic pill / ribbon rotating every 5s with iOS fluid blur-fade
 */
export function TopBannerRotatingRibbon() {
  const { currentVerse, currentIndex } = useRotatingVerse(5000);

  return (
    <div className="w-full bg-[#0B0914]/95 border-b border-warm-gold/20 py-1.5 px-3 flex items-center justify-center select-none overflow-hidden relative z-10">
      {/* Subtle background ambient shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-warm-gold/5 to-transparent pointer-events-none" />

      <div className="flex items-center gap-2 max-w-4xl mx-auto px-2">
        <span className="text-[10px] text-warm-gold/75 shrink-0 animate-pulse select-none">
          ✦
        </span>

        {/* Fixed height container to completely avoid layout shifting */}
        <div className="relative h-4 sm:h-5 flex items-center justify-center overflow-hidden min-w-[200px] sm:min-w-[280px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-ui text-[10px] sm:text-xs text-cream/90 tracking-[0.14em] uppercase font-medium truncate drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
            >
              {currentVerse.shortText}
            </motion.span>
          </AnimatePresence>
        </div>

        <span className="text-[10px] text-warm-gold/75 shrink-0 animate-pulse select-none">
          ✦
        </span>
      </div>
    </div>
  );
}

/**
 * 2. Hero Rotating Quote Banner
 * For the main top hero section, replacing the static quote with
 * smooth iOS blur-dissolve transitions every 5 seconds.
 */
export function HeroRotatingQuote() {
  const { currentVerse, currentIndex, totalVerses, setIndex } = useRotatingVerse(5000);

  return (
    <div className="flex flex-col items-center justify-center mt-2 sm:mt-3 px-2 w-full max-w-xl mx-auto select-none">
      {/* Dynamic Animated Quote Container (Fixed height to guarantee zero layout jump) */}
      <div className="relative min-h-[3rem] sm:min-h-[3.75rem] flex items-center justify-center w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)', scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)', scale: 0.98 }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-handwritten text-lg sm:text-2xl md:text-3xl text-cream/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] text-center leading-snug px-2"
          >
            {currentVerse.quote}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* iOS-Style Pill Dots Navigation Indicator */}
      <div className="flex items-center gap-1.5 mt-1 pointer-events-auto">
        {Array.from({ length: totalVerses }).map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`Jump to verse ${idx + 1}`}
              className="p-1 cursor-pointer touch-manipulation focus:outline-none"
            >
              <motion.div
                animate={{
                  width: isActive ? 18 : 5,
                  backgroundColor: isActive ? '#D4A853' : 'rgba(250, 246, 238, 0.25)',
                  boxShadow: isActive ? '0 0 8px rgba(212,168,83,0.8)' : 'none',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="h-1.5 rounded-full"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
