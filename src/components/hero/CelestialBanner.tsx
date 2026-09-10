'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SparkleData {
  id: string | number;
  top: string;
  left?: string;
  right?: string;
  size: number;
  delay: number;
  duration: number;
  mobileVisible?: boolean;
}

// Curated radiant fairy stars strategically positioned over magical elements
const CELESTIAL_SPARKLES: SparkleData[] = [
  // 1. Crescent Moon & Arch Center
  { id: 'moon-center', top: '15%', left: '49%', size: 18, delay: 0.1, duration: 3.2, mobileVisible: true },
  { id: 'moon-left', top: '12%', left: '42%', size: 15, delay: 1.4, duration: 3.8, mobileVisible: true },
  { id: 'moon-right', top: '14%', left: '57%', size: 16, delay: 0.8, duration: 3.5, mobileVisible: true },
  { id: 'moon-below', top: '38%', left: '50%', size: 13, delay: 2.2, duration: 4.1, mobileVisible: false },
  
  // 2. Illuminated Castle Spires & Mountain Crest (Left side)
  { id: 'castle-spire', top: '22%', left: '12%', size: 17, delay: 0.4, duration: 3.6, mobileVisible: true },
  { id: 'castle-bridge', top: '48%', left: '20%', size: 13, delay: 1.8, duration: 4.2, mobileVisible: false },
  { id: 'mountain-peak', top: '32%', left: '28%', size: 14, delay: 2.6, duration: 3.9, mobileVisible: false },
  
  // 3. Golden Calligraphy & Wisteria Flowers (Right side)
  { id: 'calligraphy-wisp', top: '26%', left: '81%', size: 16, delay: 0.9, duration: 3.7, mobileVisible: true },
  { id: 'right-lantern', top: '42%', left: '92%', size: 15, delay: 1.6, duration: 3.4, mobileVisible: true },
  { id: 'wisteria-cluster', top: '65%', left: '76%', size: 12, delay: 2.1, duration: 4.0, mobileVisible: false },
  
  // 4. Lake Reflection & Water Mists (Lower middle)
  { id: 'lake-glow-1', top: '72%', left: '40%', size: 12, delay: 1.1, duration: 4.3, mobileVisible: false },
  { id: 'lake-glow-2', top: '70%', left: '62%', size: 13, delay: 2.8, duration: 3.8, mobileVisible: false },
];

function RadiantFairyStar({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="filter drop-shadow-[0_0_6px_#FFF4C2] drop-shadow-[0_0_12px_rgba(212,168,83,0.9)]"
    >
      <defs>
        <radialGradient id={`starRad-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FFF2B2" />
          <stop offset="75%" stopColor="#E5B842" />
          <stop offset="100%" stopColor="#B38622" />
        </radialGradient>
      </defs>
      {/* 4-point primary diamond ray */}
      <path
        d="M12 0 C12 6.8 15.2 12 22 12 C15.2 12 12 17.2 12 24 C12 17.2 8.8 12 2 12 C8.8 12 12 6.8 12 0 Z"
        fill={`url(#starRad-${size})`}
      />
      {/* Secondary diagonal sparkle accents */}
      <path
        d="M12 5 C12 9 14.5 12 18.5 12 C14.5 12 12 15 12 19 C12 15 9.5 12 5.5 12 C9.5 12 12 9 12 5 Z"
        fill="#FFFDF0"
        opacity="0.85"
      />
      {/* Brilliant core jewel */}
      <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" />
    </svg>
  );
}

export default function CelestialBanner() {
  return (
    <div className="relative z-20 w-full max-w-6xl mx-auto px-3 sm:px-6 mb-4 sm:mb-6 select-none">
      {/* High-Resolution Panoramic Celestial Banner Artwork (Displayed on BOTH Desktop & Phone) */}
      <div className="relative w-full aspect-[1024/220] sm:aspect-[1024/170] min-h-[75px] xs:min-h-[95px] sm:min-h-[135px] md:min-h-[165px] rounded-xl sm:rounded-2xl overflow-hidden border border-warm-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-midnight group">
        <Image
          src="/images/backgrounds/celestial-banner.png"
          alt="In a realm where loud magic roared like thunder, she listened to the soil - Stories Live Longer Than Silence"
          fill
          priority
          quality={100}
          sizes="100vw"
          unoptimized
          className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.01]"
        />

        {/* Soft Vignette along edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/40 via-transparent to-midnight/40 pointer-events-none" />

        {/* Animated Moon Halo Glow in Center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 sm:w-56 h-14 sm:h-24 bg-warm-gold/20 rounded-full blur-xl sm:blur-2xl pointer-events-none animate-pulse" />

        {/* Castle Spires Ambient Glow on Left */}
        <div className="absolute top-2 left-6 sm:left-16 w-24 sm:w-36 h-14 sm:h-20 bg-warm-gold/15 rounded-full blur-lg sm:blur-xl pointer-events-none" />

        {/* =========================================================================
            RADIANT ANIMATED FAIRY SPARKLES (TWINKLING & FLOATING ACROSS THE ARTWORK)
           ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {CELESTIAL_SPARKLES.map((sp) => (
            <motion.div
              key={sp.id}
              animate={{
                opacity: [0.3, 1, 0.45, 0.95, 0.3],
                scale: [0.65, 1.35, 0.75, 1.25, 0.65],
                y: [0, -7, 1, -4, 0],
                x: [0, 3, -2, 3, 0],
                rotate: [0, 20, -10, 15, 0],
              }}
              transition={{
                duration: sp.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: sp.delay,
              }}
              style={{
                top: sp.top,
                left: sp.left,
                right: sp.right,
              }}
              className={`absolute select-none pointer-events-none will-change-transform ${
                sp.mobileVisible ? 'block' : 'hidden sm:block'
              }`}
            >
              <RadiantFairyStar size={sp.size} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
