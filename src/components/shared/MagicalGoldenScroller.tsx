'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

/**
 * MagicalGoldenScroller:
 * Ultra-high-performance 120Hz/60Hz Golden Scrubber Rail.
 * Uses direct DOM manipulation & rAF throttling to completely bypass
 * React re-render overhead and eliminate lag during scroll and drag.
 */
export default function MagicalGoldenScroller() {
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipTextRef = useRef<HTMLSpanElement>(null);

  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const rAFScrollRef = useRef<number | null>(null);
  const rAFDragRef = useRef<number | null>(null);
  const smoothScrollRAFRef = useRef<number | null>(null);
  const trackBoundsRef = useRef<{ top: number; height: number }>({ top: 0, height: 0 });
  const maxScrollRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Synchronously update GPU transforms with 0ms delay & 0 layout reflows
  const updateVisualPosition = useCallback((progress: number) => {
    const clamped = Math.min(Math.max(progress, 0), 1);

    if (trackRef.current) {
      const trackH = trackBoundsRef.current.height || trackRef.current.clientHeight || 260;
      const thumbTravel = Math.max(trackH - 28, 1); // 28px thumb height
      const thumbY = clamped * thumbTravel;

      // 100% GPU-composited scaleY on the rail fill (ZERO layout reflow)
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${clamped})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `scaleY(${clamped})`;
      }
      // Pure 1D translate3d on the thumb
      if (thumbRef.current) {
        thumbRef.current.style.transform = `translate3d(0, ${thumbY}px, 0)`;
      }
      if (tooltipRef.current) {
        tooltipRef.current.style.transform = `translate3d(0, ${thumbY - 4}px, 0)`;
      }
      if (tooltipTextRef.current) {
        tooltipTextRef.current.textContent = `${Math.round(clamped * 100)}%`;
      }
    }
  }, []);

  // Recalculate max scrollable height (cached on resize/interaction)
  const refreshBounds = useCallback(() => {
    const scrollH = document.documentElement.scrollHeight;
    const clientH = window.innerHeight;
    maxScrollRef.current = Math.max(scrollH - clientH, 1);
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      trackBoundsRef.current = { top: rect.top, height: rect.height };
    }
  }, []);

  // Throttled native window scroll listener
  useEffect(() => {
    if (!mounted) return;
    refreshBounds();

    const onScroll = () => {
      if (isDraggingRef.current) return;

      if (!rAFScrollRef.current) {
        rAFScrollRef.current = requestAnimationFrame(() => {
          const currentY = window.scrollY || document.documentElement.scrollTop;
          const maxS = maxScrollRef.current || 1;
          const progress = Math.min(Math.max(currentY / maxS, 0), 1);
          updateVisualPosition(progress);
          rAFScrollRef.current = null;
        });
      }

      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        if (containerRef.current && !isDraggingRef.current) {
          containerRef.current.style.opacity = '0.4';
        }
      }, 2500);
    };

    const onResize = () => {
      refreshBounds();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rAFScrollRef.current) cancelAnimationFrame(rAFScrollRef.current);
      if (rAFDragRef.current) cancelAnimationFrame(rAFDragRef.current);
      if (smoothScrollRAFRef.current) cancelAnimationFrame(smoothScrollRAFRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [mounted, refreshBounds, updateVisualPosition]);

  // Pointer Down on track / thumb
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (smoothScrollRAFRef.current) {
      cancelAnimationFrame(smoothScrollRAFRef.current);
      smoothScrollRAFRef.current = null;
    }

    refreshBounds();
    isDraggingRef.current = true;
    setIsDragging(true);

    if (containerRef.current) {
      containerRef.current.style.opacity = '1';
    }

    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId);
    }

    const bounds = trackBoundsRef.current;
    if (bounds.height > 0) {
      const availableTrack = Math.max(bounds.height - 28, 1);
      const relativeY = Math.min(Math.max((e.clientY - bounds.top - 14) / availableTrack, 0), 1);
      updateVisualPosition(relativeY);
      window.scrollTo(0, relativeY * maxScrollRef.current);
    }
  };

  // Pointer Move (Direct 1:1 hardware tracking centered on touch)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();

    const bounds = trackBoundsRef.current;
    if (bounds.height <= 0) return;

    const availableTrack = Math.max(bounds.height - 28, 1);
    const relativeY = Math.min(Math.max((e.clientY - bounds.top - 14) / availableTrack, 0), 1);
    updateVisualPosition(relativeY);

    if (!rAFDragRef.current) {
      rAFDragRef.current = requestAnimationFrame(() => {
        window.scrollTo(0, relativeY * maxScrollRef.current);
        rAFDragRef.current = null;
      });
    }
  };

  // Pointer Up
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (rAFDragRef.current) {
      cancelAnimationFrame(rAFDragRef.current);
      rAFDragRef.current = null;
    }

    if (trackRef.current && trackRef.current.hasPointerCapture(e.pointerId)) {
      try {
        trackRef.current.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Ultra-silky smooth deceleration scroll for top/bottom jump buttons
  const smoothScrollTo = (targetY: number) => {
    if (smoothScrollRAFRef.current) {
      cancelAnimationFrame(smoothScrollRAFRef.current);
    }

    const startY = window.scrollY || document.documentElement.scrollTop;
    const diff = targetY - startY;
    const distance = Math.abs(diff);
    if (distance < 2) return;

    // Dynamically scale duration based on distance so long jumps don't choke the compositor
    const duration = Math.min(Math.max(distance * 0.08, 380), 720);
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = Math.min((currentTime - startTime) / duration, 1);
      // Apple iOS cubic deceleration curve (fluid and gentle at the finish)
      const ease = 1 - Math.pow(1 - elapsed, 3);
      window.scrollTo(0, startY + diff * ease);

      if (elapsed < 1) {
        smoothScrollRAFRef.current = requestAnimationFrame(step);
      } else {
        smoothScrollRAFRef.current = null;
      }
    };
    smoothScrollRAFRef.current = requestAnimationFrame(step);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.stopPropagation();
    smoothScrollTo(0);
  };

  const scrollToBottom = (e: React.MouseEvent) => {
    e.stopPropagation();
    refreshBounds();
    smoothScrollTo(document.documentElement.scrollHeight);
  };

  if (!mounted) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Magical Golden Page Scroller"
      onMouseEnter={() => {
        setIsHovered(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed right-1.5 sm:right-3.5 top-1/2 -translate-y-1/2 z-[200] flex flex-col items-center select-none touch-none pointer-events-auto"
      style={{
        opacity: isVisible || isDragging || isHovered ? 1 : 0.4,
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* Top Quick-Scroll Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-midnight/90 border border-warm-gold/40 flex items-center justify-center text-warm-gold hover:text-cream hover:bg-warm-gold/25 hover:border-warm-gold active:scale-90 transition-colors duration-150 shadow-[0_0_12px_rgba(212,168,83,0.3)] mb-2 cursor-pointer touch-manipulation group"
      >
        <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-150" />
      </button>

      {/* Main Track Container */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-8 sm:w-9 h-[45vh] sm:h-[55vh] max-h-[460px] min-h-[220px] flex items-center justify-center cursor-pointer touch-none"
      >
        {/* Slender Glass Rail */}
        <div className="absolute top-0 bottom-0 w-[4px] sm:w-[5px] rounded-full bg-[#18132A]/85 border border-warm-gold/30 shadow-[0_0_10px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Glowing Golden Progress Fill (Pure GPU scaleY) */}
          <div
            ref={fillRef}
            className="w-full h-full bg-gradient-to-b from-warm-gold via-[#FFE8A3] to-warm-gold rounded-full shadow-[0_0_10px_rgba(212,168,83,0.9)] origin-top will-change-transform"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>

        {/* Ambient Subtle Stardust Glow along the track */}
        <div
          ref={glowRef}
          className="absolute w-1 h-full rounded-full bg-warm-gold/40 blur-[3px] pointer-events-none origin-top will-change-transform"
          style={{ top: 0, transform: 'scaleY(0)' }}
        />

        {/* Floating Percentage Indicator Tooltip */}
        <div
          ref={tooltipRef}
          className={`absolute right-10 sm:right-11 px-2.5 py-1 rounded-full bg-midnight/95 border border-warm-gold/50 shadow-[0_4px_20px_rgba(0,0,0,0.9)] flex items-center gap-1.5 pointer-events-none whitespace-nowrap will-change-transform transition-opacity duration-150 ${
            isDragging || isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: 0,
            transform: 'translate3d(0, 0px, 0)',
          }}
        >
          <Sparkles size={11} className="text-warm-gold animate-pulse" />
          <span
            ref={tooltipTextRef}
            className="font-ui text-[10px] sm:text-xs text-cream font-semibold tracking-wider"
          >
            0%
          </span>
        </div>

        {/* The Magical Golden Bloom Star Thumb (0ms artificial latency, 100% GPU composited) */}
        <div
          ref={thumbRef}
          className="absolute top-0 pointer-events-none will-change-transform"
          style={{
            left: 'calc(50% - 14px)',
            width: '28px',
            height: '28px',
            transform: 'translate3d(0, 0px, 0)',
          }}
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-150 ${
              isDragging
                ? 'bg-warm-gold/40 border-2 border-cream shadow-[0_0_25px_rgba(255,240,194,0.95)]'
                : 'bg-midnight/95 border border-warm-gold/80 hover:border-cream shadow-[0_0_15px_rgba(212,168,83,0.7)]'
            }`}
          >
            {/* Ambient Halo */}
            <div className="absolute inset-0 rounded-full bg-warm-gold/30 blur-[6px] -z-10" />

            {/* Glowing Golden Bloom Star Glyph */}
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 filter drop-shadow-[0_0_6px_#FFE8A3]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0 C12 6.5 15.5 12 22 12 C15.5 12 12 17.5 12 24 C12 17.5 8.5 12 2 12 C8.5 12 12 6.5 12 0 Z"
                fill="#FDF8EC"
              />
              <circle cx="12" cy="12" r="2.5" fill="#D4A853" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Quick-Scroll Button */}
      <button
        type="button"
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-midnight/90 border border-warm-gold/40 flex items-center justify-center text-warm-gold hover:text-cream hover:bg-warm-gold/25 hover:border-warm-gold active:scale-90 transition-colors duration-150 shadow-[0_0_12px_rgba(212,168,83,0.3)] mt-2 cursor-pointer touch-manipulation group"
      >
        <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-150" />
      </button>
    </aside>
  );
}
