export type UnlockCategory = 'artwork' | 'memory' | 'journal' | 'lore' | 'flower' | 'page' | 'symbol' | 'scene';

export interface Unlockable {
  id: string;
  category: UnlockCategory;
  title: string;
  description?: string;
  unlockedBy: string;
  content?: string;
  imageSrc?: string;
}

export interface WorldState {
  chaptersCompleted: string[];
  scenesVisited: string[];
  unlockedItems: string[];
  discoveredEasterEggs: string[];
  firstVisitDate: string;
  totalVisits: number;
}

export const DEFAULT_WORLD_STATE: WorldState = {
  chaptersCompleted: [],
  scenesVisited: [],
  unlockedItems: [],
  discoveredEasterEggs: [],
  firstVisitDate: new Date().toISOString(),
  totalVisits: 0,
};

export const UNLOCKABLES: Unlockable[] = [
  { id: 'art-silent-roses', category: 'artwork', title: 'The Silent Roses', unlockedBy: 'chapter-1-scene-1', imageSrc: '/images/artwork/silent-roses.webp' },
  { id: 'memory-grandmothers-journal', category: 'memory', title: "Grandmother's Journal", unlockedBy: 'chapter-1-scene-5' },
  { id: 'journal-flowers-went-quiet', category: 'journal', title: 'The flowers went quiet', unlockedBy: 'chapter-1-scene-1', content: "The flowers went quiet, and I still don't know why I'm the one who noticed." },
  
  { id: 'lore-whispering-woods', category: 'lore', title: 'The Whispering Woods', unlockedBy: 'chapter-1-complete', description: 'An ancient forest where secrets are kept in the roots.' },
  { id: 'flower-moon-lily', category: 'flower', title: 'Moon Lily', unlockedBy: 'explore-garden', description: 'Blooms only when the moon is full and the observer is completely silent.' },
  { id: 'symbol-sun-crest', category: 'symbol', title: 'Crest of the Sun', unlockedBy: 'found-easter-egg-1', imageSrc: '/images/symbols/sun-crest.webp' },
  { id: 'page-lost-letter', category: 'page', title: 'A Lost Letter', unlockedBy: 'chapter-2-scene-3', content: 'If you are reading this, the magic has not entirely faded.' },
  { id: 'art-midnight-bloom', category: 'artwork', title: 'Midnight Bloom', unlockedBy: 'chapter-2-complete', imageSrc: '/images/artwork/midnight-bloom.webp' },
  { id: 'scene-forgotten-lake', category: 'scene', title: 'The Forgotten Lake', unlockedBy: 'chapter-3-scene-1', description: 'A lake that reflects what you have lost, not what you are.' },
  { id: 'lore-ancient-language', category: 'lore', title: 'The Ancient Language', unlockedBy: 'found-easter-egg-2', content: 'Words spoken backwards to heal, words spoken forwards to bind.' },
  { id: 'memory-first-rain', category: 'memory', title: 'First Rain', unlockedBy: 'chapter-3-complete' },
];

export function isUnlocked(state: WorldState, unlockableId: string): boolean {
  return state.unlockedItems.includes(unlockableId);
}

export function getUnlockedItems(state: WorldState, category?: UnlockCategory): Unlockable[] {
  const unlocked = UNLOCKABLES.filter(item => state.unlockedItems.includes(item.id));
  if (category) {
    return unlocked.filter(item => item.category === category);
  }
  return unlocked;
}

export function unlockItem(state: WorldState, itemId: string): WorldState {
  if (state.unlockedItems.includes(itemId)) return state;
  return {
    ...state,
    unlockedItems: [...state.unlockedItems, itemId],
  };
}

export function completeChapter(state: WorldState, chapterId: string): WorldState {
  if (state.chaptersCompleted.includes(chapterId)) return state;
  return {
    ...state,
    chaptersCompleted: [...state.chaptersCompleted, chapterId],
  };
}

export function visitScene(state: WorldState, sceneId: string): WorldState {
  if (state.scenesVisited.includes(sceneId)) return state;
  return {
    ...state,
    scenesVisited: [...state.scenesVisited, sceneId],
  };
}
