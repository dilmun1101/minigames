import BaseComponent from '@/shared/lib/base-component/base-component';
import PageTitle from '@/shared/ui/page-title/page-title';
import styles from './library-page.module.scss';
import FilterSortBar from '@/widgets/filter-sort-bar/filter-sort-bar';
import LibraryGameCard from '@/widgets/library-game-card/library-game-card';
import MinigamesApi from '@/shared/api/minigames-api/minigames-api';

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

    super(
      {
        tag: 'div',
        className: styles.wrapper,
      },
      pageTitle,
      filterSortBar
    );

    void this.loadFirstGame();
  }

  private async loadFirstGame(): Promise<void> {
    try {
      const games = await new MinigamesApi().getGames();
      const firstGame = games[0];

      if (!firstGame) return;

      const gameCard = new LibraryGameCard({ game: firstGame });
      this.append(gameCard);
    } catch (error) {
      console.error('Failed ', error);
    }
  }

  public render(): HTMLElement {
    return this.node;
  }
}

export default LibraryPage;
