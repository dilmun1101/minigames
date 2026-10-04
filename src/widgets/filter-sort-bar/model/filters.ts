export interface SortOption {
  value: string;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: 'rating-asc', label: 'Rating ↑' },
  { value: 'rating-desc', label: 'Rating ↓' },
  { value: 'name-asc', label: 'Name A→Z' },
  { value: 'name-desc', label: 'Name Z→A' },
];

export const DEFAULT_SORT = 'rating-desc';
export const DEFAULT_CATEGORY = 'all';
