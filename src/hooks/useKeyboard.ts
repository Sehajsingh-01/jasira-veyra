'use client';

import { useEffect } from 'react';

interface KeyHandlers {
  [key: string]: () => void;
}

export function useKeyboard(handlers: KeyHandlers) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = handlers[event.key] || handlers[event.code];
      if (handler) {
        handler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers]);
}
