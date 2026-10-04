import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './not-found-page.module.scss';
import PageTitle from '@/shared/ui/page-title/page-title';
import Button from '@/shared/ui/button/button';
import urlState from '@/shared/lib/url-state/url-state';
import { ROUTES } from '@/shared/constants/routes';

const PAGE = {
  TITLE: '404',
  DESCRIPTION: 'This page does not exist. Check the address and try again.',
  BUTTON: 'Return to Home Page',
};

class NotFoundPage extends BaseComponent {
  constructor() {
    const pageTitle = new PageTitle({
      title: PAGE.TITLE,
      description: PAGE.DESCRIPTION,
      className: styles.title,
    });

    const homeButton = new Button({
      text: PAGE.BUTTON,
      variant: 'primary',
    });

    super(
      {
        tag: 'div',
        className: styles.notFound,
      },
      pageTitle,
      homeButton
    );

    homeButton.onClick(() => urlState.goTo(ROUTES.HOME));
  }

  public render(): HTMLElement {
    return this.node;
  }
}

export default NotFoundPage;
