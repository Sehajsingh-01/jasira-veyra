'use client';

import React, { useState } from 'react';
import { BookPage } from './BookPage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = ['CHARACTER', 'LORE', 'MAGIC', 'MEMORIES', 'STORIES', 'UNKNOWN'];

const PAGES = [
  {
    category: 'CHARACTER',
    content: (
      <div className="space-y-4">
        <h2 className="font-handwritten text-3xl text-faded-rose">Jasira Veyra</h2>
        <p>A quiet observer of Duskbloom Wood. She prefers the company of old books and shy flowers over grand adventures.</p>
        <p className="font-handwritten text-faded-rose text-lg mt-4">Note: The Athenaeum needs reorganizing again.</p>
      </div>
    ),
  },
  {
    category: 'LORE',
    content: (
      <div className="space-y-4">
        <h2 className="font-display text-2xl text-ink font-bold">Duskbloom Wood</h2>
        <p>A forest that sleeps by day and wakes by moonlight. The air turns a soft, glowing lilac when the moon clears the treeline.</p>
      </div>
    ),
  },
  {
    category: 'MAGIC',
    content: (
      <div className="space-y-4">
        <h2 className="font-display text-2xl text-ink font-bold">Petal Magic / Verse</h2>
        <p>Magic lives in feeling — a private well inside each elf called a Verse. Jasira's Verse makes small warm light and coaxes shy flowers into blooming.</p>
        <p className="font-handwritten text-faded-rose text-lg">It feels like... a quiet breath before speaking.</p>
      </div>
    ),
  },
  {
    category: 'MEMORIES',
    content: (
      <div className="space-y-4">
        <p className="font-handwritten text-xl text-ink">"Some days are meant for silence, and that is perfectly fine."</p>
        <p className="font-handwritten text-xl text-ink">"Mochi found another shiny pebble today. I put it on the windowsill."</p>
      </div>
    ),
  },
  {
    category: 'STORIES',
    content: (
      <div className="space-y-4">
        <h2 className="font-display text-2xl text-ink font-bold">Chapter I Excerpt</h2>
        <p>The library was empty, save for the dust motes dancing in the pale shafts of moonlight. Jasira ran her fingers along the spines, listening for the ones that hummed.</p>
      </div>
    ),
  },
  {
    category: 'UNKNOWN',
    content: (
      <div className="space-y-4">
        <h2 className="font-display text-2xl text-ink font-bold">The █████ Prophecy</h2>
        <p>When the █████ falls, the keeper of █████ will find the forgotten things. But something is missing...</p>
        <p className="font-handwritten text-faded-rose text-lg italic mt-8">Something is missing.</p>
      </div>
    ),
  },
];

export function BookViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const nextPage = () => {
    if (currentPageIndex < PAGES.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-12">
      {/* Tabs - Only show when open */}
      <div
        className={`flex flex-wrap justify-center gap-2 mb-8 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {CATEGORIES.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setCurrentPageIndex(idx)}
            className={`px-3 py-1 text-xs font-ui tracking-widest rounded-full transition-colors ${
              PAGES[currentPageIndex]?.category === cat
                ? 'bg-warm-gold/20 text-warm-gold border border-warm-gold/30'
                : 'text-lavender/60 hover:text-lavender hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Book Container */}
      <div className="relative w-full max-w-[300px] sm:max-w-[600px] h-[400px] sm:h-[500px]" style={{ perspective: '1500px' }}>
        
        {/* Closed Book Cover */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="absolute inset-0 w-full md:w-1/2 left-1/2 -translate-x-1/2 md:-translate-x-0 bg-midnight border-2 border-warm-gold rounded-r-xl shadow-2xl cursor-pointer flex flex-col items-center justify-center transition-transform hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(45deg, #0B0A1A 0%, #1a1625 100%)',
              boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.5), 10px 10px 30px rgba(0,0,0,0.8)',
            }}
          >
            <h1
              className="font-display text-4xl sm:text-5xl text-warm-gold tracking-widest mb-4 text-center px-4"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(212, 168, 83, 0.3)' }}
            >
              BLOOMVERSE
            </h1>
            <p className="font-handwritten text-xl sm:text-2xl text-cream/80 italic">
              Keeper of Forgotten Things
            </p>
            <p className="absolute bottom-6 font-ui text-xs text-lavender/40 uppercase tracking-widest animate-pulse">
              Click to open
            </p>
          </div>
        )}

        {/* Open Book Pages */}
        {isOpen && (
          <div className="absolute inset-0 flex justify-center w-full h-full shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
            {/* Left Page - Previous content or blank */}
            <div className="absolute w-1/2 h-full left-0 origin-right rounded-l-md bg-parchment border border-ink/10" style={{
              boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.1)'
            }}>
               <div className="p-8 h-full flex flex-col justify-between">
                  <div className="flex-grow font-body text-ink text-sm sm:text-base leading-relaxed">
                    {currentPageIndex > 0 ? PAGES[currentPageIndex - 1].content : <div className="flex h-full items-center justify-center font-handwritten text-ink/30 text-2xl">Property of Jasira Veyra</div>}
                  </div>
                  <div className="font-ui text-xs text-ink/50 mt-4 flex justify-start">
                    {currentPageIndex > 0 ? currentPageIndex : ''}
                  </div>
               </div>
            </div>

            {/* Right Page - Current content */}
            <div className="absolute w-1/2 h-full right-0 origin-left rounded-r-md bg-parchment border border-ink/10" style={{
              boxShadow: 'inset 10px 0 20px rgba(0,0,0,0.1)'
            }}>
              <div className="p-8 h-full flex flex-col justify-between">
                  <div className="flex-grow font-body text-ink text-sm sm:text-base leading-relaxed">
                    {PAGES[currentPageIndex].content}
                  </div>
                  <div className="font-ui text-xs text-ink/50 mt-4 flex justify-end">
                    {currentPageIndex + 1} / {PAGES.length}
                  </div>
               </div>
            </div>
            
            {/* Book spine overlay */}
            <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none z-10" />
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      {isOpen && (
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={prevPage}
            disabled={currentPageIndex === 0}
            className="p-2 rounded-full bg-white/5 text-cream hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="font-ui text-xs text-lavender tracking-widest hover:text-cream transition-colors"
          >
            CLOSE JOURNAL
          </button>
          <button
            onClick={nextPage}
            disabled={currentPageIndex === PAGES.length - 1}
            className="p-2 rounded-full bg-white/5 text-cream hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
