import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './auth-dialog.module.scss';
import Modal from '@/shared/ui/modal/modal';
import AuthForm from '../form/form';
import { LOGIN_FORM, REGISTER_FORM, type AuthMode } from '../../model/forms';
import urlState from '@/shared/lib/url-state/url-state';
import { URL_PARAMS } from '@/shared/constants/url-params';

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

      button.node.addEventListener('click', () => this.changeMode(tab.mode));
      this.tabs.push(button);
      tabSwitcher.append(button);
    }

    this.loginForm = new AuthForm({
      form: LOGIN_FORM,
      onSwitchClick: () => this.changeMode('register'),
    });

    this.registerForm = new AuthForm({
      form: REGISTER_FORM,
      onSwitchClick: () => this.changeMode('login'),
    });

    this.content.append(tabSwitcher, this.loginForm, this.registerForm);
    this.showForms();
    this.onClose(() => this.clearUrl());

    urlState.onChange(() => this.showFromUrl());
  }

  public open(mode: AuthMode = DEFAULT_MODE): void {
    this.changeMode(mode);
  }

  private changeMode(mode: AuthMode): void {
    urlState.setParams({ [URL_PARAMS.AUTH]: mode });
  }

  private clearUrl(): void {
    if (!this.getUrlMode()) {
      return;
    }

    urlState.replaceParams({ [URL_PARAMS.AUTH]: null });
  }

  private showFromUrl(): void {
    const mode = this.getUrlMode();

    if (!mode) {
      this.close();
      return;
    }

    this.showMode(mode);
    super.open();
  }

  private getUrlMode(): AuthMode | null {
    const value = urlState.getParam(URL_PARAMS.AUTH);
    const tab = TABS.find((item) => item.mode === value);

    if (!tab) {
      return null;
    }

    return tab.mode;
  }

  private showMode(mode: AuthMode): void {
    this.mode = mode;
    this.showForms();
  }

  private showForms(): void {
    const isLogin = this.mode === DEFAULT_MODE;

    this.loginForm.setHidden(!isLogin);
    this.registerForm.setHidden(isLogin);

    this.tabs.forEach((tab, index) => {
      const isActive = TABS[index].mode === this.mode;

      tab.node.classList.toggle(styles.tabActive, isActive);
    });
  }
}

export default AuthDialog;
