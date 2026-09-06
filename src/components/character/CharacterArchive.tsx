'use client';

import { useState, useEffect, useCallback } from 'react';
import { Character } from '@/data/characters';
import { Expression } from '@/data/expressions';
import ExpressionGrid from './ExpressionGrid';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const TABS = ['PORTRAITS', 'EXPRESSIONS', 'OUTFITS', 'ANGLES', 'MAGIC', 'MOCHI', 'LIFE'];

interface ArchiveItem {
  id: string;
  title: string;
  category: string;
  src: string;
  description: string;
  aspect?: string;
}

const ARCHIVE_DATA: Record<string, ArchiveItem[]> = {
  PORTRAITS: [
    {
      id: 'p-hero',
      title: 'Hero Portrait',
      category: 'Portrait',
      src: '/images/jasira/portraits/hero.webp',
      description: '“A quiet soul in a loud world.” Jasira resting her chin on her hand as glowing petals drift around her.',
      aspect: 'aspect-[3/4]'
    },
    {
      id: 'p-main',
      title: 'Serene Gaze',
      category: 'Portrait',
      src: '/images/jasira/portraits/main-portrait.webp',
      description: 'Her signature gentle expression through round wireframe spectacles and delicate pink hair bows.',
      aspect: 'aspect-[3/4]'
    }
  ],
  OUTFITS: [
    {
      id: 'o-everyday',
      title: 'Everyday Jas',
      category: 'Outfit',
      src: '/images/jasira/outfits/everyday.webp',
      description: 'Casual high-waisted denim jeans with black belt, pink plaid accent top, and beaded bracelet.',
      aspect: 'aspect-[2/3]'
    },
    {
      id: 'o-cozy',
      title: 'Cozy Knits',
      category: 'Outfit',
      src: '/images/jasira/outfits/cozy.webp',
      description: 'Oversized cream cable-knit zip sweater, wide plaid trousers, and plush Mochi in her arms.',
      aspect: 'aspect-[2/3]'
    },
    {
      id: 'o-library',
      title: 'Library Keeper',
      category: 'Outfit',
      src: '/images/jasira/outfits/library.webp',
      description: 'Classic knit vest over collared shirt, pleated black skirt, white knee-high socks, and leather books.',
      aspect: 'aspect-[2/3]'
    },
    {
      id: 'o-adventure',
      title: 'Duskbloom Wanderer',
      category: 'Outfit',
      src: '/images/jasira/outfits/adventure.webp',
      description: 'Hooded mauve capelet with brass clasp, alchemy pouches, layered skirt, and tall explorer boots.',
      aspect: 'aspect-[2/3]'
    }
  ],
  ANGLES: [
    {
      id: 'a-front',
      title: 'Front View',
      category: 'Turnaround',
      src: '/images/jasira/angles/front-view.webp',
      description: 'Straight-on facial reference showing soft symmetry, round spectacles, and twin pink bows.',
      aspect: 'aspect-[3/4]'
    },
    {
      id: 'a-34',
      title: '3/4 Angle View',
      category: 'Turnaround',
      src: '/images/jasira/angles/three-quarter-view.webp',
      description: 'Three-quarter turn highlighting cheek contour, glasses frame depth, and soft side bangs.',
      aspect: 'aspect-[3/4]'
    },
    {
      id: 'a-side',
      title: 'Side Profile',
      category: 'Turnaround',
      src: '/images/jasira/angles/side-view.webp',
      description: 'Delicate profile view displaying pointed elven ear with small pearl earring.',
      aspect: 'aspect-[3/4]'
    },
    {
      id: 'a-back',
      title: 'Back View',
      category: 'Turnaround',
      src: '/images/jasira/angles/back-view.webp',
      description: 'Half-up braided hairstyle tied with pink silk ribbons falling down dark flowing hair.',
      aspect: 'aspect-[3/4]'
    },
    {
      id: 'a-above',
      title: 'From Above',
      category: 'Turnaround',
      src: '/images/jasira/angles/from-above.webp',
      description: 'High angle perspective looking downward as she glances gently upward.',
      aspect: 'aspect-[3/4]'
    },
    {
      id: 'a-below',
      title: 'From Below',
      category: 'Turnaround',
      src: '/images/jasira/angles/from-below.webp',
      description: 'Low angle perspective showing the chin and jawline bathed in soft ambient light.',
      aspect: 'aspect-[3/4]'
    }
  ],
  MAGIC: [
    {
      id: 'm-bloom',
      title: 'Petal Bloom',
      category: 'Petal Magic',
      src: '/images/jasira/magic/flower-bloom.webp',
      description: 'Cupped hands gathering soft lilac light into a blossoming lotus of memories.',
      aspect: 'aspect-[3/4]'
    },
    {
      id: 'm-crest',
      title: 'Duskbloom Sacred Crest',
      category: 'Petal Magic',
      src: '/images/jasira/magic/mandala-crest.webp',
      description: 'Radiant botanical mandala of light petals that awakens forgotten stories.',
      aspect: 'aspect-[3/4]'
    },
    {
      id: 'm-words',
      title: 'Restoring Words',
      category: 'Petal Magic',
      src: '/images/jasira/magic/restoring-words.webp',
      description: 'Gently guiding starlight and lilac petals to restore vanished endings onto blank pages.',
      aspect: 'aspect-[3/4]'
    }
  ],
  MOCHI: [
    {
      id: 'mo-view',
      title: "Mochi's View",
      category: 'Companion',
      src: '/images/mochi/portrait.webp',
      description: 'Chubby brown plush companion with curious button eyes and star medallion collar.',
      aspect: 'aspect-square'
    },
    {
      id: 'mo-together',
      title: 'Together',
      category: 'Companion',
      src: '/images/mochi/together.webp',
      description: 'Jasira hugging Mochi closely, feeling the comfort of quiet companionship.',
      aspect: 'aspect-square'
    },
    {
      id: 'mo-reading',
      title: 'Reading Buddies',
      category: 'Companion',
      src: '/images/mochi/reading-buddies.webp',
      description: 'Sharing an open fairytale book late into the evening.',
      aspect: 'aspect-square'
    },
    {
      id: 'mo-sleep',
      title: 'Sleep Time',
      category: 'Companion',
      src: '/images/mochi/sleep-time.webp',
      description: 'Fast asleep on soft pillows surrounded by the calm of night.',
      aspect: 'aspect-square'
    },
    {
      id: 'mo-silly',
      title: 'Silly Moments',
      category: 'Companion',
      src: '/images/mochi/silly-moments.webp',
      description: 'Spontaneous smiles and cheerful laughter when no one is watching.',
      aspect: 'aspect-square'
    },
    {
      id: 'mo-always',
      title: 'Always with Me',
      category: 'Companion',
      src: '/images/mochi/always-with-me.webp',
      description: '“Some companions make the quiet days brighter.”',
      aspect: 'aspect-square'
    }
  ],
  LIFE: [
    {
      id: 'l-glasses',
      title: 'Round Wireframe Glasses',
      category: 'Details',
      src: '/images/details/glasses.webp',
      description: 'Her trademark round metallic spectacles that see the magic others miss.',
      aspect: 'aspect-square'
    },
    {
      id: 'l-bow',
      title: 'Pink Ribbon Hair Bows',
      category: 'Details',
      src: '/images/details/hair-bow.webp',
      description: 'Twin satin bows pinned above her ears, handcrafted with care.',
      aspect: 'aspect-square'
    },
    {
      id: 'l-notebook',
      title: 'The Bloomverse Journal',
      category: 'Details',
      src: '/images/details/notebook.webp',
      description: 'Leather-bound journal containing her private verses and pressed flowers.',
      aspect: 'aspect-square'
    },
    {
      id: 'l-phone',
      title: 'Botanical Case & Charms',
      category: 'Details',
      src: '/images/details/phone-case.webp',
      description: 'Floral patterned casing with beaded black-and-white bracelet.',
      aspect: 'aspect-square'
    },
    {
      id: 'l-features',
      title: 'Key Facial Details',
      category: 'Details',
      src: '/images/details/key-facial-details.webp',
      description: 'Eyes with delicate winged eyeliner, soft rosy lips, and pearl earring.',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'l-eyes',
      title: 'Eyes in Different Moods',
      category: 'Details',
      src: '/images/details/eyes-moods.webp',
      description: 'Subtle emotional shifts from calm to happy, melancholic, and determined.',
      aspect: 'aspect-[4/3]'
    }
  ]
};

