import BaseComponent from '@/shared/lib/base-component/base-component';
import Icon from '@/shared/ui/icon/icon';
import type { Game } from './model/games';
import styles from './game-card.module.scss';
import { formatLikes } from '@/shared/lib/format-likes/format-likes';

interface GameCardProps {
  game: Game;
  className?: string | string[];
}

class GameCard extends BaseComponent<HTMLElement> {
  constructor({ game, className = [] }: GameCardProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    const image = new BaseComponent<HTMLImageElement>({
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

    const starIcon = new Icon({
      name: 'star',
      className: styles.star,
    });

    const ratingText = new BaseComponent({
      tag: 'span',
      text: String(game.rating),
    });

    const rating = new BaseComponent(
      {
        tag: 'div',
        className: styles.stat,
      },
      starIcon,
      ratingText
    );

    const heartIcon = new Icon({
      name: 'favorite',
      className: styles.heart,
    });

    const likesText = new BaseComponent({
      tag: 'span',
      text: formatLikes(game.likesCount),
    });

    const likes = new BaseComponent(
      {
        tag: 'div',
        className: styles.stat,
      },
      heartIcon,
      likesText
    );

    const stats = new BaseComponent(
      {
        tag: 'div',
        className: styles.stats,
      },
      rating,
      likes
    );

    const overlay = new BaseComponent(
      {
        tag: 'div',
        className: styles.overlay,
      },
      title,
      stats
    );

    const frame = new BaseComponent(
      {
        tag: 'div',
        className: styles.frame,
      },
      image,
      overlay
    );

    super(
      {
        tag: 'div',
        className: [styles.card, ...additionalClasses],
      },
      frame
    );
  }
}

export default GameCard;
