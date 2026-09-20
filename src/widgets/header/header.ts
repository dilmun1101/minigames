import BaseComponent from '../../shared/lib/base-component/base-component';
import Logo from '../../shared/ui/logo/logo';
import Navigation from '../navigation/navigation';
import HeaderActionsButtons from './ui/header-actions-buttons/header-actions-buttons';
import styles from './header.module.scss';
import BurgerButton from './ui/burger-menu-button/burger-menu-button';

class Header extends BaseComponent<HTMLElement> {
  constructor() {
    const logo = new Logo();
    const navigation = new Navigation();
    const actions = new HeaderActionsButtons();
    const burgerButton = new BurgerButton();

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
      container
    );
  }
}

export default Header;
