import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './input.module.scss';
import Icon from '../icon/icon';

const SHOW_ICON = 'visibility';
const HIDE_ICON = 'visibility_off';

type InputType = 'text' | 'email' | 'password';

interface InputProps {
  id: string;
  label: string;
  name: string;
  type?: InputType;
  placeholder?: string;
  icon?: string;
  autocomplete?: string;
  revealable?: boolean;
  className?: string | string[];
}

class Input extends BaseComponent<HTMLDivElement> {
  private field: BaseComponent<HTMLInputElement>;
  private control: BaseComponent<HTMLDivElement>;
  private errorText: BaseComponent<HTMLParagraphElement>;

  constructor({
    id,
    label,
    name,
    type = 'text',
    placeholder = '',
    icon,
    autocomplete = 'off',
    revealable = false,
    className = [],
  }: InputProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    const labelElement = new BaseComponent<HTMLLabelElement>({
      tag: 'label',
      className: styles.label,
      text: label,
      attributes: {
        for: id,
      },
    });

    const field = new BaseComponent<HTMLInputElement>({
      tag: 'input',
      className: styles.field,
      attributes: {
        id,
        name,
        type,
        placeholder,
        autocomplete,
      },
    });

    const control = new BaseComponent<HTMLDivElement>({
      tag: 'div',
      className: styles.control,
    });

    if (icon) {
      control.append(new Icon({ name: icon, className: styles.icon }));
    }

    control.append(field);

    const errorText = new BaseComponent<HTMLParagraphElement>({
      tag: 'p',
      className: styles.error,
    });

    super(
      {
        tag: 'div',
        className: [styles.input, ...additionalClasses],
      },
      labelElement,
      control,
      errorText
    );

    this.field = field;
    this.control = control;
    this.errorText = errorText;

    if (revealable && type === 'password') {
      this.addShowButton();
    }
  }

  public getValue(): string {
    return this.field.node.value;
  }

  public setValue(value: string): this {
    this.field.node.value = value;
    return this;
  }

  public setError(message: string): this {
    if (!message) {
      return this.clearError();
    }

    this.addClass(styles.invalid);
    this.errorText.addText(message);
    return this;
  }

  public clearError(): this {
    this.removeClass(styles.invalid);
    this.errorText.addText('');
    return this;
  }

  public hasError(): boolean {
    return this.node.classList.contains(styles.invalid);
  }

  public reset(): void {
    this.setValue('');
    this.clearError();
  }

  public onInput(handler: (value: string) => void): this {
    this.field.node.addEventListener('input', () => handler(this.getValue()));
    return this;
  }

  private addShowButton(): void {
    const toggleIcon = new Icon({ name: SHOW_ICON });

    const toggleButton = new BaseComponent<HTMLButtonElement>(
      {
        tag: 'button',
        className: styles.eyeButton,
        attributes: {
          type: 'button',
        },
      },
      toggleIcon
    );

    this.control.append(toggleButton);

    toggleButton.node.addEventListener('click', () => {
      const isHidden = this.field.node.type === 'password';

      this.field.node.type = isHidden ? 'text' : 'password';
      toggleIcon.addText(isHidden ? HIDE_ICON : SHOW_ICON);
    });
  }
}

export default Input;
