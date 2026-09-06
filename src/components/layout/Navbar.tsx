'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const NAV_LINKS = [
  { label: 'Jasira', href: '/character' },
  { label: 'Story', href: '/story' },
  { label: 'Bloomverse', href: '/bloomverse' },
  { label: 'Magic', href: '/magic' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'World', href: '/world' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (isOpen) {
      setShowNavbar(true);
      return;
    }

    if (currentScrollY < 50) {
      setShowNavbar(true);
    } else if (currentScrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-xl border-b border-lavender/10"
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : '-100%' }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' as const }}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="group" onClick={() => setIsOpen(false)}>
            <div className="hidden md:block font-display text-2xl text-cream tracking-wider transition-all duration-300 group-hover:text-warm-gold group-hover:drop-shadow-[0_0_8px_rgba(212,168,83,0.5)]">
              JASIRA VEYRA
            </div>
            <div className="md:hidden font-display text-2xl text-cream tracking-wider transition-all duration-300 group-hover:text-warm-gold group-hover:drop-shadow-[0_0_8px_rgba(212,168,83,0.5)]">
              JV
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative font-ui uppercase tracking-widest text-xs transition-colors duration-300 ${isActive ? 'text-warm-gold' : 'text-cream/80 hover:text-warm-gold group'}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-warm-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cream p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-midnight/95 backdrop-blur-2xl flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-end p-6 h-20 items-center">
              <button
                className="text-cream p-2 focus:outline-none hover:text-warm-gold transition-colors"
                onClick={toggleMenu}
                aria-label="Close Menu"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6 pb-20">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.label} variants={itemVariants} className="flex flex-col items-center gap-4">
                    <Link
                      href={link.href}
                      onClick={toggleMenu}
                      className={`font-display text-3xl tracking-wider transition-colors duration-300 ${isActive ? 'text-warm-gold' : 'text-cream hover:text-lavender'}`}
                    >
                      {link.label}
                    </Link>
                    {idx < NAV_LINKS.length - 1 && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-lavender/30">
                        <path d="M12 2C12 2 14 8 22 12C14 16 12 22 12 22C12 22 10 16 2 12C10 8 12 2 12 2Z" fill="currentColor" />
                      </svg>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants} className="absolute bottom-10 left-0 right-0 text-center">
              <p className="font-handwritten text-2xl text-lavender/60">A Quiet Soul in a Loud World</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
