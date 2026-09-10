'use client';

import { useState, useEffect, useCallback } from 'react';
import { Expression } from '@/data/expressions';
import ExpressionCard from './ExpressionCard';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ExpressionGridProps {
  expressions: Expression[];
}

export default function ExpressionGrid({ expressions }: ExpressionGridProps) {
  const [selectedExp, setSelectedExp] = useState<Expression | null>(null);

  const selectedIndex = selectedExp 
    ? expressions.findIndex(e => e.id === selectedExp.id) 
    : -1;

  const handleNext = useCallback(() => {
    if (selectedIndex >= 0 && selectedIndex < expressions.length - 1) {
      setSelectedExp(expressions[selectedIndex + 1]);
    } else if (selectedIndex === expressions.length - 1) {
      setSelectedExp(expressions[0]);
    }
  }, [selectedIndex, expressions]);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedExp(expressions[selectedIndex - 1]);
    } else if (selectedIndex === 0) {
      setSelectedExp(expressions[expressions.length - 1]);
    }
  }, [selectedIndex, expressions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedExp) return;
      if (e.key === 'Escape') setSelectedExp(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedExp, handleNext, handlePrev]);

  return (
    <>
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
      >
        {expressions.map((exp) => (
          <ExpressionCard 
            key={exp.id} 
            expression={exp} 
            onClick={() => setSelectedExp(exp)}
          />
        ))}
      </motion.div>

      {/* Expanded Modal / Lightbox */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-md"
            onClick={() => setSelectedExp(null)}
          >
            {/* Close button */}
            <button 
              className="absolute top-6 right-6 text-cream/70 hover:text-cream z-50 p-3 bg-plum/40 hover:bg-plum/70 rounded-full border border-lavender/20 transition-all"
              onClick={() => setSelectedExp(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Prev / Next buttons */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream z-50 p-3 bg-plum/40 hover:bg-plum/70 rounded-full border border-lavender/20 transition-all"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              aria-label="Previous Expression"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream z-50 p-3 bg-plum/40 hover:bg-plum/70 rounded-full border border-lavender/20 transition-all"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              aria-label="Next Expression"
            >
              <ChevronRight size={28} />
            </button>

            {/* Content card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-md w-full bg-midnight/95 border border-warm-gold/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(212,168,83,0.2)] flex flex-col items-center text-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-64 h-80 rounded-xl overflow-hidden mb-6 border-2 border-warm-gold/30 bg-plum/30 shadow-inner">
                <Image
                  src={selectedExp.image}
                  alt={`${selectedExp.name} expression`}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              <span className="font-ui text-xs tracking-[0.25em] text-warm-gold/80 uppercase mb-1">
                Expression #{selectedIndex + 1} of {expressions.length}
              </span>
              <h3 className="font-display text-3xl text-cream mb-3">
                {selectedExp.name}
              </h3>
              {selectedExp.description && (
                <p className="font-body text-lavender/90 text-sm leading-relaxed max-w-xs">
                  "{selectedExp.description}"
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 max-w-xs px-2">
                {expressions.map((e, idx) => (
                  <button
                    key={e.id}
                    onClick={() => setSelectedExp(e)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === selectedIndex ? 'w-5 bg-warm-gold' : 'w-1.5 bg-lavender/30 hover:bg-lavender/60'
                    }`}
                    aria-label={`Jump to ${e.name}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
