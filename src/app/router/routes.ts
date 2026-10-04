import HomePage from '@/pages/home-page/home-page';
import LibraryPage from '@/pages/library-page/library-page';
import { ROUTES } from '@/shared/constants/routes';

export interface RenderProp {
  render(): HTMLElement;
  update?(): void;
}

export interface RouteProp {
  path: string;
  page: new () => RenderProp;
}

export const routes: RouteProp[] = [
  { path: ROUTES.HOME, page: HomePage },
  { path: ROUTES.HOME_PAGE, page: HomePage },
  { path: ROUTES.LIBRARY, page: LibraryPage },
];
