type UrlHandler = () => void;

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

  private notify(): void {
    this.handlers.forEach((handler) => handler());
  }
}

const urlState = new UrlState();

export default urlState;
