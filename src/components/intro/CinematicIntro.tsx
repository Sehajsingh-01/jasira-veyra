'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen } from 'lucide-react';

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

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [stage, setStage] = useState(1);
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

  useEffect(() => {
    // Prevent accidental touch dismissal for the first 1.2s on mobile
    const tProtect = setTimeout(() => setCanTapToDismiss(true), 1200);

    // Ultra-smooth stage progression
    const t1 = setTimeout(() => setStage(2), 1400); // Reveal Quote 2
    const t2 = setTimeout(() => setIsDismissing(true), 4600); // Start buttery dissolve
    const t3 = setTimeout(() => onComplete(), 5300); // Complete

    return () => {
      clearTimeout(tProtect);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsDismissing(true);
    setTimeout(() => onComplete(), 300);
  };

  const handleBackdropClick = () => {
    handleSkip();
  };

  // Ambient fairy starlight particles
  const fairyDust = Array.from({ length: 18 });

  return (
    <AnimatePresence>
      <motion.div
        key="magic-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDismissing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[100] w-screen h-screen min-h-[100dvh] flex flex-col items-center justify-center bg-[#07050E] overflow-hidden select-none px-4 sm:px-6 cursor-default ${
          isDismissing ? 'pointer-events-none' : ''
        }`}
      >
        {/* Skip button for quick bypassing */}
        <motion.button
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-warm-gold/20 border border-white/15 hover:border-warm-gold/50 text-cream/80 hover:text-warm-gold font-ui text-[10px] sm:text-xs tracking-widest uppercase backdrop-blur-md transition-all cursor-pointer shadow-lg"
        >
          <span>Skip ✦</span>
        </motion.button>

        {/* Fairy Dust & Twinkling Starlight */}
        {fairyDust.map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: (i % 3) * 2 + 3,
              height: (i % 3) * 2 + 3,
              left: `${(i * 19 + 7) % 94}%`,
              top: `${(i * 29 + 11) % 92}%`,
              background:
                i % 2 === 0
                  ? 'radial-gradient(circle, #F5EDE0 0%, rgba(212,168,83,0.8) 60%, transparent 100%)'
                  : 'radial-gradient(circle, #D4A853 0%, rgba(184,169,201,0.6) 70%, transparent 100%)',
              boxShadow: '0 0 10px rgba(212, 168, 83, 0.5)',
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.85, 0.2],
              scale: [0.85, 1.25, 0.85],
            }}
            transition={{
              duration: 3.5 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Ambient Warm Golden & Amethyst Glow */}
        <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-warm-gold/10 blur-[100px] sm:blur-[130px] pointer-events-none" />
        <div className="absolute w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full bg-plum/25 blur-[90px] sm:blur-[120px] pointer-events-none" />

        {/* Storyteller Quotes Container (Tuned for both mobile phones and laptops) */}
        <div className="relative z-10 w-full max-w-2xl text-center space-y-4 sm:space-y-6 px-2 sm:px-4">
          {/* Ornate Grimoire Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="px-1"
          >
            <p className="font-handwritten text-xl sm:text-3xl md:text-4xl text-cream/95 leading-relaxed drop-shadow-[0_2px_15px_rgba(212,168,83,0.35)]">
              {selectedQuote.first}
            </p>
          </motion.div>

          {/* Quote 2: The Bloomverse Magic */}
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2 pt-3 border-t border-warm-gold/25 px-1"
            >
              <p className="font-handwritten text-lg sm:text-2xl md:text-3xl text-lavender/95 leading-relaxed drop-shadow-[0_2px_15px_rgba(184,169,201,0.35)]">
                {selectedQuote.second}
              </p>
            </motion.div>
          )}

          {/* Gentle Dismiss Tip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: canTapToDismiss ? 0.6 : 0.2 }}
            transition={{ duration: 0.4 }}
            className="pt-2 sm:pt-4"
          >
            <span className="font-ui text-[8.5px] sm:text-[10px] tracking-[0.25em] uppercase text-cream/40">
              ✦ Tap to enter the Bloomverse ✦
            </span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
