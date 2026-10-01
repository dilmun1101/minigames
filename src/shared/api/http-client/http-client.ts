class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getJson<T>(fileName: string): Promise<T> {
    const url = `${this.baseUrl}/${fileName}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Cannot load the data`);
    }

    const json = await response.json();

    return json as T;
  }
}

export default HttpClient;
