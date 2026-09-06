'use client';

import { useReadingProgress } from '@/hooks/useReadingProgress';

export default function ReadingProgress({ chapterId = 'global' }: { chapterId?: string }) {
  const { progress } = useReadingProgress(chapterId);

  return (
    <div className="fixed top-0 left-0 z-40 w-full h-[2px] bg-transparent">
      <div 
        className="h-full bg-warm-gold/50 transition-all duration-150 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
