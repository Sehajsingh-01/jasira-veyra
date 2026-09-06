'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import BloomverseThreeCanvas from '@/components/three/BloomverseThreeCanvas';
import CelestialBanner from '@/components/hero/CelestialBanner';
import { Sparkles, BookOpen, Compass, ArrowRight, Feather, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-midnight flex flex-col items-center justify-center pt-20 sm:pt-24 pb-14 sm:pb-16 min-h-0">
      {/* 1. Subtle 3D WebGL Canvas Layer (Calm, Reduced Particles, Ethereal) */}
      <BloomverseThreeCanvas showMandala={true} particleCount={50} interactive={true} />

      {/* 2. Top Panoramic Celestial Landscape & Moon Quote Banner (Matching Mockup 1:1) */}
      <CelestialBanner />

      {/* 3. CINEMATIC WIDESCREEN STAGE (OPTIMIZED FOR MOBILE & DESKTOP) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-6">
        <div className="relative w-full min-h-[320px] sm:min-h-[400px] md:min-h-0 aspect-[4/3] sm:aspect-[16/10] md:aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-warm-gold/30 group bg-midnight">
          {/* Authentic High-Res Artwork, 100% Quality & Always visible on phones */}
          <Image
            src="/images/jasira/portraits/jasira-tea.jpg"
            alt="Jasira Veyra - The Sunlit Archives"
            fill
            priority
            quality={100}
            unoptimized
            className="object-cover object-[center_10%] sm:object-[center_20%] transition-transform duration-1000 group-hover:scale-[1.02]"
          />

          {/* Soft Bottom Shadow for text contrast without blacking out the top */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/35 to-transparent pointer-events-none" />

          {/* Top Filigree Badges */}
          <div className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between pointer-events-none select-none z-20">
            <div className="flex items-center gap-1.5 font-ui text-[9px] sm:text-xs text-warm-gold/90 tracking-[0.25em] uppercase bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-warm-gold/25">
              <span>✦</span>
              <span>Duskbloom Athenaeum</span>
            </div>
            <div className="flex items-center gap-1.5 font-ui text-[9px] sm:text-xs text-cream/80 tracking-[0.2em] uppercase bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 hidden sm:flex">
              <span>Original Saga</span>
            </div>
          </div>

          {/* =========================================================================
              OVERLAPPING ANIMATED GLOWING TEXT: "JASIRA VEYRA" (MOVED TO BOTTOM)
             ========================================================================= */}
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-3 sm:px-4 z-20 pointer-events-none pb-16 sm:pb-20">
            {/* Luminous Pulsing Glow */}
            <div className="absolute w-[280px] sm:w-[500px] h-[120px] sm:h-[180px] bg-gradient-to-r from-warm-gold/25 via-plum/25 to-lavender/25 rounded-full blur-[50px] sm:blur-[70px] -z-10 pointer-events-none" />

            {/* Sub-label */}
            <span className="font-ui text-[10px] sm:text-xs md:text-sm tracking-[0.3em] text-warm-gold uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-1 sm:mb-2 block">
              ✦ Keeper of the Duskbloom ✦
            </span>

            {/* High-Contrast Glowing Typography (Vivid & Solid on all phones) */}
            <h1
              className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.14em] sm:tracking-[0.18em] uppercase font-bold text-cream select-none leading-none"
              style={{
                textShadow:
                  '0 0 25px rgba(212,168,83,0.85), 0 0 50px rgba(184,169,201,0.5), 0 2px 12px rgba(0,0,0,0.95)',
              }}
            >
              JASIRA VEYRA
            </h1>

            {/* Poetic Fairy Subtitle */}
            <p className="font-handwritten text-lg sm:text-2xl md:text-3xl text-cream/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-xl mx-auto mt-2 px-2">
              "A quiet soul in a loud world."
            </p>
          </div>

          {/* =========================================================================
              CINEMATIC IN-CANVAS ACTION BAR (RESPONSIVE, NO DOWNLOAD BUTTON HERE)
             ========================================================================= */}
          <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-6 right-3 sm:right-6 z-30 flex items-center justify-between gap-2 bg-midnight/80 backdrop-blur-md px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-warm-gold/30 shadow-2xl">
            {/* Left status badge */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-ui text-[10px] sm:text-xs text-cream/90 tracking-wider">
                Sunlit Archives
              </span>
            </div>

            {/* Right Action Buttons: Read & Journal */}
            <div className="flex items-center gap-2">
              <Link href="/story">
                <button className="flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-lg bg-warm-gold text-midnight hover:bg-cream font-ui text-[10px] sm:text-xs tracking-wider uppercase font-semibold transition-all shadow-[0_0_15px_rgba(212,168,83,0.3)] cursor-pointer">
                  <span>Read Story</span>
                  <ArrowRight size={12} />
                </button>
              </Link>

              <Link href="/bloomverse">
                <button className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-lavender/30 text-lavender hover:text-cream hover:border-warm-gold font-ui text-[10px] sm:text-xs tracking-wider uppercase transition-all cursor-pointer">
                  <Compass size={12} />
                  <span className="hidden xs:inline sm:inline">3D Journal</span>
                  <span className="xs:hidden sm:hidden">Journal</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sleek Quick-Access Highlights Bar Below the Stage */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mt-6 sm:mt-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Link href="/story" className="group">
            <div className="p-3.5 sm:p-4 rounded-xl bg-plum/15 border border-lavender/10 group-hover:border-warm-gold/40 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warm-gold/10 text-warm-gold group-hover:bg-warm-gold group-hover:text-midnight transition-colors shrink-0">
                  <BookOpen size={16} />
                </div>
                <div>
                  <h3 className="font-display text-sm text-cream group-hover:text-warm-gold transition-colors font-semibold">
                    The 5 Chapters
                  </h3>
                  <p className="font-ui text-[11px] text-lavender/60">19 scenes of botanical lore</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/character" className="group">
            <div className="p-3.5 sm:p-4 rounded-xl bg-plum/15 border border-lavender/10 group-hover:border-warm-gold/40 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warm-gold/10 text-warm-gold group-hover:bg-warm-gold group-hover:text-midnight transition-colors shrink-0">
                  <Heart size={16} />
                </div>
                <div>
                  <h3 className="font-display text-sm text-cream group-hover:text-warm-gold transition-colors font-semibold">
                    Jasira & Mochi
                  </h3>
                  <p className="font-ui text-[11px] text-lavender/60">Allies, expressions & companion</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/bloomverse" className="group">
            <div className="p-3.5 sm:p-4 rounded-xl bg-plum/15 border border-lavender/10 group-hover:border-warm-gold/40 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warm-gold/10 text-warm-gold group-hover:bg-warm-gold group-hover:text-midnight transition-colors shrink-0">
                  <Feather size={16} />
                </div>
                <div>
                  <h3 className="font-display text-sm text-cream group-hover:text-warm-gold transition-colors font-semibold">
                    3D Grimoire Journal
                  </h3>
                  <p className="font-ui text-[11px] text-lavender/60">Turn pages in real-time 3D</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
