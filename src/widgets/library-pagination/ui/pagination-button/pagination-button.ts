import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './pagination-button.module.scss';
import Icon from '@/shared/ui/icon/icon';

interface PaginationButtonProps {
  text?: string;
  iconName?: string;
  isActive?: boolean;
  className?: string | string[];
}

class PaginationButton extends BaseComponent<HTMLButtonElement> {
  constructor({
    text = '',
    iconName = '',
    isActive = false,
    className = [],
  }: PaginationButtonProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    const buttonClasses = [styles.button, ...additionalClasses];

    if (isActive) {
      buttonClasses.push(styles.active);
    }

    const icons = iconName ? [new Icon({ name: iconName })] : [];

    super(
      {
        tag: 'button',
        text,
        className: buttonClasses,
        attributes: {
          type: 'button',
        },
      },
      ...icons
    );
  }

  public setDisabled(disabled: boolean): this {
    this.node.disabled = disabled;
    return this;
  }

  public onClick(handler: (event: MouseEvent) => void): this {
    this.node.addEventListener('click', handler);
    return this;
  }
}

export default PaginationButton;
