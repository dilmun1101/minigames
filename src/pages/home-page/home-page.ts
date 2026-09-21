import Header from '@/widgets/header/header';
import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './home-page.module.scss';
import HeroSection from '@/widgets/hero-section/hero-section';

class HomePage extends BaseComponent {
  constructor() {
    const header = new Header();
    const heroSection = new HeroSection();
    // const text = new BaseComponent({
    //   tag: 'p',
    //   text: 'Could you please check my work on Wednesday? ༼ つ ◕_◕ ༽つ',
    // });

    super(
      {
        tag: 'div',
        className: styles.wrapper,
      },
      header,
      heroSection
    );
  }

  public render(): HTMLElement {
    return this.node;
  }
}

export default HomePage;
