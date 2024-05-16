import { Anchor, Box, Flex, Group, Image, Stack, Text, Title } from '@mantine/core';
import { type Player } from '@prisma/client';
import cx from 'classnames';
import NextImage from 'next/image';
import Link from 'next/link';
import Flag from '~/components/Flag/Flag';
import Tier from '~/components/Tier/Tier';
import Winrate from '~/components/Winrate/Winrate';
import { getTopCharacter } from '~/game/characters';
import PlayerCard from './PlayerCard';
import styles from './PlayerCard.module.scss';

export interface TopPlayerCardProps extends React.ComponentProps<typeof Group> {
  player: Player;
}

const cardHeight = 94;
const aspectRatio = 0.75;

export default function TopPlayerCard({ player }: TopPlayerCardProps) {
  return (
    <>
      <TopPlayerCardDesktop player={player} className={cx(styles.top, styles.desktopOnly)} />
      <PlayerCard player={player} className={cx(styles.top, styles.mobileOnly)} />
    </>
  );
}

function TopPlayerCardDesktop({ player, ...props }: TopPlayerCardProps) {
  const topCharacter = getTopCharacter(player);

  return (
    <Group className={cx(styles.card, props.className)}>
      <Box className={styles.bg}>
        <NextImage src={topCharacter.bg} alt="" width="500" objectFit="cover" />
      </Box>
      <Group className={styles.inner}>
        <Flex
          style={{ height: cardHeight, width: cardHeight * aspectRatio }}
          fw="bold"
          tt="uppercase"
          justify="center"
          align="center"
          className={cx(styles.rank, styles.first)}
          fz="xl"
        >
          #{player.rank}
        </Flex>
        <Image
          component={NextImage}
          w={cardHeight}
          h={cardHeight}
          radius="sm"
          src={topCharacter.icon}
          alt={topCharacter.name}
        />
        <Stack gap="xs">
          <Anchor
            href={`/player/${player.playFabId}`}
            component={Link}
            lh="xs"
            className={styles.nameLink}
          >
            <Title order={2} className={styles.name}>
              {player.displayName}
            </Title>
            <Flag city={player.city} country={player.countryCode} size={20} />
          </Anchor>

          <Group gap="xs" className={styles.tierInfo}>
            <Tier rating={player.rating ?? 0} size="large" />
            <Group>
              <Winrate wins={player.rankedWins} losses={player.rankedLosses} size="xl" w={200} />
              <Text size="xs">
                {Math.round((player.rankedWins / (player.rankedWins + player.rankedLosses)) * 100)}%
              </Text>
            </Group>
          </Group>
          <Group gap="xs" className={styles.tierInfo}>
            <Text size="xs">Experience: {player.experience.toLocaleString()}</Text>
          </Group>
        </Stack>
      </Group>
    </Group>
  );
}
