'use client';
import React, { createContext, useContext } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ReducedMotionContext = createContext<boolean>(false);

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <ReducedMotionContext.Provider value={prefersReducedMotion}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useReducedMotionContext() {
  return useContext(ReducedMotionContext);
}
