import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './library-game-card.module.scss';
import Button from '@/shared/ui/button/button';
import Icon from '@/shared/ui/icon/icon';
import { formatLikes } from '@/shared/lib/format-likes/format-likes';
import type { GameDto } from '@/shared/api/types/types';

const FREE_PRICE = 'Free';
const STAR_ICON = 'star';
const LIKE_ICON = 'favorite';
const DETAILS_TEXT = 'Details';

interface LibraryGameCardProps {
  game: GameDto;
  className?: string | string[];
  onDetails: () => void;
}

class LibraryGameCard extends BaseComponent<HTMLElement> {
  constructor({ game, className = [], onDetails }: LibraryGameCardProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    const image = new BaseComponent({
      tag: 'img',
      className: styles.image,
      attributes: {
        src: game.cardImage,
        alt: game.name,
      },
    });

    const title = new BaseComponent({
      tag: 'h3',
      className: styles.title,
      text: game.name,
    });

    const genre = new BaseComponent({
      tag: 'span',
      className: styles.genre,
      text: game.category,
    });

    const titleInfo = new BaseComponent(
      {
        tag: 'div',
        className: styles.titleInfo,
      },
      title,
      genre
    );

    const priceClasses = [styles.price];

    if (game.price === FREE_PRICE) {
      priceClasses.push(styles.priceFree);
    }

    const price = new BaseComponent({
      tag: 'span',
      className: priceClasses,
      text: game.price,
    });

    const description = new BaseComponent({
      tag: 'p',
      className: styles.description,
      text: game.shortDescription,
    });

    const rating = new BaseComponent(
      {
        tag: 'span',
        className: styles.stat,
      },
      new Icon({ name: STAR_ICON, className: styles.star }),
      new BaseComponent({ tag: 'span', text: String(game.rating) })
    );

    const likes = new BaseComponent(
      {
        tag: 'span',
        className: styles.stat,
      },
      new Icon({ name: LIKE_ICON, className: styles.heart }),
      new BaseComponent({ tag: 'span', text: formatLikes(game.likesCount) })
    );

    const stats = new BaseComponent(
      {
        tag: 'div',
        className: styles.stats,
      },
      rating,
      likes
    );

    const detailsButton = new Button({
      text: DETAILS_TEXT,
      className: styles.details,
      variant: 'primary',
    });

    const content = new BaseComponent(
      {
        tag: 'div',
        className: styles.content,
      },
      titleInfo,
      price,
      description,
      stats,
      detailsButton
    );

    super(
      {
        tag: 'div',
        className: [styles.card, ...additionalClasses],
      },
      image,
      content
    );

    detailsButton.onClick(() => onDetails());
  }
}

export default LibraryGameCard;
