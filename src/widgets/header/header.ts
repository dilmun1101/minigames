import BaseComponent from '../../shared/lib/base-component/base-component';
import Logo from '../../shared/ui/logo/logo';
import Navigation from '../navigation/navigation';
import HeaderActionsButtons from './ui/header-actions-buttons/header-actions-buttons';
import styles from './header.module.scss';

class Header extends BaseComponent<HTMLElement> {
  constructor() {
    const logo = new Logo();
    const navigation = new Navigation();
    const actions = new HeaderActionsButtons();

    const actionsContainer = new BaseComponent(
      {
        tag: 'div',
        className: styles.actionsContainer,
      },
      navigation,
      actions
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
