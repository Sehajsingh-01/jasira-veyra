'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagicalSectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function MagicalSectionReveal({
  children,
  className = '',
  delay = 0,
}: MagicalSectionRevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: '-30px 0px' }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* Subtle enchanted aura behind section */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-12 bg-gradient-to-r from-transparent via-warm-gold/10 to-transparent blur-xl pointer-events-none -z-10" />

      {/* Main Section Content */}
      {children}
    </motion.div>
  );
}
