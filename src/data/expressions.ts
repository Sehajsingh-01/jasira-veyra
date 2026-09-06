export interface Expression {
  id: string;
  characterId: string;
  name: string;
  image: string;
}

export const expressions: Expression[] = [
  {
    id: "exp-1",
    characterId: "jasira",
    name: "Neutral",
    image: "/images/jasira/expressions/neutral.webp"
  },
  {
    id: "exp-2",
    characterId: "jasira",
    name: "Determined",
    image: "/images/jasira/expressions/determined.webp"
  }
];
