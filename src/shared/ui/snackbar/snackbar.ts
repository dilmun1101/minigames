import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './snackbar.module.scss';
import Icon from '../icon/icon';

const HIDE_DELAY = 4000;
const CLOSE_ICON = 'close';

type SnackbarVariant = 'success' | 'error';

class Snackbar {
  private container: BaseComponent | null = null;

  public showSuccess(text: string): void {
    this.show(text, 'success');
  }

  public showError(text: string): void {
    this.show(text, 'error');
  }

  private show(text: string, variant: SnackbarVariant): void {
    const variantClass: Record<SnackbarVariant, string> = {
      success: styles.success,
      error: styles.error,
    };

    const message = new BaseComponent({
      tag: 'p',
      className: styles.text,
      text,
    });

    const closeButton = new BaseComponent<HTMLButtonElement>(
      {
        tag: 'button',
        className: styles.close,
        attributes: {
          type: 'button',
        },
      },
      new Icon({ name: CLOSE_ICON })
    );

    const item = new BaseComponent(
      {
        tag: 'div',
        className: [styles.snackbar, variantClass[variant]],
      },
      message,
      closeButton
    );

    this.getContainer().append(item);

    const timerId = window.setTimeout(() => item.destroy(), HIDE_DELAY);

    closeButton.node.addEventListener('click', () => {
      window.clearTimeout(timerId);
      item.destroy();
    });
  }

  private getContainer(): BaseComponent {
    if (this.container) {
      return this.container;
    }

    const container = new BaseComponent({
      tag: 'div',
      className: styles.container,
    });

    document.body.append(container.node);
    this.container = container;

    return container;
  }
}

const snackbar = new Snackbar();

export default snackbar;
