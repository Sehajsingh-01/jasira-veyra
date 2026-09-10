'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Wisteria petals & botanical leaves drifting across the mountain terrace
interface LeafParticle {
  id: number;
  type: 'petal' | 'leaf' | 'wisteria';
  color: string;
  size: number;
  startX: number;
  startY: number;
  duration: number;
  delay: number;
  swayAmount: number;
  rotSpeed: number;
}

const WIND_PARTICLES: LeafParticle[] = [
  // Delicate Wisteria Petals (Violet, Lavender, Blush)
  { id: 1, type: 'wisteria', color: '#D6C6E8', size: 14, startX: -5, startY: 18, duration: 8.5, delay: 0.2, swayAmount: 28, rotSpeed: 360 },
  { id: 2, type: 'petal', color: '#C8B6E2', size: 12, startX: -8, startY: 32, duration: 9.2, delay: 2.1, swayAmount: 35, rotSpeed: 420 },
  { id: 3, type: 'wisteria', color: '#E8DCF8', size: 16, startX: -6, startY: 12, duration: 7.8, delay: 4.0, swayAmount: 22, rotSpeed: 280 },
  { id: 4, type: 'petal', color: '#BFA8DC', size: 11, startX: -10, startY: 45, duration: 10.5, delay: 1.2, swayAmount: 40, rotSpeed: 500 },
  { id: 5, type: 'wisteria', color: '#E0D0F5', size: 15, startX: -4, startY: 26, duration: 8.0, delay: 5.5, swayAmount: 30, rotSpeed: 320 },
  { id: 6, type: 'petal', color: '#D2BEE8', size: 13, startX: -7, startY: 60, duration: 9.8, delay: 3.4, swayAmount: 25, rotSpeed: 400 },
  
  // Fresh Botanical Leaves (Green, Sage, Golden Olive)
  { id: 7, type: 'leaf', color: '#88AB8E', size: 15, startX: -6, startY: 38, duration: 8.8, delay: 0.8, swayAmount: 32, rotSpeed: 480 },
  { id: 8, type: 'leaf', color: '#AFC8AD', size: 13, startX: -9, startY: 22, duration: 9.5, delay: 4.8, swayAmount: 36, rotSpeed: 390 },
  { id: 9, type: 'leaf', color: '#7E9F85', size: 17, startX: -5, startY: 52, duration: 8.2, delay: 2.8, swayAmount: 28, rotSpeed: 440 },
  { id: 10, type: 'petal', color: '#E5D4F6', size: 10, startX: -4, startY: 15, duration: 7.5, delay: 6.2, swayAmount: 20, rotSpeed: 300 },
  { id: 11, type: 'wisteria', color: '#BFA4DE', size: 14, startX: -8, startY: 42, duration: 11.0, delay: 6.8, swayAmount: 34, rotSpeed: 350 },
  { id: 12, type: 'leaf', color: '#97B99D', size: 12, startX: -6, startY: 68, duration: 9.0, delay: 1.8, swayAmount: 26, rotSpeed: 410 },
];

