import React from 'react';
import { BookViewer } from '@/components/bloomverse/BookViewer';

export const metadata = {
  title: 'The Bloomverse Journal | Jasira Veyra',
  description: 'Interactive magical journal of Jasira Veyra.',
};

export default function BloomversePage() {
  return (
    <main className="min-h-screen bg-midnight relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-plum/20 via-midnight to-midnight" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center">
        <header className="text-center mb-16 space-y-4">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream tracking-wider">
            THE BLOOMVERSE
          </h1>
          <p className="font-body text-lg text-lavender max-w-2xl mx-auto">
            A collection of thoughts, lore, and quiet moments recorded by Jasira. 
            Open the journal to explore the magical world of Duskbloom Wood.
          </p>
        </header>

        <section className="w-full">
          <BookViewer />
        </section>
      </div>
    </main>
  );
}
