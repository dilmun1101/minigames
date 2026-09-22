import Header from '@/widgets/header/header';
import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './home-page.module.scss';
import HeroSection from '@/widgets/hero-section/hero-section';
import NewGamesSection from '@/widgets/new-games-section/new-games-section';

class HomePage extends BaseComponent {
  constructor() {
    const header = new Header();
    const heroSection = new HeroSection();
    const newGamesSection = new NewGamesSection();

    super(
      {
        tag: 'div',
        className: styles.wrapper,
      },
      header,
      heroSection,
      newGamesSection
    );
  }

  public render(): HTMLElement {
    return this.node;
  }
}

export default HomePage;
