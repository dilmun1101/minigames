const THOUSAND = 1000;
const HUNDRED = 100;
const TEN = 10;

export function formatLikes(count: number): string {
  if (count < THOUSAND) {
    return String(count);
  }

  const thousands = Math.floor(count / HUNDRED) / TEN;

  return `${thousands}K`;
}
