import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './burger-menu-button.module.scss';

const LINES_COUNT = 3;

interface BurgerButtonProps {
  onClick: () => void;
}

class BurgerButton extends BaseComponent {
  constructor({ onClick }: BurgerButtonProps) {
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

    this.node.addEventListener('click', onClick);
  }
}

export default BurgerButton;
