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
  { id: 'g1', title: 'Jasira Hero Portrait', category: 'jasira', src: '/images/jasira/portraits/hero.webp', thumbnail: '/images/jasira/portraits/hero.webp', description: 'A quiet soul in a loud world resting chin on hand amidst petals.', tags: ['jasira', 'portrait'], width: 800, height: 1000 },
  { id: 'g2', title: 'Serene Gaze', category: 'jasira', src: '/images/jasira/portraits/main-portrait.webp', thumbnail: '/images/jasira/portraits/main-portrait.webp', description: 'Trademark round wireframe glasses and twin pink ribbons.', tags: ['jasira', 'portrait'], width: 800, height: 1000 },
  { id: 'g3', title: 'Everyday Jas', category: 'jasira', src: '/images/jasira/outfits/everyday.webp', thumbnail: '/images/jasira/outfits/everyday.webp', description: 'Casual high-waisted denim and pink accented top.', tags: ['jasira', 'outfit'], width: 800, height: 1200 },
  { id: 'g4', title: 'Library Keeper', category: 'jasira', src: '/images/jasira/outfits/library.webp', thumbnail: '/images/jasira/outfits/library.webp', description: 'Cream knit vest and pleated skirt carrying ancient grimoires.', tags: ['jasira', 'outfit'], width: 800, height: 1200 },
  { id: 'g5', title: 'Cozy Knits', category: 'jasira', src: '/images/jasira/outfits/cozy.webp', thumbnail: '/images/jasira/outfits/cozy.webp', description: 'Oversized cable-knit sweater holding Mochi.', tags: ['jasira', 'outfit'], width: 800, height: 1200 },
  { id: 'g6', title: 'Duskbloom Wanderer', category: 'jasira', src: '/images/jasira/outfits/adventure.webp', thumbnail: '/images/jasira/outfits/adventure.webp', description: 'Plum explorer capelet and leather traveling boots.', tags: ['jasira', 'outfit'], width: 800, height: 1200 },

  // Mochi
  { id: 'g7', title: "Mochi's View", category: 'mochi', src: '/images/mochi/portrait.webp', thumbnail: '/images/mochi/portrait.webp', description: 'Chubby brown plush companion with star collar.', tags: ['mochi', 'companion'], width: 800, height: 800 },
  { id: 'g8', title: 'Together', category: 'mochi', src: '/images/mochi/together.webp', thumbnail: '/images/mochi/together.webp', description: 'Jasira hugging Mochi with gentle warmth.', tags: ['mochi', 'together'], width: 800, height: 800 },
  { id: 'g9', title: 'Reading Buddies', category: 'mochi', src: '/images/mochi/reading-buddies.webp', thumbnail: '/images/mochi/reading-buddies.webp', description: 'Sharing fairytales in the quiet of evening.', tags: ['mochi', 'reading'], width: 800, height: 800 },
  { id: 'g10', title: 'Sleep Time', category: 'mochi', src: '/images/mochi/sleep-time.webp', thumbnail: '/images/mochi/sleep-time.webp', description: 'Asleep on cozy pillows under starlight.', tags: ['mochi', 'sleep'], width: 800, height: 800 },
  { id: 'g11', title: 'Always With Me', category: 'mochi', src: '/images/mochi/always-with-me.webp', thumbnail: '/images/mochi/always-with-me.webp', description: 'Some companions make the quiet days brighter.', tags: ['mochi', 'love'], width: 800, height: 800 },

  // Magic
  { id: 'g12', title: 'Petal Bloom', category: 'magic', src: '/images/jasira/magic/flower-bloom.webp', thumbnail: '/images/jasira/magic/flower-bloom.webp', description: 'Cupped hands blossoming a lilac lotus of light.', tags: ['magic', 'lilac'], width: 800, height: 1000 },
  { id: 'g13', title: 'Sacred Mandala Crest', category: 'magic', src: '/images/jasira/magic/mandala-crest.webp', thumbnail: '/images/jasira/magic/mandala-crest.webp', description: 'Glowing floral mandala of restoration and memory.', tags: ['magic', 'crest'], width: 800, height: 1000 },
  { id: 'g14', title: 'Restoring Words', category: 'magic', src: '/images/jasira/magic/restoring-words.webp', thumbnail: '/images/jasira/magic/restoring-words.webp', description: 'Warm petal-light breathing vanished ink back onto parchment.', tags: ['magic', 'words'], width: 800, height: 1000 },

  // World
  { id: 'g15', title: 'Duskbloom Wood', category: 'world', src: '/images/world/duskbloom-wood.webp', thumbnail: '/images/world/duskbloom-wood.webp', description: 'Where every flower awakens when the moon rises.', tags: ['world', 'duskbloom'], width: 1600, height: 900 },
  { id: 'g16', title: 'The Grand Athenaeum', category: 'world', src: '/images/world/athenaeum-exterior.webp', thumbnail: '/images/world/athenaeum-exterior.webp', description: 'Ancient library sanctuary nestled among blooming trees.', tags: ['world', 'athenaeum'], width: 1600, height: 900 },
  { id: 'g17', title: 'The Eastern Grove', category: 'world', src: '/images/world/eastern-grove.webp', thumbnail: '/images/world/eastern-grove.webp', description: 'Tranquil sacred pond reflecting moonlit lilac branches.', tags: ['world', 'grove'], width: 1600, height: 900 },

  // Story
  { id: 'g18', title: 'The Silent Roses', category: 'story', src: '/images/story/silent-roses.webp', thumbnail: '/images/story/silent-roses.webp', description: 'The scentless roses under Jasira windowsill.', tags: ['story', 'roses'], width: 1200, height: 800 },
  { id: 'g19', title: 'The Hush-Tendril Breach', category: 'story', src: '/images/story/hush-tendril.webp', thumbnail: '/images/story/hush-tendril.webp', description: 'Mystical barrier runes flaring against creeping silence.', tags: ['story', 'barrier'], width: 1200, height: 800 },
  { id: 'g20', title: 'The Athenaeum Vaults', category: 'story', src: '/images/story/athenaeum.webp', thumbnail: '/images/story/athenaeum.webp', description: 'Towering shelves holding centuries of elven lore.', tags: ['story', 'library'], width: 1200, height: 800 },
  { id: 'g21', title: 'The Blank Page', category: 'story', src: '/images/story/blank-page.webp', thumbnail: '/images/story/blank-page.webp', description: 'Some endings don’t disappear; they wait to be remembered.', tags: ['story', 'page'], width: 1200, height: 800 },
  { id: 'g22', title: 'The Restored Ending', category: 'story', src: '/images/story/restored-ending.webp', thumbnail: '/images/story/restored-ending.webp', description: 'Petal light tracing lost calligraphy back to life.', tags: ['story', 'restoration'], width: 1200, height: 800 },

  // Details
  { id: 'g23', title: 'Round Wireframe Glasses', category: 'details', src: '/images/details/glasses.webp', thumbnail: '/images/details/glasses.webp', description: 'Her signature spectacles seeing quiet wonders.', tags: ['details', 'glasses'], width: 800, height: 800 },
  { id: 'g24', title: 'Pink Satin Hair Bows', category: 'details', src: '/images/details/hair-bow.webp', thumbnail: '/images/details/hair-bow.webp', description: 'Handcrafted ribbon bows pinned above her ears.', tags: ['details', 'bow'], width: 800, height: 800 },
  { id: 'g25', title: 'The Bloomverse Journal', category: 'details', src: '/images/details/notebook.webp', thumbnail: '/images/details/notebook.webp', description: 'Private journal recording quiet observations.', tags: ['details', 'notebook'], width: 800, height: 800 },
  { id: 'g26', title: 'Botanical Case & Charms', category: 'details', src: '/images/details/phone-case.webp', thumbnail: '/images/details/phone-case.webp', description: 'Floral pattern with beaded bracelet.', tags: ['details', 'phone'], width: 800, height: 800 },

  // Comic
  { id: 'g27', title: 'Comic: A Quiet Beginning', category: 'comic', src: '/images/comic/page1.webp', thumbnail: '/images/comic/page1-thumb.webp', description: 'Chapter 1 Part 1 webcomic page.', tags: ['comic'], width: 800, height: 1200 },
  { id: 'g28', title: 'Comic: The Breach', category: 'comic', src: '/images/comic/page2.webp', thumbnail: '/images/comic/page2-thumb.webp', description: 'Chapter 1 Part 2 webcomic page.', tags: ['comic'], width: 800, height: 1200 },
  { id: 'g29', title: 'Comic: The Athenaeum', category: 'comic', src: '/images/comic/page3.webp', thumbnail: '/images/comic/page3-thumb.webp', description: 'Chapter 1 Part 3 webcomic page.', tags: ['comic'], width: 800, height: 1200 },
  { id: 'g30', title: 'Comic: The Grandmother’s Journal', category: 'comic', src: '/images/comic/page4.webp', thumbnail: '/images/comic/page4-thumb.webp', description: 'Chapter 1 Part 4 webcomic page.', tags: ['comic'], width: 800, height: 1200 },
  { id: 'g31', title: 'Comic: The Elder Circle', category: 'comic', src: '/images/comic/page5.webp', thumbnail: '/images/comic/page5-thumb.webp', description: 'Chapter 1 Part 5 webcomic page.', tags: ['comic'], width: 800, height: 1200 },
  { id: 'g32', title: 'Comic: Conclusion', category: 'comic', src: '/images/comic/page6.webp', thumbnail: '/images/comic/page6-thumb.webp', description: 'Chapter 1 Part 6 webcomic page.', tags: ['comic'], width: 800, height: 1200 }
];