interface CharacterArchiveProps {
  character: Character;
  expressions: Expression[];
}

export default function CharacterArchive({ character, expressions }: CharacterArchiveProps) {
  const [activeTab, setActiveTab] = useState('EXPRESSIONS');
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);

  const currentItems = ARCHIVE_DATA[activeTab] || [];
  const selectedIndex = selectedItem ? currentItems.findIndex(i => i.id === selectedItem.id) : -1;

  const handleNext = useCallback(() => {
    if (selectedIndex >= 0 && selectedIndex < currentItems.length - 1) {
      setSelectedItem(currentItems[selectedIndex + 1]);
    } else if (selectedIndex === currentItems.length - 1) {
      setSelectedItem(currentItems[0]);
    }
  }, [selectedIndex, currentItems]);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedItem(currentItems[selectedIndex - 1]);
    } else if (selectedIndex === 0) {
      setSelectedItem(currentItems[currentItems.length - 1]);
    }
  }, [selectedIndex, currentItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'Escape') setSelectedItem(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, handleNext, handlePrev]);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-12">
      {/* Character Info Panel */}
      <section className="bg-plum/20 border border-lavender/10 rounded-lg p-8 shadow-xl flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="font-display text-4xl text-cream mb-1">{character.name}</h2>
            {character.nickname && (
              <p className="font-handwritten text-xl text-lavender/70">"{character.nickname}"</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-ui text-sm">
            <div className="text-muted-plum">Age</div>
            <div className="text-cream">{character.age}</div>
            <div className="text-muted-plum">Height</div>
            <div className="text-cream">{character.height}</div>
            <div className="text-muted-plum">Race</div>
            <div className="text-cream">{character.race}</div>
            <div className="text-muted-plum">Theme</div>
            <div className="text-cream">{character.theme}</div>
            <div className="text-muted-plum">Role</div>
            <div className="text-cream">{character.role}</div>
          </div>
        </div>
        
        <div className="flex-1 border-t md:border-t-0 md:border-l border-lavender/10 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
          <p className="font-body text-cream/80 leading-relaxed text-sm mb-6">
            {character.personality}
          </p>
          {character.quote && (
            <blockquote className="font-handwritten text-lg text-warm-gold/80 italic relative">
              <span className="absolute -left-4 -top-2 text-2xl text-warm-gold/20">"</span>
              {character.quote}
              <span className="absolute -right-4 -bottom-4 text-2xl text-warm-gold/20 rotate-180">"</span>
            </blockquote>
          )}
        </div>
      </section>

      {/* Category Tabs */}
      <section>
        <div className="flex overflow-x-auto pb-4 no-scrollbar border-b border-lavender/10 gap-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-ui text-xs tracking-widest whitespace-nowrap px-1 py-2 border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'text-warm-gold border-warm-gold' 
                  : 'text-lavender/50 border-transparent hover:text-lavender'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8 min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'EXPRESSIONS' ? (
                <ExpressionGrid expressions={expressions} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedItem(item)}
                      className="group cursor-pointer bg-plum/20 border border-lavender/15 rounded-xl overflow-hidden shadow-lg hover:border-warm-gold/40 hover:shadow-[0_0_20px_rgba(212,168,83,0.25)] transition-all duration-300 flex flex-col"
                    >
                      <div className={`relative ${item.aspect || 'aspect-[3/4]'} w-full overflow-hidden bg-midnight/40`}>
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-midnight/80 border border-lavender/20 text-[10px] font-ui tracking-wider text-warm-gold uppercase">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <h4 className="font-display text-lg text-cream group-hover:text-warm-gold transition-colors">
                          {item.title}
                        </h4>
                        <p className="font-body text-xs text-lavender/70 line-clamp-2 mt-1">
                          {item.description}
                        </p>
                        <span className="font-ui text-[10px] text-warm-gold/60 tracking-wider mt-3 block">
                          Click to expand &rarr;
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal for Tab Items */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <button 
              className="absolute top-6 right-6 text-cream/70 hover:text-cream z-50 p-3 bg-plum/40 hover:bg-plum/70 rounded-full border border-lavender/20 transition-all"
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {currentItems.length > 1 && (
              <>
                <button
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream z-50 p-3 bg-plum/40 hover:bg-plum/70 rounded-full border border-lavender/20 transition-all"
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  aria-label="Previous"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream z-50 p-3 bg-plum/40 hover:bg-plum/70 rounded-full border border-lavender/20 transition-all"
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  aria-label="Next"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-2xl w-full bg-midnight/95 border border-warm-gold/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(212,168,83,0.25)] flex flex-col items-center text-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-md h-96 rounded-xl overflow-hidden mb-6 border-2 border-warm-gold/30 bg-plum/30 shadow-inner">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <span className="font-ui text-xs tracking-[0.25em] text-warm-gold uppercase mb-1">
                {selectedItem.category}
              </span>
              <h3 className="font-display text-3xl text-cream mb-3">
                {selectedItem.title}
              </h3>
              <p className="font-body text-lavender/90 text-sm leading-relaxed max-w-md">
                {selectedItem.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
