import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './game-details.module.scss';
import Button from '@/shared/ui/button/button';

const CLOSE_TEXT = 'Close';

class GameDetails extends BaseComponent<HTMLDialogElement> {
  constructor() {
    const text = new BaseComponent({
      tag: 'p',
      className: styles.text,
      text: `Game details`,
    });

    const closeButton = new Button({
      text: CLOSE_TEXT,
      variant: 'additional',
    });

    super(
      {
        tag: 'dialog',
        className: styles.container,
      },
      text,
      closeButton
    );

    closeButton.onClick(() => this.close());
  }

  public open(): void {
    this.node.showModal();
  }

  public close(): void {
    this.node.close();
  }
}

export default GameDetails;
