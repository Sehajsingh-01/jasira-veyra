'use client';

import { Chapter } from '@/data/chapters';
import ReadingProgress from './ReadingProgress';
import SceneRenderer from './SceneRenderer';
import ChapterNavigation from './ChapterNavigation';
import Image from 'next/image';
import Link from 'next/link';
import { chapters as allChapters } from '@/data/chapters';
import StoryDownloadButton from './StoryDownloadButton';
import { ChevronLeft, BookOpen, Clock, Sparkles } from 'lucide-react';

interface StoryReaderProps {
  chapter: Chapter;
  onSceneChange?: (sceneIndex: number) => void;
}

export default function StoryReader({ chapter }: StoryReaderProps) {
  // Estimate reading time (~200 words/min)
  const wordCount = chapter.scenes.reduce(
    (acc, sc) => acc + sc.content.reduce((sum, p) => sum + p.split(/\s+/).length, 0),
    0
  );
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="min-h-screen bg-midnight w-full relative pb-20">
      <ReadingProgress chapterId={chapter.id} />

      {/* Sticky Reader Action Toolbar (Pinned directly at top-0) */}
      <div className="sticky top-0 z-40 bg-midnight/95 backdrop-blur-xl border-b border-warm-gold/20 py-2.5 px-3 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/story"
            className="flex items-center gap-1.5 text-xs font-ui tracking-wider uppercase text-lavender/80 hover:text-warm-gold transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="hidden xs:inline sm:inline">All Chapters</span>
            <span className="xs:hidden sm:hidden">Story</span>
          </Link>

          <div className="flex items-center gap-2 text-center min-w-0">
            <span className="font-ui text-[11px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-warm-gold uppercase font-semibold truncate">
              Ch. {chapter.number}: {chapter.title}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-ui text-lavender/60">
            <BookOpen size={14} className="text-warm-gold/70" />
            <span className="hidden sm:inline">~{readMinutes} min read</span>
          </div>
        </div>
      </div>

      {/* Chapter Header (Mobile-Optimized Padding) */}
      <header className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-10 sm:py-16 relative overflow-hidden bg-plum/15 border-b border-white/5">
        <div className="z-10 flex flex-col items-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-gold/10 border border-warm-gold/30 text-warm-gold font-ui text-[10px] sm:text-[11px] tracking-[0.25em] uppercase">
            <Sparkles size={12} className="animate-pulse" />
            <span>Volume I · Chapter {chapter.number}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-cream tracking-wide">
            {chapter.title}
          </h1>

          {chapter.subtitle && (
            <h2 className="font-handwritten text-lg sm:text-2xl text-lavender/90 italic">
              "{chapter.subtitle}"
            </h2>
          )}

          <div className="flex items-center gap-3 text-xs font-ui text-lavender/60 pt-1">
            <span className="flex items-center gap-1">
              <BookOpen size={13} className="text-warm-gold/70" />
              <span>{chapter.scenes.length} Scenes</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-warm-gold/70" />
              <span>~{readMinutes} min</span>
            </span>
            <span>•</span>
            <span>~{wordCount.toLocaleString()} words</span>
          </div>

          <div className="flex items-center gap-4 mt-4 opacity-60">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-warm-gold" />
            <span className="text-warm-gold text-base sm:text-lg">✦ ❈ ✦</span>
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-warm-gold" />
          </div>
        </div>

        {/* Cover Artwork Ambient Layer */}
        {chapter.coverImage && (
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src={chapter.coverImage}
              alt={chapter.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-transparent to-midnight" />
          </div>
        )}
      </header>

      {/* Scenes */}
      <div className="flex flex-col divide-y divide-white/5">
        {chapter.scenes.map((scene, index) => (
          <SceneRenderer key={scene.id} scene={scene} isFirst={index === 0} />
        ))}
      </div>

      {/* Footer Navigation */}
      <footer className="mt-20 pb-12">
        <ChapterNavigation currentChapter={chapter} chapters={allChapters} />
      </footer>
    </article>
  );
}
