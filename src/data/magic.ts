export interface MagicAbility {
  id: string;
  name: string;
  theme: string;
  description: string;
  visual: string;
  flowerType?: string;
  imageSrc?: string;
  color: string;
}

export const magicAbilities: MagicAbility[] = [
  {
    id: 'healing',
    name: 'Healing',
    theme: 'Restoration',
    description: 'Coaxing life back into fading things',
    visual: 'A soft, warm light that gently envelops the target',
    flowerType: 'Roses',
    color: '#F472B6' // pink-400
  },
  {
    id: 'protection',
    name: 'Protection',
    theme: 'Defense',
    description: 'Warm light that shields without force',
    visual: 'A glowing aura that surrounds Jasira and her allies',
    color: '#FBBF24' // amber-400
  },
  {
    id: 'illumination',
    name: 'Illumination',
    theme: 'Truth',
    description: 'Lilac light that reveals hidden truths',
    visual: 'A bright, lilac glow that pierces through darkness and deception',
    flowerType: 'Lilacs',
    color: '#A78BFA' // violet-400
  },
  {
    id: 'memory',
    name: 'Memory',
    theme: 'Preservation',
    description: 'Restoring forgotten words, preserving what\'s fading',
    visual: 'Faint, glowing script that materializes in the air',
    color: '#93C5FD' // blue-300
  },
  {
    id: 'preservation',
    name: 'Preservation',
    theme: 'Stasis',
    description: 'Keeping stories alive, preventing erasure',
    visual: 'A shimmering, amber-like field that holds objects and memories',
    color: '#D97706' // amber-600
  },
  {
    id: 'restoration',
    name: 'Restoration',
    theme: 'Endings',
    description: 'Reading endings back into existence',
    visual: 'Words blooming brightly on a page, anchoring reality',
    color: '#10B981' // emerald-500
  },
  {
    id: 'forgotten-stories',
    name: 'Forgotten Stories',
    theme: 'Connection',
    description: 'Connecting with lost narratives',
    visual: 'A swirling vortex of glowing pages and soft whispers',
    color: '#8B5CF6' // violet-500
  }
];
