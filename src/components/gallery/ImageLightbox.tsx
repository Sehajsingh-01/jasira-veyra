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
          {/* Placeholder for real Image component since we don't have actual paths */}
          <div className="w-full h-full max-h-[70vh] bg-plum/20 rounded-lg flex items-center justify-center border border-white/10 relative overflow-hidden">
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
               <span className="font-ui text-warm-gold/50 tracking-widest mb-4">IMAGE PREVIEW</span>
               <h3 className="font-display text-3xl text-cream mb-4">{image.title}</h3>
               {image.description && <p className="font-body text-lavender max-w-md mx-auto">{image.description}</p>}
               <p className="font-ui text-xs text-lavender/30 mt-8 absolute bottom-4 right-4">[{image.src}]</p>
             </div>
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
