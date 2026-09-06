export interface TimelineEvent {
  id: string;
  age: string;
  title: string;
  description: string;
  quote?: string;
  imageSrc?: string;
  category: 'personal' | 'magical' | 'world';
}

export const timeline: TimelineEvent[] = [
  {
    id: 'birth',
    age: '0',
    title: 'Birth in Duskbloom Wood',
    description: 'Jasira is born in Duskbloom Wood, a place where magic lives in feeling.',
    category: 'personal'
  },
  {
    id: 'early-childhood',
    age: '4',
    title: 'Discovering Flowers Respond to Her',
    description: 'Jasira learns that her magic is soft and quiet, coaxing shy flowers into blooming early.',
    category: 'magical'
  },
  {
    id: 'age-10',
    age: '10',
    title: 'The Eastern Grove Fire',
    description: 'A wildfire starts in the eastern grove. The Hushing Decree is put into place to prevent strong feelings from causing disaster again.',
    category: 'world'
  },
  {
    id: 'age-14',
    age: '14',
    title: 'First Bloomverse Entries',
    description: 'Jasira begins writing in the Athenaeum\'s Storyboard under the Lilac Mark.',
    category: 'personal'
  },
  {
    id: 'age-17',
    age: '17',
    title: 'The Silent Roses',
    description: 'Jasira notices the roses under her window have stopped smelling like anything, the first sign of the Hush-tendril breach.',
    quote: 'the flowers went quiet, and I still don\'t know why I\'m the one who noticed.',
    category: 'magical'
  },
  {
    id: 'the-last-page',
    age: '17',
    title: 'The Last Page',
    description: 'Jasira and Ren map the erased endings of books, pointing toward the rift called The Last Page.',
    category: 'world'
  },
  {
    id: 'the-unexpected-ending',
    age: '17',
    title: 'The Unexpected Ending',
    description: 'Jasira confronts the rift not with force, but by writing an ending. The presence in the rift returns the stories.',
    quote: 'An ending is the thing that makes a story permanent.',
    category: 'magical'
  },
  {
    id: 'one-year-later',
    age: '18',
    title: 'One Year Later',
    description: 'Duskbloom heals, the Hushing Decree is lifted, and Jasira finally signs her own stories with her real name.',
    category: 'personal'
  }
];
