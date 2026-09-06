'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Menu, X, BookOpen, Compass, Feather, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Story', href: '/story' },
  { label: 'Characters', href: '/character' },
  { label: 'World', href: '/world' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Journal', href: '/bloomverse' },
  { label: 'Shop', href: '/#manuscript-archive' },
];

const SEARCH_ITEMS = [
  { title: 'Chapter 1: The Wilted Rose', type: 'Story Scene', href: '/story/chapter-1', icon: BookOpen },
  { title: 'Chapter 2: The Scentless Garden', type: 'Story Scene', href: '/story/chapter-2', icon: BookOpen },
  { title: 'Chapter 3: The Library of Unwritten Books', type: 'Story Scene', href: '/story/chapter-3', icon: BookOpen },
  { title: 'Chapter 4: The Unwritten Rift', type: 'Story Scene', href: '/story/chapter-4', icon: BookOpen },
  { title: 'Chapter 5: The Bloom That Remembers', type: 'Story Scene', href: '/story/chapter-5', icon: BookOpen },
  { title: 'Jasira Veyra', type: 'Protagonist Lore', href: '/character', icon: Sparkles },
  { title: 'Mochi (Plush Bear Companion)', type: 'Character', href: '/character#mochi', icon: Sparkles },
  { title: '3D Grimoire Journal', type: 'Interactive 3D', href: '/bloomverse', icon: Compass },
  { title: 'The Athenaeum Vaults', type: 'World Lore', href: '/world', icon: Feather },
  { title: 'Download Manuscript (PDF)', type: 'Archive', href: '/#manuscript-archive', icon: Feather },
];

function BloomStarIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <div className="absolute inset-0 bg-warm-gold/25 rounded-full blur-[6px] -z-10" />
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(212,168,83,0.7)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="starCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2D1" />
            <stop offset="50%" stopColor="#D4A853" />
            <stop offset="100%" stopColor="#8A6B29" />
          </radialGradient>
          <linearGradient id="petalTop" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#D6C6E8" />
            <stop offset="100%" stopColor="#6C5586" />
          </linearGradient>
          <linearGradient id="petalAlt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5EDE0" />
            <stop offset="60%" stopColor="#B8A9C9" />
            <stop offset="100%" stopColor="#4A3B5C" />
          </linearGradient>
        </defs>
        {/* 8 Faceted Diamond Petals */}
        <polygon points="50,4 55,42 50,50 45,42" fill="url(#petalTop)" />
        <polygon points="50,96 55,58 50,50 45,58" fill="url(#petalTop)" />
        <polygon points="96,50 58,55 50,50 58,45" fill="url(#petalTop)" />
        <polygon points="4,50 42,55 50,50 42,45" fill="url(#petalTop)" />
        <polygon points="83,17 56,44 50,50 44,56" fill="url(#petalAlt)" />
        <polygon points="83,83 56,56 50,50 44,44" fill="url(#petalAlt)" />
        <polygon points="17,83 44,56 50,50 56,44" fill="url(#petalAlt)" />
        <polygon points="17,17 44,44 50,50 56,56" fill="url(#petalAlt)" />
        {/* Core Jewel */}
        <circle cx="50" cy="50" r="7" fill="url(#starCoreGlow)" />
        <circle cx="50" cy="50" r="3" fill="#FFFBE6" />
      </svg>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (isOpen || searchOpen) {
      setShowNavbar(true);
      return;
    }

    if (currentScrollY < 80) {
      setShowNavbar(true);
    } else if (currentScrollY > lastScrollY && (currentScrollY - lastScrollY > 10)) {
      setShowNavbar(false);
    } else if (lastScrollY - currentScrollY > 8) {
      setShowNavbar(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isOpen, searchOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (isOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, searchOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const filteredSearchItems = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-midnight/90 backdrop-blur-xl border-b border-lavender/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)] select-none"
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : '-100%' }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: 'easeInOut' as const }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left Brand: Emblem + Title + Subtitle */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <BloomStarIcon className="w-8 h-8 sm:w-9 sm:h-9 group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col text-left">
              <span className="font-display text-lg sm:text-2xl font-semibold tracking-[0.2em] text-cream transition-colors duration-300 group-hover:text-warm-gold group-hover:drop-shadow-[0_0_8px_rgba(212,168,83,0.5)] leading-tight">
                JASIRA VEYRA
              </span>
              <span className="font-ui text-[8px] sm:text-[9px] tracking-[0.28em] text-lavender/60 uppercase font-medium leading-tight">
                A Quiet Soul in a Loud World
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Matching Mockup 1:1) */}
          <nav className="hidden lg:flex items-center space-x-7">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : link.href.startsWith('/#')
                  ? false
                  : pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 font-ui uppercase tracking-[0.18em] text-xs font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-warm-gold'
                      : 'text-cream/75 hover:text-warm-gold group'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-warm-gold shadow-[0_0_8px_rgba(212,168,83,0.8)]"
                    />
                  ) : (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-warm-gold/60 transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group: Search Icon + CTA Pill Button (Desktop lg+) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-full border border-lavender/25 flex items-center justify-center text-cream/80 hover:text-warm-gold hover:border-warm-gold/60 transition-all duration-300 bg-white/[0.02] hover:bg-warm-gold/5 cursor-pointer touch-manipulation"
              aria-label="Search Chapters, Characters & Lore"
              title="Search (Ctrl + K)"
            >
              <Search size={15} />
            </button>

            {/* Enter the World CTA Pill Button */}
            <Link href="/story">
              <button
                type="button"
                className="px-4 py-1.5 rounded-full border border-warm-gold/60 bg-warm-gold/10 hover:bg-warm-gold/20 text-cream text-xs font-ui tracking-wider uppercase flex items-center gap-2 hover:shadow-[0_0_15px_rgba(212,168,83,0.3)] transition-all duration-300 font-medium cursor-pointer"
              >
                <span>Enter the World</span>
                <ArrowRight size={13} className="text-warm-gold" />
              </button>
            </Link>
          </div>

          {/* Mobile Right Controls: Only Hamburger Menu on Mobile/Android */}
          <div className="flex items-center lg:hidden relative z-30">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
              }}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-lavender/30 bg-white/[0.05] active:bg-warm-gold/25 active:border-warm-gold/60 flex items-center justify-center text-cream active:text-warm-gold hover:text-warm-gold transition-all duration-150 touch-manipulation cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Interactive Quick Search Dialog Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-16 sm:pt-28 px-3 sm:px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md touch-manipulation"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-xl bg-[#110f22] border border-warm-gold/40 rounded-2xl p-4 sm:p-5 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2.5 text-warm-gold">
                  <Search size={18} />
                  <span className="font-ui text-xs tracking-widest uppercase font-semibold">
                    Duskbloom Athenaeum Search
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-lavender/70 hover:text-cream active:text-warm-gold transition-colors touch-manipulation cursor-pointer"
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-3 shrink-0">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chapters, characters, magical lore..."
                  autoComplete="off"
                  autoCorrect="off"
                  className="w-full bg-midnight/80 border border-lavender/20 rounded-xl px-4 py-2.5 text-cream placeholder:text-lavender/40 font-ui text-sm focus:outline-none focus:border-warm-gold/70"
                />
              </div>

              <div className="mt-4 max-h-72 overflow-y-auto space-y-1.5 pr-1">
                {filteredSearchItems.length === 0 ? (
                  <div className="text-center py-8 text-lavender/50 text-xs font-ui">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  filteredSearchItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-warm-gold/10 border border-transparent hover:border-warm-gold/20 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5 text-warm-gold group-hover:bg-warm-gold/20 transition-colors">
                            <Icon size={14} />
                          </div>
                          <div>
                            <p className="font-display text-sm text-cream group-hover:text-warm-gold transition-colors">
                              {item.title}
                            </p>
                            <span className="font-ui text-[10px] text-lavender/60 uppercase tracking-wider">
                              {item.type}
                            </span>
                          </div>
                        </div>
                        <ArrowRight size={13} className="text-lavender/40 group-hover:text-warm-gold group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    );
                  })
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-ui text-lavender/50">
                <span>Tip: Press ESC to exit</span>
                <span className="text-warm-gold/70">5 Chapters · Botanical Lore</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Nav Side Panel Drawer (Sliding in from Right) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm touch-manipulation"
            />

            {/* Sliding Side Panel Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-72 sm:w-80 max-w-[85vw] h-full bg-[#0E0C1B] border-l border-warm-gold/25 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] flex flex-col z-10 select-none overflow-hidden"
            >
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between px-5 h-16 sm:h-20 border-b border-lavender/10 shrink-0 bg-midnight/60">
                <div className="flex items-center gap-2.5">
                  <BloomStarIcon className="w-7 h-7" />
                  <div className="flex flex-col text-left">
                    <span className="font-display text-base tracking-wider text-cream font-semibold leading-tight">
                      JASIRA VEYRA
                    </span>
                    <span className="font-ui text-[8px] tracking-[0.2em] text-lavender/60 uppercase">
                      Navigation
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-9 h-9 flex items-center justify-center text-cream active:text-warm-gold hover:text-warm-gold transition-colors rounded-full border border-lavender/20 bg-white/5 cursor-pointer touch-manipulation"
                  onClick={toggleMenu}
                  aria-label="Close Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="flex-1 py-6 px-4 overflow-y-auto space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/'
                      : link.href.startsWith('/#')
                      ? false
                      : pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={toggleMenu}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl font-ui text-sm uppercase tracking-widest transition-all duration-150 touch-manipulation ${
                        isActive
                          ? 'bg-warm-gold/15 text-warm-gold font-semibold border border-warm-gold/30'
                          : 'text-cream/80 hover:text-cream hover:bg-white/5 active:bg-warm-gold/10'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-warm-gold shadow-[0_0_8px_#D4A853]" />
                      ) : (
                        <span className="text-lavender/30 text-xs">→</span>
                      )}
                    </Link>
                  );
                })}

                <div className="pt-6 px-1">
                  <Link href="/story" onClick={toggleMenu} className="block touch-manipulation">
                    <button
                      type="button"
                      className="w-full py-3 rounded-full border border-warm-gold bg-warm-gold/20 active:bg-warm-gold/30 text-cream text-xs font-ui tracking-wider uppercase flex items-center justify-center gap-2 font-semibold shadow-lg cursor-pointer"
                    >
                      <span>Enter the World</span>
                      <ArrowRight size={14} className="text-warm-gold" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Drawer Bottom Footer */}
              <div className="p-4 text-center border-t border-lavender/10 shrink-0 bg-midnight/40">
                <p className="font-handwritten text-lg text-lavender/70">
                  "A quiet soul in a loud world."
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

