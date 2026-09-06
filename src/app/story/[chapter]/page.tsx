import { notFound } from 'next/navigation';
import { chapters } from '@/data/chapters';
import StoryReader from '@/components/story/StoryReader';
import { Metadata } from 'next';

export function generateStaticParams() {
  return chapters.filter(c => c.isAvailable).map(c => ({ chapter: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> {
  const { chapter: chapterId } = await params;
  const chapter = chapters.find(c => c.id === chapterId);
  
  if (!chapter) {
    return { title: 'Chapter Not Found' };
  }

  return {
    title: `Chapter ${chapter.number}: ${chapter.title} - Jasira Veyra`,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter: chapterId } = await params;
  const chapter = chapters.find(c => c.id === chapterId);
  
  if (!chapter || !chapter.isAvailable) {
    notFound();
  }

  return <StoryReader chapter={chapter} />;
}
