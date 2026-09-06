export interface GalleryImage {
  id: string;
  title: string;
  category: 'jasira' | 'mochi' | 'magic' | 'world' | 'story' | 'comic' | 'details';
  src: string;
  thumbnail: string;
  description?: string;
  chapter?: string;
  tags: string[];
  width: number;
  height: number;
}

export const gallery: GalleryImage[] = [
  // Jasira
  { id: 'g1', title: 'Jasira Portrait', category: 'jasira', src: '/images/gallery/jasira/portrait-1.webp', thumbnail: '/images/gallery/jasira/portrait-1-thumb.webp', tags: ['jasira', 'portrait'], width: 800, height: 1000 },
  { id: 'g2', title: 'Jasira Library', category: 'jasira', src: '/images/gallery/jasira/library.webp', thumbnail: '/images/gallery/jasira/library-thumb.webp', tags: ['jasira', 'library'], width: 1200, height: 800 },
  { id: 'g3', title: 'Jasira Healing', category: 'jasira', src: '/images/gallery/jasira/healing.webp', thumbnail: '/images/gallery/jasira/healing-thumb.webp', tags: ['jasira', 'magic'], width: 800, height: 1200 },
  { id: 'g4', title: 'Jasira Reading', category: 'jasira', src: '/images/gallery/jasira/reading.webp', thumbnail: '/images/gallery/jasira/reading-thumb.webp', tags: ['jasira', 'reading'], width: 1000, height: 1000 },

  // Mochi
  { id: 'g5', title: 'Mochi Sleeping', category: 'mochi', src: '/images/gallery/mochi/sleeping.webp', thumbnail: '/images/gallery/mochi/sleeping-thumb.webp', tags: ['mochi', 'sleep'], width: 800, height: 800 },
  { id: 'g6', title: 'Mochi Playing', category: 'mochi', src: '/images/gallery/mochi/playing.webp', thumbnail: '/images/gallery/mochi/playing-thumb.webp', tags: ['mochi', 'play'], width: 800, height: 800 },
  { id: 'g7', title: 'Mochi Curious', category: 'mochi', src: '/images/gallery/mochi/curious.webp', thumbnail: '/images/gallery/mochi/curious-thumb.webp', tags: ['mochi', 'curious'], width: 1000, height: 800 },

  // Magic
  { id: 'g8', title: 'Lilac Magic', category: 'magic', src: '/images/gallery/magic/lilac.webp', thumbnail: '/images/gallery/magic/lilac-thumb.webp', tags: ['magic', 'lilac'], width: 1200, height: 800 },
  { id: 'g9', title: 'Restoring Words', category: 'magic', src: '/images/gallery/magic/words.webp', thumbnail: '/images/gallery/magic/words-thumb.webp', tags: ['magic', 'words'], width: 800, height: 1200 },
  { id: 'g10', title: 'Bloomverse Glowing', category: 'magic', src: '/images/gallery/magic/bloomverse.webp', thumbnail: '/images/gallery/magic/bloomverse-thumb.webp', tags: ['magic', 'bloomverse'], width: 1000, height: 1000 },

  // World
  { id: 'g11', title: 'Duskbloom Wood', category: 'world', src: '/images/gallery/world/duskbloom.webp', thumbnail: '/images/gallery/world/duskbloom-thumb.webp', tags: ['world', 'duskbloom'], width: 1600, height: 900 },
  { id: 'g12', title: 'The Athenaeum', category: 'world', src: '/images/gallery/world/athenaeum.webp', thumbnail: '/images/gallery/world/athenaeum-thumb.webp', tags: ['world', 'library'], width: 1600, height: 900 },
  { id: 'g13', title: 'The Storyboard', category: 'world', src: '/images/gallery/world/storyboard.webp', thumbnail: '/images/gallery/world/storyboard-thumb.webp', tags: ['world', 'storyboard'], width: 1200, height: 800 },
  { id: 'g14', title: 'The Eastern Grove', category: 'world', src: '/images/gallery/world/eastern-grove.webp', thumbnail: '/images/gallery/world/eastern-grove-thumb.webp', tags: ['world', 'grove'], width: 1600, height: 900 },

  // Story
  { id: 'g15', title: 'The Blank Page', category: 'story', src: '/images/gallery/story/blank-page.webp', thumbnail: '/images/gallery/story/blank-page-thumb.webp', tags: ['story', 'page'], width: 800, height: 1200 },
  { id: 'g16', title: 'The Binder\'s Door', category: 'story', src: '/images/gallery/story/binder.webp', thumbnail: '/images/gallery/story/binder-thumb.webp', tags: ['story', 'binder'], width: 1000, height: 1000 },
  { id: 'g17', title: 'The Missing Elder', category: 'story', src: '/images/gallery/story/missing-elder.webp', thumbnail: '/images/gallery/story/missing-elder-thumb.webp', tags: ['story', 'elder'], width: 1200, height: 800 },
  { id: 'g18', title: 'The Sugar Petals', category: 'story', src: '/images/gallery/story/sugar-petals.webp', thumbnail: '/images/gallery/story/sugar-petals-thumb.webp', tags: ['story', 'candy'], width: 800, height: 800 },

  // Details
  { id: 'g19', title: 'Lilac Mark', category: 'details', src: '/images/gallery/details/lilac-mark.webp', thumbnail: '/images/gallery/details/lilac-mark-thumb.webp', tags: ['details', 'mark'], width: 800, height: 800 },
  { id: 'g20', title: 'Jasira\'s Notebook', category: 'details', src: '/images/gallery/details/notebook.webp', thumbnail: '/images/gallery/details/notebook-thumb.webp', tags: ['details', 'notebook'], width: 1000, height: 1000 },
  { id: 'g21', title: 'Faded Ink', category: 'details', src: '/images/gallery/details/ink.webp', thumbnail: '/images/gallery/details/ink-thumb.webp', tags: ['details', 'ink'], width: 800, height: 1200 },
  { id: 'g22', title: 'Torn Page', category: 'details', src: '/images/gallery/details/torn-page.webp', thumbnail: '/images/gallery/details/torn-page-thumb.webp', tags: ['details', 'page'], width: 1200, height: 800 },

  // Comic placeholders
  { id: 'g23', title: 'Comic Page 1', category: 'comic', src: '/images/comic/ch1/page1.webp', thumbnail: '/images/comic/ch1/page1-thumb.webp', tags: ['comic'], width: 800, height: 1200 },
  { id: 'g24', title: 'Comic Page 2', category: 'comic', src: '/images/comic/ch1/page2.webp', thumbnail: '/images/comic/ch1/page2-thumb.webp', tags: ['comic'], width: 800, height: 1200 },
  { id: 'g25', title: 'Comic Page 3', category: 'comic', src: '/images/comic/ch1/page3.webp', thumbnail: '/images/comic/ch1/page3-thumb.webp', tags: ['comic'], width: 800, height: 1200 },
];
