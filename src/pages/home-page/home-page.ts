import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './home-page.module.scss';
import HeroSection from '@/widgets/hero-section/hero-section';
import NewGamesSection from '@/widgets/new-games-section/new-games-section';
import LeaderboardTable from '@/widgets/leaderboard-table/leaderboard-table';
import MinigamesApi from '@/shared/api/minigames-api/minigames-api';

class HomePage extends BaseComponent {
  constructor() {
    const heroSection = new HeroSection();
    const newGamesSection = new NewGamesSection();
    const leaderboardTable = new LeaderboardTable();

    super(
      {
        tag: 'div',
        className: styles.wrapper,
      },
      heroSection,
      newGamesSection,
      leaderboardTable
    );

    void this.loadFirstImage();
  }

  private async loadFirstImage(): Promise<void> {
    try {
      const imageUrl = await new MinigamesApi().getFirstImageUrl();
      if (!imageUrl) return;

      const image = document.createElement('img');
      image.src = imageUrl;

      this.node.append(image);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public render(): HTMLElement {
    return this.node;
  }
}

export default HomePage;
