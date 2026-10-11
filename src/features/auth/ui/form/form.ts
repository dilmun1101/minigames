import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './form.module.scss';
import Button from '@/shared/ui/button/button';
import Input from '@/shared/ui/input/input';
import Icon from '@/shared/ui/icon/icon';
import type { AuthFormProps } from '../../model/forms';
import type { ValidationRule } from '../../model/validation';
import { getFieldError, NO_ERROR } from '../../model/validation';

const FORGOT_TEXT = 'Forgot Password?';
const DIVIDER_TEXT = 'or';
const GOOGLE_ICON = 'account_circle';

interface AuthFormComponentProps {
  form: AuthFormProps;
  onSwitchClick: () => void;
}

interface FieldEntry {
  id: string;
  rule: ValidationRule;
  input: Input;
}

class AuthForm extends BaseComponent<HTMLElement> {
  private entries: FieldEntry[];
  private submitButton: Button;
  private touchedIds = new Set<string>();

  constructor({ form, onSwitchClick }: AuthFormComponentProps) {
    const title = new BaseComponent({
      tag: 'h2',
      className: styles.title,
      text: form.title,
    });

    const description = new BaseComponent({
      tag: 'p',
      className: styles.description,
      text: form.description,
    });

    const header = new BaseComponent(
      {
        tag: 'div',
        className: styles.header,
      },
      title,
      description
    );

    const fields = new BaseComponent({
      tag: 'div',
      className: styles.fields,
    });

    const entries: FieldEntry[] = [];

    for (const field of form.fields) {
      const id = `${form.mode}-${field.name}`;

      const input = new Input({
        id,
        name: field.name,
        label: field.label,
        type: field.type,
        placeholder: field.placeholder,
        icon: field.icon,
        autocomplete: field.autocomplete,
        revealable: field.revealable,
      });

      entries.push({ id, rule: field.rule, input });
      fields.append(input);
    }

    if (form.hasForgotLink) {
      const forgotLink = new BaseComponent({
        tag: 'a',
        className: styles.forgotLink,
        text: FORGOT_TEXT,
        attributes: {
          href: '#',
        },
      });

      fields.append(
        new BaseComponent(
          {
            tag: 'div',
            className: styles.links,
          },
          forgotLink
        )
      );
    }

    const submitButton = new Button({
      text: form.submitText,
      type: 'submit',
      className: styles.submit,
      variant: 'primary',
    });

    const divider = new BaseComponent(
      {
        tag: 'div',
        className: styles.divider,
      },
      new BaseComponent({
        tag: 'span',
        className: styles.dividerText,
        text: DIVIDER_TEXT,
      })
    );

    const googleButton = new Button({
      text: form.googleText,
      className: styles.google,
      variant: 'additional',
    });

    googleButton.node.prepend(new Icon({ name: GOOGLE_ICON }).node);

    const actions = new BaseComponent(
      {
        tag: 'div',
        className: styles.actions,
      },
      submitButton,
      divider,
      googleButton
    );

    const footerText = new BaseComponent({
      tag: 'span',
      text: form.footerText,
    });

    const switchButton = new BaseComponent<HTMLButtonElement>({
      tag: 'button',
      className: styles.switchLink,
      text: form.footerLinkText,
      attributes: {
        type: 'button',
      },
    });

    const footer = new BaseComponent(
      {
        tag: 'p',
        className: styles.footer,
      },
      footerText,
      switchButton
    );

    super(
      {
        tag: 'form',
        className: styles.form,
        attributes: {
          name: form.mode,
          novalidate: '',
        },
      },
      header,
      fields,
      actions,
      footer
    );

    this.entries = entries;
    this.submitButton = submitButton;

    this.node.addEventListener('submit', (event) => event.preventDefault());

    this.node.addEventListener('input', (event) => this.onFieldEvent(event));
    this.node.addEventListener('focusout', (event) => this.onFieldEvent(event));

    switchButton.node.addEventListener('click', () => onSwitchClick());

    this.showSubmitState();
  }

  public setHidden(isHidden: boolean): void {
    this.node.classList.toggle(styles.hidden, isHidden);
  }

  private onFieldEvent(event: Event): void {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const entry = this.entries.find((item) => item.id === target.id);

    if (!entry) {
      return;
    }

    this.touchedIds.add(entry.id);
    this.showFieldError(entry);

    if (entry.rule === 'password') {
      this.showConfirmError();
    }

    this.showSubmitState();
  }

  private showFieldError(entry: FieldEntry): void {
    if (!this.touchedIds.has(entry.id)) {
      entry.input.clearError();
      return;
    }

    entry.input.setError(this.getError(entry));
  }

  private showConfirmError(): void {
    const confirmEntry = this.entries.find(
      (item) => item.rule === 'confirmPassword'
    );

    if (!confirmEntry) {
      return;
    }

    this.showFieldError(confirmEntry);
  }

  private showSubmitState(): void {
    this.submitButton.setDisabled(!this.isValid());
  }

  private isValid(): boolean {
    return this.entries.every((entry) => this.getError(entry) === NO_ERROR);
  }

  private getError(entry: FieldEntry): string {
    return getFieldError(
      entry.rule,
      entry.input.getValue(),
      this.getPassword()
    );
  }

  private getPassword(): string {
    const passwordEntry = this.entries.find((item) => item.rule === 'password');

    if (!passwordEntry) {
      return NO_ERROR;
    }

    return passwordEntry.input.getValue();
  }
}

export default AuthForm;
