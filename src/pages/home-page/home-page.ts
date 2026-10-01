import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './home-page.module.scss';
import HeroSection from '@/widgets/hero-section/hero-section';
import NewGamesSection from '@/widgets/new-games-section/new-games-section';
import LeaderboardTable from '@/widgets/leaderboard-table/leaderboard-table';

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
  }

  public render(): HTMLElement {
    return this.node;
  }
}

export default HomePage;
