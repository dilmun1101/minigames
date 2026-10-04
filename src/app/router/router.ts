import { routes, type RouteProp } from './routes';
import { ROUTES } from '../../shared/constants/routes';
import urlState from '@/shared/lib/url-state/url-state';

const LINK_START = '/';

class Router {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;

    urlState.onChange(() => this.render());
    document.addEventListener('click', (e) => this.onClick(e));
  }

  private getCurrentPath(): string {
    return urlState.getPath() || ROUTES.HOME;
  }

  private findRoute(path: string): RouteProp | undefined {
    return routes.find((route) => route.path === path);
  }

  private onClick(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest('a');
    if (!link) {
      return;
    }

    const href = link.getAttribute('href');
    if (!href || !href.startsWith(LINK_START)) {
      return;
    }

    event.preventDefault();
    urlState.goTo(href);
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
