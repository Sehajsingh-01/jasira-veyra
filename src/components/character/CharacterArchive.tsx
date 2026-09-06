'use client';

import { useState } from 'react';
import { Character } from '@/data/characters';
import { Expression } from '@/data/expressions';
import ExpressionGrid from './ExpressionGrid';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const TABS = ['PORTRAITS', 'EXPRESSIONS', 'OUTFITS', 'ANGLES', 'MAGIC', 'MOCHI', 'LIFE'];

interface CharacterArchiveProps {
  character: Character;
  expressions: Expression[];
}

export default function CharacterArchive({ character, expressions }: CharacterArchiveProps) {
  const [activeTab, setActiveTab] = useState('EXPRESSIONS');

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-12">
      {/* Character Info Panel */}
      <section className="bg-plum/20 border border-lavender/10 rounded-lg p-8 shadow-xl flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="font-display text-4xl text-cream mb-1">{character.name}</h2>
            {character.nickname && (
              <p className="font-handwritten text-xl text-lavender/70">"{character.nickname}"</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-ui text-sm">
            <div className="text-muted-plum">Age</div>
            <div className="text-cream">{character.age}</div>
            <div className="text-muted-plum">Height</div>
            <div className="text-cream">{character.height}</div>
            <div className="text-muted-plum">Race</div>
            <div className="text-cream">{character.race}</div>
            <div className="text-muted-plum">Theme</div>
            <div className="text-cream">{character.theme}</div>
            <div className="text-muted-plum">Role</div>
            <div className="text-cream">{character.role}</div>
          </div>
        </div>
        
        <div className="flex-1 border-t md:border-t-0 md:border-l border-lavender/10 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
          <p className="font-body text-cream/80 leading-relaxed text-sm mb-6">
            {character.personality}
          </p>
          {character.quote && (
            <blockquote className="font-handwritten text-lg text-warm-gold/80 italic relative">
              <span className="absolute -left-4 -top-2 text-2xl text-warm-gold/20">"</span>
              {character.quote}
              <span className="absolute -right-4 -bottom-4 text-2xl text-warm-gold/20 rotate-180">"</span>
            </blockquote>
          )}
        </div>
      </section>

      {/* Category Tabs */}
      <section>
        <div className="flex overflow-x-auto pb-4 no-scrollbar border-b border-lavender/10 gap-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-ui text-xs tracking-widest whitespace-nowrap px-1 py-2 border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'text-warm-gold border-warm-gold' 
                  : 'text-lavender/50 border-transparent hover:text-lavender'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8 min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'EXPRESSIONS' ? (
                <ExpressionGrid expressions={expressions} />
              ) : (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-lavender/10 rounded-lg">
                  <p className="font-ui text-lavender/50 text-sm tracking-widest uppercase">
                    {activeTab} Archive Empty
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
