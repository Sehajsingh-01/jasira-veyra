'use client';

import { useMemo, useState, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export default function FloatingParticles({
  count = 30,
  className = '',
}: FloatingParticlesProps) {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: (i * 17) % 100,
      top: (i * 23) % 100,
      size: 2 + (i % 3),
      duration: 15 + (i % 10) * 2,
      delay: (i % 5),
      opacity: 0.15 + (i % 3) * 0.05,
    }));
  }, [count]);

  if (!mounted || prefersReducedMotion) {
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
