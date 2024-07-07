import { Table } from '@mantine/core';
import PlayerListRows from '~/components/PlayerList/PlayerListRows';
import { type PlayerInfo } from '~/types/Player';
import styles from './player-list.module.scss';

export interface PlayerListProps {
  players: PlayerInfo[];
}

export default function PlayerList({ players }: PlayerListProps) {
  return (
    <Table.ScrollContainer minWidth={500}>
      <Table className={styles.table} striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <span className={styles.desktopOnly}>Rank</span>
            </Table.Th>
            <Table.Th>Player</Table.Th>
            <Table.Th className={styles.desktopOnly}>Tier</Table.Th>
            <Table.Th>Rating</Table.Th>
            <Table.Th className={styles.desktopOnly}>Peak</Table.Th>
            <Table.Th className={styles.desktopOnly}>Level</Table.Th>
            <Table.Th>Winrate</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <PlayerListRows players={players} />
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
