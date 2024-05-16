import { Box, Flex, Group, Overlay, Stack, Text, Title } from '@mantine/core';
import { type Player } from '@prisma/client';
import cx from 'classnames';
import Image from 'next/image';
import Flag from '~/components/Flag/Flag';
import Tier from '~/components/Tier/Tier';
import Winrate from '~/components/Winrate/Winrate';
import { getTopCharacter } from '~/game/characters';
import styles from './banner.module.scss';

export interface BannerProps {
  player: Player;
  rankInExperience?: number;
}

export default function Banner({ player, rankInExperience }: BannerProps) {
  const character = getTopCharacter(player);
  const splashWidth = 400;
  const splashHeight = character.splash.height / (character.splash.width / splashWidth);

  return (
    <Flex className={styles.banner} align="flex-end" justify="center" mb="xl">
      <Image src={character.bg} alt="" fill objectFit="cover" />
      <Overlay blur={10} backgroundOpacity={0} zIndex={1} />
      <Flex justify="center" align="flex-end" className={styles.splash} style={{ zIndex: 2 }}>
        <Image
          src={character.splash}
          alt={character.name}
          width={splashWidth}
          height={splashHeight}
          className={styles.splashImg}
        />
      </Flex>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 45%, rgba(0, 0, 0, 1) 100%)"
        zIndex={3}
        className={styles.overlay}
      />
      <Flex
        style={{ zIndex: 4 }}
        className={styles.stats}
        justify="space-between"
        align="flex-end"
        wrap="wrap"
      >
        <Box p="md" className={styles.card}>
          <Title order={1} className={styles.title}>
            <span className={styles.name}>{player.displayName}</span>
            <Flag
              city={player.city}
              country={player.countryCode}
              size={21}
              className={styles.flag}
            />
          </Title>
          <Title order={2} size="h4">
            Rank: {player.rank}
          </Title>
          <Flex align="center" gap="sm" my="xs">
            <Tier rating={player.rating ?? 0} size="large" />
          </Flex>
          <Group>
            <Winrate
              wins={player.rankedWins}
              losses={player.rankedLosses}
              className={styles.winrate}
            />
            <Text size="xs">
              {Math.round((player.rankedWins / (player.rankedWins + player.rankedLosses)) * 100)}%
              Winrate
            </Text>
          </Group>
        </Box>
        <Box p="md" className={cx(styles.card, styles.right)}>
          {player.rankedPeakRating && player.rating && (
            <Stack gap={0} mb={5}>
              <Text size="xs" fw="bold" ta={{ sm: 'right' }}>
                PEAK RATING
              </Text>
              <Text size="xs" ta={{ sm: 'right' }}>
                {player.rankedPeakRating < player.rating ? player.rating : player.rankedPeakRating}
              </Text>
            </Stack>
          )}
          {player.unrankedRating && (
            <Stack gap={0} mb={5}>
              <Text size="xs" fw="bold" ta={{ sm: 'right' }}>
                UNRANKED RATING
              </Text>
              <Text size="xs" ta={{ sm: 'right' }}>
                {player.unrankedRating}
              </Text>
            </Stack>
          )}
          <Stack gap={0} mb={5}>
            <Text size="xs" fw="bold" ta={{ sm: 'right' }}>
              PLAYER EXPERIENCE
            </Text>
            <Text size="xs" ta={{ sm: 'right' }}>
              {player.experience.toLocaleString()} (Rank {rankInExperience})
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
