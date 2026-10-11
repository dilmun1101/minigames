import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './modal.module.scss';

interface ModalProps {
  className?: string | string[];
}

class Modal extends BaseComponent<HTMLDialogElement> {
  protected readonly content: BaseComponent<HTMLDivElement>;
  private closeHandlers: (() => void)[] = [];
  private isClosing = false;

  constructor({ className = [] }: ModalProps = {}) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    const content = new BaseComponent<HTMLDivElement>({
      tag: 'div',
      className: [styles.content, ...additionalClasses],
    });

    super(
      {
        tag: 'dialog',
        className: styles.modal,
      },
      content
    );

    this.content = content;

    this.node.addEventListener('click', (event) => {
      if (event.target === this.node) {
        this.close();
      }
    });

    this.node.addEventListener('cancel', (event) => {
      event.preventDefault();
      this.close();
    });

    this.node.addEventListener('close', () => {
      this.closeHandlers.forEach((handler) => handler());
    });
  }

  public isOpened(): boolean {
    return this.node.open;
  }

  public open(): void {
    if (this.node.open || this.isClosing) {
      return;
    }

    this.node.showModal();
  }

  public close(): void {
    if (!this.node.open || this.isClosing) {
      return;
    }

    this.isClosing = true;
    this.addClass(styles.closing);

    const animations = this.node.getAnimations();

    void Promise.allSettled(
      animations.map((animation) => animation.finished)
    ).then(() => {
      this.node.close();
      this.removeClass(styles.closing);
      this.isClosing = false;
    });
  }

  public onClose(handler: () => void): this {
    this.closeHandlers.push(handler);
    return this;
  }
}

export default Modal;
