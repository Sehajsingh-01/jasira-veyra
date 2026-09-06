'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  accent,
  centered = true,
  className = '',
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const alignmentClass = centered ? 'text-center items-center' : 'text-left items-start';

  const containerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  };

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${alignmentClass} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {accent && (
        <motion.span
          variants={itemVariants}
          className="uppercase tracking-widest text-warm-gold font-ui text-xs mb-4 block"
        >
          {accent}
        </motion.span>
      )}
      
      <motion.h2
        variants={itemVariants}
        className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6"
      >
        {title}
      </motion.h2>

      <motion.div variants={itemVariants} className="flex items-center gap-4 my-2 opacity-60">
        <div className="h-px bg-lavender/40 w-16 md:w-32"></div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-warm-gold">
          <path d="M12 2C12 2 14 8 22 12C14 16 12 22 12 22C12 22 10 16 2 12C10 8 12 2 12 2Z" fill="currentColor" />
        </svg>
        <div className="h-px bg-lavender/40 w-16 md:w-32"></div>
      </motion.div>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="font-body text-lg text-lavender/80 max-w-2xl mt-6"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
