import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './close-button.module.scss';

const LINES_COUNT = 2;

class CloseButton extends BaseComponent {
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
        className: styles.closeButton,
        attributes: {
          type: 'button',
        },
      },
      ...lines
    );
  }
}

export default CloseButton;
