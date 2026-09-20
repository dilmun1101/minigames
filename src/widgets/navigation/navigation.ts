import BaseComponent from '../../shared/lib/base-component/base-component';
import NavLink from '../../shared/ui/nav-link/nav-link';
import { ROUTES } from '../../shared/constants/routes';
import styles from './navigation.module.scss';

class Navigation extends BaseComponent<HTMLElement> {
  constructor() {
    const currentPath = window.location.pathname;

    const homeLink = new NavLink({
      href: ROUTES.HOME,
      text: 'Home',
      className: ROUTES.HOME === currentPath ? styles.linkActive : [],
    });

    const libraryLink = new NavLink({
      href: ROUTES.LIBRARY,
      text: 'Library',
      className: ROUTES.LIBRARY === currentPath ? styles.linkActive : [],
    });

    const tournamentsLink = new NavLink({
      href: ROUTES.TOURNAMENTS,
      text: 'Tournaments',
      className: ROUTES.TOURNAMENTS === currentPath ? styles.linkActive : [],
    });

    const communityLink = new NavLink({
      href: ROUTES.COMMUNITY,
      text: 'Community',
      className: ROUTES.COMMUNITY === currentPath ? styles.linkActive : [],
    });

    const list = new BaseComponent<HTMLUListElement>({
      tag: 'ul',
      className: styles.list,
    });

    const homeItem = new BaseComponent<HTMLLIElement>(
      {
        tag: 'li',
        className: styles.item,
      },
      homeLink
    );

    const libraryItem = new BaseComponent<HTMLLIElement>(
      {
        tag: 'li',
        className: styles.item,
      },
      libraryLink
    );

    const tournamentsItem = new BaseComponent<HTMLLIElement>(
      {
        tag: 'li',
        className: styles.item,
      },
      tournamentsLink
    );

    const communityItem = new BaseComponent<HTMLLIElement>(
      {
        tag: 'li',
        className: styles.item,
      },
      communityLink
    );

    list.append(homeItem, libraryItem, tournamentsItem, communityItem);

    super(
      {
        tag: 'nav',
        className: styles.navigation,
      },
      list
    );
  }
}

export default Navigation;
