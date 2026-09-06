'use client';

import { useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export default function FloatingParticles({
  count = 30,
  className = '',
}: FloatingParticlesProps) {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 2,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.2,
    }));
  }, [count]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatRandom {
          0% { transform: translate(0, 0); }
          33% { transform: translate(10px, -15px); }
          66% { transform: translate(-10px, 15px); }
          100% { transform: translate(0, 0); }
        }
      `}} />
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-warm-gold"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 2}px rgba(212, 168, 83, 0.5)`,
              animation: `floatRandom ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
