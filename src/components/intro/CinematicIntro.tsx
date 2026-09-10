'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, Heart } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

interface QuotePair {
  badge: string;
  first: string;
  second: string;
}

const MAGIC_QUOTE_PAIRS: QuotePair[] = [
  {
    badge: 'Athenaeum Grimoire · Arc I',
    first: '"Within the quiet pages of the grimoire, words do not sleep — they wait for the one who listens."',
    second: '"...and when she opened the book, what the world forgot began to bloom once more."',
  },
  {
    badge: 'The Verse of Soil & Sky',
    first: '"Where others sought spells that shook the thunder, she searched for the verses that healed the roots."',
    second: '"...in the ancient ironwood vaults, the quietest heart held the deepest truth."',
  },
  {
    badge: 'The Duskbloom Letters',
    first: '"An ending is never the death of a tale — it is simply the ink waiting to be rewritten."',
    second: '"...she touched the fading parchment, and Duskbloom\'s silent roses breathed again."',
  },
  {
    badge: 'The Living Grimoire',
    first: '"Some books are sealed not with locks or silver clasps, but with the silence of centuries."',
    second: '"...she turned the first golden page, and the lost magic remembered her name."',
  },
  {
    badge: 'The Keeper\'s Solace',
    first: '"Magic never truly vanished from Duskbloom — it only waited for hands gentle enough to hold it."',
    second: '"...between the sunlit wisteria and the lake, a quiet soul awakened the sleeping verse."',
  },
  {
    badge: 'The Eastern Grove Chronicle',
    first: '"The loudest voices carve statues in stone, but the quiet soul plants seeds that outlive empires."',
    second: '"...with Mochi by her side, the grimoire unfolded the forgotten path into the light."',
  },
];

