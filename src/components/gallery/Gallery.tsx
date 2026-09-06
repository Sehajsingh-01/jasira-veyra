'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import { ImageLightbox } from './ImageLightbox';

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  src: string;
  thumbnail: string;
  description?: string;
  tags: string[];
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
}

const FILTERS = ['ALL', 'JASIRA', 'MOCHI', 'MAGIC', 'WORLD', 'STORY', 'COMIC', 'DETAILS'];

export function Gallery({ images }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeFilter === 'ALL' 
    ? images 
    : images.filter(img => img.category.toUpperCase() === activeFilter);

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex overflow-x-auto no-scrollbar py-4 mb-12 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center gap-2 sm:gap-4 border-b border-white/5">
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 whitespace-nowrap font-ui text-xs tracking-widest rounded-full transition-all ${
              activeFilter === filter
                ? 'bg-warm-gold/20 text-warm-gold border border-warm-gold/30'
                : 'text-lavender/60 hover:text-lavender hover:bg-white/5'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <AnimatePresence>
          {filteredImages.map((image) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={image.id}
              className="break-inside-avoid relative group rounded-lg overflow-hidden bg-plum/20 border border-white/5 cursor-pointer block"
              onClick={() => setSelectedImage(image)}
            >
              {/* Aspect Ratio Box */}
              <div 
                className="w-full bg-midnight/30 flex items-center justify-center relative overflow-hidden"
                style={{ aspectRatio: `${image.width} / ${image.height}` }}
              >
                 <Image 
                   src={image.thumbnail || image.src} 
                   alt={image.title} 
                   fill 
                   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                   className="object-cover group-hover:scale-105 transition-transform duration-500" 
                   loading="lazy" 
                 />
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-midnight/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <Eye className="text-warm-gold mb-3" size={24} />
                <h4 className="font-display text-xl text-cream">{image.title}</h4>
                <p className="font-ui text-xs text-lavender/70 mt-2 tracking-widest uppercase">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredImages.length === 0 && (
        <div className="text-center py-20 text-lavender/50 font-ui tracking-widest">
          NO IMAGES FOUND IN THIS CATEGORY.
        </div>
      )}

      {/* Lightbox */}
      <ImageLightbox 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
}
