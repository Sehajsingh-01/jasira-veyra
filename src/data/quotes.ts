export interface JournalQuote {
  id: string;
  text: string;
  source?: 'bloomverse' | 'grandmother' | 'jasira' | 'narrator' | 'binder';
  chapter?: string;
  isUnlockable: boolean;
  unlockedBy?: string;
}

export const quotes: JournalQuote[] = [
  {
    id: 'q1',
    text: 'The flowers went quiet, and I still don\'t know why I\'m the one who noticed.',
    source: 'bloomverse',
    chapter: 'chapter-1',
    isUnlockable: false
  },
  {
    id: 'q2',
    text: 'Some endings don\'t disappear. They wait to be remembered.',
    source: 'jasira',
    chapter: 'chapter-1',
    isUnlockable: false
  },
  {
    id: 'q3',
    text: 'The wood will not be saved by the loudest power in it. It will be saved by the one who never stopped trying, long after trying stopped being noticed.',
    source: 'grandmother',
    chapter: 'chapter-1',
    isUnlockable: false
  },
  {
    id: 'q4',
    text: 'Some stories are not meant to be loud. Some are simply meant to be remembered.',
    source: 'narrator',
    isUnlockable: false
  },
  {
    id: 'q5',
    text: 'Even the quietest hearts can change the world.',
    source: 'narrator',
    isUnlockable: false
  },
  {
    id: 'q6',
    text: 'You can\'t fight an ending with a sword.',
    source: 'jasira',
    chapter: 'chapter-1',
    isUnlockable: false
  },
  {
    id: 'q7',
    text: 'An ending is the thing that makes a story permanent.',
    source: 'bloomverse',
    chapter: 'chapter-1',
    isUnlockable: false
  },
  {
    id: 'q8',
    text: 'This whole world was written for you. Every page of it. Not because you needed to become powerful — you already were.',
    source: 'bloomverse',
    chapter: 'chapter-1',
    isUnlockable: false
  },
  {
    id: 'q9',
    text: 'Because somebody wanted you to see, for once, in a shape big enough to hold it, how much the quiet, "not serious" parts of you have always been the realest magic in the room.',
    source: 'bloomverse',
    chapter: 'chapter-1',
    isUnlockable: false
  },
  {
    id: 'q10',
    text: 'This story has an ending. That was never the scary part. The scary part was whether you\'d believe you deserved one this good. You do. You always did.',
    source: 'bloomverse',
    chapter: 'chapter-1',
    isUnlockable: false
  },
  {
    id: 'q11',
    text: 'Some hearts were never meant to whisper.',
    source: 'narrator',
    isUnlockable: true,
    unlockedBy: 'Finishing Chapter 5'
  },
  {
    id: 'q12',
    text: 'Petals fall, but magic remembers.',
    source: 'narrator',
    isUnlockable: false
  },
  {
    id: 'q13',
    text: 'Nobody who writes like that is quiet about anything. She\'s probably the loudest person in whatever room she\'s standing in, and everyone around her just hasn\'t noticed yet.',
    source: 'narrator',
    chapter: 'chapter-2',
    isUnlockable: false
  },
  {
    id: 'q14',
    text: 'I don\'t think smallness ever saved anyone. I think I have simply been too afraid to say so out loud, in case saying it meant admitting what it actually cost.',
    source: 'grandmother',
    chapter: 'chapter-2',
    isUnlockable: false
  },
  {
    id: 'q15',
    text: 'Everyone who asks me a true question pays a true price.',
    source: 'binder',
    chapter: 'chapter-3',
    isUnlockable: false
  },
  {
    id: 'q16',
    text: 'For most people, silence for even one day is the steepest price I offer. You, of all the elves who\'ve walked through that door, might actually understand why.',
    source: 'binder',
    chapter: 'chapter-3',
    isUnlockable: false
  },
  {
    id: 'q17',
    text: 'Seven years unfinished means something kept it alive. Belief. Someone has to keep believing a story is still possible for it to stay that stubborn.',
    source: 'narrator',
    chapter: 'chapter-3',
    isUnlockable: false
  },
  {
    id: 'q18',
    text: 'I\'ve spent my whole life being the elf nobody thought needed finishing either. I know exactly what seven years of that does to a person.',
    source: 'jasira',
    chapter: 'chapter-4',
    isUnlockable: false
  },
  {
    id: 'q19',
    text: 'I\'m going to give you something true of my own, right now, in trade — not because the Binder taught me that\'s how bargains work, but because you deserve to see that finishing honestly costs the person helping you something too.',
    source: 'jasira',
    chapter: 'chapter-4',
    isUnlockable: false
  },
  {
    id: 'q20',
    text: 'Some hearts were made to bloom out loud — and now, finally, so was everyone else\'s.',
    source: 'narrator',
    chapter: 'chapter-5',
    isUnlockable: false
  }
];
