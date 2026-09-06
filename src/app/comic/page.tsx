import React from 'react';
import { ComicViewer, ComicChapter } from '@/components/comic/ComicViewer';

export const metadata = {
  title: 'Read | Jasira Veyra',
  description: 'Read the Bloomverse webcomic.',
};

// Mock data for chapters
const mockChapters: ComicChapter[] = [
  {
    id: 'ch1',
    title: 'Chapter 1: The Quiet Keeper',
    isAvailable: true,
    pages: Array.from({ length: 8 }).map((_, i) => ({
      id: `p${i + 1}`,
      pageNumber: i + 1,
      chapterId: 'ch1',
      src: `/images/comic/ch1/${i + 1}.webp`,
      thumbnail: `/images/comic/ch1/thumb-${i + 1}.webp`,
      alt: `Chapter 1, Page ${i + 1}`
    }))
  },
  {
    id: 'ch2',
    title: 'Chapter 2: A Bloom in the Dark',
    isAvailable: true,
    pages: Array.from({ length: 6 }).map((_, i) => ({
      id: `p${i + 1}`,
      pageNumber: i + 1,
      chapterId: 'ch2',
      src: `/images/comic/ch2/${i + 1}.webp`,
      thumbnail: `/images/comic/ch2/thumb-${i + 1}.webp`,
      alt: `Chapter 2, Page ${i + 1}`
    }))
  }
];

export default function ComicPage() {
  return (
    <main className="bg-midnight min-h-screen">
      <ComicViewer chapters={mockChapters} />
    </main>
  );
}
