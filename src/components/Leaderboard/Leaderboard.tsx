import { Grid, Space } from '@mantine/core';
import { type Player } from '@prisma/client';
import PlayerCard from '~/components/PlayerCard/PlayerCard';
import TopPlayerCard from '~/components/PlayerCard/TopPlayerCard';
import PlayerList from '~/components/PlayerList/PlayerList';

export interface LeaderboardProps {
  leaderboard: Player[];
}

export default function Leaderboard({ leaderboard }: LeaderboardProps) {
  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12 }}>
          {leaderboard?.[0] && <TopPlayerCard player={leaderboard[0]} />}
        </Grid.Col>
      </Grid>
      <Grid>
        {leaderboard?.slice(1, 5).map((player) => (
          <Grid.Col span={{ base: 12, sm: 6, lg: 3 }} key={player.playFabId}>
            <PlayerCard player={player} />
          </Grid.Col>
        ))}
      </Grid>
      <Space h="xl" />
      {leaderboard && (
        <PlayerList
          players={leaderboard?.slice(5).map((player) => {
            return player;
          })}
        />
      )}
    </>
  );
}
