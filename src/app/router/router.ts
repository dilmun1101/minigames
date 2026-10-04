import { routes, type RouteProp, type RenderProp } from './routes';
import { ROUTES } from '@/shared/constants/routes';
import urlState from '@/shared/lib/url-state/url-state';
import NotFoundPage from '@/pages/not-found-page/not-found-page';

const LINK_START = '/';

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

    const page: RenderProp = route ? new route.page() : new NotFoundPage();

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
