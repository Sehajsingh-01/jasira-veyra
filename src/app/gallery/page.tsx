import React from 'react';
import { Gallery, GalleryImage } from '@/components/gallery/Gallery';

export const metadata = {
  title: 'Gallery | Jasira Veyra',
  description: 'Visual archive of the Bloomverse.',
};

// Mock data
const mockImages: GalleryImage[] = Array.from({ length: 16 }).map((_, i) => {
  const categories = ['JASIRA', 'MOCHI', 'MAGIC', 'WORLD', 'STORY', 'COMIC', 'DETAILS'];
  const category = categories[i % categories.length];
  // Mix of aspect ratios for masonry: portrait, landscape, square
  const ratios = [
    { w: 800, h: 1200 },
    { w: 1200, h: 800 },
    { w: 1000, h: 1000 },
    { w: 800, h: 1400 },
  ];
  const ratio = ratios[i % 4];

  return {
    id: `img-${i + 1}`,
    title: `${category.charAt(0) + category.slice(1).toLowerCase()} Artwork ${i + 1}`,
    category,
    src: `/images/gallery/full-${i + 1}.webp`,
    thumbnail: `/images/gallery/thumb-${i + 1}.webp`,
    description: `A beautiful piece showcasing the ${category.toLowerCase()} of the Bloomverse.`,
    tags: [category.toLowerCase(), 'bloomverse', 'fantasy'],
    width: ratio.w,
    height: ratio.h,
  };
});

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

        <Gallery images={mockImages} />
      </div>
    </main>
  );
}
