import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './auth-dialog.module.scss';
import Modal from '@/shared/ui/modal/modal';
import AuthForm from '../form/form';
import { LOGIN_FORM, REGISTER_FORM, type AuthMode } from '../../model/forms';

const TABS: { mode: AuthMode; text: string }[] = [
  { mode: 'login', text: 'Login' },
  { mode: 'register', text: 'Register' },
];

const DEFAULT_MODE: AuthMode = 'login';

class AuthDialog extends Modal {
  private tabs: BaseComponent<HTMLButtonElement>[] = [];
  private loginForm: AuthForm;
  private registerForm: AuthForm;
  private mode: AuthMode = DEFAULT_MODE;

  constructor() {
    super({ className: styles.dialog });

    const tabSwitcher = new BaseComponent({
      tag: 'div',
      className: styles.tabs,
    });

    for (const tab of TABS) {
      const button = new BaseComponent<HTMLButtonElement>({
        tag: 'button',
        className: styles.tab,
        text: tab.text,
        attributes: {
          type: 'button',
        },
      });

      button.node.addEventListener('click', () => this.showMode(tab.mode));
      this.tabs.push(button);
      tabSwitcher.append(button);
    }

    this.loginForm = new AuthForm({
      form: LOGIN_FORM,
      onSwitchClick: () => this.showMode('register'),
    });

    this.registerForm = new AuthForm({
      form: REGISTER_FORM,
      onSwitchClick: () => this.showMode('login'),
    });

    this.content.append(tabSwitcher, this.loginForm, this.registerForm);
    this.showForms();
  }

  public open(mode: AuthMode = DEFAULT_MODE): void {
    this.showMode(mode);
    super.open();
  }

  private showMode(mode: AuthMode): void {
    this.mode = mode;
    this.showForms();
  }

  private showForms(): void {
    const isLogin = this.mode === DEFAULT_MODE;

    this.loginForm.node.classList.toggle(styles.hidden, !isLogin);
    this.registerForm.node.classList.toggle(styles.hidden, isLogin);

    this.tabs.forEach((tab, index) => {
      const isActive = TABS[index].mode === this.mode;

      tab.node.classList.toggle(styles.tabActive, isActive);
    });
  }
}

export default AuthDialog;
