import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './library-games.module.scss';
import MinigamesApi from '@/shared/api/minigames-api/minigames-api';
import GameDetails from '@/features/game-details/ui/game-details/game-details';
import type { GameDto } from '@/shared/api/types/types';
import LibraryGameCard from '../library-game-card/library-game-card';
import LibraryPagination from '../library-pagination/library-pagination';

const GAMES_ON_PAGE = 6;
const FIRST_GAME = 0;
const ERROR_MESSAGE = 'Failed to load games';

class LibraryGames extends BaseComponent<HTMLElement> {
  private api = new MinigamesApi();
  private list: BaseComponent;
  private gameDetails: GameDetails;

  constructor() {
    const list = new BaseComponent({
      tag: 'ul',
      className: styles.list,
    });

    const gameDetails = new GameDetails();
    const pagination = new LibraryPagination();

    super(
      {
        tag: 'section',
        className: styles.games,
      },
      list,
      pagination,
      gameDetails
    );

    this.list = list;
    this.gameDetails = gameDetails;
    this.loadGames();
  }

  private async loadGames(): Promise<void> {
    try {
      const games = await this.api.getGames();

      this.showGames(games.slice(FIRST_GAME, GAMES_ON_PAGE));
    } catch {
      const message = new BaseComponent({
        tag: 'li',
        className: styles.message,
        text: ERROR_MESSAGE,
      });

      this.list.append(message);
    }
  }

  private showGames(games: GameDto[]): void {
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
}

export default LibraryGames;
