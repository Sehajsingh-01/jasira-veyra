'use client';

import { useState, useEffect } from 'react';

export function useReadingProgress(chapterId: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(scrollPercent);
      
      if (chapterId) {
        localStorage.setItem(`reading-progress-${chapterId}`, scrollPercent.toString());
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Load initial progress if any
    const saved = localStorage.getItem(`reading-progress-${chapterId}`);
    if (saved) {
      // Could optionally scroll to position here if desired
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapterId]);

  return { progress, setProgress };
}
