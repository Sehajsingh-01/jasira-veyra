export interface ComicPage {
  id: string;
  pageNumber: number;
  chapterId: string;
  src: string;
  thumbnail: string;
  alt: string;
}

export interface ComicChapter {
  id: string;
  title: string;
  pages: ComicPage[];
  isAvailable: boolean;
}

export const comicChapters: ComicChapter[] = [
  {
    id: 'chapter-1',
    title: 'A Quiet Beginning',
    isAvailable: true,
    pages: [
      {
        id: 'p1',
        pageNumber: 1,
        chapterId: 'chapter-1',
        src: '/images/comic/ch1/page1.webp',
        thumbnail: '/images/comic/ch1/page1-thumb.webp',
        alt: 'Comic Page 1'
      },
      {
        id: 'p2',
        pageNumber: 2,
        chapterId: 'chapter-1',
        src: '/images/comic/ch1/page2.webp',
        thumbnail: '/images/comic/ch1/page2-thumb.webp',
        alt: 'Comic Page 2'
      },
      {
        id: 'p3',
        pageNumber: 3,
        chapterId: 'chapter-1',
        src: '/images/comic/ch1/page3.webp',
        thumbnail: '/images/comic/ch1/page3-thumb.webp',
        alt: 'Comic Page 3'
      },
      {
        id: 'p4',
        pageNumber: 4,
        chapterId: 'chapter-1',
        src: '/images/comic/ch1/page4.webp',
        thumbnail: '/images/comic/ch1/page4-thumb.webp',
        alt: 'Comic Page 4'
      },
      {
        id: 'p5',
        pageNumber: 5,
        chapterId: 'chapter-1',
        src: '/images/comic/ch1/page5.webp',
        thumbnail: '/images/comic/ch1/page5-thumb.webp',
        alt: 'Comic Page 5'
      },
      {
        id: 'p6',
        pageNumber: 6,
        chapterId: 'chapter-1',
        src: '/images/comic/ch1/page6.webp',
        thumbnail: '/images/comic/ch1/page6-thumb.webp',
        alt: 'Comic Page 6'
      }
    ]
  }
];
