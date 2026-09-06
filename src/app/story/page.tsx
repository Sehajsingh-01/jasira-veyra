import Link from 'next/link';
import Image from 'next/image';
import { chapters } from '@/data/chapters';

export const metadata = {
  title: 'The Story - Jasira Veyra',
  description: 'Read the interactive story of Jas of Duskbloom.',
};

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-midnight text-cream py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-24">
          <span className="font-ui text-xs tracking-[0.3em] text-warm-gold/60 uppercase mb-4 block">
            The Story
          </span>
          <h1 className="font-display text-5xl md:text-7xl mb-6">
            Jas of Duskbloom
          </h1>
          <p className="font-handwritten text-xl text-lavender/60 max-w-2xl mx-auto">
            An original story
          </p>
          <p className="font-body text-cream/70 mt-8 max-w-2xl mx-auto leading-relaxed">
            Follow Jasira Veyra as she navigates the complex magical ecosystems of the Bloomverse. 
            A tale of discovery, danger, and the untamed forces of nature.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="relative group">
              {chapter.isAvailable ? (
                <Link 
                  href={`/story/${chapter.id}`}
                  className="block h-full bg-plum/30 border border-lavender/10 rounded-lg overflow-hidden hover:border-warm-gold/50 transition-colors"
                >
                  <ChapterCardContent chapter={chapter} />
                </Link>
              ) : (
                <div className="h-full bg-plum/10 border border-lavender/5 rounded-lg overflow-hidden opacity-60">
                  <ChapterCardContent chapter={chapter} />
                  <div className="absolute top-4 right-4 bg-midnight/80 border border-warm-gold/30 px-3 py-1 rounded font-ui text-[10px] uppercase tracking-wider text-warm-gold">
                    Coming Soon
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function ChapterCardContent({ chapter }: { chapter: any }) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative h-48 w-full bg-midnight/50">
        {chapter.coverImage ? (
          <Image 
            src={chapter.coverImage}
            alt={chapter.title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-warm-gold/20 font-display text-4xl">
            {chapter.number}
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <span className="font-ui text-[10px] tracking-widest text-warm-gold/70 uppercase mb-2">
          Chapter {chapter.number.toString().padStart(2, '0')}
        </span>
        <h2 className="font-display text-2xl text-cream mb-3">{chapter.title}</h2>
        <p className="font-body text-sm text-lavender/70 line-clamp-2">
          {chapter.description}
        </p>
      </div>
    </div>
  );
}
