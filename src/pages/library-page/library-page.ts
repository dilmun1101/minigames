import BaseComponent from '@/shared/lib/base-component/base-component';
import PageTitle from '@/shared/ui/page-title/page-title';
import styles from './library-page.module.scss';
import FilterSortBar from '@/widgets/filter-sort-bar/filter-sort-bar';
import LibraryGames from '@/widgets/library-games/library-games';
import urlState from '@/shared/lib/url-state/url-state';
import { URL_PARAMS } from '@/shared/constants/url-params';
import {
  DEFAULT_CATEGORY,
  DEFAULT_SORT,
} from '@/widgets/filter-sort-bar/model/filters';

const PAGE = {
  TITLE: 'Game Library',
  DESCRIPTION: 'Browse our collection of casual mini-games',
};

class LibraryPage extends BaseComponent {
  private filterSortBar: FilterSortBar;
  private libraryGames: LibraryGames;

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

    this.filterSortBar = filterSortBar;
    this.libraryGames = libraryGames;
  }

  public update(): void {
    const category = urlState.getParam(URL_PARAMS.CATEGORY);

    this.filterSortBar.showCategory(category);
    this.libraryGames.showFilters({
      category: category || DEFAULT_CATEGORY,
      sort: DEFAULT_SORT,
    });
  }

  public render(): HTMLElement {
    return this.node;
  }
}

export default LibraryPage;
