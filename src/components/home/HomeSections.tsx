'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Sparkles, Image as ImageIcon, User, Feather, ArrowRight, Download, Shield, MapPin, Heart } from 'lucide-react';
import AestheticStationerySection from './AestheticStationerySection';
import { downloadFullBookPdf } from '@/lib/storyDownloader';
import CelestialSmokeScrollReveal from '@/components/shared/CelestialSmokeScrollReveal';
import MagicalSectionReveal from '@/components/shared/MagicalSectionReveal';

// 3 Core Pillars (Inspired by the "3 Dragons" row in Image 2)
const PILLARS = [
  {
    title: 'Petal Verse',
    subtitle: 'Magic of Feeling',
    desc: 'Not swords or lightning, but quiet empathy that heals wilted soil.',
    image: '/images/jasira/magic/petal-verse.jpg',
  },
  {
    title: 'Duskbloom Wood',
    subtitle: 'Moonlit Sanctuary',
    desc: 'A forest sleeping by day that wakes when the moon clears the trees.',
    image: '/images/world/duskbloom-wood.jpg',
  },
  {
    title: 'The Athenaeum',
    subtitle: 'Living Vaults',
    desc: 'Monumental ironwood roots weaving between thousands of ancient tomes.',
    image: '/images/story/athenaeum.jpg',
  },
];

// Key Allies (Inspired by "Key Allies" in Image 2)
const ALLIES = [
  { name: 'Jasira Veyra', role: 'Keeper of Verses', image: '/images/jasira/portraits/hero.webp' },
  { name: 'Mochi', role: 'Plush Bear Companion', image: '/images/mochi/portrait.webp' },
  { name: 'Captain Orlei', role: 'Silver Vanguard', image: '/images/orlei/portrait.jpg' },
  { name: 'Ren', role: 'Ironwood Scholar', image: '/images/jasira/outfits/library.webp' },
];

