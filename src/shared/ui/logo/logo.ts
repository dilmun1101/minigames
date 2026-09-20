import BaseComponent from '../../lib/base-component/base-component';
import { ROUTES } from '../../constants/routes';
import styles from './logo.module.scss';

class Logo extends BaseComponent<HTMLAnchorElement> {
  constructor() {
    const image = new BaseComponent<HTMLImageElement>({
      tag: 'img',
      className: styles.image,
      attributes: {
        src: '/logo.png',
        alt: 'MiniGames logo',
      },
    });

    super(
      {
        tag: 'a',
        className: styles.logo,
        attributes: {
          href: ROUTES.HOME,
        },
      },
      image
    );
  }
}

export default Logo;
