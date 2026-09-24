import BaseComponent from '../../lib/base-component/base-component';
import styles from './nav-link.module.scss';

type NavLinkProps = {
  href: string;
  text: string;
  className?: string | string[];
};

class NavLink extends BaseComponent<HTMLAnchorElement> {
  constructor({ href, text, className = [] }: NavLinkProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    super({
      tag: 'a',
      text,
      className: [styles.navLink, ...additionalClasses],
      attributes: {
        href,
      },
    });
  }
}

export default NavLink;
