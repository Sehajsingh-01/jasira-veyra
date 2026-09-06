import React from 'react';
import { MagicCard, MagicAbility } from '@/components/magic/MagicCard';

export const metadata = {
  title: 'Petal Magic | Jasira Veyra',
  description: 'The magic system of Duskbloom Wood.',
};

const abilities: MagicAbility[] = [
  {
    id: '1',
    name: 'Glimmerbloom',
    theme: 'Illumination',
    description: 'The ability to summon soft, warm orbs of light that hover gently like fireflies. They provide comfort and visibility in the darkest parts of the wood.',
    visual: 'It feels like holding a captured star in the palm of your hand.',
    flowerType: 'Moonlace',
    color: '#D4A853',
  },
  {
    id: '2',
    name: 'Whisperweave',
    theme: 'Restoration',
    description: 'A delicate magic used to mend torn parchment, bind loose threads, and breathe life back into small, withered things.',
    visual: 'A quiet, golden thread pulling the pieces back together.',
    flowerType: 'Dusk Rose',
    color: '#C9A0A0',
  },
  {
    id: '3',
    name: 'Stillness',
    theme: 'Concealment',
    description: 'The power to quiet one\'s presence completely, blending into the ambient magic of the forest until one is indistinguishable from a shadow.',
    visual: 'Like drawing a soft, thick blanket of fog over yourself.',
    color: '#B8A9C9',
  }
];

export default function MagicPage() {
  return (
    <main className="min-h-screen bg-midnight relative overflow-hidden">
      {/* Botanical Background Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5 mix-blend-screen"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #B8A9C9 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-24 max-w-6xl">
        <header className="text-center mb-20 space-y-6">
          <h1 className="font-display text-5xl md:text-7xl text-warm-gold tracking-widest">
            PETAL MAGIC
          </h1>
          <p className="font-ui text-sm md:text-base text-lavender tracking-[0.2em] uppercase">
            The Verse of Duskbloom Wood
          </p>
          <div className="max-w-3xl mx-auto pt-8">
            <p className="font-body text-lg md:text-xl text-cream/90 leading-relaxed text-left md:text-center">
              "In Duskbloom Wood, magic lives in feeling — a private well inside each elf called a Verse, tied to whatever they carry in their hearts. Jasira's Verse doesn't throw fire or raise walls of light. It makes small warm light, coaxes shy flowers into blooming, and does something quiet to books that nobody had ever thought to look at closely."
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {abilities.map((ability) => (
            <MagicCard key={ability.id} ability={ability} />
          ))}
        </div>

        <div className="text-center py-12 border-t border-white/5">
          <p className="font-handwritten text-3xl md:text-4xl text-dusty-rose/80">
            "Her magic should feel alive rather than destructive."
          </p>
        </div>
      </div>
    </main>
  );
}
