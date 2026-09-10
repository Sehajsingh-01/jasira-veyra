'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface TapRipple {
  id: number;
  x: number;
  y: number;
}

export default function MagicTapEffect() {
  const [ripples, setRipples] = useState<TapRipple[]>([]);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    // Only trigger on primary button / touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    const target = e.target as HTMLElement | null;
    if (!target) return;

    // Check if clicked element or its parent is interactive
    const isInteractive = target.closest(
      'button, a, [role="button"], input, select, .cursor-pointer, .ios-interactive'
    );

    if (isInteractive) {
      const newRipple: TapRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-6), newRipple]); // keep max 7 active ripples

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 420);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [handlePointerDown]);

  if (ripples.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-magic-tap-pulse"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '64px',
            height: '64px',
            background:
              'radial-gradient(circle, rgba(212, 168, 83, 0.45) 0%, rgba(184, 169, 201, 0.25) 45%, transparent 70%)',
            boxShadow: '0 0 15px rgba(212, 168, 83, 0.35)',
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes magicTapPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.6);
            opacity: 0;
          }
        }
        .animate-magic-tap-pulse {
          animation: magicTapPulse 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}} />
    </div>
  );
}
