import BaseComponent from '@/shared/lib/base-component/base-component';
import PageTitle from '@/shared/ui/page-title/page-title';
import styles from './library-page.module.scss';

const PAGE = {
  TITLE: 'Game Library',
  DESCRIPTION: 'Browse our collection of casual mini-games',
};

class LibraryPage extends BaseComponent {
  constructor() {
    const pageTitle = new PageTitle({
      title: PAGE.TITLE,
      description: PAGE.DESCRIPTION,
    });

    super(
      {
        tag: 'div',
        className: styles.wrapper,
      },
      pageTitle
    );
  }

  public render(): HTMLElement {
    return this.node;
  }
}

export default LibraryPage;
