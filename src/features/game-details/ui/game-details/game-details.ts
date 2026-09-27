import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './game-details.module.scss';

class GameDetails extends BaseComponent<HTMLDivElement> {
  constructor() {
    const text = new BaseComponent({
      tag: 'p',
      className: styles.text,
      text: `Game details`,
    });

    super(
      {
        tag: 'div',
        className: styles.container,
      },
      text
    );
  }
}

export default GameDetails;
