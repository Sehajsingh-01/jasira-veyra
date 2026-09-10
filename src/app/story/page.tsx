import Link from 'next/link';
import Image from 'next/image';
import { chapters } from '@/data/chapters';
import BloomverseThreeCanvas from '@/components/three/BloomverseThreeCanvas';
import StoryDownloadButton from '@/components/story/StoryDownloadButton';
import { BookOpen, Sparkles, Clock, Layers, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'The Story - Jasira Veyra',
  description: 'Read and download the complete interactive fantasy novel Jas of Duskbloom.',
};

export default function StoryPage() {
  const totalScenes = chapters.reduce((acc, c) => acc + c.scenes.length, 0);

  return (
    <main className="min-h-screen bg-midnight text-cream py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* 3D WebGL Canvas Layer for Ambient Stardust */}
      <BloomverseThreeCanvas showMandala={false} particleCount={450} interactive={true} />

      {/* Ambient Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-plum/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Story Header: Clean Vertical Centered Layout (Fixes side-by-side bug) */}
        <header className="flex flex-col items-center text-center mb-14 sm:mb-16 space-y-4 sm:space-y-5">
          {/* 1. Main Title on its own row */}
          <Link href="/" title="Return to Main Website" className="block group cursor-pointer">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide group-hover:text-warm-gold group-hover:drop-shadow-[0_0_25px_rgba(212,168,83,0.5)] transition-all duration-300 leading-tight">
              Jas of Duskbloom
            </h1>
          </Link>

          {/* 2. Series Pill Badge Centered Below Title (Neeche) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-gold/10 border border-warm-gold/30 text-warm-gold font-ui text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase">
            <Sparkles size={12} className="animate-pulse shrink-0" />
            <span>The Bloomverse Novel Series</span>
            <Sparkles size={12} className="animate-pulse shrink-0" />
          </div>

          {/* 3. Poetic Quote */}
          <p className="font-handwritten text-xl sm:text-2xl md:text-3xl text-lavender/80 max-w-2xl mx-auto px-2">
            &quot;A story about the quiet power that saves what shouting never could.&quot;
          </p>

          {/* 4. Description */}
          <p className="font-body text-cream/75 max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm md:text-base px-2">
            Follow Jasira Veyra into the heart of Duskbloom Wood, where roses have forgotten their scent,
            books are unwriting their final pages, and an ancient rift hungers for unfinished endings.
          </p>

          {/* 5. Reading Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-2 text-xs font-ui text-lavender/70">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs">
              <BookOpen size={13} className="text-warm-gold" />
              <span>5 Chapters</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs">
              <Layers size={13} className="text-warm-gold" />
              <span>{totalScenes} Scenes</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs">
              <Clock size={13} className="text-warm-gold" />
              <span>~45 min Total Read</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] sm:text-xs">
              Complete Novel
            </span>
          </div>

          {/* 6. Download Button Section */}
          <div className="pt-4 flex flex-col items-center justify-center gap-2 w-full">
            <StoryDownloadButton variant="hero" />
            <p className="font-ui text-[10px] sm:text-[11px] text-warm-gold/70 tracking-wider">
              Download the official full novel: <span className="font-mono text-cream font-semibold">Jas_of_Duskbloom_FULL.pdf</span> (240 KB)
            </p>
          </div>
        </header>

        {/* Chapter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="relative group">
              {chapter.isAvailable ? (
                <Link
                  href={`/story/${chapter.id}`}
                  className="block h-full bg-plum/20 hover:bg-plum/30 border border-lavender/10 hover:border-warm-gold/60 rounded-xl overflow-hidden transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_35px_rgba(212,168,83,0.15)] group-hover:-translate-y-1"
                >
                  <ChapterCardContent chapter={chapter} />
                </Link>
              ) : (
                <div className="h-full bg-plum/10 border border-lavender/5 rounded-xl overflow-hidden opacity-60">
                  <ChapterCardContent chapter={chapter} />
                  <div className="absolute top-4 right-4 bg-midnight/80 border border-warm-gold/30 px-3 py-1 rounded font-ui text-[10px] uppercase tracking-wider text-warm-gold">
                    Coming Soon
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function ChapterCardContent({ chapter }: { chapter: any }) {
  // Select an appropriate cover image
  const cover =
    chapter.coverImage ||
    (chapter.number === 1
      ? '/images/backgrounds/story-bg.webp'
      : chapter.number === 2
      ? '/images/story/athenaeum.jpg'
      : chapter.number === 3
      ? '/images/story/hush-tendril.webp'
      : chapter.number === 4
      ? '/images/story/blank-page.webp'
      : '/images/story/restored-ending.webp');

  return (
    <div className="flex flex-col h-full">
      <div className="relative h-48 sm:h-56 w-full bg-midnight/70 overflow-hidden">
        <Image
          src={cover}
          alt={chapter.title}
          fill
          className="object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />

        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <span className="font-ui text-[9px] sm:text-[10px] tracking-widest text-warm-gold bg-midnight/80 border border-warm-gold/30 px-2.5 sm:px-3 py-1 rounded-full uppercase">
            Chapter {chapter.number.toString().padStart(2, '0')}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 sm:right-4 font-ui text-[10px] sm:text-[11px] text-cream/70 bg-black/50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded backdrop-blur-sm">
          {chapter.scenes.length} Scenes
        </div>
      </div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-cream group-hover:text-warm-gold transition-colors mb-1.5 sm:mb-2">
            {chapter.title}
          </h2>
          {chapter.subtitle && (
            <p className="font-handwritten text-base sm:text-lg text-lavender/70 mb-2 sm:mb-3">
              {chapter.subtitle}
            </p>
          )}
          <p className="font-body text-xs sm:text-sm text-lavender/80 line-clamp-3 leading-relaxed">
            {chapter.description}
          </p>
        </div>

        <div className="pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between font-ui text-xs text-warm-gold/80 group-hover:text-warm-gold">
          <span>Read Chapter &rarr;</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
