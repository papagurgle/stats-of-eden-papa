import { type Player } from '@prisma/client';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';
import LastUpdated from '~/components/LastUpdated/LastUpdated';
import Leaderboard from '~/components/Leaderboard/Leaderboard';
import { db } from '~/server/db';

export default function IndexPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {props.lastUpdated && <LastUpdated time={props.lastUpdated} />}
      {props.leaderboard && <Leaderboard leaderboard={props.leaderboard} />}
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const leaderboard = await db.player.findMany({
    take: 250,
    skip: 0,
    orderBy: [
      { rank: 'asc' }, // Primary sort by rank ascending
      { updatedAt: 'desc' }, // Secondary sort by update time descending
    ],
    distinct: ['rank'], // Ensure each rank is represented only once
  });

  const lastUpdatedPlayer = leaderboard.reduce((acc, player) =>
    player.updatedAt > acc.updatedAt ? player : acc
  );

  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  return {
    props: {
      leaderboard,
      lastUpdated: lastUpdatedPlayer.updatedAt,
    },
  };
}) satisfies GetServerSideProps<{
  leaderboard: Player[];
  lastUpdated: Date;
}>;
