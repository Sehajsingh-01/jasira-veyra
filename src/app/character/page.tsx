import { characters } from '@/data/characters';
import { expressions } from '@/data/expressions';
import CharacterArchive from '@/components/character/CharacterArchive';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Character Archive - Jasira Veyra',
  description: 'Explore the character archive of Jasira Veyra.',
};

export default function CharacterPage() {
  // Using Jasira as the main character for this page
  const character = characters.find(c => c.id === 'jasira');
  
  if (!character) {
    notFound();
  }

  // Filter expressions for Jasira
  const charExpressions = expressions.filter(e => e.characterId === 'jasira');

  return (
    <main className="min-h-screen bg-midnight text-cream py-24 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-plum/5 rounded-b-[100%] blur-3xl -z-10" />
      
      <header className="text-center mb-16 max-w-4xl mx-auto">
        <span className="font-ui text-xs tracking-[0.3em] text-warm-gold/60 uppercase mb-4 block">
          The Archive
        </span>
        <h1 className="font-display text-5xl md:text-7xl mb-6">
          Jasira Veyra
        </h1>
        <div className="w-24 h-[1px] bg-warm-gold/30 mx-auto" />
      </header>

      <CharacterArchive 
        character={character} 
        expressions={charExpressions} 
      />
    </main>
  );
}
