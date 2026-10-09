import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './modal.module.scss';

interface ModalProps {
  className?: string | string[];
}

class Modal extends BaseComponent<HTMLDialogElement> {
  protected readonly content: BaseComponent<HTMLDivElement>;
  private closeHandlers: (() => void)[] = [];

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

    this.node.addEventListener('close', () => {
      this.closeHandlers.forEach((handler) => handler());
    });
  }

  public isOpened(): boolean {
    return this.node.open;
  }

  public open(): void {
    if (!this.node.open) {
      this.node.showModal();
    }
  }

  public close(): void {
    if (this.node.open) {
      this.node.close();
    }
  }

  public onClose(handler: () => void): this {
    this.closeHandlers.push(handler);
    return this;
  }
}

export default Modal;
