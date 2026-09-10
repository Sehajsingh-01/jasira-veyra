'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Menu, X, BookOpen, Compass, Feather, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Story', href: '/story' },
  { label: 'Characters', href: '/character' },
  { label: 'World', href: '/world' },
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
        <g transform="translate(50,50)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <path
              key={angle}
              d="M 0 -46 L 6 -15 L 0 0 L -6 -15 Z"
              transform={`rotate(${angle})`}
              fill={i % 2 === 0 ? 'url(#petalTop)' : 'url(#petalAlt)'}
              stroke="#D4A853"
              strokeWidth="0.8"
              opacity="0.95"
            />
          ))}
          <circle cx="0" cy="0" r="10" fill="url(#starCoreGlow)" />
          <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Automatically close mobile menu and search on route change
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu or search is open
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

  // Focus search input on open
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  const filteredSearchItems = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Pinned Fixed Top Navigation Bar (Always Visible at z-[150]) */}
      <header className="fixed top-0 left-0 right-0 z-[150] bg-midnight/95 backdrop-blur-xl border-b border-lavender/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
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

          {/* Center Navigation Links (Desktop lg+) */}
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
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-warm-gold shadow-[0_0_8px_rgba(212,168,83,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group: Search Icon + CTA Pill Button (Desktop lg+) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-full border border-lavender/25 flex items-center justify-center text-cream/80 hover:text-warm-gold hover:border-warm-gold/60 transition-all duration-300 bg-white/[0.02] hover:bg-warm-gold/5 cursor-pointer touch-manipulation"
              aria-label="Search Chapters, Characters & Lore"
              title="Search (Ctrl + K)"
            >
              <Search size={15} />
            </button>

            <Link
              href="/story"
              className="px-4 py-1.5 rounded-full border border-warm-gold/60 bg-warm-gold/10 hover:bg-warm-gold/20 text-cream text-xs font-ui tracking-wider uppercase flex items-center gap-2 hover:shadow-[0_0_15px_rgba(212,168,83,0.3)] transition-all duration-300 font-medium cursor-pointer"
            >
              <span>Enter the World</span>
              <ArrowRight size={13} className="text-warm-gold" />
            </Link>
          </div>

          {/* Mobile Right Controls: Animated Morphing Hamburger Button (Android & Windows) */}
          <div className="flex items-center lg:hidden relative z-30">
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full border flex items-center justify-center transition-all duration-200 touch-manipulation cursor-pointer select-none ${
                isOpen
                  ? 'border-warm-gold bg-warm-gold/20 shadow-[0_0_20px_rgba(212,168,83,0.45)]'
                  : 'border-warm-gold/50 bg-white/10 hover:border-warm-gold hover:bg-warm-gold/15 active:bg-warm-gold/30 shadow-md'
              }`}
              aria-label={isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isOpen}
            >
              {/* Morphing 3-Line Animated Hamburger Icon */}
              <div className="relative w-6 h-[18px] flex flex-col justify-between items-center pointer-events-none">
                <motion.span
                  className="w-6 h-[2.5px] rounded-full block origin-center"
                  animate={
                    isOpen
                      ? { rotate: 45, y: 7.75, backgroundColor: '#D4A853' }
                      : { rotate: 0, y: 0, backgroundColor: '#FAF6EE' }
                  }
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
                <motion.span
                  className="w-6 h-[2.5px] rounded-full block origin-center"
                  animate={
                    isOpen
                      ? { opacity: 0, scaleX: 0, x: 8 }
                      : { opacity: 1, scaleX: 1, x: 0, backgroundColor: '#FAF6EE' }
                  }
                  transition={{ duration: 0.18 }}
                />
                <motion.span
                  className="w-6 h-[2.5px] rounded-full block origin-center"
                  animate={
                    isOpen
                      ? { rotate: -45, y: -7.75, backgroundColor: '#D4A853' }
                      : { rotate: 0, y: 0, backgroundColor: '#FAF6EE' }
                  }
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Side Panel Drawer — Animated with AnimatePresence for Buttery Smooth Android & Windows Transitions */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] lg:hidden overflow-hidden">
            {/* Animated Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer touch-manipulation"
            />

            {/* Animated Sliding Side Drawer Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.85 }}
              className="absolute top-0 right-0 bottom-0 w-72 sm:w-80 max-w-[85vw] h-full bg-[#0E0C1B] border-l border-warm-gold/30 shadow-[-15px_0_50px_rgba(0,0,0,0.95)] flex flex-col z-10 select-none overflow-hidden"
            >
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between px-5 h-16 sm:h-20 border-b border-lavender/10 shrink-0 bg-midnight/80">
                <div className="flex items-center gap-2.5">
                  <BloomStarIcon className="w-7 h-7" />
                  <div className="flex flex-col text-left">
                    <span className="font-display text-base tracking-wider text-cream font-semibold leading-tight">
                      JASIRA VEYRA
                    </span>
                    <span className="font-ui text-[8px] tracking-[0.2em] text-warm-gold uppercase font-medium">
                      Navigation
                    </span>
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ rotate: 90, scale: 1.08 }}
                  whileTap={{ rotate: 180, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-cream active:text-warm-gold hover:text-warm-gold transition-colors rounded-full border border-warm-gold/30 bg-white/5 hover:bg-warm-gold/15 cursor-pointer touch-manipulation active:scale-95 shadow-sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Menu"
                >
                  <X size={20} className="pointer-events-none" />
                </motion.button>
              </div>

              {/* Staggered Animated Navigation Links */}
              <div className="flex-1 py-5 px-4 overflow-y-auto space-y-2">
                {NAV_LINKS.map((link, idx) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/'
                      : link.href.startsWith('/#')
                      ? false
                      : pathname === link.href;
                  const isJournal = link.href === '/bloomverse';

                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.05 + idx * 0.04,
                        duration: 0.25,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between py-3.5 px-4 rounded-xl font-ui text-sm uppercase tracking-widest transition-all duration-150 touch-manipulation active:scale-[0.98] ${
                          isActive
                            ? 'bg-warm-gold/25 text-warm-gold font-bold border border-warm-gold/50 shadow-[0_0_15px_rgba(212,168,83,0.25)]'
                            : isJournal
                            ? 'bg-warm-gold/15 text-warm-gold border border-warm-gold/40 font-semibold shadow-[0_0_15px_rgba(212,168,83,0.2)]'
                            : 'text-cream/80 hover:text-cream hover:bg-white/5 active:bg-warm-gold/10 hover:border-lavender/20 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 pointer-events-none">
                          {isJournal && <Compass size={16} className="text-warm-gold animate-pulse" />}
                          <span>{link.label}</span>
                        </div>
                        {isJournal ? (
                          <span className="text-[10px] font-ui uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-warm-gold text-midnight font-bold pointer-events-none">
                            Read 3D
                          </span>
                        ) : isActive ? (
                          <span className="w-2 h-2 rounded-full bg-warm-gold shadow-[0_0_8px_#D4A853] pointer-events-none" />
                        ) : (
                          <span className="text-lavender/30 text-xs pointer-events-none">→</span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + NAV_LINKS.length * 0.04,
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="pt-4 px-1"
                >
                  <Link
                    href="/story"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3.5 rounded-full border border-warm-gold bg-warm-gold/20 active:bg-warm-gold/30 hover:bg-warm-gold/30 text-cream text-xs font-ui tracking-wider uppercase flex items-center justify-center gap-2 font-semibold shadow-[0_0_20px_rgba(212,168,83,0.25)] cursor-pointer touch-manipulation active:scale-95 transition-all duration-200"
                  >
                    <span className="pointer-events-none">Enter the World</span>
                    <ArrowRight size={14} className="text-warm-gold pointer-events-none" />
                  </Link>
                </motion.div>
              </div>

              {/* Drawer Bottom Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="p-4 text-center border-t border-lavender/10 shrink-0 bg-midnight/50"
              >
                <p className="font-handwritten text-lg text-lavender/70">
                  &quot;A quiet soul in a loud world.&quot;
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Quick Search Dialog Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[210] flex items-start justify-center pt-16 sm:pt-28 px-3 sm:px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md touch-manipulation cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-midnight border border-warm-gold/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-4 sm:p-6 z-10"
            >
              <div className="flex items-center gap-3 border-b border-lavender/20 pb-3">
                <Search size={20} className="text-warm-gold shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search chapters, characters, lore..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-cream placeholder-lavender/40 font-body text-base outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-lavender/60 hover:text-cream text-xs uppercase tracking-wider font-ui px-2 py-1 rounded cursor-pointer"
                >
                  ESC
                </button>
              </div>

              <div className="mt-4 max-h-72 overflow-y-auto space-y-1">
                {filteredSearchItems.length > 0 ? (
                  filteredSearchItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-plum/30 text-warm-gold group-hover:bg-warm-gold/20 transition-colors">
                            <Icon size={16} />
                          </div>
                          <div>
                            <p className="font-display text-sm text-cream group-hover:text-warm-gold transition-colors font-medium">
                              {item.title}
                            </p>
                            <p className="font-ui text-[10px] text-lavender/50 uppercase tracking-wider">
                              {item.type}
                            </p>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-lavender/30 group-hover:text-warm-gold transition-colors" />
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-center py-8 text-lavender/40 font-ui text-xs">
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </p>
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
    </>
  );
}
