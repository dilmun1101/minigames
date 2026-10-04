import { routes, type RouteProp, type RenderProp } from './routes';
import { ROUTES } from '@/shared/constants/routes';
import urlState from '@/shared/lib/url-state/url-state';

const LINK_START = '/';
const NOT_FOUND_TEXT = 'Page not found';

class Router {
  private root: HTMLElement;
  private path = '';
  private page: RenderProp | null = null;

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

    if (path === this.path && this.page) {
      if (this.page.update) {
        this.page.update();
      }

      return;
    }

    const route = this.findRoute(path);

    this.path = path;
    this.root.replaceChildren();

    if (!route) {
      this.page = null;
      this.root.textContent = NOT_FOUND_TEXT;
      return;
    }

    const page = new route.page();

    this.page = page;
    this.root.append(page.render());

    if (page.update) {
      page.update();
    }
  }

  public init(): void {
    this.render();
  }
}

export default Router;
