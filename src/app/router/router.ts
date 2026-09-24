import { routes, type RouteProp } from './routes';
import { ROUTES } from '../../shared/constants/routes';

class Router {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    window.addEventListener('popstate', () => this.render());
  }

  public navigate(path: string): void {
    window.history.pushState({}, '', path);
    this.render();
  }

  private getCurrentPath(): string {
    return window.location.pathname || ROUTES.HOME;
  }

  private findRoute(path: string): RouteProp | undefined {
    return routes.find((route) => route.path === path);
  }

  public render(): void {
    const path = this.getCurrentPath();
    const route = this.findRoute(path);

    if (!route) {
      this.root.innerHTML = `Page not found`;
      return;
    }

    const page = new route.page();

    this.root.innerHTML = '';
    this.root.append(page.render());
  }

  public init(): void {
    this.render();
  }
}

export default Router;
