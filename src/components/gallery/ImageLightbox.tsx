'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ImageLightboxProps {
  image: { src: string; title: string; description?: string } | null;
  onClose: () => void;
}

export function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/95 backdrop-blur-md"
        onClick={onClose}
      >
        <button 
          className="absolute top-6 right-6 text-lavender hover:text-white z-50 p-2 bg-white/10 rounded-full"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-5xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Real Image container */}
          <div className="w-full h-full max-h-[70vh] bg-midnight/40 rounded-xl flex items-center justify-center border border-warm-gold/30 relative overflow-hidden shadow-2xl">
             <Image
               src={image.src}
               alt={image.title}
               fill
               className="object-contain p-2"
               priority
             />
          </div>
          
          <div className="w-full mt-6 text-center">
            <h3 className="font-display text-2xl text-cream">{image.title}</h3>
            {image.description && (
              <p className="font-body text-sm text-lavender mt-2">{image.description}</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
