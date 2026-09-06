'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Curated subtle sparkles across the celestial banner (controlled quantity: 9 sparkles on desktop, 4 on mobile)
const DESKTOP_SPARKLES = [
  { id: 1, top: '20%', left: '16%', size: 'text-[11px]', delay: 0, duration: 3.8, char: '✦' },
  { id: 2, top: '42%', left: '27%', size: 'text-[9px]', delay: 1.4, duration: 4.2, char: '✧' },
  { id: 3, top: '14%', left: '42%', size: 'text-[12px]', delay: 0.6, duration: 3.5, char: '✦' }, // near crescent moon left
  { id: 4, top: '28%', left: '50%', size: 'text-[9px]', delay: 2.2, duration: 4.0, char: '⋆' },  // beneath moon center
  { id: 5, top: '15%', left: '59%', size: 'text-[11px]', delay: 1.8, duration: 3.6, char: '✦' }, // near crescent moon right
  { id: 6, top: '74%', left: '36%', size: 'text-[8px]', delay: 2.7, duration: 4.5, char: '✧' },
  { id: 7, top: '72%', left: '64%', size: 'text-[8px]', delay: 0.9, duration: 3.9, char: '✧' },
  { id: 8, top: '26%', left: '76%', size: 'text-[10px]', delay: 1.2, duration: 4.1, char: '✦' }, // near calligraphy
  { id: 9, top: '48%', left: '89%', size: 'text-[9px]', delay: 2.9, duration: 3.7, char: '⋆' },  // far right astrolabe
];

const MOBILE_SPARKLES = [
  { id: 'm1', top: '18%', left: '20%', size: 'text-[10px]', delay: 0, duration: 3.2, char: '✦' },
  { id: 'm2', top: '16%', right: '20%', size: 'text-[10px]', delay: 1.2, duration: 3.5, char: '✦' },
  { id: 'm3', bottom: '22%', left: '14%', size: 'text-[8px]', delay: 2.0, duration: 3.8, char: '✧' },
  { id: 'm4', bottom: '20%', right: '14%', size: 'text-[8px]', delay: 0.7, duration: 4.0, char: '✧' },
];

export default function CelestialBanner() {
  return (
    <div className="relative z-20 w-full max-w-6xl mx-auto px-3 sm:px-6 mb-4 sm:mb-6 select-none">
      {/* =========================================================================
          DESKTOP & TABLET: HIGH-RES PANORAMIC CELESTIAL LANDSCAPE ARTWORK (1024x170)
         ========================================================================= */}
      <div className="hidden sm:block relative w-full aspect-[1024/170] min-h-[125px] md:min-h-[165px] rounded-2xl overflow-hidden border border-warm-gold/25 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-midnight group">
        <Image
          src="/images/backgrounds/celestial-banner.png"
          alt="In a realm where loud magic roared like thunder, she listened to the soil - Stories Live Longer Than Silence"
          fill
          priority
          quality={100}
          unoptimized
          className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.01]"
        />

        {/* Soft Vignette & Atmospheric Radial Glows */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/40 via-transparent to-midnight/40 pointer-events-none" />

        {/* Animated Moon Halo Glow in Center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-warm-gold/15 rounded-full blur-2xl pointer-events-none animate-pulse" />

        {/* Castle Spires Glow on Left */}
        <div className="absolute top-2 left-16 w-32 h-20 bg-warm-gold/10 rounded-full blur-xl pointer-events-none" />

        {/* Subtle, Controlled Floating Animated Sparkles (Drifting & Twinkling) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {DESKTOP_SPARKLES.map((sp) => (
            <motion.span
              key={sp.id}
              animate={{
                opacity: [0.2, 0.95, 0.3, 0.9, 0.2],
                scale: [0.75, 1.25, 0.85, 1.15, 0.75],
                y: [0, -7, 1, -4, 0],
                x: [0, 3, -2, 4, 0],
              }}
              transition={{
                duration: sp.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: sp.delay,
              }}
              style={{ top: sp.top, left: sp.left }}
              className={`absolute text-warm-gold ${sp.size} drop-shadow-[0_0_8px_rgba(212,168,83,0.9)] select-none`}
            >
              {sp.char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MOBILE OPTIMIZED VIEW: HIGH-CONTRAST READABLE CELESTIAL STAGE WITH 2 ANIMATED QUOTES
         ========================================================================= */}
      <div className="sm:hidden relative w-full rounded-2xl overflow-hidden border border-warm-gold/25 bg-gradient-to-b from-[#151128] via-midnight to-[#0f0c1e] p-4 shadow-xl text-center">
        {/* Ambient Castle Silhouette Backdrop */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/images/backgrounds/banner-castle.jpg"
            alt="Castle Backdrop"
            fill
            className="object-cover object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-transparent" />
        </div>

        {/* Mobile Animated Sparkles (Controlled quantity, 4 sparkles) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {MOBILE_SPARKLES.map((sp) => (
            <motion.span
              key={sp.id}
              animate={{
                opacity: [0.2, 0.9, 0.2],
                scale: [0.7, 1.2, 0.7],
                y: [0, -5, 0],
              }}
              transition={{
                duration: sp.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: sp.delay,
              }}
              style={{
                top: sp.top,
                bottom: sp.bottom,
                left: sp.left,
                right: sp.right,
              }}
              className={`absolute text-warm-gold ${sp.size} drop-shadow-[0_0_6px_rgba(212,168,83,0.85)]`}
            >
              {sp.char}
            </motion.span>
          ))}
        </div>

        {/* Crescent Moon & Blossom Arch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center justify-center gap-2 mb-2"
        >
          <span className="text-sm">🌸</span>
          <span className="text-base drop-shadow-[0_0_8px_rgba(212,168,83,0.8)]">🌙</span>
          <span className="text-sm">🌸</span>
        </motion.div>

        {/* Quote 1: Animated Soil Verse */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 font-ui text-[10.5px] text-cream/95 uppercase tracking-[0.2em] font-medium leading-relaxed px-1"
        >
          ✦ In a realm where loud magic roared like thunder, she listened to the soil. ✦
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 flex items-center justify-center gap-2 my-2 text-warm-gold/60 text-[10px]"
        >
          <span className="w-8 h-px bg-warm-gold/30" />
          <span>✧</span>
          <span className="w-8 h-px bg-warm-gold/30" />
        </motion.div>

        {/* Quote 2: Animated Calligraphy Verse */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 font-handwritten text-xl text-lavender/90 italic"
        >
          &quot;Stories Live Longer Than Silence&quot;
        </motion.p>
      </div>
    </div>
  );
}
