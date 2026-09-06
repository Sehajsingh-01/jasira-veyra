'use client';

import { Chapter } from '@/data/chapters';
import ReadingProgress from './ReadingProgress';
import SceneRenderer from './SceneRenderer';
import ChapterNavigation from './ChapterNavigation';
import Image from 'next/image';
import { chapters as allChapters } from '@/data/chapters';

interface StoryReaderProps {
  chapter: Chapter;
  onSceneChange?: (sceneIndex: number) => void;
}

export default function StoryReader({ chapter, onSceneChange }: StoryReaderProps) {
  return (
    <article className="min-h-screen bg-midnight w-full relative">
      <ReadingProgress chapterId={chapter.id} />

      {/* Chapter Header */}
      <header className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden bg-plum/10">
        <div className="z-10 flex flex-col items-center">
          <span className="font-ui text-xs tracking-[0.3em] text-warm-gold/60 uppercase mb-6">
            Chapter {chapter.number}
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-cream mb-4">
            {chapter.title}
          </h1>
          {chapter.subtitle && (
            <h2 className="font-handwritten text-xl text-lavender/60 mb-8">
              {chapter.subtitle}
            </h2>
          )}
          <div className="flex items-center gap-4 mt-4 opacity-50">
            <div className="h-[1px] w-12 bg-warm-gold" />
            <span className="text-warm-gold text-lg">❈</span>
            <div className="h-[1px] w-12 bg-warm-gold" />
          </div>
        </div>
        
        {chapter.coverImage && (
          <div className="absolute inset-0 z-0 opacity-20 mask-image-b">
            <Image
              src={chapter.coverImage}
              alt={chapter.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-transparent to-midnight" />
          </div>
        )}
      </header>

      {/* Scenes */}
      <div className="flex flex-col">
        {chapter.scenes.map((scene, index) => (
          <SceneRenderer 
            key={scene.id} 
            scene={scene} 
            isFirst={index === 0}
          />
        ))}
      </div>

      {/* Footer Navigation */}
      <footer className="mt-24 pb-12">
        <ChapterNavigation currentChapter={chapter} chapters={allChapters} />
      </footer>
    </article>
  );
}
