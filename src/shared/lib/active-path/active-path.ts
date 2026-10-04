import { ROUTES } from '@/shared/constants/routes';
import urlState from '../url-state/url-state';

export function activePath(path: string): boolean {
  const currentPath = urlState.getPath();

  if (path === ROUTES.HOME) {
    return currentPath === ROUTES.HOME || currentPath === ROUTES.HOME_PAGE;
  }

  return path === currentPath;
}
