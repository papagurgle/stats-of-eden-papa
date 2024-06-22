import { env } from '~/env';
import { fetchLeaderboard, loginWithCustomId } from '~/playfab/client';
import { insertPlayers } from '~/server/insert-players';
import { StatisticName } from '~/types/Characters';
import getUrl from '~/utils/getUrl';

export async function updateDB() {
  try {
    console.time('updateDB');

    await fetch(getUrl('/api/updated'), {
      method: 'POST',
      body: JSON.stringify({
        customId: env.CUSTOMID,
        updating: true,
      }),
    });

    await loginWithCustomId({
      CustomId: env.CUSTOMID,
      CreateAccount: false,
    });

    let foundPlayfabIds: string[] = [];

    async function getLeaderboardData(statisticName: StatisticName, totalRecordsToFetch: number) {
      let startPosition = 0;
      let recordsFetched = 0;

      console.log(`\nStarting to fetch ${statisticName} leaderboard data...\n`);

      while (recordsFetched < totalRecordsToFetch) {
        const fetchCount = Math.min(100, totalRecordsToFetch - recordsFetched);

        const leaderboardData = await fetchLeaderboard({
          MaxResultsCount: fetchCount,
          StartPosition: startPosition,
          StatisticName: statisticName.toString(),
        });

        const insertedPlayers = await insertPlayers(
          leaderboardData.Leaderboard,
          foundPlayfabIds,
          statisticName,
          startPosition
        );

        foundPlayfabIds = [...foundPlayfabIds, ...insertedPlayers];

        recordsFetched += leaderboardData.Leaderboard.length;
        startPosition += leaderboardData.Leaderboard.length;

        await new Promise((resolve) => setTimeout(resolve, 30000));
      }
    }

    await getLeaderboardData(StatisticName.OneVsOneRatingZero, 500);
    await getLeaderboardData(StatisticName.ProfileExperience, 100);
    await getLeaderboardData(StatisticName.ChirettaExperience, 10);
    await getLeaderboardData(StatisticName.DreadwyrmExperience, 10);
    await getLeaderboardData(StatisticName.GunnerExperience, 10);
    await getLeaderboardData(StatisticName.HarissaExperience, 10);
    await getLeaderboardData(StatisticName.HazelExperience, 10);
    await getLeaderboardData(StatisticName.MaypulExperience, 10);
    await getLeaderboardData(StatisticName.NeeraExperience, 10);
    await getLeaderboardData(StatisticName.QueenExperience, 10);
    await getLeaderboardData(StatisticName.RevaExperience, 10);
    await getLeaderboardData(StatisticName.SaffronExperience, 10);
    await getLeaderboardData(StatisticName.SelicyExperience, 10);
    await getLeaderboardData(StatisticName.ShisoExperience, 10);
    await getLeaderboardData(StatisticName.ShopkeeperExperience, 10);
    await getLeaderboardData(StatisticName.TerraExperience, 10);
    await getLeaderboardData(StatisticName.VioletteExperience, 10);

    await fetch(getUrl('/api/updated'), {
      method: 'POST',
      body: JSON.stringify({
        customId: env.CUSTOMID,
        updating: false,
        lastUpdated: true,
      }),
    });

    console.timeEnd('updateDB');
  } catch (error) {
    await fetch(getUrl('/api/updated'), {
      method: 'POST',
      body: JSON.stringify({
        customId: env.CUSTOMID,
        updating: false,
        lastUpdated: true,
      }),
    });

    console.error('Error updating database:', error);
    throw error;
  }
}
