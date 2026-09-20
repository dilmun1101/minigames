import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './auth-dialog.module.scss';

class AuthDialog extends BaseComponent<HTMLDivElement> {
  constructor() {
    super({
      tag: 'div',
      className: styles.authDialog,
      text: 'Your ad could be here',
    });
  }

  public open(): void {
    this.addClass(styles.open);
  }

  public close(): void {
    this.removeClass(styles.open);
  }

  public toggle(): void {
    this.node.classList.toggle(styles.open);
  }
}

export default AuthDialog;
