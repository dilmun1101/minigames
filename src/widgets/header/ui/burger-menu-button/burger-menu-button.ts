import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './burger-menu-button.module.scss';

const LINES_COUNT = 3;

class BurgerButton extends BaseComponent {
  constructor() {
    const lines = [];

    for (let i = 0; i < LINES_COUNT; i++) {
      const line = new BaseComponent({
        tag: 'span',
        className: styles.line,
      });
      lines.push(line);
    }

    super(
      {
        tag: 'button',
        className: styles.burgerButton,
        attributes: {
          type: 'button',
        },
      },
      ...lines
    );
  }
}

export default BurgerButton;
