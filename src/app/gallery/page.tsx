import React from 'react';
import { Gallery, GalleryImage } from '@/components/gallery/Gallery';

export const metadata = {
  title: 'Gallery | Jasira Veyra',
  description: 'Visual archive of the Bloomverse.',
};

import { gallery } from '@/data/gallery';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-midnight relative">
      <div className="relative z-10 container mx-auto px-4 py-24 max-w-7xl">
        <header className="text-center mb-16 space-y-4">
          <p className="font-ui text-sm md:text-base text-warm-gold tracking-[0.3em] uppercase">
            VISUAL ARCHIVE OF BLOOMVERSE
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-cream tracking-wide">
            THE GALLERY
          </h1>
        </header>

        <Gallery images={gallery} />
      </div>
    </main>
  );
}
