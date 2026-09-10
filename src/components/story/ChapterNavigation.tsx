'use client';

import Link from 'next/link';
import { Chapter } from '@/data/chapters';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

interface ChapterNavigationProps {
  currentChapter: Chapter;
  chapters: Chapter[];
}

export default function ChapterNavigation({ currentChapter, chapters }: ChapterNavigationProps) {
  const currentIndex = chapters.findIndex(c => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <nav className="w-full max-w-4xl mx-auto py-12 px-6 flex items-center justify-between border-t border-warm-gold/20 font-ui text-sm text-cream/70 bg-parchment/5">
      <div className="flex-1">
        {prevChapter && prevChapter.isAvailable && (
          <Link 
            href={`/story/${prevChapter.id}`}
            className="inline-flex items-center gap-2 hover:text-warm-gold transition-colors touch-manipulation ios-touch-spring cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Chapter {prevChapter.number}</span>
          </Link>
        )}
      </div>

      <div className="flex-1 flex justify-center">
        <Link 
          href="/story"
          className="flex items-center gap-2 hover:text-warm-gold transition-colors touch-manipulation ios-touch-spring cursor-pointer"
        >
          <Menu size={16} />
          <span className="uppercase tracking-widest text-xs">Chapters</span>
        </Link>
      </div>

      <div className="flex-1 flex justify-end">
        {nextChapter && nextChapter.isAvailable && (
          <Link 
            href={`/story/${nextChapter.id}`}
            className="inline-flex items-center gap-2 hover:text-warm-gold transition-colors touch-manipulation ios-touch-spring cursor-pointer"
          >
            <span className="hidden sm:inline">Chapter {nextChapter.number}</span>
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </nav>
  );
}
