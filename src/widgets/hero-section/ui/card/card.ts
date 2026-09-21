import BaseComponent from '@/shared/lib/base-component/base-component';
import Button from '@/shared/ui/button/button';
import styles from './card.module.scss';

const CARD = {
  TITLE: 'Take a Short Break & Have Fun',
  DESCRIPTION:
    'Discover hundreds of curated casual mini-games. Play instantly in your browser — puzzle, match 3, farm, and board classics.',
  SHORT_DESCRIPTION:
    'Discover hundreds of curated casual mini-games right in your browser.',
};

class Card extends BaseComponent<HTMLElement> {
  constructor() {
    const title = new BaseComponent({
      tag: 'h1',
      className: styles.title,
      text: CARD.TITLE,
    });

    const description = new BaseComponent({
      tag: 'p',
      className: styles.description,
      text: CARD.DESCRIPTION,
    });

    const shortDescription = new BaseComponent({
      tag: 'p',
      className: styles.shortDescription,
      text: CARD.SHORT_DESCRIPTION,
    });

    const button = new Button({
      text: 'Browse library',
      className: styles.button,
      variant: 'primary',
    });

    super(
      {
        tag: 'div',
        className: styles.card,
      },
      title,
      description,
      shortDescription,
      button
    );
  }
}

export default Card;
