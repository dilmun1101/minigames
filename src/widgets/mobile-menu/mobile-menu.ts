import BaseComponent from '@/shared/lib/base-component/base-component';
import Logo from '@/shared/ui/logo/logo';
import NavLink from '@/shared/ui/nav-link/nav-link';
import { ROUTES } from '@/shared/constants/routes';
import CloseButton from './ui/close-button/close-button';
import styles from './mobile-menu.module.scss';
import Button from '@/shared/ui/button/button';

interface MobileMenuProps {
  onAuthButtonClick: () => void;
}

class MobileMenu extends BaseComponent<HTMLDivElement> {
  constructor({ onAuthButtonClick }: MobileMenuProps) {
    const logo = new Logo();
    const closeButton = new CloseButton();

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
      className:
        ROUTES.HOME === currentPath
          ? [styles.link, styles.linkActive]
          : styles.link,
    });

    const libraryLink = new NavLink({
      href: ROUTES.HOME,
      text: 'Library',
      className:
        ROUTES.LIBRARY === currentPath
          ? [styles.link, styles.linkActive]
          : styles.link,
    });

    const tournamentsLink = new NavLink({
      href: ROUTES.HOME,
      text: 'Tournaments',
      className:
        ROUTES.TOURNAMENTS === currentPath
          ? [styles.link, styles.linkActive]
          : styles.link,
    });

    const communityLink = new NavLink({
      href: ROUTES.HOME,
      text: 'Community',
      className:
        ROUTES.COMMUNITY === currentPath
          ? [styles.link, styles.linkActive]
          : styles.link,
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

    const loginButton = new Button({
      text: 'Log in',
      className: styles.loginButton,
      variant: 'additional',
    });

    const signUpButton = new Button({
      text: 'Sign up',
      className: styles.signButton,
      variant: 'primary',
    });

    const actionsButtons = new BaseComponent(
      {
        tag: 'div',
        className: styles.actions,
      },
      loginButton,
      signUpButton
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

    closeButton.node.addEventListener('click', () => this.close());
    loginButton.onClick(onAuthButtonClick);
    signUpButton.onClick(onAuthButtonClick);
  }

  public open(): void {
    this.addClass(styles.open);
  }

  public close(): void {
    this.removeClass(styles.open);
  }
}

export default MobileMenu;
