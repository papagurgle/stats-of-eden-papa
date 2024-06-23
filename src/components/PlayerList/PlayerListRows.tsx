import { Anchor, Group, Image, Table, Text, Tooltip } from '@mantine/core';
import NextImage from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Flag from '~/components/Flag/Flag';
import RankChange from '~/components/RankChange/RankChange';
import Winrate from '~/components/Winrate/Winrate';
import { getTopCharacter } from '~/game/characters';
import { getLevel } from '~/game/levels';
import { getTier } from '~/game/tiers';
import { type PlayerInfo } from '~/types/Player';
import { getRankChange } from '~/utils/rankChange';
import styles from './player-list.module.scss';

interface PlayerListRowsProps {
  players: PlayerInfo[];
}

export default function PlayerListRows({ players }: PlayerListRowsProps): React.ReactNode {
  return players.map((player) => <PlayerListRow key={player.playFabId} player={player} />);
}

function PlayerListRow({ player }: { player: PlayerInfo }) {
  const topCharacter = getTopCharacter(player);
  const tier = getTier(player.rating ?? 0);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const PlayerName = (
    <Anchor
      fw="bold"
      size="sm"
      href={`/player/${player.playFabId}/${player.displayName}`}
      component={Link}
      className={styles.name}
      ref={linkRef}
    >
      {player.displayName}
    </Anchor>
  );

  function handleRowClick() {
    const isTextSelected = window.getSelection()?.toString();

    if (!isTextSelected) {
      linkRef.current?.click();
    }
  }

  return (
    <Table.Tr key={player.playFabId} onClick={handleRowClick} className={styles.row}>
      <Table.Td>
        {player.rank && (
          <RankChange
            rank={player.rank}
            previousRank={player.snapshots[0]?.rank ?? player.rank}
            change={getRankChange(player)}
          />
        )}
      </Table.Td>
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
          {player.title ? <Tooltip label={player.title}>{PlayerName}</Tooltip> : PlayerName}
          <Flag city={player.city} country={player.countryCode} size={15} />
        </div>
      </Table.Td>
      <Table.Td className={styles.desktopOnly}>
        <div className={styles.tier}>
          <Image component={NextImage} w={15} h={15} radius="xs" src={tier.image} alt={tier.name} />
          {tier.name}
        </div>
      </Table.Td>
      <Table.Td>{player.rating}</Table.Td>
      <Table.Td className={styles.desktopOnly}>
        <Tooltip label={`${player.experience.toLocaleString()} experience`}>
          <span>Lv. {getLevel(player.experience, 'profile')}</span>
        </Tooltip>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" className={styles.wins}>
          <Winrate
            wins={player.rankedWins}
            losses={player.rankedLosses}
            className={styles.winrate}
          />
          <Text size="xs">
            {Math.round((player.rankedWins / (player.rankedWins + player.rankedLosses) || 0) * 100)}
            %
          </Text>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}
