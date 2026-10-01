import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './library-pagination.module.scss';
import PaginationButton from './ui/pagination-button/pagination-button';

const FIRST_PAGE = 1;
const STEP = 1;
const PAGES_VISIBLE = 4;
const PAGES_VISIBLE_SMALL = 3;
const SMALL_SCREEN = '(max-width: 375px)';

interface LibraryPaginationProps {
  onPageChange: (page: number) => void;
}

class LibraryPagination extends BaseComponent<HTMLElement> {
  private onPageChange: (page: number) => void;
  private pages: BaseComponent;
  private prevButton: PaginationButton;
  private nextButton: PaginationButton;
  private smallScreen = window.matchMedia(SMALL_SCREEN);
  private currentPage = FIRST_PAGE;
  private totalPages = FIRST_PAGE;

  constructor({ onPageChange }: LibraryPaginationProps) {
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

    super(
      {
        tag: 'nav',
        className: styles.pagination,
      },
      prevButton,
      pages,
      nextButton
    );

    this.onPageChange = onPageChange;
    this.pages = pages;
    this.prevButton = prevButton;
    this.nextButton = nextButton;

    prevButton.onClick(() => this.goToPage(this.currentPage - STEP));
    nextButton.onClick(() => this.goToPage(this.currentPage + STEP));

    this.smallScreen.addEventListener('change', () => this.showPages());

    this.showPages();
  }

  public setTotalPages(totalPages: number): void {
    this.totalPages = Math.max(FIRST_PAGE, totalPages);
    this.currentPage = FIRST_PAGE;
    this.showPages();
  }

  private goToPage(page: number): void {
    if (
      page < FIRST_PAGE ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.currentPage = page;
    this.showPages();
    this.onPageChange(page);
  }

  private getVisiblePages(): number[] {
    let visibleCount = PAGES_VISIBLE;

    if (this.smallScreen.matches) {
      visibleCount = PAGES_VISIBLE_SMALL;
    }

    if (this.totalPages < visibleCount) {
      visibleCount = this.totalPages;
    }

    let startPage = this.currentPage - Math.floor((visibleCount - 1) / 2);

    if (startPage < FIRST_PAGE) {
      startPage = FIRST_PAGE;
    }

    if (startPage + visibleCount - 1 > this.totalPages) {
      startPage = this.totalPages - visibleCount + 1;
    }

    const visiblePages = [];

    for (let page = startPage; page < startPage + visibleCount; page++) {
      visiblePages.push(page);
    }

    return visiblePages;
  }

  private showPages(): void {
    this.pages.destroyChildren();

    for (const page of this.getVisiblePages()) {
      const button = new PaginationButton({
        text: String(page),
        isActive: page === this.currentPage,
      });

      button.onClick(() => this.goToPage(page));

      const item = new BaseComponent({ tag: 'li' }, button);

      this.pages.append(item);
    }

    this.prevButton.setDisabled(this.currentPage === FIRST_PAGE);
    this.nextButton.setDisabled(this.currentPage === this.totalPages);
  }
}

export default LibraryPagination;
