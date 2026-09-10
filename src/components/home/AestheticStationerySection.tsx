'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { downloadFullBookPdf } from '@/lib/storyDownloader';
import {
  Download,
  Feather,
  Sun,
  Send,
  Compass,
  Moon,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  FileText,
} from 'lucide-react';

interface TrackItem {
  number: string;
  title: string;
  koreanSub: string;
  englishPoem: string;
  href: string;
  icon: React.ReactNode;
  chapterBadge?: string;
}

const CHAPTER_TRACKS: TrackItem[] = [
  {
    number: '01',
    title: 'Ink & The Silent Roses',
    koreanSub: '꽃은 조용해졌고, 아무도 눈치채지 못했다',
    englishPoem: 'The flowers went quiet, and I still don\'t know why I\'m the one who noticed.',
    href: '/story/chapter-1',
    icon: <Feather size={20} className="text-[#8D6860]" />,
    chapterBadge: 'CHAPTER 1',
  },
  {
    number: '02',
    title: 'The Unmarked Book & Golden Hour',
    koreanSub: '가장 빛나는 순간, 누군가 우리를 기록한다',
    englishPoem: 'Someone is copying our lives into a book faster than we are living them.',
    href: '/story/chapter-2',
    icon: <Sun size={20} className="text-[#D4A853]" />,
    chapterBadge: 'CHAPTER 2',
  },
  {
    number: '03',
    title: 'The Price of Knowing',
    koreanSub: '침묵을 건네고 얻은 진실의 조각',
    englishPoem: 'Silence for even one day is the steepest price I offer.',
    href: '/story/chapter-3',
    icon: <Send size={20} className="text-[#8D6860]" />,
    chapterBadge: 'CHAPTER 3',
  },
  {
    number: '04',
    title: 'The Eastern Grove',
    koreanSub: '타오르던 숲, 끝나지 못한 문장',
    englishPoem: 'You cannot fight an ending with a sword. Someone must speak its language.',
    href: '/story/chapter-4',
    icon: <Compass size={20} className="text-[#5B4030]" />,
    chapterBadge: 'CHAPTER 4',
  },
  {
    number: '05',
    title: 'Stay Until Morning',
    koreanSub: '너를 위해 쓰여진 세상, 영원한 마지막 장',
    englishPoem: 'This whole world was written for you. An ending is what makes a story permanent.',
    href: '/story/chapter-5',
    icon: <Moon size={20} className="text-[#8D6860]" />,
    chapterBadge: 'CHAPTER 5 · FINALE',
  },
];

