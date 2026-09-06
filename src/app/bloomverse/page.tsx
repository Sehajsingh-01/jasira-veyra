import React from 'react';
import { BookViewer } from '@/components/bloomverse/BookViewer';
import BloomverseThreeCanvas from '@/components/three/BloomverseThreeCanvas';
import StoryDownloadButton from '@/components/story/StoryDownloadButton';
import { Sparkles, BookOpen, Feather } from 'lucide-react';

export const metadata = {
  title: 'The Bloomverse Journal | Jasira Veyra',
  description: 'Interactive 3D magical journal of Jasira Veyra.',
};

export default function BloomversePage() {
  return (
    <main className="min-h-screen bg-midnight relative overflow-hidden pt-24 pb-20">
      {/* 3D WebGL Canvas Layer */}
      <BloomverseThreeCanvas showMandala={true} particleCount={500} interactive={true} />

      {/* Ambient Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-plum/25 via-midnight to-midnight" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-warm-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        {/* Header */}
        <header className="text-center mb-10 space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-warm-gold/10 border border-warm-gold/30 text-warm-gold font-ui text-[11px] tracking-[0.3em] uppercase">
            <Sparkles size={12} className="animate-pulse" />
            <span>Interactive 3D Grimoire</span>
            <Sparkles size={12} className="animate-pulse" />
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-cream tracking-wide">
            THE BLOOMVERSE
          </h1>

          <p className="font-handwritten text-2xl text-lavender/80">
            "Every page remembers what the wood chose to forget."
          </p>

          <p className="font-body text-sm sm:text-base text-cream/75 leading-relaxed pt-2">
            Jasira's private handwritten journal bound in ancient duskbloom leather. Inside are field sketches,
            botanical observations, memories with Mochi, and accounts of the unwritten rift.
          </p>

          {/* Quick Action: Download Full Story */}
          <div className="pt-2 flex justify-center">
            <StoryDownloadButton variant="compact" />
          </div>
        </header>

        {/* The 3D Book Experience */}
        <section className="w-full">
          <BookViewer />
        </section>

        {/* Footer Hint */}
        <footer className="mt-16 text-center">
          <p className="font-ui text-xs text-lavender/40 tracking-widest uppercase flex items-center justify-center gap-2">
            <Feather size={14} className="text-warm-gold/60" />
            <span>Click the book cover to hinge open in 3D · Use arrow keys or buttons to turn pages</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