// Fixed lightweight fairy dust coordinates for 60/120fps GPU compositing
const FAIRY_DUST = [
  { left: '12%', top: '22%', size: 3, delay: 0, dur: 4.2 },
  { left: '85%', top: '18%', size: 4, delay: 0.8, dur: 5.1 },
  { left: '22%', top: '78%', size: 3, delay: 1.5, dur: 4.8 },
  { left: '78%', top: '74%', size: 4, delay: 0.4, dur: 4.5 },
  { left: '50%', top: '14%', size: 4, delay: 1.2, dur: 5.5 },
  { left: '90%', top: '55%', size: 3, delay: 2.1, dur: 4.0 },
  { left: '10%', top: '50%', size: 4, delay: 1.8, dur: 4.9 },
  { left: '65%', top: '30%', size: 3, delay: 0.6, dur: 5.2 },
];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [isDismissing, setIsDismissing] = useState(false);
  const [canTapToDismiss, setCanTapToDismiss] = useState(false);

  // Pick a random pair that is different from the previous reload
  const selectedQuote = useMemo(() => {
    let lastIdx = -1;
    if (typeof window !== 'undefined') {
      try {
        lastIdx = parseInt(sessionStorage.getItem('last-quote-idx') || '-1', 10);
      } catch {
        // ignore
      }
    }

    let nextIdx = Math.floor(Math.random() * MAGIC_QUOTE_PAIRS.length);
    if (nextIdx === lastIdx) {
      nextIdx = (nextIdx + 1) % MAGIC_QUOTE_PAIRS.length;
    }

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('last-quote-idx', nextIdx.toString());
      } catch {
        // ignore
      }
    }

    return MAGIC_QUOTE_PAIRS[nextIdx];
  }, []);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Enable tap-to-dismiss after brief initial render protection
    const tProtect = setTimeout(() => setCanTapToDismiss(true), 300);
    return () => clearTimeout(tProtect);
  }, []);

  const handleDismiss = () => {
    if (isDismissing) return;
    setIsDismissing(true);
    setTimeout(() => {
      onCompleteRef.current();
    }, 600);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="magic-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDismissing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleDismiss}
        onTouchEnd={(e) => {
          if (canTapToDismiss) {
            e.preventDefault();
            handleDismiss();
          }
        }}
        className={`fixed inset-0 z-[100] w-screen h-[100dvh] flex flex-col items-center justify-center bg-[#07050E] overflow-hidden select-none px-4 sm:px-6 cursor-pointer touch-manipulation ${
          isDismissing ? 'pointer-events-none' : ''
        }`}
      >
        {/* Skip button for quick bypassing */}
        <motion.button
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDismiss();
          }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-warm-gold/20 border border-white/15 hover:border-warm-gold/50 text-cream/80 hover:text-warm-gold font-ui text-[10px] sm:text-xs tracking-widest uppercase backdrop-blur-md transition-all cursor-pointer shadow-lg touch-manipulation"
        >
          <span>Skip ✦</span>
        </motion.button>

        {/* Fairy Dust & Twinkling Starlight (GPU Composited) */}
        {FAIRY_DUST.map((d, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: d.size,
              height: d.size,
              left: d.left,
              top: d.top,
              background:
                i % 2 === 0
                  ? 'radial-gradient(circle, #F5EDE0 0%, rgba(212,168,83,0.9) 60%, transparent 100%)'
                  : 'radial-gradient(circle, #D4A853 0%, rgba(184,169,201,0.7) 70%, transparent 100%)',
              willChange: 'transform, opacity',
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.85, 0.2],
            }}
            transition={{
              duration: d.dur,
              delay: d.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Ambient Warm Golden & Amethyst Glow */}
        <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-warm-gold/10 blur-[100px] sm:blur-[130px] pointer-events-none" />
        <div className="absolute w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full bg-plum/25 blur-[90px] sm:blur-[120px] pointer-events-none" />

        {/* Storyteller Quotes Container (Zero layout shift, 120Hz/60Hz smooth) */}
        <div className="relative z-10 w-full max-w-2xl text-center space-y-4 sm:space-y-6 px-2 sm:px-4">
          {/* Ornate Grimoire Header */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'opacity, transform' }}
            className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-warm-gold/10 border border-warm-gold/30 backdrop-blur-sm"
          >
            <BookOpen size={12} className="text-warm-gold" />
            <span className="font-ui text-[9px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-warm-gold font-semibold">
              {selectedQuote.badge}
            </span>
            <Sparkles size={12} className="text-warm-gold animate-pulse" />
          </motion.div>

          {/* Quote 1: The Magic Book */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'opacity, transform' }}
            className="px-1"
          >
            <p
              className="font-handwritten text-xl sm:text-3xl md:text-4xl text-cream/95 leading-relaxed"
              style={{ textShadow: '0 2px 14px rgba(212, 168, 83, 0.35)' }}
            >
              {selectedQuote.first}
            </p>
          </motion.div>

          {/* Quote 2: The Bloomverse Magic (Always in DOM layout -> ZERO jump or jank, fluid fade-in) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'opacity, transform' }}
            className="space-y-2 pt-3 border-t border-warm-gold/25 px-1"
          >
            <p
              className="font-handwritten text-lg sm:text-2xl md:text-3xl text-lavender/95 leading-relaxed"
              style={{ textShadow: '0 2px 14px rgba(184, 169, 201, 0.35)' }}
            >
              {selectedQuote.second}
            </p>
          </motion.div>

          {/* Dedication & Tap Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'opacity, transform' }}
            className="pt-3 sm:pt-4 flex flex-col items-center gap-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-gold/10 border border-warm-gold/25 shadow-[0_0_12px_rgba(212,168,83,0.18)] backdrop-blur-sm">
              <span
                className="font-handwritten text-sm sm:text-base text-warm-gold/90 font-medium tracking-wide"
                style={{ textShadow: '0 0 8px rgba(212, 168, 83, 0.4)' }}
              >
                Love by Sehajshii
              </span>
              <Heart size={13} className="text-warm-gold/90 stroke-[1.6] fill-none" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-1.5 text-cream/60 animate-pulse pt-0.5"
            >
              <Sparkles size={11} className="text-warm-gold/70" />
              <span className="font-ui text-[8.5px] sm:text-[10px] tracking-[0.28em] uppercase">
                Tap anywhere to enter ✦
              </span>
              <Sparkles size={11} className="text-warm-gold/70" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