export default function AestheticStationerySection() {
  const handlePdfDownload = () => {
    downloadFullBookPdf();
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 w-full max-w-6xl mx-auto overflow-hidden">
      {/* Background Aesthetic Atmosphere */}
      <div className="absolute inset-0 bg-[#0E0B16]/60 backdrop-blur-2xl rounded-3xl border border-warm-gold/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-none" />

      {/* Decorative Botanical Branch Silhouette in Background */}
      <div className="absolute -top-10 -right-10 w-80 h-80 bg-warm-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-plum/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-10 md:p-12">
        {/* Aesthetic Header (Inspired by "SAVIREN · 1ST MINI ALBUM · EVERGREEN LETTERS") */}
        <header className="text-center mb-16 space-y-3">
          <div className="flex items-center justify-center gap-3 text-warm-gold/80 font-ui text-xs tracking-[0.35em] uppercase">
            <span>✦</span>
            <span>BLOOMVERSE CHRONICLES</span>
            <span>✦</span>
          </div>

          <p className="font-ui text-xs text-lavender/60 tracking-[0.25em] uppercase">
            THE COMPLETE NOVEL MANUSCRIPT
          </p>

          <h2
            className="font-display text-4xl sm:text-6xl md:text-7xl text-cream tracking-wider"
            style={{ textShadow: '0 2px 15px rgba(212, 168, 83, 0.25)' }}
          >
            DUSKBLOOM LETTERS
          </h2>

          <p className="font-handwritten text-2xl sm:text-3xl text-lavender/80 max-w-xl mx-auto pt-1">
            "Written for Jasira Veyra, with everything."
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="w-12 h-[1px] bg-warm-gold/30" />
            <span className="font-ui text-xs text-warm-gold tracking-[0.3em] uppercase">
              CHAPTER COMPENDIUM
            </span>
            <span className="w-12 h-[1px] bg-warm-gold/30" />
          </div>
        </header>

        {/* Main Grid: Left side Tracklist Cards, Right side Letter + Wax Seal Parcel */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* =========================================================================
              LEFT: 5 DECKLED PAPER CHAPTER STRIPS (01 to 05)
             ========================================================================= */}
          <div className="lg:col-span-7 space-y-4">
            {CHAPTER_TRACKS.map((item) => (
              <Link key={item.number} href={item.href} className="block group">
                <motion.div
                  whileHover={{ x: 6, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="relative p-5 sm:p-6 rounded-sm shadow-md transition-all duration-300 border border-[#5B4030]/20 hover:border-warm-gold/60 cursor-pointer overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(to right, #F5EDE0 0%, #EFE5CD 80%, #E5D6B9 100%)',
                    boxShadow:
                      '0 4px 15px rgba(0,0,0,0.25), inset -2px -2px 8px rgba(91, 64, 48, 0.08)',
                  }}
                >
                  {/* Subtle torn deckled paper edge effect on right */}
                  <div
                    className="absolute right-0 top-0 bottom-0 w-2 pointer-events-none opacity-40"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 100% 50%, transparent 4px, #5B4030 4px)',
                      backgroundSize: '8px 12px',
                    }}
                  />

                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Chapter Number in Serif */}
                    <div className="flex flex-col items-center">
                      <span className="font-display text-3xl sm:text-4xl text-[#5B4030] font-normal leading-none group-hover:text-[#2D1B3D] transition-colors">
                        {item.number}
                      </span>
                      <div className="w-6 h-[1px] bg-[#8D6860]/40 mt-2" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-display text-xl sm:text-2xl text-[#171311] font-semibold group-hover:text-[#2D1B3D] transition-colors">
                          {item.title}
                        </h3>
                        {item.chapterBadge && (
                          <span className="font-ui text-[9px] px-2 py-0.5 rounded bg-[#5B4030]/10 text-[#5B4030] font-semibold tracking-wider">
                            {item.chapterBadge}
                          </span>
                        )}
                      </div>

                      {/* Korean subtitle / aesthetic touch */}
                      <p className="font-ui text-xs text-[#8D6860] mb-1.5 font-medium tracking-wide">
                        {item.koreanSub}
                      </p>

                      {/* Poetic quote line */}
                      <p className="font-handwritten text-base sm:text-lg text-[#2A211C]/85 italic line-clamp-1">
                        "{item.englishPoem}"
                      </p>
                    </div>

                    {/* Icon + Hover Arrow */}
                    <div className="flex flex-col items-center justify-between h-full pt-1 shrink-0">
                      <div className="p-2 rounded-full bg-black/5 group-hover:bg-[#D4A853]/20 transition-colors">
                        {item.icon}
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-[#8D6860] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-y-0.5 transition-all mt-4"
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* =========================================================================
              RIGHT: THE FULL BOOK PARCEL & WAX-SEALED LETTER
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. The Official Full Book Download Parcel (Directly delivers Jas_of_Duskbloom_FULL.pdf) */}
            <motion.div
              whileHover={{ y: -4 }}
              className="relative p-6 sm:p-8 rounded-xl border-2 border-warm-gold/50 shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden group cursor-pointer"
              style={{
                background:
                  'linear-gradient(135deg, #1C1326 0%, #0F0A17 50%, #20132C 100%)',
              }}
              onClick={handlePdfDownload}
            >
              {/* Glowing Background Sheen */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-warm-gold/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              {/* Gold Filigree Corners */}
              <div className="absolute top-3 left-3 text-warm-gold/50 text-xs select-none">╔</div>
              <div className="absolute top-3 right-3 text-warm-gold/50 text-xs select-none">╗</div>
              <div className="absolute bottom-3 left-3 text-warm-gold/50 text-xs select-none">╚</div>
              <div className="absolute bottom-3 right-3 text-warm-gold/50 text-xs select-none">╝</div>

              <div className="space-y-4 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <span className="font-ui text-[10px] tracking-[0.25em] text-warm-gold uppercase font-bold flex items-center gap-1.5">
                    <Sparkles size={12} />
                    <span>OFFICIAL NOVEL DOCUMENT</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-warm-gold/20 border border-warm-gold/40 text-[10px] font-mono text-warm-gold">
                    240 KB · PDF
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-cream group-hover:text-warm-gold transition-colors">
                    Jas of Duskbloom (FULL)
                  </h3>
                  <p className="font-mono text-xs text-warm-gold/80 mt-1">
                    Jas_of_Duskbloom_FULL.pdf
                  </p>
                </div>

                <p className="font-body text-xs sm:text-sm text-lavender/80 leading-relaxed">
                  The complete unabridged manuscript containing all 5 chapters, full scenes, quotes, and
                  author's dedication. Direct 1-tap download of the exact source book.
                </p>

                {/* Big Download Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePdfDownload();
                    }}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-lg bg-gradient-to-r from-warm-gold via-[#E5C378] to-warm-gold text-midnight font-ui text-xs md:text-sm tracking-widest uppercase font-bold hover:brightness-110 active:scale-[0.97] transition-all duration-300 shadow-[0_0_25px_rgba(212,168,83,0.35)] cursor-pointer touch-manipulation ios-touch-spring"
                  >
                    <Download size={18} className="animate-bounce" />
                    <span>Download Full Book (.PDF)</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* 2. The Aesthetic Wax-Sealed Letter Card (Inspired by media_1788690430790.jpg & 799) */}
            <div
              className="relative p-6 sm:p-8 rounded-sm shadow-xl border border-[#5B4030]/30 text-ink overflow-hidden"
              style={{
                background:
                  'linear-gradient(145deg, #F4EAD4 0%, #E8DCBE 60%, #E0D2B0 100%)',
                boxShadow:
                  '0 10px 30px rgba(0,0,0,0.3), inset -3px -3px 12px rgba(91,64,48,0.1)',
              }}
            >
              {/* Burnt / aged corner shading */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#5B4030]/20 to-transparent pointer-events-none" />

              <div className="space-y-4">
                <div className="border-b border-[#5B4030]/20 pb-3">
                  <span className="font-ui text-[10px] tracking-widest uppercase text-[#8D6860]">
                    To the Reader & Wanderer
                  </span>
                  <h4 className="font-handwritten text-2xl sm:text-3xl text-[#2D1B3D] pt-1">
                    A Note from Duskbloom
                  </h4>
                </div>

                <p className="font-body text-xs sm:text-sm leading-relaxed text-[#2A211C]/90 text-justify">
                  "This story was written for the ones who notice what everyone else walks past.
                  If you hold this book, know that an ending isn't the death of a tale — it is the thing
                  that makes a story permanent."
                </p>

                {/* Sign-off & Red Wax Seal Stamp */}
                <div className="pt-4 border-t border-[#5B4030]/15 flex items-center justify-between">
                  <div>
                    <span className="font-handwritten text-xl text-[#5B4030] block">
                      Jasira Veyra
                    </span>
                    <span className="font-ui text-[10px] tracking-wider uppercase text-[#8D6860]">
                      Keeper of Forgotten Things
                    </span>
                  </div>

                  {/* Red Wax Seal Stamp Element */}
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-cream shadow-lg border border-red-950/40 select-none transform rotate-[-6deg]"
                      style={{
                        background:
                          'radial-gradient(circle at 35% 35%, #A82035 0%, #7D1525 60%, #520B16 100%)',
                        boxShadow:
                          '0 4px 10px rgba(0,0,0,0.35), inset 1px 1px 3px rgba(255,255,255,0.3)',
                      }}
                    >
                      <div className="w-11 h-11 rounded-full border border-red-300/30 flex flex-col items-center justify-center text-center">
                        <span className="text-xs text-amber-200">✦</span>
                        <span className="font-display text-[9px] tracking-widest text-amber-100 font-bold">
                          JV
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Small Tactile Footer Bar */}
            <div className="flex items-center justify-between px-4 py-2 rounded bg-white/5 border border-white/10 font-ui text-[11px] text-lavender/70">
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} className="text-warm-gold" />
                <span>5 Chapters · 19 Scenes</span>
              </span>
              <Link
                href="/story"
                className="text-warm-gold hover:underline font-semibold flex items-center gap-1"
              >
                <span>Read Saga</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
