import { ASSETS_URL, API_URL } from '../config/config';
import HttpClient from '../http-client/http-client';
import type {
  ApiResponse,
  ApiPageResponse,
  GamesPage,
  GameDto,
  CategoryDto,
  CommentDto,
  GameDetailsDto,
  LeaderboardPlayerDto,
  GamesPageProps,
} from '../types/types';

const GAMES = 'games';
const LEADERBOARD = 'leaderboard';
const CATEGORIES = 'categories';
const FEATURED_GAMES = `${GAMES}?featured=true`;
const COMMENTS = 'comments';
const LIMIT_PARAM = 'limit';
const PAGE_PARAM = 'page';
const CATEGORY_PARAM = 'category';
const SORT_PARAM = 'sort';

export const GAMES_ON_PAGE = 6;

class MinigamesApi {
  private backend = new HttpClient(API_URL);

  public async getGames(): Promise<GameDto[]> {
    const response = await this.backend.getJson<ApiResponse<GameDto[]>>(GAMES);

    return response.data.map((game) => this.addImageUrl(game));
  }

  public async getGamesPage({
    page,
    category,
    sort,
  }: GamesPageProps): Promise<GamesPage> {
    const search = new URLSearchParams({
      [LIMIT_PARAM]: String(GAMES_ON_PAGE),
      [PAGE_PARAM]: String(page),
      [CATEGORY_PARAM]: category,
      [SORT_PARAM]: sort,
    });

    const response = await this.backend.getJson<ApiPageResponse<GameDto[]>>(
      `${GAMES}?${search.toString()}`
    );

    return {
      games: response.data.map((game) => this.addImageUrl(game)),
      totalPages: response.meta.totalPages,
    };
  }

  public async getGame(slug: string): Promise<GameDto | undefined> {
    const games = await this.getGames();

    return games.find((game) => game.slug === slug);
  }

  public async getGamesByCategory(category: string): Promise<GameDto[]> {
    const games = await this.getGames();

    return games.filter((game) => game.category === category);
  }

  public async getFeaturedGames(): Promise<GameDto[]> {
    const response =
      await this.backend.getJson<ApiResponse<GameDto[]>>(FEATURED_GAMES);

    return response.data.map((game) => this.addImageUrl(game));
  }

  public async getGameDetails(slug: string): Promise<GameDetailsDto> {
    const response = await this.backend.getJson<ApiResponse<GameDetailsDto>>(
      `${GAMES}/${slug}`
    );

    return {
      ...response.data,
      heroImage: this.getImageUrl(response.data.heroImage),
    };
  }

  public async getGameComments(slug: string): Promise<CommentDto[]> {
    const response = await this.backend.getJson<ApiResponse<CommentDto[]>>(
      `${GAMES}/${slug}/${COMMENTS}`
    );

    return response.data;
  }

  public async getTopPlayers(): Promise<LeaderboardPlayerDto[]> {
    const response =
      await this.backend.getJson<ApiResponse<LeaderboardPlayerDto[]>>(
        LEADERBOARD
      );

    return response.data;
  }

  public async getCategories(): Promise<CategoryDto[]> {
    const response =
      await this.backend.getJson<ApiResponse<CategoryDto[]>>(CATEGORIES);

    return response.data;
  }

  public getImageUrl(path: string): string {
    const parts = path.split('/');
    const lastPart = parts.length - 1;
    const fileName = parts[lastPart];

    return `${ASSETS_URL}/${fileName}`;
  }

  private addImageUrl(game: GameDto): GameDto {
    return {
      ...game,
      cardImage: this.getImageUrl(game.cardImage),
    };
  }
}

export default MinigamesApi;
