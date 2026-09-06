import React from 'react';
import { Timeline, TimelineEvent } from '@/components/timeline/Timeline';

export const metadata = {
  title: 'Duskbloom Wood | Jasira Veyra',
  description: 'The world and history of the Bloomverse.',
};

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    age: 'The First Blooming',
    title: 'The Great Seed is Planted',
    description: 'The ancestors planted the first Duskbloom seed in the heart of what would become the great wood. It is said the moon itself wept that night, watering the soil.',
    category: 'world'
  },
  {
    id: '2',
    age: 'Age 5',
    title: 'Discovering the Verse',
    description: 'Jasira first manifested her magic. Not with a burst of power, but by causing a withered page in an old book to glow with a soft, warm light.',
    quote: 'It felt like remembering something I had never known.',
    category: 'personal'
  },
  {
    id: '3',
    age: 'Age 12',
    title: 'Meeting Mochi',
    description: 'On a particularly quiet afternoon near the edge of the wood, Jasira found a small creature with ears that noticed everything. They have been inseparable since.',
    quote: 'Some companions make the quiet days brighter.',
    category: 'personal'
  },
  {
    id: '4',
    age: 'Current Era',
    title: 'The Athenaeum Duty',
    description: 'Taking up the mantle as a Keeper in the Athenaeum, organizing the forgotten things and tending to the histories that others overlook.',
    category: 'world'
  }
];

export default function WorldPage() {
  return (
    <main className="min-h-screen bg-midnight relative">
      <div className="relative z-10 container mx-auto px-4 py-24 max-w-5xl">
        <header className="text-center mb-24 space-y-6">
          <p className="font-ui text-sm md:text-base text-warm-gold tracking-[0.3em] uppercase">
            THE WORLD OF BLOOMVERSE
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-cream tracking-wide">
            DUSKBLOOM WOOD
          </h1>
          <div className="max-w-3xl mx-auto pt-8">
            <p className="font-body text-lg md:text-xl text-lavender/90 leading-relaxed text-left md:text-center italic">
              "Duskbloom Wood was not like other forests. By day it looked ordinary enough — quiet, a little grey, easy to walk past without a second glance. But the moment the moon cleared the treeline, the whole wood remembered what it actually was: every flower opened at once, and the air turned the soft, glowing lilac of something that had been waiting all day to finally breathe."
            </p>
          </div>
        </header>

        <section className="mb-32">
          <h2 className="font-display text-4xl text-cream mb-12 text-center">Chronicles of the Wood</h2>
          <Timeline events={timelineEvents} />
        </section>

        <div className="grid md:grid-cols-2 gap-16">
          <section className="space-y-6">
            <h2 className="font-display text-3xl text-warm-gold border-b border-white/10 pb-4">The Athenaeum</h2>
            <p className="font-body text-lavender/80 leading-relaxed">
              A repository not just for books, but for memories, lost spells, and forgotten items. It sits at the heart of the wood, its architecture woven seamlessly into the ancient trees. Jasira spends most of her time here.
            </p>
          </section>
          
          <section className="space-y-6">
            <h2 className="font-display text-3xl text-warm-gold border-b border-white/10 pb-4">The Elder Circle</h2>
            <p className="font-body text-lavender/80 leading-relaxed">
              The guides of the elf community. They watch over the deep magic of the forest and ensure the balance between the waking day and the magic-filled night is maintained.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
