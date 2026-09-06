'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer className="bg-midnight border-t border-lavender/5 py-20 relative overflow-hidden" ref={ref}>
      <motion.div 
        className="container mx-auto px-6 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
        transition={{ duration: 1, ease: 'easeOut' as const }}
      >
        {/* Top decorative divider */}
        <div className="flex items-center gap-4 mb-16 opacity-50">
          <div className="h-px bg-lavender/30 w-16 md:w-32"></div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-warm-gold">
            <path d="M12 2C12 2 14 8 22 12C14 16 12 22 12 22C12 22 10 16 2 12C10 8 12 2 12 2Z" fill="currentColor" />
          </svg>
          <div className="h-px bg-lavender/30 w-16 md:w-32"></div>
        </div>

        {/* Quote Block */}
        <p className="font-handwritten text-2xl md:text-3xl text-lavender/70 italic whitespace-pre-line mb-16 max-w-xl">
          {"Some endings don't disappear.\nThey wait to be remembered."}
        </p>

        {/* Branding */}
        <h2 className="font-display text-2xl md:text-3xl text-cream tracking-[0.2em] mb-4">
          JASIRA VEYRA
        </h2>
        
        <p className="font-ui text-xs tracking-[0.3em] text-warm-gold/60 mb-6">
          BLOOMVERSE
        </p>
        
        <p className="font-body text-sm text-muted-plum mb-12">
          A quiet soul in a loud world.
        </p>

        {/* Small animated flower */}
        <div className="mb-12">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-lavender/40 animate-[pulse_4s_ease-in-out_infinite]">
            <path d="M12 2C12 2 14 8 22 12C14 16 12 22 12 22C12 22 10 16 2 12C10 8 12 2 12 2Z" fill="currentColor" />
          </svg>
        </div>

        {/* Copyright */}
        <p className="text-xs text-lavender/30 font-ui">
          © {new Date().getFullYear()} Bloomverse. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
