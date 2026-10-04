import BaseComponent from '@/shared/lib/base-component/base-component';
import Logo from '@/shared/ui/logo/logo';
import NavLink from '@/shared/ui/nav-link/nav-link';
import CloseButton from './ui/close-button/close-button';
import styles from './mobile-menu.module.scss';
import Button from '@/shared/ui/button/button';
import { NAV_ITEMS } from '@/shared/constants/nav-items';
import { activePath } from '@/shared/lib/active-path/active-path';
import urlState from '@/shared/lib/url-state/url-state';

interface MobileMenuProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

class MobileMenu extends BaseComponent<HTMLDivElement> {
  private links: NavLink[] = [];

  constructor({ onLoginClick, onSignUpClick }: MobileMenuProps) {
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

    const list = new BaseComponent<HTMLUListElement>({
      tag: 'ul',
      className: styles.list,
    });

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

    NAV_ITEMS.forEach((navItem) => {
      const link = new NavLink({
        href: navItem.href,
        text: navItem.text,
        className: styles.link,
      });

      const item = new BaseComponent<HTMLLIElement>(
        {
          tag: 'li',
          className: styles.item,
        },
        link
      );

      this.links.push(link);
      list.append(item);
    });

    closeButton.node.addEventListener('click', () => this.close());
    loginButton.onClick(onLoginClick);
    signUpButton.onClick(onSignUpClick);

    nav.node.addEventListener('click', () => this.close());

    urlState.onChange(() => this.showActiveLink());
    this.showActiveLink();

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }

  public open(): void {
    this.addClass(styles.open);
  }

  public close(): void {
    this.removeClass(styles.open);
  }

  private showActiveLink(): void {
    this.links.forEach((link, index) => {
      const isActive = activePath(NAV_ITEMS[index].path);

      link.node.classList.toggle(styles.linkActive, isActive);
    });
  }
}

export default MobileMenu;
