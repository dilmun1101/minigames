import BaseComponent from '@/shared/lib/base-component/base-component';
import Avatar from '@/shared/ui/avatar/avatar';
import Label from '@/shared/ui/label/label';
import { TOP_PLAYERS } from './model/players';
import styles from './leaderboard-table.module.scss';

const FIRE = '🔥';

class LeaderboardTable extends BaseComponent<HTMLDivElement> {
  constructor() {
    const rankHead = new BaseComponent({
      tag: 'th',
      className: [styles.cell, styles.rankCell],
      text: 'Rank',
    });

    const playerHead = new BaseComponent({
      tag: 'th',
      className: [styles.cell, styles.playerCell],
      text: 'Player',
    });

    const gamesHead = new BaseComponent(
      {
        tag: 'th',
        className: [styles.cell, styles.gamesCell],
      },
      new BaseComponent({
        tag: 'span',
        className: styles.fullText,
        text: 'Games Played',
      })
    );

    const scoreHead = new BaseComponent(
      {
        tag: 'th',
        className: [styles.cell, styles.scoreCell],
      },
      new BaseComponent({
        tag: 'span',
        className: styles.fullText,
        text: 'Total Score',
      })
    );

    const streakHead = new BaseComponent({
      tag: 'th',
      className: [styles.cell, styles.streakCell],
      text: 'Streak',
    });

    const favoriteHead = new BaseComponent({
      tag: 'th',
      className: [styles.cell, styles.favoriteCell],
      text: 'Favorite Game',
    });

    const headRow = new BaseComponent(
      {
        tag: 'tr',
        className: styles.row,
      },
      rankHead,
      playerHead,
      gamesHead,
      scoreHead,
      streakHead,
      favoriteHead
    );

    const tableHead = new BaseComponent(
      {
        tag: 'thead',
        className: styles.head,
      },
      headRow
    );

    const player = TOP_PLAYERS[0];

    const rankCell = new BaseComponent({
      tag: 'td',
      className: [styles.cell, styles.rankCell, styles.rankFirst],
      text: `#${player.rank}`,
    });

    const avatar = new Avatar({
      name: player.name,
      colorAvatar: player.rank,
    });

    const playerName = new BaseComponent({
      tag: 'span',
      className: styles.playerName,
      text: player.name,
    });

    const playerInfo = new BaseComponent(
      {
        tag: 'div',
        className: styles.player,
      },
      avatar,
      playerName
    );

    const playerCell = new BaseComponent(
      {
        tag: 'td',
        className: [styles.cell, styles.playerCell],
      },
      playerInfo
    );

    const gamesCell = new BaseComponent({
      tag: 'td',
      className: [styles.cell, styles.gamesCell],
      text: String(player.gamesPlayed),
    });

    const fullScore = new BaseComponent({
      tag: 'span',
      className: styles.fullScore,
      text: String(player.totalScore),
    });

    const shortScore = new BaseComponent({
      tag: 'span',
      className: styles.shortScore,
      text: String(player.totalScore),
    });

    const scoreCell = new BaseComponent(
      {
        tag: 'td',
        className: [styles.cell, styles.scoreCell],
      },
      fullScore,
      shortScore
    );

    const streakCell = new BaseComponent(
      {
        tag: 'td',
        className: [styles.cell, styles.streakCell],
      },
      new BaseComponent({
        tag: 'span',
        className: styles.fullText,
        text: `${FIRE} ${player.streakDays} days`,
      })
    );

    const favoriteLabel = new Label({
      text: player.favoriteGame,
    });

    const favoriteCell = new BaseComponent(
      {
        tag: 'td',
        className: [styles.cell, styles.favoriteCell],
      },
      favoriteLabel
    );

    const row = new BaseComponent(
      {
        tag: 'tr',
        className: styles.row,
      },
      rankCell,
      playerCell,
      gamesCell,
      scoreCell,
      streakCell,
      favoriteCell
    );

    const tableBody = new BaseComponent(
      {
        tag: 'tbody',
        className: styles.body,
      },
      row
    );

    const table = new BaseComponent(
      {
        tag: 'table',
        className: styles.table,
      },
      tableHead,
      tableBody
    );

    super(
      {
        tag: 'div',
        className: styles.tableWrapper,
      },
      table
    );
  }
}

export default LeaderboardTable;
