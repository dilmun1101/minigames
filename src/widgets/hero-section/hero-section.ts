import BaseComponent from '../../shared/lib/base-component/base-component';
import Card from './ui/card/card';
import styles from './hero-section.module.scss';

class HeroSection extends BaseComponent<HTMLElement> {
  constructor() {
    const card = new Card();

    super(
      {
        tag: 'section',
        className: styles.hero,
      },
      card
    );
  }
}

export default HeroSection;
