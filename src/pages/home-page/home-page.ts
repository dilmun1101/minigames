import Header from '@/widgets/header/header';
import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './home-page.module.scss';

class HomePage extends BaseComponent {
  constructor() {
    const header = new Header();
    const text = new BaseComponent({
      tag: 'p',
      text: 'Could you please check my work on Wednesday? ༼ つ ◕_◕ ༽つ',
    });

    super(
      {
        tag: 'div',
        className: styles.wrapper,
      },
      header,
      text
    );
  }

  public render(): HTMLElement {
    return this.node;
  }
}

export default HomePage;
