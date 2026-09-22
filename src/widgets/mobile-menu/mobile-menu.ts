import BaseComponent from '@/shared/lib/base-component/base-component';
import Logo from '@/shared/ui/logo/logo';
import NavLink from '@/shared/ui/nav-link/nav-link';
import HeaderActionsButtons from '../header/ui/header-actions-buttons/header-actions-buttons';
import { ROUTES } from '@/shared/constants/routes';
import CloseButton from './ui/close-button/close-button';
import AuthDialog from '@/features/auth/ui/auth-dialog/auth-dialog';
import styles from './mobile-menu.module.scss';

class MobileMenu extends BaseComponent<HTMLDivElement> {
  constructor() {
    const logo = new Logo();
    const closeButton = new CloseButton();
    const authDialog = new AuthDialog();
    const actionsButtons = new HeaderActionsButtons({
      onSignInClick: () => authDialog.toggle(),
    });

    const menuHeader = new BaseComponent<HTMLDivElement>(
      {
        tag: 'div',
        className: styles.menuHeader,
      },
      logo,
      closeButton
    );

    const currentPath = window.location.pathname;

    const homeLink = new NavLink({
      href: ROUTES.HOME,
      text: 'Home',
      className: ROUTES.HOME === currentPath ? styles.linkActive : [],
    });

    const libraryLink = new NavLink({
      href: ROUTES.HOME,
      text: 'Library',
      className: ROUTES.LIBRARY === currentPath ? styles.linkActive : [],
    });

    const tournamentsLink = new NavLink({
      href: ROUTES.HOME,
      text: 'Tournaments',
      className: ROUTES.TOURNAMENTS === currentPath ? styles.linkActive : [],
    });

    const communityLink = new NavLink({
      href: ROUTES.HOME,
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

    const nav = new BaseComponent<HTMLElement>(
      {
        tag: 'nav',
        className: styles.nav,
      },
      list
    );

    super(
      {
        tag: 'div',
        className: styles.mobileMenu,
      },
      menuHeader,
      nav,
      actionsButtons
    );
  }
}

export default MobileMenu;
