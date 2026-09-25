import { ASSETS_URL, MOCK_DATA_URL } from '../config/config';
import HttpClient from '../http-client/http-client';
import type { ApiResponse, GameDto } from '../types/types';

class MinigamesApi {
  private client = new HttpClient(MOCK_DATA_URL);

  public async getFirstImageUrl(): Promise<string | undefined> {
    const response = await this.client.getJson<ApiResponse<GameDto[]>>(
      'all-games-seed.json'
    );

    const imagePath = response.data[0]?.cardImage;
    if (!imagePath) return undefined;

    const fileName = imagePath.split('/').pop();
    return `${ASSETS_URL}/${fileName}`;
  }
}

export default MinigamesApi;
