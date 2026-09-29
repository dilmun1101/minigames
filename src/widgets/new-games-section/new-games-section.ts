import BaseComponent from '@/shared/lib/base-component/base-component';
import SectionTitle from '@/shared/ui/section-title/section-title';
import SliderButton from './ui/slider-button/slider-button';
import styles from './new-games-section.module.scss';
import GameCard from '../game-card/game-card';
import MinigamesApi from '@/shared/api/minigames-api/minigames-api';
import type { GameDto } from '@/shared/api/types/types';

const SLIDE_CLASSES = [
  styles.slideSmall,
  styles.slideMedium,
  styles.slideLarge,
  styles.slideMedium,
  styles.slideSmall,
];

const ERROR_MESSAGE = 'Failed to load games';

class NewGamesSection extends BaseComponent<HTMLElement> {
  private api = new MinigamesApi();
  private track: BaseComponent;

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

    const track = new BaseComponent({
      tag: 'ul',
      className: styles.track,
    });

    super(
      {
        tag: 'section',
        className: styles.newGames,
      },
      header,
      track
    );

    this.track = track;
    this.loadGames();
  }

  private async loadGames(): Promise<void> {
    try {
      const games = await this.api.getGames();
      const featuredGames = games.filter((game) => game.featured);

      this.showSlides(featuredGames);
    } catch {
      const message = new BaseComponent({
        tag: 'li',
        className: styles.message,
        text: ERROR_MESSAGE,
      });

      this.track.append(message);
    }
  }

  private showSlides(games: GameDto[]): void {
    for (let i = 0; i < games.length; i++) {
      const card = new GameCard({ game: games[i] });

      const slide = new BaseComponent(
        {
          tag: 'li',
          className: [styles.slide, SLIDE_CLASSES[i]],
        },
        card
      );

      this.track.append(slide);
    }
  }
}

export default NewGamesSection;
