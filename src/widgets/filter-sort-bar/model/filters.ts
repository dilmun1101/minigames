export interface SortOption {
  value: string;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: 'rating-up', label: 'Rating ↑' },
  { value: 'rating-down', label: 'Rating ↓' },
  { value: 'name-up', label: 'Name A→Z' },
  { value: 'name-down', label: 'Name Z→A' },
];

export const DEFAULT_SORT = 'rating-down';
