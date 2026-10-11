import BaseComponent from '@/shared/lib/base-component/base-component';
import Button from '@/shared/ui/button/button';
import styles from './header-actions-buttons.module.scss';

interface HeaderActionsButtonsProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

class HeaderActionsButtons extends BaseComponent<HTMLDivElement> {
  constructor({ onLoginClick, onSignUpClick }: HeaderActionsButtonsProps) {
    const loginButton = new Button({
      text: 'Log in',
      className: styles.loginButton,
      variant: 'additional',
    });

    const signUpButton = new Button({
      text: 'Sign up',
      className: styles.signButton,
      variant: 'primary',
    });

    super(
      {
        tag: 'div',
        className: styles.actionsButtons,
      },
      loginButton,
      signUpButton
    );

    loginButton.onClick(onLoginClick);
    signUpButton.onClick(onSignUpClick);
  }
}

export default HeaderActionsButtons;
