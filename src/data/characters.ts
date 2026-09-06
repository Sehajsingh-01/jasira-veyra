export interface Character {
  id: string;
  name: string;
  nickname?: string;
  age: string;
  height: string;
  race: string;
  theme: string;
  personality: string;
  role: string;
  quote?: string;
}

export const characters: Character[] = [
  {
    id: "jasira",
    name: "Jasira Veyra",
    nickname: "Jas",
    age: "Unknown",
    height: "5'6\"",
    race: "Human/Mage",
    theme: "Duskbloom",
    personality: "Determined, curious, slightly guarded.",
    role: "Protagonist",
    quote: "The shadows are not empty; they are just waiting to be understood."
  }
];
