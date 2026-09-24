import BaseComponent from '@/shared/lib/base-component/base-component';
import SectionTitle from '@/shared/ui/section-title/section-title';
import SliderButton from './ui/slider-button/slider-button';
import styles from './new-games-section.module.scss';
import GameCard from '../game-card/game-card';
import { NEW_GAMES } from '../game-card/model/games';

const SLIDE_CLASSES = [
  styles.slideSmall,
  styles.slideMedium,
  styles.slideLarge,
  styles.slideMedium,
  styles.slideSmall,
];

class NewGamesSection extends BaseComponent<HTMLElement> {
  constructor() {
    const title = new SectionTitle({
      text: 'New Games',
    });

    const prevButton = new SliderButton({
      iconName: 'arrow_back',
    });

    const nextButton = new SliderButton({
      iconName: 'arrow_forward',
      variant: 'primary',
    });

    const controls = new BaseComponent(
      {
        tag: 'div',
        className: styles.controls,
      },
      prevButton,
      nextButton
    );

    const header = new BaseComponent(
      {
        tag: 'div',
        className: styles.header,
      },
      title,
      controls
    );

    const slides = [];

    for (let i = 0; i < NEW_GAMES.length; i++) {
      const card = new GameCard({
        game: NEW_GAMES[i],
      });

      const slide = new BaseComponent(
        {
          tag: 'li',
          className: [styles.slide, SLIDE_CLASSES[i]],
        },
        card
      );

      slides.push(slide);
    }

    const track = new BaseComponent(
      {
        tag: 'ul',
        className: styles.track,
      },
      ...slides
    );

    super(
      {
        tag: 'section',
        className: styles.newGames,
      },
      header,
      track
    );
  }
}

export default NewGamesSection;
