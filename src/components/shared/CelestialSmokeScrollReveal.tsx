'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Deterministic star positions to guarantee 100% exact SSR and client hydration matching
const CELESTIAL_STARS = [
  { id: 0, left: 14, top: 22, size: 14, char: '✦', color: '#D4A853', delay: 0 },
  { id: 1, left: 82, top: 32, size: 16, char: '✧', color: '#E8D5D5', delay: 0.3 },
  { id: 2, left: 46, top: 18, size: 12, char: '⋆', color: '#D4A853', delay: 0.6 },
  { id: 3, left: 28, top: 62, size: 15, char: '✨', color: '#E8D5D5', delay: 0.9 },
  { id: 4, left: 68, top: 52, size: 13, char: '✦', color: '#D4A853', delay: 1.2 },
  { id: 5, left: 90, top: 72, size: 12, char: '✧', color: '#E8D5D5', delay: 0.2 },
  { id: 6, left: 12, top: 78, size: 15, char: '⋆', color: '#D4A853', delay: 0.5 },
  { id: 7, left: 54, top: 68, size: 17, char: '✨', color: '#E8D5D5', delay: 0.8 },
  { id: 8, left: 74, top: 24, size: 13, char: '✦', color: '#D4A853', delay: 1.1 },
  { id: 9, left: 34, top: 38, size: 15, char: '✧', color: '#E8D5D5', delay: 0.4 },
  { id: 10, left: 62, top: 28, size: 12, char: '⋆', color: '#D4A853', delay: 0.7 },
  { id: 11, left: 24, top: 48, size: 14, char: '✨', color: '#E8D5D5', delay: 1.0 },
  { id: 12, left: 84, top: 58, size: 14, char: '✦', color: '#D4A853', delay: 0.15 },
  { id: 13, left: 48, top: 80, size: 13, char: '✧', color: '#E8D5D5', delay: 0.45 },
];

export default function CelestialSmokeScrollReveal() {
  const { scrollY } = useScroll();

  // Smooth GPU-friendly opacity transitions based on first scroll (0px to 260px)
  const smokeOpacity = useTransform(scrollY, [10, 260], [1, 0]);
  const smokeY = useTransform(scrollY, [10, 260], [0, -30]);

  return (
    <motion.div
      style={{ opacity: smokeOpacity, y: smokeY }}
      className="relative w-full h-32 sm:h-44 -mt-14 sm:-mt-20 pointer-events-none z-20 overflow-hidden select-none will-change-transform"
    >
      {/* 1. Left Soft Radial Glow Puff (Pre-rasterized gradient, zero blur lag) */}
      <div
        className="absolute -left-16 sm:-left-24 top-0 bottom-0 w-[55%] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(45, 27, 61, 0.7) 0%, rgba(212, 168, 83, 0.12) 35%, transparent 70%)',
        }}
      />

      {/* 2. Right Soft Radial Glow Puff */}
      <div
        className="absolute -right-16 sm:-right-24 top-0 bottom-0 w-[55%] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(45, 27, 61, 0.7) 0%, rgba(184, 169, 201, 0.12) 35%, transparent 70%)',
        }}
      />

      {/* 3. Center Dissipating Mist Silhouette (SVG Cloud Paths) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-65">
        <svg
          viewBox="0 0 1200 300"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 150 C 300 80, 450 220, 700 130 C 950 40, 1100 200, 1200 150 L 1200 300 L 0 300 Z"
            fill="url(#smokeGradient)"
            opacity="0.6"
          />
          <path
            d="M0 200 C 200 120, 500 260, 800 160 C 1000 80, 1150 240, 1200 200 L 1200 300 L 0 300 Z"
            fill="#0B0A1A"
          />
          <defs>
            <linearGradient id="smokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2D1B3D" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#4A315C" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1B1226" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 4. Twinkling Stars */}
      <div className="absolute inset-0">
        {CELESTIAL_STARS.map((star) => (
          <span
            key={star.id}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              fontSize: `${star.size}px`,
              color: star.color,
              animationDelay: `${star.delay}s`,
            }}
            className="absolute select-none pointer-events-none filter drop-shadow-[0_0_8px_rgba(212,168,83,0.8)] opacity-75"
          >
            {star.char}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
