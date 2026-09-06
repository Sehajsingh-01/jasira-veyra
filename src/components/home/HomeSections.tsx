'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Sparkles, Image as ImageIcon, Map, User } from 'lucide-react';

interface SectionHeadingProps {
  accent: string;
  title: string;
}

function SectionHeading({ accent, title }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center mb-12">
      <span className="font-[family-name:var(--font-ui)] text-xs tracking-[0.2em] text-warm-gold/80 uppercase mb-2">
        {accent}
      </span>
      <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-cream">
        {title}
      </h2>
      <div className="w-12 h-[1px] bg-lavender/30 mt-6" />
    </div>
  );
}

const archiveCategories = [
  { title: 'Character', icon: User, desc: 'Traits, psychology, and evolution.', href: '/character' },
  { title: 'Bloomverse', icon: Sparkles, desc: 'The interconnected realms.', href: '/bloomverse' },
  { title: 'Magic', icon: BookOpen, desc: 'Systems and botanical lore.', href: '/magic' },
  { title: 'Gallery', icon: ImageIcon, desc: 'Portraits and concept art.', href: '/gallery' },
  { title: 'World', icon: Map, desc: 'Locations and geography.', href: '/world' },
];

export default function HomeSections() {
  return (
    <div className="bg-midnight min-h-screen relative z-10 w-full overflow-hidden pb-24">
      <div className="w-full h-32 bg-gradient-to-b from-transparent to-midnight absolute top-[-128px] z-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-24 space-y-40">
        <section>
          <SectionHeading accent="THE CHARACTER" title="Jasira Veyra" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className="relative w-64 h-64 rounded-full border border-warm-gold/30 p-2 shadow-lg shadow-plum/20">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-gradient-to-tr from-plum to-midnight">
                  <Image 
                    src="/images/jasira/portraits/hero.webp" 
                    alt="Jasira Portrait"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6 text-center md:text-left">
              <p className="font-[family-name:var(--font-body)] text-lavender/90 text-lg leading-relaxed">
                She wanders through forgotten botanical archives, a quiet observer of magic that others overlook. Jasira's strength lies not in thunderous spells, but in the subtle art of coaxing life from the soil.
              </p>
              <Link href="/character" className="inline-block font-[family-name:var(--font-ui)] text-sm tracking-wider text-warm-gold hover:text-cream transition-colors">
                Explore Character Archive &rarr;
              </Link>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading accent="THE STORY" title="A Quiet Beginning" />
          <div className="max-w-3xl mx-auto bg-plum/10 border border-lavender/10 p-8 md:p-12 text-center rounded-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,83,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <h3 className="font-[family-name:var(--font-display)] text-3xl text-cream mb-4">Chapter 1: The Withered Seed</h3>
            <p className="font-[family-name:var(--font-body)] text-lavender/80 mb-8 italic">
              "The greenhouse was silent, save for the hum of ambient earth magic. Here, among the resting flora, she finally felt awake."
            </p>
            <Link href="/story">
              <button className="bg-transparent border border-warm-gold/50 text-warm-gold hover:bg-warm-gold/10 px-6 py-2 font-[family-name:var(--font-ui)] text-sm tracking-widest uppercase transition-colors">
                Begin Reading
              </button>
            </Link>
          </div>
        </section>

        <section>
          <SectionHeading accent="EXPLORE" title="Discover the Archive" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {archiveCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.title} href={cat.href}>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col items-center text-center p-6 bg-midnight border border-lavender/10 hover:border-warm-gold/40 hover:shadow-[0_0_15px_rgba(212,168,83,0.1)] transition-all duration-300 rounded-sm h-full group"
                  >
                    <Icon className="w-8 h-8 text-lavender/50 group-hover:text-warm-gold mb-4 transition-colors" />
                    <h4 className="font-[family-name:var(--font-display)] text-xl text-cream mb-2">{cat.title}</h4>
                    <p className="font-[family-name:var(--font-ui)] text-xs text-lavender/60 leading-relaxed">
                      {cat.desc}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="text-center pt-24 pb-12 flex flex-col items-center">
          <p className="font-[family-name:var(--font-handwritten)] text-3xl md:text-4xl text-lavender/80 mb-6">
            "Some hearts were never meant to whisper."
          </p>
          <Sparkles className="w-5 h-5 text-warm-gold/50 animate-pulse" />
        </section>
      </div>
    </div>
  );
}
