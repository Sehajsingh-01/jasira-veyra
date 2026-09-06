'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [stage, setStage] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = setTimeout(() => onComplete(), 2000);
      return () => clearTimeout(timer);
    }

    const sequence = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 4500),
      setTimeout(() => setStage(4), 7000),
      setTimeout(() => setStage(5), 9500),
      setTimeout(() => onComplete(), 11000),
    ];

    return () => sequence.forEach(clearTimeout);
  }, [onComplete, prefersReducedMotion]);

  const particles = Array.from({ length: 20 });
  const petals = Array.from({ length: 6 });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 5 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        {stage >= 1 && !prefersReducedMotion && (
          <>
            {particles.map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-cream/20"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: 'easeInOut' as const,
                }}
              />
            ))}
            {petals.map((_, i) => (
              <motion.svg
                key={`petal-${i}`}
                className="absolute text-lavender/10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                animate={{
                  y: [0, 50],
                  x: [0, Math.random() * 30 - 15],
                  rotate: [0, 90],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
              </motion.svg>
            ))}
          </>
        )}

        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <AnimatePresence mode="wait">
            {stage === 2 && (
              <motion.p
                key="text1"
                className="font-[family-name:var(--font-handwritten)] text-3xl md:text-5xl text-lavender"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
              >
                Some stories are not meant to be loud.
              </motion.p>
            )}
            {stage === 3 && (
              <motion.p
                key="text2"
                className="font-[family-name:var(--font-handwritten)] text-3xl md:text-5xl text-lavender"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
              >
                Some are simply meant to be remembered.
              </motion.p>
            )}
            {stage >= 4 && stage < 5 && (
              <motion.div
                key="title"
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5 }}
              >
                <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-warm-gold drop-shadow-[0_0_15px_rgba(212,168,83,0.3)] tracking-wider">
                  JASIRA VEYRA
                </h1>
                <p className="font-[family-name:var(--font-handwritten)] text-2xl text-lavender mt-2">
                  Bloomverse
                </p>
                <p className="font-[family-name:var(--font-ui)] text-sm tracking-widest text-cream/50 mt-6 uppercase">
                  A Quiet Soul in a Loud World.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => onComplete()}
          className="absolute bottom-8 right-8 text-cream/30 hover:text-cream/60 font-[family-name:var(--font-ui)] text-sm transition-colors"
        >
          Skip &rarr;
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
