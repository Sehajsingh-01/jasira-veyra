'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const CinematicIntro = dynamic(() => import('./CinematicIntro'), { ssr: false });

export default function IntroWrapper() {
  const [showIntro, setShowIntro] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeenIntro = localStorage.getItem('bloomverse-intro-seen');
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('bloomverse-intro-seen', 'true');
    setShowIntro(false);
  };

  if (!isMounted || !showIntro) return null;

  return <CinematicIntro onComplete={handleComplete} />;
}
