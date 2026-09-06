'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface JournalQuote {
  id: string;
  text: string;
  source?: string;
  chapter?: string;
  isUnlockable: boolean;
}

interface JournalCardProps {
  quote: JournalQuote;
  index: number;
}

export function JournalCard({ quote, index }: JournalCardProps) {
  // Random slight rotations for visual interest
  const rotations = [-2, 1, -1, 2, 0];
  const rotateDeg = rotations[index % 5];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        rotate: 0, 
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="relative p-6 sm:p-8 rounded-sm shadow-xl bg-parchment/95 group cursor-pointer"
      style={{
        transform: `rotate(${rotateDeg}deg)`,
        backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.4), rgba(229, 214, 185, 0.1))',
        boxShadow: '4px 4px 15px rgba(0,0,0,0.1), inset -2px -2px 10px rgba(91, 64, 48, 0.05)'
      }}
    >
      {/* Page Curl Shadow Effect */}
      <div 
        className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none transition-opacity duration-300 opacity-50 group-hover:opacity-100"
        style={{
          boxShadow: '-4px -4px 10px rgba(0,0,0,0.1)',
          background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)',
          borderBottomRightRadius: '2px'
        }}
      />
      
      {/* Tape/Pin decoration (optional) */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 backdrop-blur-sm rotate-[-2deg] shadow-sm border border-white/20" />

      <div className="flex flex-col h-full justify-center space-y-6 text-center">
        <p className="font-handwritten text-xl sm:text-2xl text-ink leading-relaxed">
          {quote.text}
        </p>
        
        {(quote.source || quote.chapter) && (
          <div className="pt-4 border-t border-ink/10 flex justify-center items-center gap-2">
            <span className="font-ui text-xs text-aged-brown/60 uppercase tracking-widest">
              {quote.source || 'Journal Entry'} {quote.chapter && `· ${quote.chapter}`}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
