'use client';

import { Expression } from '@/data/expressions';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ExpressionCardProps {
  expression: Expression;
  onClick: () => void;
}

export default function ExpressionCard({ expression, onClick }: ExpressionCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-plum/20 group focus:outline-none focus:ring-2 focus:ring-warm-gold/50 hover:shadow-[0_0_20px_rgba(212,168,83,0.3)] hover:border-warm-gold/40 border border-lavender/15 transition-all duration-300"
      aria-label={`View ${expression.name} expression`}
    >
      <Image
        src={expression.image}
        alt={`${expression.name} expression`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
        <span className="font-ui text-xs tracking-widest text-cream uppercase font-medium block drop-shadow-sm group-hover:text-warm-gold transition-colors">
          {expression.name}
        </span>
        <span className="font-ui text-[10px] text-lavender/60 tracking-wider block mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click to expand
        </span>
      </div>
    </motion.button>
  );
}
