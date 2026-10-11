import BaseComponent from '../../shared/lib/base-component/base-component';
import Logo from '../../shared/ui/logo/logo';
import Navigation from '../navigation/navigation';
import HeaderActionsButtons from './ui/header-actions-buttons/header-actions-buttons';
import styles from './header.module.scss';
import BurgerButton from './ui/burger-menu-button/burger-menu-button';
import AuthDialog from '@/features/auth/ui/auth-dialog/auth-dialog';
import MobileMenu from '../mobile-menu/mobile-menu';
import type { AuthMode } from '@/features/auth/model/forms';

class Header extends BaseComponent<HTMLElement> {
  constructor() {
    const logo = new Logo();
    const navigation = new Navigation();
    const authDialog = new AuthDialog();
    const actions = new HeaderActionsButtons({
      onLoginClick: () => authDialog.open('login'),
      onSignUpClick: () => authDialog.open('register'),
    });
    const burgerButton = new BurgerButton({
      onClick: () => mobileMenu.open(),
    });
    const openAuthDialog = (mode: AuthMode): void => {
      mobileMenu.close();
      authDialog.open(mode);
    };
    const mobileMenu = new MobileMenu({
      onLoginClick: () => openAuthDialog('login'),
      onSignUpClick: () => openAuthDialog('register'),
    });

    const actionsContainer = new BaseComponent(
      {
        tag: 'div',
        className: styles.actionsContainer,
      },
      navigation,
      actions,
      burgerButton
    );

    const container = new BaseComponent(
      {
        tag: 'div',
        className: styles.container,
      },
      logo,
      actionsContainer
    );

    super(
      {
        tag: 'header',
        className: styles.header,
      },
      container,
      authDialog,
      mobileMenu
    );
  }
}

export default Header;
