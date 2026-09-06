'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface MagicAbility {
  id: string;
  name: string;
  theme: string;
  description: string;
  visual: string;
  flowerType?: string;
  imageSrc?: string;
  color: string;
}

interface MagicCardProps {
  ability: MagicAbility;
}

export function MagicCard({ ability }: MagicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group relative bg-plum/30 rounded-xl p-6 overflow-hidden transition-all duration-300"
      style={{
        borderColor: `${ability.color}33`, // 20% opacity
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      {/* Hover background glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${ability.color}15, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon / Glow area */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative">
           <div 
             className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md"
             style={{ backgroundColor: ability.color }}
           />
           {/* Placeholder for icon/image */}
           <div 
             className="w-12 h-12 rounded-full relative z-10"
             style={{ backgroundColor: ability.color }}
           />
        </div>

        <div className="space-y-4 flex-grow">
          <div>
            <h3 className="font-display text-2xl text-cream mb-1">{ability.name}</h3>
            <p className="font-ui text-xs tracking-widest uppercase" style={{ color: `${ability.color}99` }}>
              {ability.theme}
            </p>
          </div>

          <p className="font-body text-sm text-lavender/70 leading-relaxed">
            {ability.description}
          </p>

          <p className="font-handwritten text-lg text-dusty-rose/70 italic leading-snug">
            "{ability.visual}"
          </p>
        </div>

        {ability.flowerType && (
          <div className="mt-6 pt-4 border-t border-white/5">
            <p className="font-ui text-[10px] tracking-wider text-warm-gold/50 uppercase">
              Associated Bloom: <span className="text-warm-gold/80">{ability.flowerType}</span>
            </p>
          </div>
        )}
      </div>

      {/* Floating Petal Particles (CSS-based approximation) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full blur-[1px] animate-pulse"
            style={{
              backgroundColor: ability.color,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 2}s`,
              animationDelay: `${Math.random()}s`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
