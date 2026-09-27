import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './library-pagination.module.scss';
import PaginationButton from './ui/pagination-button/pagination-button';

class LibraryPagination extends BaseComponent<HTMLElement> {
  constructor() {
    const prevButton = new PaginationButton({
      iconName: 'chevron_backward',
    });

    const nextButton = new PaginationButton({
      iconName: 'chevron_forward',
    });

    const pages = new BaseComponent({
      tag: 'ul',
      className: styles.pages,
    });

    for (const page of [1, 2, 3, 4]) {
      const button = new PaginationButton({
        text: String(page),
        isActive: page === 1,
      });

      const item = new BaseComponent({ tag: 'li' }, button);
      pages.append(item);
    }

    super(
      {
        tag: 'nav',
        className: styles.pagination,
      },
      prevButton,
      pages,
      nextButton
    );

    prevButton.setDisabled(true);
  }
}

export default LibraryPagination;
