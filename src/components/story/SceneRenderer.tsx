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
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full py-24 px-6 md:px-12 ${scene.atmosphereClass}`}
    >
      <div className="max-w-2xl mx-auto">
        <header className="mb-12 text-center">
          <h3 className="font-ui text-xs tracking-widest text-warm-gold/50 uppercase">
            {scene.title}
          </h3>
          <div className="w-12 h-[1px] bg-warm-gold/30 mx-auto mt-4" />
        </header>

        <div className="font-body text-base md:text-lg leading-relaxed md:leading-loose text-cream/90">
          {scene.content.map((paragraph, idx) => renderParagraph(paragraph, idx))}
        </div>

        {scene.illustration && (
          <motion.figure 
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="my-16 mx-auto max-w-lg"
          >
            <div className="relative aspect-square md:aspect-[4/3] w-full border-2 border-warm-gold/20 shadow-inner overflow-hidden rounded-sm bg-midnight/50">
              <Image 
                src={scene.illustration}
                alt={scene.illustrationAlt || 'Scene illustration'}
                fill
                className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            {scene.illustrationAlt && (
              <figcaption className="mt-4 text-center font-handwritten text-sm text-lavender/50">
                {scene.illustrationAlt}
              </figcaption>
            )}
          </motion.figure>
        )}

        {scene.quote && (
          <div className="my-16 text-center relative px-8">
            <span className="absolute left-0 top-0 text-6xl text-warm-gold/10 font-display leading-none">"</span>
            <blockquote className="font-handwritten text-xl md:text-2xl text-lavender/70 italic relative z-10">
              {scene.quote}
            </blockquote>
            <span className="absolute right-0 bottom-0 text-6xl text-warm-gold/10 font-display leading-none transform rotate-180">"</span>
            {scene.quoteAttribution && (
              <cite className="block mt-4 font-ui text-xs text-muted-plum not-italic uppercase tracking-wider">
                — {scene.quoteAttribution}
              </cite>
            )}
          </div>
        )}

        <div className="mt-16 text-center">
          <span className="text-warm-gold/30 text-2xl">✧</span>
        </div>
      </div>
    </motion.section>
  );
}
