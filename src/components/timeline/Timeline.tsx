'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface TimelineEvent {
  id: string;
  age: string;
  title: string;
  description: string;
  quote?: string;
  imageSrc?: string;
  category: 'personal' | 'magical' | 'world';
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const selectedEvent = events.find(e => e.id === selectedEventId);

  return (
    <div className="w-full relative py-12">
      {/* Desktop Horizontal Timeline */}
      <div className="hidden md:block overflow-x-auto pb-12 relative no-scrollbar">
        <div className="min-w-[800px] w-full px-12 pt-24 relative">
          {/* Main Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-lavender/20 -translate-y-1/2" />
          
          <div className="flex justify-between items-center w-full relative z-10">
            {events.map((event, index) => {
              const isAbove = index % 2 === 0;
              return (
                <div key={event.id} className="relative flex flex-col items-center" style={{ width: '150px' }}>
                  {isAbove ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="absolute bottom-6 flex flex-col items-center text-center cursor-pointer group"
                      onClick={() => setSelectedEventId(event.id)}
                    >
                      <p className="font-ui text-xs text-warm-gold mb-2">{event.age}</p>
                      <h3 className="font-display text-lg text-cream group-hover:text-warm-gold transition-colors">{event.title}</h3>
                    </motion.div>
                  ) : null}

                  {/* Node */}
                  <button 
                    onClick={() => setSelectedEventId(event.id)}
                    className="w-3 h-3 rounded-full bg-warm-gold z-10 transition-transform hover:scale-150 focus:outline-none focus:ring-2 focus:ring-warm-gold/50"
                  />

                  {!isAbove ? (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="absolute top-6 flex flex-col items-center text-center cursor-pointer group"
                      onClick={() => setSelectedEventId(event.id)}
                    >
                      <h3 className="font-display text-lg text-cream group-hover:text-warm-gold transition-colors">{event.title}</h3>
                      <p className="font-ui text-xs text-warm-gold mt-2">{event.age}</p>
                    </motion.div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="md:hidden relative pl-6 pr-4 space-y-12">
        {/* Main Line */}
        <div className="absolute top-0 bottom-0 left-8 w-px bg-lavender/20" />
        
        {events.map((event) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10 pl-8"
          >
            {/* Node */}
            <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-warm-gold" />
            
            <p className="font-ui text-xs text-warm-gold mb-1">{event.age}</p>
            <h3 className="font-display text-xl text-cream mb-2">{event.title}</h3>
            <p className="font-body text-sm text-lavender/80 mb-3">{event.description}</p>
            {event.quote && (
              <p className="font-handwritten text-lg text-dusty-rose/90 italic">"{event.quote}"</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Desktop Modal for Selected Event */}
      <AnimatePresence>
        {selectedEventId && selectedEvent && (
          <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-plum/90 border border-lavender/20 rounded-xl p-8 max-w-2xl w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setSelectedEventId(null)}
                className="absolute top-4 right-4 text-lavender hover:text-cream transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="font-ui text-sm text-warm-gold tracking-widest">{selectedEvent.age}</span>
                <div className="h-px bg-lavender/20 flex-grow" />
              </div>
              
              <h2 className="font-display text-4xl text-cream mb-6">{selectedEvent.title}</h2>
              
              <div className="flex gap-8">
                <div className="flex-grow space-y-4">
                  <p className="font-body text-lg text-lavender/90 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                  {selectedEvent.quote && (
                    <p className="font-handwritten text-2xl text-dusty-rose mt-8 pt-4 border-t border-white/5">
                      "{selectedEvent.quote}"
                    </p>
                  )}
                </div>
                {/* Image Placeholder */}
                <div className="w-1/3 flex-shrink-0 bg-midnight/50 rounded-lg border border-white/5 aspect-[3/4] flex items-center justify-center">
                  <span className="font-ui text-xs text-lavender/30">Memory Image</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