export default function HeroWindAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[15] select-none">
      {/* =========================================================================
          LAYER 1: AMBIENT WIND CURRENTS & MOUNTAIN AIR MIST (Subtle sweeping breeze)
         ========================================================================= */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        {/* Top breeze drift */}
        <motion.div
          animate={{
            x: ['-20%', '110%'],
            opacity: [0, 0.35, 0.45, 0.2, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
            delay: 0,
          }}
          className="absolute top-10 left-0 w-[600px] h-[70px] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl transform -rotate-3"
        />

        {/* Center mountain breeze streak across terrace */}
        <motion.div
          animate={{
            x: ['-25%', '115%'],
            opacity: [0, 0.4, 0.5, 0.25, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'linear',
            delay: 4.5,
          }}
          className="absolute top-[35%] left-0 w-[700px] h-[90px] bg-gradient-to-r from-transparent via-lavender/25 to-transparent blur-3xl transform -rotate-2"
        />

        {/* Lower terrace airflow */}
        <motion.div
          animate={{
            x: ['-20%', '110%'],
            opacity: [0, 0.3, 0.4, 0.15, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'linear',
            delay: 8.5,
          }}
          className="absolute bottom-[28%] left-0 w-[550px] h-[80px] bg-gradient-to-r from-transparent via-cream/15 to-transparent blur-2xl transform -rotate-1"
        />
      </div>

      {/* =========================================================================
          LAYER 2: JASIRA'S HAIR 'ZULFE' SWAYING IN THE WIND (Living Portrait Breeze)
          Positioned accurately over Jasira's head/hair in the centered portrait
         ========================================================================= */}
      <div
        className="absolute top-[16%] sm:top-[19%] md:top-[17%] left-[46%] sm:left-[47%] md:left-[47.5%] w-[160px] sm:w-[210px] md:w-[240px] h-[220px] sm:h-[280px] md:h-[320px] -translate-x-1/2 pointer-events-none"
        aria-hidden="true"
      >
        {/* Forehead Bangs / Front Wisps (Gentle wave & flutter) */}
        <motion.svg
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[7%] left-[28%] w-[58px] sm:w-[72px] md:w-[84px] drop-shadow-[0_2px_4px_rgba(20,10,15,0.7)]"
          style={{ transformOrigin: 'top center' }}
          animate={{
            rotate: [0, 2.5, -1.2, 3.2, 0],
            skewX: [0, 2, -1, 2.5, 0],
            y: [0, -1, 0.5, -1.2, 0],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Delicate individual strands of dark silky bangs */}
          <path
            d="M 28,2 C 29,18 27,32 25,44 C 24,49 22,54 20,58"
            stroke="#2A1B22"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 38,3 C 40,20 39,36 38,48 C 37,55 35,62 33,67"
            stroke="#1F1318"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Subtle warm amethyst light glint on hair strand */}
          <path
            d="M 39,12 C 40,24 39,36 38,46"
            stroke="#563B4B"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M 48,2 C 51,19 52,36 53,49 C 53,56 52,63 50,68"
            stroke="#26171E"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.88"
          />
          <path
            d="M 58,4 C 62,21 64,38 67,52 C 68,58 68,64 67,69"
            stroke="#1B1015"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />
        </motion.svg>

        {/* Right Cheek / Temple 'Zulfe' (Tendril floating past elf ear and cheekbone) */}
        <motion.svg
          viewBox="0 0 100 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[20%] right-[10%] w-[48px] sm:w-[62px] md:w-[72px] drop-shadow-[0_2px_5px_rgba(20,10,15,0.75)]"
          style={{ transformOrigin: 'top left' }}
          animate={{
            rotate: [0, 4.5, -1.8, 5.2, 0.8, 0],
            scaleX: [1, 1.05, 0.98, 1.06, 1],
            x: [0, 3, -1, 3.5, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        >
          {/* Primary temple curl blowing towards the right */}
          <path
            d="M 18,5 C 22,28 32,55 42,82 C 50,104 62,126 68,142 C 70,147 72,151 71,154"
            stroke="#24151B"
            strokeWidth="2.8"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Secondary whispy tendril */}
          <path
            d="M 24,12 C 28,34 38,62 48,88 C 55,107 66,128 73,144"
            stroke="#38212D"
            strokeWidth="2.0"
            strokeLinecap="round"
            opacity="0.82"
          />
          {/* Fine hair shimmer */}
          <path
            d="M 28,25 C 33,48 42,72 50,96"
            stroke="#684A5C"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </motion.svg>

        {/* Shoulder Locks & Flowing Wisp (Lifting gently in the mountain breeze) */}
        <motion.svg
          viewBox="0 0 140 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[34%] right-[-5%] w-[80px] sm:w-[100px] md:w-[118px] drop-shadow-[0_4px_8px_rgba(20,10,15,0.8)]"
          style={{ transformOrigin: 'top center' }}
          animate={{
            rotate: [0, 3.2, -1.0, 4.0, 0.5, 0],
            skewY: [0, 1.8, -0.8, 2.2, 0],
            y: [0, -2, 1, -2.5, 0],
          }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
        >
          {/* Flowing shoulder hair cascade */}
          <path
            d="M 32,8 C 45,45 62,95 82,142 C 92,166 106,186 116,196"
            stroke="#1D1217"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 42,16 C 54,54 72,102 92,148 C 102,170 114,188 123,195"
            stroke="#2B1A23"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 52,30 C 64,68 81,114 98,154"
            stroke="#533747"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.5"
          />
        </motion.svg>
      </div>

      {/* =========================================================================
          LAYER 3: FLUTTERING WISTERIA PETALS & BOTANICAL LEAVES (Drifting Left -> Right)
         ========================================================================= */}
      {WIND_PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none will-change-transform"
          style={{
            top: `${particle.startY}%`,
            left: `${particle.startX}%`,
          }}
          animate={{
            x: ['0vw', '115vw'],
            y: [
              0,
              -particle.swayAmount,
              particle.swayAmount * 0.7,
              -particle.swayAmount * 0.9,
              particle.swayAmount * 0.5,
              0,
            ],
            rotateZ: [0, particle.rotSpeed],
            rotateY: [0, 360, 720],
            opacity: [0, 0.95, 0.9, 0.85, 0.8, 0],
            scale: [0.75, 1.05, 0.95, 1, 0.7],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: particle.delay,
          }}
        >
          {particle.type === 'wisteria' && (
            // Delicate teardrop wisteria blossom petal
            <svg
              width={particle.size}
              height={particle.size * 1.4}
              viewBox="0 0 20 28"
              fill="none"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            >
              <defs>
                <linearGradient id={`petalGrad-${particle.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor={particle.color} />
                  <stop offset="100%" stopColor="#875E9B" />
                </linearGradient>
              </defs>
              <path
                d="M 10,2 C 16,7 19,16 16,22 C 14,26 6,26 4,22 C 1,16 4,7 10,2 Z"
                fill={`url(#petalGrad-${particle.id})`}
                opacity="0.9"
              />
              <path
                d="M 10,4 C 10,12 10,18 10,23"
                stroke="#EDE4F7"
                strokeWidth="0.8"
                opacity="0.6"
              />
            </svg>
          )}

          {particle.type === 'petal' && (
            // Small oval blossom petal fluttering
            <svg
              width={particle.size}
              height={particle.size * 1.2}
              viewBox="0 0 18 22"
              fill="none"
              className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
            >
              <defs>
                <radialGradient id={`radPetal-${particle.id}`} cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor={particle.color} />
                  <stop offset="100%" stopColor="#784B8E" />
                </radialGradient>
              </defs>
              <ellipse
                cx="9"
                cy="11"
                rx="7"
                ry="9"
                fill={`url(#radPetal-${particle.id})`}
                opacity="0.92"
              />
            </svg>
          )}

          {particle.type === 'leaf' && (
            // Delicate curved botanical leaf with vein
            <svg
              width={particle.size * 1.3}
              height={particle.size}
              viewBox="0 0 26 18"
              fill="none"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            >
              <defs>
                <linearGradient id={`leafGrad-${particle.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4E6D6" />
                  <stop offset="40%" stopColor={particle.color} />
                  <stop offset="100%" stopColor="#416147" />
                </linearGradient>
              </defs>
              <path
                d="M 2,9 C 8,2 18,2 24,9 C 18,16 8,16 2,9 Z"
                fill={`url(#leafGrad-${particle.id})`}
                opacity="0.9"
              />
              {/* Center rib vein */}
              <path
                d="M 2,9 C 10,9 18,9 24,9"
                stroke="#C1D8C4"
                strokeWidth="0.8"
                opacity="0.75"
              />
            </svg>
          )}
        </motion.div>
      ))}

      {/* =========================================================================
          LAYER 4: OCCASIONAL FAIRY DUST GLINTS CARRIED BY THE WIND
         ========================================================================= */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`wind-sparkle-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-warm-gold/90 pointer-events-none"
          style={{
            top: `${20 + i * 18}%`,
            left: '-2%',
            boxShadow: '0 0 8px #F0C764, 0 0 16px rgba(212,168,83,0.8)',
          }}
          animate={{
            x: ['0vw', '110vw'],
            y: [0, -15, 10, -8, 0],
            opacity: [0, 1, 0.4, 0.9, 0],
            scale: [0.5, 1.4, 0.8, 1.2, 0.4],
          }}
          transition={{
            duration: 6.5 + i * 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 2.1,
          }}
        />
      ))}
    </div>
  );
}
