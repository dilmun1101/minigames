interface LoopedIndexProps {
  index: number;
  total: number;
}

export function getLoopedIndex({ index, total }: LoopedIndexProps) {
  return ((index % total) + total) % total;
}
