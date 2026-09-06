'use client';

import { Expression } from '@/data/expressions';
import ExpressionCard from './ExpressionCard';
import { motion } from 'framer-motion';

interface ExpressionGridProps {
  expressions: Expression[];
}

export default function ExpressionGrid({ expressions }: ExpressionGridProps) {
  const handleExpressionClick = (exp: Expression) => {
    // In a full implementation, this would open a lightbox
    console.log('Opened lightbox for', exp.name);
  };

  return (
    <motion.div 
      layout
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
    >
      {expressions.map((exp) => (
        <ExpressionCard 
          key={exp.id} 
          expression={exp} 
          onClick={() => handleExpressionClick(exp)}
        />
      ))}
    </motion.div>
  );
}
