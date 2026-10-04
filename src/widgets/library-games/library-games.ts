import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './library-games.module.scss';
import MinigamesApi from '@/shared/api/minigames-api/minigames-api';
import GameDetails from '@/features/game-details/ui/game-details/game-details';
import type { GameDto } from '@/shared/api/types/types';
import LibraryGameCard from '../library-game-card/library-game-card';
import LibraryPagination from '../library-pagination/library-pagination';
import EmptyState from '@/shared/ui/empty-state/empty-state';
import Skeleton from '@/shared/ui/skeleton/skeleton';
import ErrorBanner from '@/shared/ui/error-banner/error-banner';
import snackbar from '@/shared/ui/snackbar/snackbar';
import { GAMES_ON_PAGE } from '@/shared/api/minigames-api/minigames-api';

const NO_PAGES = 0;
const FIRST_PAGE = 1;
const ERROR_MESSAGE = 'Failed to load games';
const RETRY_SUCCESS_MESSAGE = 'Games are loaded';
const EMPTY_MESSAGE = 'There are no games yet';
const NO_FILTER = '';

interface LibraryFilters {
  category: string;
  sort: string;
}

class LibraryGames extends BaseComponent<HTMLElement> {
  private api = new MinigamesApi();
  private list: BaseComponent;
  private gameDetails: GameDetails;
  private pagination: LibraryPagination;
  private emptyState: BaseComponent;
  private currentPage = FIRST_PAGE;
  private totalPages = NO_PAGES;
  private category = NO_FILTER;
  private sort = NO_FILTER;
  private requestNumber = 0;

  constructor() {
    const list = new BaseComponent({
      tag: 'ul',
      className: styles.list,
    });

    const gameDetails = new GameDetails();

    const pagination = new LibraryPagination({
      onPageChange: (page) => this.loadPage(page),
    });

    const emptyState = new BaseComponent({
      tag: 'div',
      className: styles.state,
    });

    super(
      {
        tag: 'section',
        className: styles.games,
      },
      list,
      emptyState,
      pagination,
      gameDetails
    );

    this.list = list;
    this.gameDetails = gameDetails;
    this.pagination = pagination;
    this.emptyState = emptyState;
  }

  public showFilters({ category, sort }: LibraryFilters): void {
    if (category === this.category && sort === this.sort) {
      return;
    }

    this.category = category;
    this.sort = sort;

    this.totalPages = NO_PAGES;
    this.loadPage(FIRST_PAGE);
  }

  private async loadPage(page: number, isRetry = false): Promise<void> {
    this.currentPage = page;
    this.requestNumber += 1;

    const requestNumber = this.requestNumber;
    this.showSkeleton();

    try {
      const gamesPage = await this.api.getGamesPage({
        page,
        category: this.category,
        sort: this.sort,
      });

      if (requestNumber !== this.requestNumber) {
        return;
      }

      if (gamesPage.games.length === 0) {
        this.showEmptyState();
        return;
      }

      this.showGames(gamesPage.games);
      this.showPages(gamesPage.totalPages);

      if (isRetry) {
        snackbar.showSuccess(RETRY_SUCCESS_MESSAGE);
      }
    } catch {
      if (requestNumber !== this.requestNumber) {
        return;
      }

      this.showError();
      snackbar.showError(ERROR_MESSAGE);
    }
  }

  private showSkeleton(): void {
    this.clear();

    for (let i = 0; i < GAMES_ON_PAGE; i++) {
      const item = new BaseComponent(
        {
          tag: 'li',
          className: styles.item,
        },
        new Skeleton({
          className: styles.skeleton,
        })
      );

      this.list.append(item);
    }
  }

  private showGames(games: GameDto[]): void {
    this.clear();

    for (let i = 0; i < games.length; i++) {
      const card = new LibraryGameCard({
        game: games[i],
        onDetails: () => this.gameDetails.open(),
      });

      const item = new BaseComponent(
        {
          tag: 'li',
          className: styles.item,
        },
        card
      );

      this.list.append(item);
    }
  }

  private showPages(totalPages: number): void {
    if (totalPages === this.totalPages) {
      return;
    }

    this.totalPages = totalPages;
    this.pagination.setTotalPages(totalPages);
    this.pagination.removeClass(styles.hidden);
  }

  private showEmptyState(): void {
    this.clear();
    this.hideList();

    this.emptyState.append(
      new EmptyState({
        text: EMPTY_MESSAGE,
      })
    );
  }

  private showError(): void {
    this.clear();
    this.hideList();

    this.emptyState.append(
      new ErrorBanner({
        text: ERROR_MESSAGE,
        onRetry: () => this.loadPage(this.currentPage, true),
      })
    );
  }

  private hideList(): void {
    this.list.addClass(styles.hidden);
    this.pagination.addClass(styles.hidden);
  }

  private clear(): void {
    this.list.destroyChildren();
    this.emptyState.destroyChildren();

    this.list.removeClass(styles.hidden);
    this.pagination.removeClass(styles.hidden);

    if (this.totalPages === NO_PAGES) {
      this.pagination.addClass(styles.hidden);
    }
  }
}

export default LibraryGames;
