import { Table } from '@mantine/core';
import { useState } from 'react';
import PlayerListRows from '~/components/PlayerList/PlayerListRows';
import { type SSRPlayer } from '~/types/Player';
import PlayerListTh from './PlayerListTh';
import styles from './player-list.module.scss';

export interface PlayerListProps {
  players: SSRPlayer[];
}

type PlayerListSortBy = keyof SSRPlayer | 'winrate' | 'tier';

export default function PlayerList({ players }: PlayerListProps) {
  const [sortBy, setSortBy] = useState<PlayerListSortBy | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [sortedData, setSortedData] = useState<SSRPlayer[]>(players);

  function setSorting(field: PlayerListSortBy) {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(players, { sortBy: field, reversed }));
  }

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table className={styles.table} striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <PlayerListTh
              sorted={sortBy === 'rank'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('rank')}
            >
              <span className={styles.desktopOnly}>Rank</span>
            </PlayerListTh>
            <PlayerListTh
              sorted={sortBy === 'displayName'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('displayName')}
            >
              Player
            </PlayerListTh>
            <PlayerListTh
              sorted={sortBy === 'tier'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('tier')}
              className={styles.desktopOnly}
            >
              Tier
            </PlayerListTh>
            <PlayerListTh
              sorted={sortBy === 'rating'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('rating')}
            >
              Rating
            </PlayerListTh>
            <PlayerListTh
              sorted={sortBy === 'experience'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('experience')}
              className={styles.desktopOnly}
            >
              Experience
            </PlayerListTh>
            <PlayerListTh
              sorted={sortBy === 'winrate'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('winrate')}
            >
              Win Rate
            </PlayerListTh>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <PlayerListRows players={sortedData} />
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

function sortData(
  data: SSRPlayer[],
  payload: { sortBy: PlayerListSortBy; reversed: boolean }
): SSRPlayer[] {
  const { sortBy, reversed } = payload;

  return [...data].sort((a, b) => {
    let tempA, tempB;

    if (sortBy === 'winrate') {
      tempA = Math.round((a.rankedWins / (a.rankedWins + a.rankedLosses)) * 100);
      tempB = Math.round((b.rankedWins / (b.rankedWins + b.rankedLosses)) * 100);
    } else if (sortBy === 'tier') {
      // 'tier' doesn't exist so using the 'rating' instead. Sometimes the 'rating'
      tempA = a.rank;
      tempB = b.rank;
    } else {
      tempA = a[sortBy];
      tempB = b[sortBy];
    }

    if (reversed) {
      if (typeof tempA === 'number' && typeof tempB === 'number') {
        return tempA - tempB;
      } else if (typeof tempA === 'number') {
        return -1;
      } else if (typeof tempB === 'number') {
        return 1;
      } else if (typeof tempA === 'string' && typeof tempB === 'string') {
        return tempA.localeCompare(tempB);
      } else {
        return 0;
      }
    }

    if (typeof tempA === 'number' && typeof tempB === 'number') {
      return tempB - tempA;
    } else if (typeof tempA === 'number') {
      return 1;
    } else if (typeof tempB === 'number') {
      return -1;
    } else if (typeof tempA === 'string' && typeof tempB === 'string') {
      return tempB.localeCompare(tempA);
    } else {
      return 0;
    }
  });
}