export default function HomeSections() {
  const handlePdfDownload = () => {
    downloadFullBookPdf();
  };

  return (
    <div className="bg-midnight min-h-screen relative z-10 w-full overflow-hidden pb-28">
      {/* Soft gradient blend from hero */}
      <div className="w-full h-24 bg-gradient-to-b from-transparent to-midnight absolute top-[-96px] z-20 pointer-events-none" />

      {/* Magical Atmospheric Smoke Clouds & Parting Stars (Reveals when first scrolling) */}
      <CelestialSmokeScrollReveal />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* =========================================================================
            ROW 1: THREE CORE PILLARS (Inspired by "Three Dragons" in Image 2)
           ========================================================================= */}
        <MagicalSectionReveal>
          <section className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-white/5">
              <div>
                <span className="font-ui text-[10px] tracking-[0.3em] text-warm-gold/80 uppercase font-semibold block mb-1">
                  Ecosystem of Magic
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-cream tracking-wide">
                  Three Pillars of Duskbloom
                </h2>
              </div>
              <div className="flex flex-col sm:items-end mt-2 sm:mt-0 gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-handwritten text-xl sm:text-2xl text-lavender/80 italic">
                    &quot;Magic grows in the quiet places.&quot;
                  </span>
                  <span className="text-warm-gold/70 text-xs select-none">❦</span>
                </div>
                <Link
                  href="/magic"
                  className="font-ui text-[11px] text-lavender/50 hover:text-warm-gold transition-colors tracking-wider uppercase flex items-center gap-1"
                >
                  <span>Explore Magic Lore</span>
                  <ArrowRight size={11} />
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {PILLARS.map((p) => (
                <motion.div
                  key={p.title}
                  whileHover={{ y: -4 }}
                  className="group relative rounded-xl overflow-hidden border border-lavender/10 bg-plum/15 hover:border-warm-gold/50 transition-all duration-300 shadow-xl"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-midnight">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
                    <div className="absolute top-3 right-3 font-ui text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 text-warm-gold">
                      {p.subtitle}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-cream group-hover:text-warm-gold transition-colors mb-1.5 font-semibold">
                      {p.title}
                    </h3>
                    <p className="font-body text-xs text-lavender/75 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </MagicalSectionReveal>

        {/* =========================================================================
            ROW 2: SPLIT 2 COLUMNS: ALLIES + JOURNEY (Inspired by Image 2)
           ========================================================================= */}
        <MagicalSectionReveal delay={0.05}>
          <section className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Key Characters of the Story (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-plum/15 border border-lavender/10 flex flex-col justify-between shadow-xl">
              <div>
                <span className="font-ui text-[10px] tracking-[0.3em] text-warm-gold/80 uppercase font-semibold block mb-1">
                  The Characters
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-cream mb-6">
                  Key Companions
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
                  {ALLIES.map((ally) => (
                    <div key={ally.name} className="p-3 rounded-lg bg-black/25 border border-white/5 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-warm-gold/30 shrink-0">
                        <Image src={ally.image} alt={ally.name} fill className="object-cover object-[center_15%]" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display text-sm text-cream truncate">{ally.name}</h4>
                        <p className="font-ui text-[10px] text-lavender/60 truncate">{ally.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5">
                <Link
                  href="/character"
                  className="inline-flex items-center gap-2 font-ui text-xs tracking-wider uppercase text-warm-gold hover:text-cream transition-colors"
                >
                  <span>View Full Character Dossier</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: The Journey to the Eastern Grove (7 Cols) */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-warm-gold/30 bg-midnight shadow-2xl group min-h-[300px]">
              <Image
                src="/images/story/silent-roses.webp"
                alt="The Journey to the Eastern Grove"
                fill
                className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/70 to-transparent" />

              <div className="relative z-10 p-8 sm:p-10 h-full flex flex-col justify-between max-w-lg space-y-4">
                <div>
                  <span className="font-ui text-[10px] tracking-[0.3em] text-warm-gold uppercase font-semibold block mb-2">
                    Volume I · Chapter 1
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-cream mb-3">
                    The Journey to the Eastern Grove
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-lavender/90 leading-relaxed">
                    When the silent roses under Jasira's windowsill lose their fragrance, she embarks with Mochi
                    into the heart of Duskbloom Wood to uncover why stories are vanishing from living memory.
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Link
                    href="/story/chapter-1"
                    className="px-6 py-2.5 rounded-md bg-warm-gold text-midnight hover:bg-cream font-ui text-xs tracking-widest uppercase font-semibold transition-all shadow-lg cursor-pointer touch-manipulation"
                  >
                    Read Chapter 1
                  </Link>
                  <Link
                    href="/story"
                    className="px-5 py-2.5 rounded-md border border-white/20 text-cream hover:border-warm-gold hover:text-warm-gold font-ui text-xs tracking-widest uppercase transition-all cursor-pointer touch-manipulation"
                  >
                    All Chapters
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </MagicalSectionReveal>

        {/* =========================================================================
            ROW 3: A PERSONAL LETTER FROM SEHAJ TO JASMEEN
           ========================================================================= */}
        <MagicalSectionReveal delay={0.05}>
          <section
            id="letter-for-jasmeen"
            className="relative rounded-2xl overflow-hidden p-5 sm:p-8 md:p-10 border-2 border-warm-gold/40 shadow-[0_12px_45px_rgba(0,0,0,0.5)] bg-gradient-to-br from-[#FAF5EC] via-[#F4ECE0] to-[#EAE0CF] text-ink scroll-mt-24"
          >
            {/* Vintage inner dashed border for authentic stationery feel */}
            <div className="relative border border-dashed border-[#8D6860]/35 rounded-xl p-5 sm:p-8 md:p-10 bg-white/30 backdrop-blur-[2px]">
              
              {/* Header: Postmark & Wax Seal */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#8D6860]/20">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-gold/15 border border-warm-gold/40 text-[#5B4030]">
                    <Feather size={12} className="text-[#5B4030]" />
                    <span className="font-ui text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-bold text-[#5B4030]">
                      Special Delivery · For Jasmeen
                    </span>
                  </div>
                  <p className="font-ui text-[10px] sm:text-xs text-[#8D6860] tracking-wider uppercase font-medium mt-1.5 pl-1">
                    Written under the Duskbloom stars
                  </p>
                </div>

                {/* Wax Seal Emblem */}
                <div className="shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#7D1D2B] via-[#631420] to-[#450C15] border-2 border-warm-gold/50 shadow-[0_4px_12px_rgba(0,0,0,0.25)] text-warm-gold select-none">
                  <div className="text-center">
                    <span className="font-handwritten text-base sm:text-lg font-bold leading-none block">S ♡ J</span>
                    <span className="font-ui text-[6.5px] uppercase tracking-widest text-warm-gold/80 block -mt-0.5">Sealed</span>
                  </div>
                </div>
              </div>

              {/* Salutation */}
              <div className="pt-6 pb-2">
                <h3 className="font-handwritten text-3xl sm:text-4xl md:text-5xl text-[#171311] font-bold tracking-wide">
                  Dearest Jasmeen,
                </h3>
              </div>

              {/* Letter Body */}
              <div className="space-y-4 font-handwritten text-xl sm:text-2xl md:text-3xl text-[#2A211C]/95 leading-relaxed pt-2">
                <p>
                  This little universe is a heartfelt, special gift from me to you.
                </p>
                <p>
                  Just like Jasira&apos;s world — where quiet souls heal wilted soil and every blooming petal carries a forgotten verse — I wanted to weave an entire magical sanctuary crafted purely for you.
                </p>
                <p>
                  I truly hope you love it with all your heart. Within every page, every starry night sky, and every little detail lives the same warmth, kindness, and gentle spirit that you bring into this loud world.
                </p>
                <p>
                  Whenever you wander through these chapters or glance at the stars here, I hope it brings that radiant, timeless smile to your face.
                </p>
              </div>

              {/* Sign-off & Keepsake Button */}
              <div className="pt-8 mt-6 border-t border-[#8D6860]/20 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div>
                  <p className="font-handwritten text-xl sm:text-2xl text-[#5B4030] font-medium">
                    With all my love,
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-handwritten text-3xl sm:text-4xl text-[#171311] font-bold tracking-wide">
                      Sehajshii
                    </span>
                    <Heart size={20} className="text-warm-gold stroke-[2] fill-warm-gold/20" />
                  </div>
                </div>

                {/* Subtle keepsake download */}
                <button
                  type="button"
                  onClick={handlePdfDownload}
                  className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1326] text-warm-gold hover:bg-[#2D1B3D] border border-warm-gold/40 font-ui text-[11px] tracking-wider uppercase font-semibold transition-all shadow-md cursor-pointer touch-manipulation ios-touch-spring"
                >
                  <Download size={13} />
                  <span>Download Your Storybook (.PDF)</span>
                </button>
              </div>

            </div>
          </section>
        </MagicalSectionReveal>

        {/* =========================================================================
            ROW 4: DUSKBLOOM LETTERS AESTHETIC TRACKLIST (5 Chapters 01 to 05)
           ========================================================================= */}
        <MagicalSectionReveal delay={0.05}>
          <AestheticStationerySection />
        </MagicalSectionReveal>

        {/* =========================================================================
            ROW 5: POETIC CLOSING
           ========================================================================= */}
        <MagicalSectionReveal delay={0.05}>
          <section className="text-center pt-8 pb-4 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-warm-gold/10 border border-warm-gold/30 flex items-center justify-center mb-4">
              <Sparkles className="w-4 h-4 text-warm-gold animate-pulse" />
            </div>
            <p className="font-handwritten text-2xl sm:text-3xl md:text-4xl text-lavender/90 mb-3 max-w-xl leading-relaxed">
              &quot;Some hearts were never meant to whisper.&quot;
            </p>
            <p className="font-ui text-[11px] tracking-[0.3em] uppercase text-warm-gold/60">
              Bloomverse · Jasira Veyra
            </p>
          </section>
        </MagicalSectionReveal>
      </div>
    </div>
  );
}
