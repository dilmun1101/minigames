import BaseComponent from '../../shared/lib/base-component/base-component';
import NavLink from '../../shared/ui/nav-link/nav-link';
import styles from './navigation.module.scss';
import { activePath } from '@/shared/lib/active-path/active-path';
import urlState from '@/shared/lib/url-state/url-state';
import { NAV_ITEMS } from '@/shared/constants/nav-items';

class Navigation extends BaseComponent<HTMLElement> {
  private links: NavLink[] = [];

  constructor() {
    const list = new BaseComponent<HTMLUListElement>({
      tag: 'ul',
      className: styles.list,
    });

    super(
      {
        tag: 'nav',
        className: styles.navigation,
      },
      list
    );

    NAV_ITEMS.forEach((navItem) => {
      const link = new NavLink({
        href: navItem.href,
        text: navItem.text,
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

    urlState.onChange(() => this.showActiveLink());
    this.showActiveLink();
  }

  private showActiveLink(): void {
    this.links.forEach((link, index) => {
      const isActive = activePath(NAV_ITEMS[index].path);

      link.node.classList.toggle(styles.linkActive, isActive);
    });
  }
}

export default Navigation;
