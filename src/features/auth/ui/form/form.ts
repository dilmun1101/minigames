import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './form.module.scss';
import Button from '@/shared/ui/button/button';
import Input from '@/shared/ui/input/input';
import Icon from '@/shared/ui/icon/icon';
import type { AuthFormProps } from '../../model/forms';

const FORGOT_TEXT = 'Forgot Password?';
const DIVIDER_TEXT = 'or';
const GOOGLE_ICON = 'account_circle';

interface AuthFormComponentProps {
  form: AuthFormProps;
  onSwitchClick: () => void;
}

class AuthForm extends BaseComponent<HTMLElement> {
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

    for (const field of form.fields) {
      fields.append(
        new Input({
          id: `${form.mode}-${field.name}`,
          name: field.name,
          label: field.label,
          type: field.type,
          placeholder: field.placeholder,
          icon: field.icon,
          autocomplete: field.autocomplete,
          revealable: field.revealable,
        })
      );
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

    this.node.addEventListener('submit', (event) => event.preventDefault());

    switchButton.node.addEventListener('click', () => onSwitchClick());
  }
}

export default AuthForm;
