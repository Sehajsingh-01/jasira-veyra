'use client';

import React, { ReactNode } from 'react';

interface BookPageProps {
  content: ReactNode;
  pageNumber: number;
  isRight: boolean;
}

export function BookPage({ content, pageNumber, isRight }: BookPageProps) {
  return (
    <div
      className={`absolute inset-0 w-full h-full bg-parchment origin-left ${
        isRight ? 'left-1/2 rounded-r-md' : 'left-0 origin-right rounded-l-md'
      }`}
      style={{
        backfaceVisibility: 'hidden',
        boxShadow: isRight
          ? 'inset 10px 0 20px rgba(0,0,0,0.1), 2px 2px 5px rgba(0,0,0,0.2)'
          : 'inset -10px 0 20px rgba(0,0,0,0.1), -2px 2px 5px rgba(0,0,0,0.2)',
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(229, 214, 185, 0.5) 100%)',
      }}
    >
      <div className="p-8 h-full flex flex-col justify-between">
        <div className="flex-grow font-body text-ink text-sm sm:text-base leading-relaxed">
          {content}
        </div>
        <div
          className={`font-ui text-xs text-ink/50 mt-4 flex ${
            isRight ? 'justify-end' : 'justify-start'
          }`}
        >
          {pageNumber}
        </div>
      </div>
    </div>
  );
}
