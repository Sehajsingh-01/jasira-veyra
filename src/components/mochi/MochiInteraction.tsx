'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export function MochiInteraction() {
  const [isBouncing, setIsBouncing] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);
  let heartCounter = 0;

  const handleClick = () => {
    if (isBouncing) return;
    
    setIsBouncing(true);
    
    // Create 3-4 hearts
    const newHearts = Array.from({ length: 3 + Math.floor(Math.random() * 2) }).map(() => ({
      id: Date.now() + Math.random(),
      left: 30 + Math.random() * 40, // Random horizontal position 30-70%
    }));
    
    setHearts(prev => [...prev, ...newHearts]);

    // Optional audio placeholder
    // const audio = new Audio('/sounds/mochi-squeak.mp3');
    // audio.play().catch(e => console.log('Audio play failed', e));

    setTimeout(() => {
      setIsBouncing(false);
    }, 300);

    // Clean up hearts after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto py-12 text-center">
      {/* Interaction Area */}
      <div className="relative mb-8 cursor-pointer group" onClick={handleClick}>
        <div 
          className={`relative w-48 h-48 rounded-full border-4 border-warm-gold/50 p-2 shadow-[0_0_30px_rgba(212,168,83,0.15)] transition-transform duration-300 group-hover:border-warm-gold group-hover:shadow-[0_0_40px_rgba(212,168,83,0.3)] bg-plum/20 ${
            isBouncing ? 'animate-bounce-short' : ''
          }`}
          style={{
            animation: isBouncing ? 'bounce-short 0.3s ease-in-out' : 'none'
          }}
        >
          {/* Decorative frame elements could go here */}
          <div className="w-full h-full rounded-full bg-midnight/50 flex items-center justify-center overflow-hidden relative">
            <Image 
              src="/images/mochi/portrait.webp" 
              alt="Mochi" 
              fill 
              sizes="192px"
              className="object-cover" 
              priority
            />
          </div>
        </div>

        {/* Floating Hearts */}
        {hearts.map(heart => (
          <div 
            key={heart.id}
            className="absolute text-dusty-rose text-xl pointer-events-none"
            style={{
              left: `${heart.left}%`,
              top: '50%',
              animation: 'float-up 1.5s ease-out forwards',
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-12">
        <h3 className="font-display text-4xl text-cream">MOCHI</h3>
        <p className="font-body text-lavender/90 leading-relaxed px-4">
          Jasira's small companion. Ears that notice everything. A heart that never forgets.
        </p>
        <p className="font-ui text-xs text-warm-gold/60 uppercase tracking-widest mt-4">
          Tap to pet
        </p>
      </div>

      {/* Mochi Moments Gallery */}
      <div className="grid grid-cols-3 gap-4 w-full px-4 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
             <span className="font-ui text-[10px] text-lavender/30">Moment {i}</span>
          </div>
        ))}
      </div>

      <p className="font-handwritten text-2xl text-dusty-rose">
        "Some companions make the quiet days brighter."
      </p>

      {/* Injecting CSS for animations just for this component if needed, though better in globals */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px) scaleY(1.05); }
        }
        @keyframes float-up {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 1; transform: translateY(-20px) scale(1); }
          100% { transform: translateY(-100px) scale(1.2); opacity: 0; }
        }
      `}} />
    </div>
  );
}
