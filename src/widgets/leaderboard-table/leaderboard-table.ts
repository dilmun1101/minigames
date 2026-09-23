import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './leaderboard-table.module.scss';

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

    const tableBody = new BaseComponent({
      tag: 'tbody',
      className: styles.body,
    });

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
