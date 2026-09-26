import { ASSETS_URL, MOCK_DATA_URL } from '../config/config';
import HttpClient from '../http-client/http-client';
import type {
  ApiResponse,
  GameDto,
  CategoryDto,
  CommentDto,
  GameDetailsDto,
  LeaderboardPlayerDto,
} from '../types/types';

const GAMES_JSON = 'all-games-seed.json';
const LEADERBOARD_JSON = 'leaderboard.json';
const CATEGORIES_JSON = 'categories.json';

class MinigamesApi {
  private client = new HttpClient(MOCK_DATA_URL);

  public async getGames(): Promise<GameDto[]> {
    const response =
      await this.client.getJson<ApiResponse<GameDto[]>>(GAMES_JSON);

    return response.data.map((game) => ({
      ...game,
      cardImage: this.getImageUrl(game.cardImage),
    }));
  }

  public async getGame(slug: string): Promise<GameDto | undefined> {
    const games = await this.getGames();

    return games.find((game) => game.slug === slug);
  }

  public async getGamesByCategory(category: string): Promise<GameDto[]> {
    const games = await this.getGames();

    return games.filter((game) => game.category === category);
  }

  public async getGameDetails(slug: string): Promise<GameDetailsDto> {
    const response = await this.client.getJson<ApiResponse<GameDetailsDto>>(
      `game-${slug}.json`
    );

    return {
      ...response.data,
      heroImage: this.getImageUrl(response.data.heroImage),
    };
  }

  public async getGameComments(slug: string): Promise<CommentDto[]> {
    const response = await this.client.getJson<ApiResponse<CommentDto[]>>(
      `comments-${slug}.json`
    );

    return response.data;
  }

  public async getTopPlayers(): Promise<LeaderboardPlayerDto[]> {
    const response =
      await this.client.getJson<ApiResponse<LeaderboardPlayerDto[]>>(
        LEADERBOARD_JSON
      );

    return response.data;
  }

  public async getCategories(): Promise<CategoryDto[]> {
    const response =
      await this.client.getJson<ApiResponse<CategoryDto[]>>(CATEGORIES_JSON);

    return response.data;
  }

  public getImageUrl(path: string): string {
    const parts = path.split('/');
    const lastPart = parts.length - 1;
    const fileName = parts[lastPart];

    return `${ASSETS_URL}/${fileName}`;
  }
}

export default MinigamesApi;
