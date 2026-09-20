import BaseComponent from '../../lib/base-component/base-component';
import styles from './button.module.scss';

type ButtonProps = {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string | string[];
  disabled?: boolean;
};

class Button extends BaseComponent<HTMLButtonElement> {
  constructor({
    text,
    type = 'button',
    className = [],
    disabled = false,
  }: ButtonProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    super({
      tag: 'button',
      text,
      className: [styles.button, ...additionalClasses],
      attributes: {
        type,
      },
    });

    this.node.disabled = disabled;
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

export default Button;
