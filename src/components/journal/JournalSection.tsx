'use client';

import React from 'react';
import { JournalCard, JournalQuote } from './JournalCard';
import { Leaf } from 'lucide-react';

const journalEntries: JournalQuote[] = [
  {
    id: '1',
    text: "Some days are meant for silence, and that is perfectly fine.",
    isUnlockable: false,
    chapter: 'Ch. 1'
  },
  {
    id: '2',
    text: "Mochi found another shiny pebble today. I put it on the windowsill with the others. We have quite the collection now.",
    isUnlockable: false,
  },
  {
    id: '3',
    text: "I wonder if the books miss being read, or if they prefer the quiet companionship of the dust motes.",
    isUnlockable: false,
  },
  {
    id: '4',
    text: "The Duskbloom petals are opening earlier tonight. A sign of rain, perhaps, or just eagerness.",
    isUnlockable: false,
    source: 'Observations'
  },
  {
    id: '5',
    text: "Magic shouldn't always have to roar. Sometimes it just needs to hum softly.",
    isUnlockable: false,
  },
  {
    id: '6',
    text: "There is a gap on the third shelf in the west wing. I swear there was a green tome there yesterday.",
    isUnlockable: false,
    chapter: 'Ch. 2'
  }
];

export function JournalSection() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto w-full relative">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-lavender/10 -translate-y-1/2" />
        <div className="relative inline-flex flex-col items-center bg-midnight px-8">
          <Leaf className="text-warm-gold mb-4 opacity-50" size={24} />
          <h2 className="font-display text-3xl md:text-4xl text-cream tracking-widest uppercase">
            From Jasira's Journal
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {journalEntries.map((entry, index) => (
          <JournalCard key={entry.id} quote={entry} index={index} />
        ))}
      </div>
    </section>
  );
}
