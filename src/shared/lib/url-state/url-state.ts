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

  public update(): void {
    this.notify();
  }

  public getPath(): string {
    return window.location.pathname;
  }

  public goTo(url: string): void {
    this.changeUrl(url, false);
  }

  public getParam(name: string): string {
    const params = new URLSearchParams(window.location.search);

    return params.get(name) ?? EMPTY_QUERY;
  }

  public setParams(changes: Record<string, string | null>): void {
    this.changeUrl(this.buildUrl(changes), false);
  }

  public replaceParams(changes: Record<string, string | null>): void {
    this.changeUrl(this.buildUrl(changes), true);
  }

  private buildUrl(changes: Record<string, string | null>): string {
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
      return this.getPath();
    }

    return `${this.getPath()}${QUERY_START}${query}`;
  }

  private changeUrl(url: string, isReplace: boolean): void {
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (url === currentUrl) {
      return;
    }

    if (isReplace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    this.notify();
  }

  private notify(): void {
    this.handlers.forEach((handler) => handler());
  }
}

const urlState = new UrlState();

export default urlState;
