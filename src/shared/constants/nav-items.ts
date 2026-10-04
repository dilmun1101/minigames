import { ROUTES } from './routes';

export interface NavItem {
  text: string;
  href: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { text: 'Home', href: ROUTES.HOME, path: ROUTES.HOME },
  { text: 'Library', href: ROUTES.LIBRARY, path: ROUTES.LIBRARY },
  { text: 'Tournaments', href: ROUTES.HOME, path: ROUTES.TOURNAMENTS },
  { text: 'Community', href: ROUTES.HOME, path: ROUTES.COMMUNITY },
];
