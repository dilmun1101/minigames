export interface Player {
  rank: number;
  name: string;
  gamesPlayed: number;
  totalScore: number;
  streakDays: number;
  favoriteGame: string;
}

export const TOP_PLAYERS: Player[] = [
  {
    rank: 1,
    name: 'Alex_Pro99',
    gamesPlayed: 142,
    totalScore: 94250,
    streakDays: 12,
    favoriteGame: 'Heartopia',
  },
  {
    rank: 2,
    name: 'CozyGamer_x',
    gamesPlayed: 118,
    totalScore: 81400,
    streakDays: 8,
    favoriteGame: 'Cat Mail Co.',
  },
  {
    rank: 3,
    name: 'MatchMaster',
    gamesPlayed: 98,
    totalScore: 72110,
    streakDays: 5,
    favoriteGame: 'Tiny Glade',
  },
  {
    rank: 4,
    name: 'BubblePop',
    gamesPlayed: 87,
    totalScore: 65900,
    streakDays: 3,
    favoriteGame: 'Whisper of the House',
  },
  {
    rank: 5,
    name: 'SudokuGod',
    gamesPlayed: 74,
    totalScore: 59320,
    streakDays: 2,
    favoriteGame: 'Cat Chess',
  },
];
