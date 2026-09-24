export interface Game {
  slug: string;
  name: string;
  rating: number;
  likesCount: number;
  cardImage: string;
}

export const NEW_GAMES: Game[] = [
  {
    slug: 'tailside-cozy-cafe-sim',
    name: 'Tailside: Cozy Cafe Sim',
    rating: 4.8,
    likesCount: 35600,
    cardImage: '/slider/tailside-cozy-cafe-sim-card.jpg',
  },
  {
    slug: 'islanders-new-shores',
    name: 'ISLANDERS: New Shores',
    rating: 4.9,
    likesCount: 54200,
    cardImage: '/slider/islanders-new-shores-card.jpg',
  },
  {
    slug: 'vacation-cafe-simulator',
    name: 'Vacation Cafe Simulator',
    rating: 4.8,
    likesCount: 28750,
    cardImage: '/slider/vacation-cafe-simulator-card.jpg',
  },
  {
    slug: 'winter-burrow',
    name: 'Winter Burrow',
    rating: 4.9,
    likesCount: 32400,
    cardImage: '/slider/winter-burrow-card.jpg',
  },
  {
    slug: 'shelve-the-potions',
    name: 'Shelve the Potions!',
    rating: 4.7,
    likesCount: 21300,
    cardImage: '/slider/shelve-the-potions-card.jpg',
  },
];
