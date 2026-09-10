'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, X, BookOpen, Heart } from 'lucide-react';
import { useDownloadNotification } from '@/context/DownloadContext';

// Subtle, ethereal fairy chime via Web Audio API
function playMagicChime() {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const now = ctx.currentTime;
    const notes = [659.25, 880, 1046.5]; // E5, A5, C6 (warm magical fairy chord)

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.04, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.85);
    });
  } catch {
    // Audio contexts may be restricted if user hasn't interacted yet; ignore safely
  }
}

export default function MagicDownloadBanner() {
  const { isOpen, details, closeNotification } = useDownloadNotification();
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const duration = 6000; // 6 seconds display

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      return;
    }

    // Play soft magic chime on open
    playMagicChime();

    startTimeRef.current = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (elapsed >= duration) {
        clearInterval(interval);
        closeNotification();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen, closeNotification]);

  return (
    <AnimatePresence>
      {isOpen && (
        <aside
          aria-label="Download Notification"
          className="fixed top-3 sm:top-5 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px] max-w-[95vw] z-[300] pointer-events-none select-none"
        >
          <motion.div
            initial={{ y: -80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.94 }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 28,
              mass: 0.8,
            }}
            className="pointer-events-auto relative overflow-hidden rounded-2xl bg-[#120E22]/95 backdrop-blur-2xl border border-warm-gold/50 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,168,83,0.3)] p-4 sm:p-5 text-cream gpu-layer"
          >
            {/* Top radiant light beam */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-warm-gold to-transparent opacity-80" />

            {/* Glowing fairy aura circles in background */}
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-warm-gold/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-plum/30 rounded-full blur-2xl pointer-events-none" />

            {/* Floating Sparkle Glyphs */}
            <span className="absolute top-2 right-12 text-warm-gold/40 text-xs animate-pulse pointer-events-none">
              ✦
            </span>
            <span className="absolute bottom-3 left-8 text-warm-gold/30 text-xs animate-pulse delay-300 pointer-events-none">
              ✧
            </span>

            {/* Content Row */}
            <div className="relative z-10 flex items-start gap-3.5 sm:gap-4">
              {/* Magic Animated Bloom Star Badge */}
              <div className="relative shrink-0 mt-0.5">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: 'easeInOut',
                  }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-warm-gold/30 via-plum/40 to-warm-gold/10 border border-warm-gold/60 flex items-center justify-center shadow-[0_0_20px_rgba(212,168,83,0.35)]"
                >
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-warm-gold drop-shadow-[0_0_6px_rgba(212,168,83,0.8)]" />
                </motion.div>
                {/* Floating mini heart */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-midnight border border-warm-gold/50 flex items-center justify-center">
                  <Heart size={9} className="text-dusty-rose fill-dusty-rose" />
                </div>
              </div>

              {/* Text Information */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-ui text-[9px] uppercase tracking-[0.25em] text-warm-gold font-bold bg-warm-gold/15 px-2 py-0.5 rounded-full border border-warm-gold/30">
                    Magic Manuscript
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                    <Check size={11} />
                    <span>Saved</span>
                  </span>
                </div>

                <h4 className="font-display text-base sm:text-lg font-bold text-cream tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight">
                  {details.title || 'Oh, Thank You for Downloading!'}
                </h4>

                <p className="font-body text-xs sm:text-[13px] text-lavender/90 leading-snug mt-1 italic">
                  &ldquo;{details.message}&rdquo;
                </p>

                {/* File info badge */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-cream/80">
                    <BookOpen size={12} className="text-warm-gold shrink-0" />
                    <span className="truncate max-w-[180px] sm:max-w-[240px]">
                      {details.filename || 'Jas_of_Duskbloom_FULL.pdf'}
                    </span>
                  </div>
                  <span className="text-[10px] font-ui text-warm-gold/70 tracking-wider">
                    ✦ Duskbloom Wood
                  </span>
                </div>
              </div>

              {/* Close Button with iOS spring press */}
              <button
                type="button"
                onClick={closeNotification}
                className="shrink-0 p-1.5 rounded-full border border-warm-gold/30 text-lavender/70 hover:text-cream hover:bg-white/10 active:scale-90 transition-all duration-150 touch-manipulation cursor-pointer"
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
            </div>

            {/* Bottom Shimmering Gold Progress Line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-warm-gold via-[#FFF2D1] to-warm-gold shadow-[0_0_8px_#D4A853] transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </aside>
      )}
    </AnimatePresence>
  );
}
