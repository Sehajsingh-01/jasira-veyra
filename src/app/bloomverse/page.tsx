import React from 'react';
import { BookViewer } from '@/components/bloomverse/BookViewer';
import BloomverseThreeCanvas from '@/components/three/BloomverseThreeCanvas';
import { Sparkles, Feather } from 'lucide-react';

export const metadata = {
  title: 'The Bloomverse Journal | Jasira Veyra',
  description: 'Interactive 3D magical journal of Jasira Veyra.',
};

export default function BloomversePage() {
  return (
    <main className="min-h-screen bg-midnight relative overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-20">
      {/* 3D WebGL Canvas Layer (Lightweight for Mobile) */}
      <BloomverseThreeCanvas showMandala={false} particleCount={40} interactive={true} />

      {/* Ambient Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-plum/20 via-midnight to-midnight" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-warm-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-3 sm:px-4 flex flex-col items-center">
        {/* Compact Header */}
        <header className="text-center mb-6 sm:mb-10 space-y-2 sm:space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-gold/10 border border-warm-gold/30 text-warm-gold font-ui text-[10px] sm:text-[11px] tracking-[0.3em] uppercase">
            <Sparkles size={11} className="animate-pulse" />
            <span>Interactive Grimoire</span>
            <Sparkles size={11} className="animate-pulse" />
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-cream tracking-wide leading-tight">
            THE BLOOMVERSE
          </h1>

          <p className="font-handwritten text-lg sm:text-2xl text-lavender/80">
            &quot;Every page remembers what the wood chose to forget.&quot;
          </p>
        </header>

        {/* The 3D Book Experience */}
        <section className="w-full">
          <BookViewer />
        </section>

        {/* Footer Hint */}
        <footer className="mt-10 sm:mt-14 text-center px-4">
          <p className="font-ui text-[10px] sm:text-xs text-lavender/40 tracking-widest uppercase flex items-center justify-center gap-2">
            <Feather size={13} className="text-warm-gold/60" />
            <span>Tap the book to open · Use buttons to turn pages</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
