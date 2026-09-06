export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatChapterNumber(n: number): string {
  return `CHAPTER ${n.toString().padStart(2, '0')}`;
}

export function formatReadingProgress(current: number, total: number): string {
  if (total <= 0) return '0%';
  return `${Math.round((current / total) * 100)}%`;
}

export function getImagePlaceholder(category: string, name: string): string {
  // These are placeholder paths for images that will be added later
  return `/images/${category}/${name}.webp`;
}
