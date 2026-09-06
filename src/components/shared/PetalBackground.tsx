'use client';

import { useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PetalBackgroundProps {
  count?: number;
  className?: string;
  color?: string;
}

export default function PetalBackground({
  count = 15,
  className = '',
  color = 'rgba(200, 160, 180, 0.15)',
}: PetalBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const animationDuration = 10 + Math.random() * 15;
      const animationDelay = Math.random() * 10;
      const size = 15 + Math.random() * 20;
      const rotate = Math.random() * 360;

      return { id: i, left, animationDuration, animationDelay, size, rotate };
    });
  }, [count]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fallAndSway {
          0% {
            transform: translateY(-10vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(20px) rotate(360deg);
            opacity: 0;
          }
        }
      `}} />
      <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute top-0 rounded-[50%_0_50%_50%]"
            style={{
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              backgroundColor: color,
              filter: 'blur(1px)',
              transform: `rotate(${petal.rotate}deg)`,
              animation: `fallAndSway ${petal.animationDuration}s linear ${petal.animationDelay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
