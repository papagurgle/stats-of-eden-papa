import { Title } from '@mantine/core';
import { type Player } from '@prisma/client';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Alert from '~/components/Alert/Alert';
import CharacterChart from '~/components/CharacterChart/CharacterChart';
import LastUpdated from '~/components/LastUpdated/LastUpdated';
import Banner from '~/components/Profile/Banner';
import { db } from '~/server/db';

export default function PlayerPage({
  player,
  rankInExperience,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const id = router.query.id as string;

  if (!player) {
    return <Alert title="Player not found">Player with ID {id} not found</Alert>;
  }

  return (
    <>
      <Head>
        <title>{`${player.displayName}'s Profile | Stats of Eden`}</title>
        <meta
          name="description"
          content={`Stats for player ${player.displayName} in the Duelists of Eden game`}
        />
      </Head>
      <LastUpdated time={player.updatedAt} />
      <Banner player={player} rankInExperience={rankInExperience} />
      <Title order={2} mb="lg">
        Character stats
      </Title>
      <CharacterChart player={player} />
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const id = context.params?.id as string;
  const player = await db.player.findUnique({
    where: {
      playFabId: id,
    },
  });
  let rankInExperience: number | undefined;

  if (player) {
    const countQuery = await db.player.count({
      where: {
        experience: { gt: player.experience },
      },
    });

    rankInExperience = countQuery + 1;
  }

  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  return { props: { player, rankInExperience } };
}) satisfies GetServerSideProps<{
  player: Player | null;
  rankInExperience: number | undefined;
}>;
