import BaseComponent from '@/shared/lib/base-component/base-component';
import PageTitle from '@/shared/ui/page-title/page-title';
import styles from './library-page.module.scss';
import FilterSortBar from '@/widgets/filter-sort-bar/filter-sort-bar';
import LibraryGames from '@/widgets/library-games/library-games';

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

    const filterSortBar = new FilterSortBar();
    const libraryGames = new LibraryGames();

    super(
      {
        tag: 'div',
        className: styles.wrapper,
      },
      pageTitle,
      filterSortBar,
      libraryGames
    );
  }

  public render(): HTMLElement {
    return this.node;
  }
}

export default LibraryPage;
