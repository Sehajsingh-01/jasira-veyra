'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function MochiInteraction() {
  const [isBouncing, setIsBouncing] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);

  const handleClick = () => {
    if (isBouncing) return;
    
    setIsBouncing(true);
    
    // Create 3-4 hearts
    const newHearts = Array.from({ length: 3 + Math.floor(Math.random() * 2) }).map(() => ({
      id: Date.now() + Math.random(),
      left: 30 + Math.random() * 40, // Random horizontal position 30-70%
    }));
    
    setHearts(prev => [...prev, ...newHearts]);

    setTimeout(() => {
      setIsBouncing(false);
    }, 450);

    // Clean up hearts after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 1800);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto py-12 text-center select-none">
      {/* Interaction Area with iOS Spring Physics */}
      <motion.div
        className="relative mb-8 cursor-pointer group touch-manipulation gpu-layer"
        onClick={handleClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 450, damping: 22 }}
      >
        <motion.div 
          animate={isBouncing ? { y: [-14, 0], scale: [1.06, 1] } : { y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          className="relative w-48 h-48 rounded-full border-4 border-warm-gold/50 p-2 shadow-[0_0_30px_rgba(212,168,83,0.15)] group-hover:border-warm-gold group-hover:shadow-[0_0_40px_rgba(212,168,83,0.35)] bg-plum/20 transition-colors duration-200"
        >
          <div className="w-full h-full rounded-full bg-midnight/50 flex items-center justify-center overflow-hidden relative shadow-inner">
            <Image 
              src="/images/mochi/portrait.webp" 
              alt="Mochi" 
              fill 
              sizes="192px"
              className="object-cover" 
              priority
            />
          </div>
        </motion.div>

        {/* Floating Hearts with Framer Motion */}
        <AnimatePresence>
          {hearts.map(heart => (
            <motion.div 
              key={heart.id}
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 1.4], y: -90 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute text-dusty-rose text-2xl pointer-events-none drop-shadow-[0_0_8px_rgba(201,160,160,0.8)]"
              style={{
                left: `${heart.left}%`,
                top: '40%',
              }}
            >
              ♥
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="space-y-4 mb-12">
        <h3 className="font-display text-4xl text-cream tracking-wide">MOCHI</h3>
        <p className="font-body text-lavender/90 leading-relaxed px-4">
          Jasira&apos;s small companion. Ears that notice everything. A heart that never forgets.
        </p>
        <p className="font-ui text-xs text-warm-gold/80 uppercase tracking-widest mt-4">
          ✦ Tap to pet ✦
        </p>
      </div>

      {/* Mochi Moments Gallery with iOS Press feedback */}
      <div className="grid grid-cols-3 gap-4 w-full px-4 mb-8">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="aspect-square bg-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer touch-manipulation ios-touch-spring"
          >
             <span className="font-ui text-[10px] text-lavender/50 tracking-wider">Moment {i}</span>
          </div>
        ))}
      </div>

      <p className="font-handwritten text-2xl text-dusty-rose">
        &ldquo;Some companions make the quiet days brighter.&rdquo;
      </p>
    </div>
  );
}
