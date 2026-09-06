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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative aspect-square w-full overflow-hidden rounded-lg bg-plum/30 group focus:outline-none focus:ring-2 focus:ring-warm-gold/50 hover:shadow-[0_0_15px_rgba(184,169,201,0.2)] hover:border-lavender/30 border border-transparent transition-colors"
      aria-label={`View ${expression.name} expression`}
    >
      <Image
        src={expression.image}
        alt={`${expression.name} expression`}
        fill
        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
      />
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-midnight/90 via-midnight/50 to-transparent">
        <span className="font-ui text-xs tracking-wider text-cream/90 uppercase block text-center">
          {expression.name}
        </span>
      </div>
    </motion.button>
  );
}
