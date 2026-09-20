import BaseComponent from '../../../../shared/lib/base-component/base-component';
import Button from '../../../../shared/ui/button/button';
import styles from './header-actions-buttons.module.scss';

class HeaderActionsButtons extends BaseComponent<HTMLDivElement> {
  constructor() {
    const loginButton = new Button({
      text: 'Log in',
      className: styles.loginButton,
    });

    const signUpButton = new Button({
      text: 'Sign up',
      className: styles.signButton,
    });

    super(
      {
        tag: 'div',
        className: styles.actionsButtons,
      },
      loginButton,
      signUpButton
    );
  }
}

export default HeaderActionsButtons;
