import { Anchor, Flex, Group, Image, Stack, Text } from '@mantine/core';
import { type Player } from '@prisma/client';
import cx from 'classnames';
import NextImage from 'next/image';
import Link from 'next/link';
import Flag from '~/components/Flag/Flag';
import Tier from '~/components/Tier/Tier';
import Winrate from '~/components/Winrate/Winrate';
import { getTopCharacter } from '~/game/characters';
import styles from './PlayerCard.module.scss';

export interface PlayerCardProps extends React.ComponentProps<typeof Stack> {
  player: Player;
}

export default function PlayerCard({ player, ...props }: PlayerCardProps) {
  const topCharacter = getTopCharacter(player);

  return (
    <Stack gap="xs" justify="space-between" className={cx(styles.card, props.className)}>
      <Group wrap="nowrap" gap="xs" className={styles.cardTop}>
        <Flex
          style={{ width: 36, height: 41 }}
          fw="bold"
          tt="uppercase"
          justify="center"
          align="center"
          className={cx(
            styles.rank,
            player.rank === 1 && styles.first,
            player.rank === 2 && styles.second,
            player.rank === 3 && styles.third
          )}
        >
          #{player.rank}
        </Flex>
        <Image
          component={NextImage}
          w={37}
          h={37}
          radius="xs"
          src={topCharacter.icon}
          alt={topCharacter.name}
        />
        <Anchor
          href={`/player/${player.playFabId}`}
          component={Link}
          fz={{
            base: 'md',
            lg: 'sm',
          }}
          fw="bold"
          lh="xs"
          className={styles.nameLink}
        >
          <span className={styles.name}>{player.displayName}</span>
          <Flag city={player.city} country={player.countryCode} size={20} />
        </Anchor>
      </Group>
      <Stack gap="xs">
        <Group gap="xs" className={styles.tierInfo}>
          <Tier rating={player.rating ?? 0} size="small" />
        </Group>
        <Group gap="xs" className={styles.tierInfo}>
          <Text size="xs">Experience: {player.experience.toLocaleString()}</Text>
        </Group>
        <Group gap="xs" className={styles.wins}>
          <Winrate wins={player.rankedWins} losses={player.rankedLosses} />
          <Text size="xs">
            {Math.round((player.rankedWins / (player.rankedWins + player.rankedLosses)) * 100)}%
          </Text>
        </Group>
      </Stack>
    </Stack>
  );
}
