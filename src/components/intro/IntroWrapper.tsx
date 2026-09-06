'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const CinematicIntro = dynamic(() => import('./CinematicIntro'), { ssr: false });

export default function IntroWrapper() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleComplete = () => {
    setShowIntro(false);
  };

  if (!isMounted || !showIntro) return null;

  return <CinematicIntro onComplete={handleComplete} />;
}
