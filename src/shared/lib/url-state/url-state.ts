type UrlHandler = () => void;

const QUERY_START = '?';
const EMPTY_QUERY = '';

class UrlState {
  private handlers: UrlHandler[] = [];

  constructor() {
    window.addEventListener('popstate', () => this.notify());
  }

  public onChange(handler: UrlHandler): void {
    this.handlers.push(handler);
  }

  public getPath(): string {
    return window.location.pathname;
  }

  public goTo(url: string): void {
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (url === currentUrl) {
      return;
    }

    window.history.pushState({}, '', url);
    this.notify();
  }

  public getParam(name: string): string {
    const params = new URLSearchParams(window.location.search);

    return params.get(name) ?? EMPTY_QUERY;
  }

  public setParams(changes: Record<string, string | null>): void {
    const params = new URLSearchParams(window.location.search);

    Object.entries(changes).forEach(([name, value]) => {
      if (value === null) {
        params.delete(name);
        return;
      }

      params.set(name, value);
    });

    const query = params.toString();

    if (query === EMPTY_QUERY) {
      this.goTo(this.getPath());
      return;
    }

    this.goTo(`${this.getPath()}${QUERY_START}${query}`);
  }

  private notify(): void {
    this.handlers.forEach((handler) => handler());
  }
}

const urlState = new UrlState();

export default urlState;
