export interface ApiResponse<T> {
  data: T;
}

export interface ApiPageResponse<T> {
  data: T;
  meta: PageMetaDto;
}

export interface PageMetaDto {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface GamesPage {
  games: GameDto[];
  totalPages: number;
}

export interface GameDto {
  slug: string;
  name: string;
  category: string;
  price: string;
  shortDescription: string;
  rating: number;
  likesCount: number;
  cardImage: string;
  featured?: boolean;
}

export interface CategoryDto {
  slug: string;
  label: string;
  isDefault: boolean;
}

export interface CommentDto {
  commentId: string;
  authorName: string;
  text: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  createdAt: string;
}

export interface GameDetailsDto {
  slug: string;
  name: string;
  heroImage: string;
  rating: number;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  fullDescription: string;
  specs: SpecsDto;
  topRecords: TopRecordDto[];
}

export interface SpecsDto {
  genre: string;
  players: string;
  duration: string;
  price: string;
}

export interface TopRecordDto {
  position: number;
  playerName: string;
  score: number;
  achievedAt: string;
}

export interface LeaderboardPlayerDto {
  rank: number;
  playerName: string;
  gamesPlayed: number;
  totalScore: number;
  streakDays: number;
  favoriteGameSlug: string;
  favoriteGameName: string;
}
