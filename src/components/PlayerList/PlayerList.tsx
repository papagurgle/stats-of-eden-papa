import { Anchor, Group, Image, Table, Text } from '@mantine/core';
import { type Player } from '@prisma/client';
import NextImage from 'next/image';
import Link from 'next/link';
import Flag from '~/components/Flag/Flag';
import Winrate from '~/components/Winrate/Winrate';
import { getTopCharacter } from '~/game/characters';
import { getTier } from '~/game/tiers';
import styles from './player-list.module.scss';

export interface PlayerListProps {
  players: Player[];
}

export default function PlayerList({ players }: PlayerListProps) {
  const rows = players.map((player) => {
    const topCharacter = getTopCharacter(player);
    const tier = getTier(player.rating ?? 0);

    return (
      <Table.Tr key={player.playFabId}>
        <Table.Td>{player.rank}</Table.Td>
        <Table.Td>
          <div className={styles.player}>
            <Image
              component={NextImage}
              w={25}
              h={25}
              radius="xs"
              src={topCharacter.icon}
              alt={topCharacter.name}
              className={styles.character}
            />
            <Anchor
              fw="bold"
              size="sm"
              href={`/player/${player.playFabId}`}
              component={Link}
              className={styles.name}
            >
              {player.displayName}
            </Anchor>
            <Flag city={player.city} country={player.countryCode} size={15} />
          </div>
        </Table.Td>
        <Table.Td className={styles.desktopOnly}>
          <div className={styles.tier}>
            <Image
              component={NextImage}
              w={15}
              h={15}
              radius="xs"
              src={tier.image}
              alt={tier.name}
            />
            {tier.name}
          </div>
        </Table.Td>
        <Table.Td>{player.rating}</Table.Td>
        <Table.Td className={styles.desktopOnly}>{player.experience.toLocaleString()}</Table.Td>
        <Table.Td>
          <Group gap="xs" className={styles.wins}>
            <Winrate
              wins={player.rankedWins}
              losses={player.rankedLosses}
              className={styles.desktopOnly}
            />
            <Text size="xs">
              {Math.round((player.rankedWins / (player.rankedWins + player.rankedLosses)) * 100)}%
            </Text>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table className={styles.table} striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <span className={styles.desktopOnly}>Rank</span>
          </Table.Th>
          <Table.Th>Player</Table.Th>
          <Table.Th className={styles.desktopOnly}>Tier</Table.Th>
          <Table.Th>Rating</Table.Th>
          <Table.Th className={styles.desktopOnly}>Experience</Table.Th>
          <Table.Th>Win Rate</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
