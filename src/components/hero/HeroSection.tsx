'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ParallaxLayer from './ParallaxLayer';

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-midnight flex items-center justify-center">
      <ParallaxLayer speed={0.3} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-lavender/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,10,26,0)_0%,#0B0A1A_100%)]" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #F5EDE0 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </ParallaxLayer>

      <ParallaxLayer speed={-0.2} className="absolute inset-0 z-20 pointer-events-none">
        {!prefersReducedMotion && Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`foreground-petal-${i}`}
            className="absolute bg-warm-gold/20 rounded-full blur-[2px]"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </ParallaxLayer>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="relative mb-8 group">
          <div className="w-48 h-64 md:w-64 md:h-80 rounded-[40%] border-4 border-warm-gold/60 p-2 shadow-[0_0_30px_rgba(184,169,201,0.2)] overflow-hidden relative transition-transform duration-700 group-hover:scale-105">
            <div className="w-full h-full rounded-[40%] overflow-hidden relative bg-gradient-to-br from-plum to-midnight">
              <Image
                src="/images/jasira/portraits/hero.webp"
                alt="Jasira Veyra"
                fill
                className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                priority
              />
            </div>
            <div className="absolute inset-0 border-2 border-warm-gold/30 rounded-[40%] m-3 pointer-events-none" />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl text-cream tracking-wide mb-4"
        >
          JASIRA VEYRA
        </motion.h1>

        <motion.div variants={itemVariants} className="w-24 h-[1px] bg-warm-gold/30 mb-6" />

        <motion.p
          variants={itemVariants}
          className="font-[family-name:var(--font-ui)] text-xs md:text-sm tracking-[0.25em] text-lavender/70 uppercase mb-12"
        >
          A QUIET SOUL IN A LOUD WORLD
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 items-center">
          <Link href="/bloomverse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-warm-gold/10 border border-warm-gold/30 text-warm-gold hover:bg-warm-gold/20 px-8 py-3 font-[family-name:var(--font-ui)] text-sm tracking-widest uppercase transition-colors"
            >
              Enter Bloomverse
            </motion.button>
          </Link>
          <Link href="/story">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-lavender/20 text-lavender/70 hover:text-cream hover:border-lavender/40 px-8 py-3 font-[family-name:var(--font-ui)] text-sm tracking-widest uppercase transition-colors"
            >
              Read the Story
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
