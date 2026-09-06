import React from 'react';
import { ComicViewer } from '@/components/comic/ComicViewer';
import { comicChapters } from '@/data/comic';

export const metadata = {
  title: 'Read | Jasira Veyra',
  description: 'Read the Bloomverse webcomic.',
};

export default function ComicPage() {
  return (
    <main className="bg-midnight min-h-screen">
      <ComicViewer chapters={comicChapters} />
    </main>
  );
}
