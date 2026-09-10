'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Maximize, Minimize } from 'lucide-react';
import Image from 'next/image';

export interface ComicPage {
  id: string;
  pageNumber: number;
  chapterId: string;
  src: string;
  thumbnail: string;
  alt: string;
}

export interface ComicChapter {
  id: string;
  title: string;
  pages: ComicPage[];
  isAvailable: boolean;
}

interface ComicViewerProps {
  chapters: ComicChapter[];
}

export function ComicViewer({ chapters }: ComicViewerProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cinematicMode, setCinematicMode] = useState(false);
  const [showUI, setShowUI] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const uiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentChapter = chapters[currentChapterIndex];
  const pages = currentChapter?.pages || [];
  const currentPage = pages[currentPageIndex];

  // Navigation handlers
  const next = useCallback(() => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    } else if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
      setCurrentPageIndex(0);
    }
  }, [currentPageIndex, currentChapterIndex, pages.length, chapters.length]);

  const prev = useCallback(() => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    } else if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      setCurrentPageIndex(chapters[currentChapterIndex - 1].pages.length - 1);
    }
  }, [currentPageIndex, currentChapterIndex, chapters]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // UI Auto-hide in cinematic mode
  useEffect(() => {
    const handleMouseMove = () => {
      if (cinematicMode) {
        setShowUI(true);
        if (uiTimeoutRef.current) clearTimeout(uiTimeoutRef.current);
        uiTimeoutRef.current = setTimeout(() => setShowUI(false), 3000);
      } else {
        setShowUI(true);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (uiTimeoutRef.current) clearTimeout(uiTimeoutRef.current);
    };
  }, [cinematicMode]);

  // Touch zones click handler
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width * 0.3) {
      prev();
    } else if (x > width * 0.7) {
      next();
    } else if (cinematicMode) {
       // tap center to toggle UI in cinematic mode
       setShowUI(prev => !prev);
    }
  };

  if (!chapters.length) return <div className="text-white">No chapters available.</div>;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen bg-midnight overflow-hidden flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Top UI Bar */}
      <AnimatePresence>
        {showUI && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-midnight/90 to-transparent z-40"
          >
            <div className="flex items-center gap-4">
              <select 
                value={currentChapterIndex}
                onChange={(e) => {
                  setCurrentChapterIndex(Number(e.target.value));
                  setCurrentPageIndex(0);
                }}
                className="bg-plum/50 border border-lavender/20 text-cream text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-warm-gold font-ui"
              >
                {chapters.map((ch, idx) => (
                  <option key={ch.id} value={idx}>{ch.title}</option>
                ))}
              </select>
              <span className="font-ui text-sm text-lavender">
                {String(currentPageIndex + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  setCinematicMode(!cinematicMode);
                  if (cinematicMode) setShowUI(true); // reset
                }}
                className="p-2 text-lavender hover:text-warm-gold transition-colors bg-white/5 rounded-full"
                title={cinematicMode ? "Exit Cinematic Mode" : "Enter Cinematic Mode"}
              >
                {cinematicMode ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <button 
                onClick={toggleFullscreen}
                className="p-2 text-lavender hover:text-warm-gold transition-colors bg-white/5 rounded-full"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Display */}
      <div 
        className="flex-grow w-full flex items-center justify-center relative cursor-pointer"
        onClick={handlePageClick}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentChapterIndex}-${currentPageIndex}`}
            initial={{ opacity: 0, x: 28, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -28, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl h-full max-h-[90vh] flex items-center justify-center p-4 md:p-8 gpu-layer"
          >
             {/* Actual Comic Page Image */}
             <div className="w-full h-full max-h-[85vh] bg-midnight/60 rounded-lg border border-warm-gold/20 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
                  style={{ aspectRatio: '2/3' }}>
                 <Image
                   src={currentPage.src}
                   alt={currentPage.alt || `Comic Page ${currentPage.pageNumber}`}
                   fill
                   className="object-contain"
                   priority
                 />
             </div>
          </motion.div>
        </AnimatePresence>

        {/* Side Navigation Buttons (desktop) with iOS Springs */}
        <AnimatePresence>
          {showUI && (
            <>
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                disabled={currentPageIndex === 0 && currentChapterIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-midnight/60 hover:bg-plum/90 text-white rounded-full backdrop-blur-md disabled:opacity-30 transition-all z-30 hidden md:block cursor-pointer touch-manipulation ios-touch-spring border border-white/10 shadow-lg"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                disabled={currentPageIndex === pages.length - 1 && currentChapterIndex === chapters.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-midnight/60 hover:bg-plum/90 text-white rounded-full backdrop-blur-md disabled:opacity-30 transition-all z-30 hidden md:block cursor-pointer touch-manipulation ios-touch-spring border border-white/10 shadow-lg"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Thumbnail Strip */}
      <AnimatePresence>
        {showUI && !cinematicMode && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="h-24 w-full bg-midnight/80 border-t border-white/10 flex items-center px-4 overflow-x-auto no-scrollbar gap-2 z-40 flex-shrink-0 overscroll-contain gpu-layer"
          >
            {pages.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setCurrentPageIndex(idx)}
                className={`flex-shrink-0 h-16 w-12 rounded border-2 transition-all duration-200 cursor-pointer touch-manipulation ios-touch-spring ${
                  currentPageIndex === idx ? 'border-warm-gold scale-110 shadow-[0_0_12px_rgba(212,168,83,0.5)]' : 'border-transparent opacity-50 hover:opacity-100'
                } bg-plum/30`}
              >
                <span className="text-[8px] text-lavender/70 flex h-full items-center justify-center font-ui font-medium">{idx + 1}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
