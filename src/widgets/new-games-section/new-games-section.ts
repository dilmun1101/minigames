import BaseComponent from '@/shared/lib/base-component/base-component';
import SectionTitle from '@/shared/ui/section-title/section-title';
import SliderButton from './ui/slider-button/slider-button';
import styles from './new-games-section.module.scss';
import GameCard from '../game-card/game-card';
import MinigamesApi from '@/shared/api/minigames-api/minigames-api';
import type { GameDto } from '@/shared/api/types/types';
import { getSlideOffset } from './model/getSlideOffset';
import { getLoopedIndex } from './model/getLoopedIndex';
import GameDetails from '@/features/game-details/ui/game-details/game-details';

const ERROR_MESSAGE = 'Failed to load games';
const AUTOPLAY_DELAY = 4000;

class NewGamesSection extends BaseComponent<HTMLElement> {
  private api = new MinigamesApi();
  private track: BaseComponent;
  private slides: BaseComponent[] = [];
  private center = 0;
  private gameDetails: GameDetails;
  private timerId: number | null = null;

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

    const gameDetails = new GameDetails();

    super(
      {
        tag: 'section',
        className: styles.newGames,
      },
      header,
      track,
      gameDetails
    );

    this.track = track;
    prevButton.node.addEventListener('click', () => this.moveBy(-1));
    nextButton.node.addEventListener('click', () => this.moveBy(1));

    this.gameDetails = gameDetails;
    this.track.node.addEventListener('click', (e) => this.onClick(e));

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
          className: styles.slide,
        },
        card
      );

      this.slides.push(slide);
      this.track.append(slide);
    }

    this.showSizes();
    this.runTimer();
  }

  private showSizes(): void {
    const total = this.slides.length;

    for (let i = 0; i < total; i++) {
      const slide = this.slides[i];
      const offset = getSlideOffset({
        index: i,
        center: this.center,
        total,
      });
      const distance = Math.abs(offset);

      slide.node.style.order = String(offset + total);

      slide.removeClass(styles.slideLarge);
      slide.removeClass(styles.slideMedium);
      slide.removeClass(styles.slideSmall);
      slide.removeClass(styles.slideHidden);

      if (distance === 0) {
        slide.addClass(styles.slideLarge);
      } else if (distance === 1) {
        slide.addClass(styles.slideMedium);
      } else if (distance === 2) {
        slide.addClass(styles.slideSmall);
      } else {
        slide.addClass(styles.slideHidden);
      }
    }
  }

  private moveBy(step: number): void {
    const total = this.slides.length;

    if (total === 0) return;

    this.center = getLoopedIndex({
      index: this.center + step,
      total,
    });

    this.showSizes();
    this.runTimer();
  }

  private onClick(e: MouseEvent): void {
    const target = e.target;

    if (!(target instanceof Element)) return;

    const slide = target.closest(`.${styles.slide}`);

    if (!slide) return;

    this.gameDetails.open();
  }

  private runTimer(): void {
    this.stopTimer();

    this.timerId = window.setTimeout(() => {
      this.timerId = null;
      this.moveBy(1);
    }, AUTOPLAY_DELAY);
  }

  private stopTimer(): void {
    if (this.timerId === null) return;

    window.clearTimeout(this.timerId);
    this.timerId = null;
  }
}

export default NewGamesSection;
