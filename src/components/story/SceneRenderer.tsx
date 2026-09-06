'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Scene } from '@/data/chapters';

interface SceneRendererProps {
  scene: Scene;
  isFirst: boolean;
}

export default function SceneRenderer({ scene, isFirst }: SceneRendererProps) {
  // A simple parser to handle italicizing text in asterisks, e.g., *thought* -> <em>thought</em>
  const renderParagraph = (text: string, pIndex: number) => {
    const isDialogue = text.startsWith('"') || text.startsWith('“') || text.startsWith('-');
    
    // Split by asterisks for italics
    const parts = text.split(/(\*[^*]+\*)/g);
    
    return (
      <p 
        key={pIndex} 
        className={`mb-6 ${isDialogue ? 'pl-4 border-l border-lavender/30 italic' : ''} ${isFirst && pIndex === 0 ? 'first-letter:float-left first-letter:font-display first-letter:text-[4rem] first-letter:leading-[0.8] first-letter:pr-2 first-letter:text-warm-gold' : ''}`}
      >
        {parts.map((part, i) => {
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i}>{part.slice(1, -1)}</em>;
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  };

  return (
    <section 
      className={`w-full py-12 sm:py-20 px-4 sm:px-8 md:px-12 ${scene.atmosphereClass}`}
    >
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 sm:mb-12 text-center">
          <h3 className="font-ui text-xs tracking-widest text-warm-gold/70 uppercase">
            {scene.title}
          </h3>
          <div className="w-12 h-[1px] bg-warm-gold/30 mx-auto mt-4" />
        </header>

        <div className="font-body text-base md:text-lg leading-relaxed md:leading-loose text-cream/95">
          {scene.content.map((paragraph, idx) => renderParagraph(paragraph, idx))}
        </div>

        {scene.illustration && (
          <figure className="my-12 sm:my-16 mx-auto max-w-lg">
            <div className="relative aspect-square md:aspect-[4/3] w-full border-2 border-warm-gold/25 shadow-xl overflow-hidden rounded-lg bg-midnight/50">
              <Image 
                src={scene.illustration}
                alt={scene.illustrationAlt || 'Scene illustration'}
                fill
                className="object-cover opacity-95 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            {scene.illustrationAlt && (
              <figcaption className="mt-4 text-center font-handwritten text-sm text-lavender/70">
                {scene.illustrationAlt}
              </figcaption>
            )}
          </figure>
        )}

        {scene.quote && (
          <div className="my-12 sm:my-16 text-center relative px-6 sm:px-8">
            <span className="absolute left-0 top-0 text-5xl sm:text-6xl text-warm-gold/15 font-display leading-none">"</span>
            <blockquote className="font-handwritten text-xl md:text-2xl text-lavender/90 italic relative z-10">
              {scene.quote}
            </blockquote>
            <span className="absolute right-0 bottom-0 text-5xl sm:text-6xl text-warm-gold/15 font-display leading-none transform rotate-180">"</span>
            {scene.quoteAttribution && (
              <cite className="block mt-4 font-ui text-xs text-muted-plum not-italic uppercase tracking-wider">
                — {scene.quoteAttribution}
              </cite>
            )}
          </div>
        )}

        <div className="mt-12 sm:mt-16 text-center">
          <span className="text-warm-gold/40 text-xl sm:text-2xl">✧</span>
        </div>
      </div>
    </section>
  );
}
