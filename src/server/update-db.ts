import { type PlayerSnapshot, type Prisma } from '@prisma/client';
import { env } from '~/env';
import { fetchLeaderboard, loginWithCustomId } from '~/playfab/client';
import { CharacterStats, LocationSchema, StatisticName } from '~/playfab/schema';
import { db } from '~/server/db';

export type UpdateDBSuccess = {
  createdSnapshots: number;
  updatedSnapshots: number;
  upsertedPlayers: number;
};

export async function updateDB() {
  try {
    console.time('updateDB');

    const success: UpdateDBSuccess = {
      createdSnapshots: 0,
      updatedSnapshots: 0,
      upsertedPlayers: 0,
    };

    await loginWithCustomId({
      CustomId: env.CUSTOMID,
      CreateAccount: false,
    });

    const totalRecordsToFetch = 250;
    let startPosition = 0;
    let recordsFetched = 0;

    while (recordsFetched < totalRecordsToFetch) {
      const fetchCount = Math.min(100, totalRecordsToFetch - recordsFetched);

      const leaderboardData = await fetchLeaderboard({
        MaxResultsCount: fetchCount,
        StartPosition: startPosition,
        StatisticName: StatisticName.OneVsOneRatingZero.toString(),
      });

      for (const playerData of leaderboardData.Leaderboard) {
        const location = LocationSchema.safeParse(playerData.Profile.Locations[0]);

        if (!location.success) {
          console.error(
            `Failed to parse location data for ${playerData.PlayFabId}:`,
            location.error
          );
          continue;
        }

        const player = {
          playFabId: playerData.PlayFabId,
          displayName: playerData.DisplayName ?? '',
          experience:
            playerData.Profile.Statistics.find(
              (statistic) => statistic.Name === StatisticName.ProfileExperience.toString()
            )?.Value ?? 0,
          rank: playerData.Position !== undefined ? playerData.Position + 1 : undefined,
          rating: playerData.StatValue,
          rankedWins:
            playerData.Profile.Statistics.find(
              (statistic) => statistic.Name === StatisticName.OneVsOneRankedWinsZero.toString()
            )?.Value ?? 0,
          rankedLosses:
            playerData.Profile.Statistics.find(
              (statistic) => statistic.Name === StatisticName.OneVsOneRankedLossesZero.toString()
            )?.Value ?? 0,
          rankedPeakRating: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === StatisticName.OneVsOnePeakRatingZero.toString()
          )?.Value,
          season: 'Zero',
          unrankedWins:
            playerData.Profile.Statistics.find(
              (statistic) => statistic.Name === StatisticName.OneVsOneWins.toString()
            )?.Value ?? 0,
          unrankedLosses:
            playerData.Profile.Statistics.find(
              (statistic) => statistic.Name === StatisticName.OneVsOneLosses.toString()
            )?.Value ?? 0,
          unrankedRating: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === StatisticName.OneVsOneUnratedRatingZero.toString()
          )?.Value,
          continentCode: location.data.ContinentCode,
          countryCode: location.data.CountryCode,
          city: location.data.City,
          latitude: location.data.Latitude,
          longitude: location.data.Longitude,
          dreadwyrmExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.DreadwyrmExperience.toString()
          )?.Value,
          selicyExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.SelicyExperience.toString()
          )?.Value,
          saffronExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.SaffronExperience.toString()
          )?.Value,
          chirettaExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.ChirettaExperience.toString()
          )?.Value,
          maypulExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.MaypulExperience.toString()
          )?.Value,
          gunnerExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.GunnerExperience.toString()
          )?.Value,
          harissaExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.HarissaExperience.toString()
          )?.Value,
          revaExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.RevaExperience.toString()
          )?.Value,
          violetteExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.VioletteExperience.toString()
          )?.Value,
          neeraExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.NeeraExperience.toString()
          )?.Value,
          terraExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.TerraExperience.toString()
          )?.Value,
          queenExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.QueenExperience.toString()
          )?.Value,
          shopkeeperExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.ShopkeeperExperience.toString()
          )?.Value,
          hazelExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.HazelExperience.toString()
          )?.Value,
          shisoExp: playerData.Profile.Statistics.find(
            (statistic) => statistic.Name === CharacterStats.ShisoExperience.toString()
          )?.Value,
        } satisfies Prisma.PlayerCreateInput;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const existingSnapshot = await db.playerSnapshot.findFirst({
          where: {
            playFabId: playerData.PlayFabId,
            createdAt: {
              gte: today,
              lt: tomorrow,
            },
          },
        });

        let playerSnapshotPayload: PlayerSnapshot;

        if (existingSnapshot) {
          playerSnapshotPayload = await db.playerSnapshot.update({
            where: { id: existingSnapshot.id },
            data: {
              ...player,
            },
          });

          console.log(`Updated snapshot for ${player.playFabId} (${player.displayName})`);
          success.updatedSnapshots++;
        } else {
          playerSnapshotPayload = await db.playerSnapshot.create({
            data: {
              ...player,
              player: {
                connectOrCreate: {
                  where: {
                    playFabId: playerData.PlayFabId,
                  },
                  create: {
                    ...player,
                  },
                },
              },
            },
          });

          console.log(`Created snapshot for ${player.playFabId} (${player.displayName})`);
          success.createdSnapshots++;
        }

        const playerUpsert = await db.player.upsert({
          where: {
            playFabId: playerData.PlayFabId,
          },
          update: {
            ...player,
            snapshots: {
              connectOrCreate: {
                where: {
                  id: playerSnapshotPayload.id,
                },
                create: {
                  id: playerSnapshotPayload.id,
                  ...player,
                },
              },
            },
          },
          create: {
            ...player,
          },
        });

        console.log(`Upserted player ${playerUpsert.playFabId} (${playerUpsert.displayName})`);
        success.upsertedPlayers++;
      }

      recordsFetched += leaderboardData.Leaderboard.length;
      startPosition += leaderboardData.Leaderboard.length;
    }

    console.timeEnd('updateDB');

    return success;
  } catch (error) {
    console.error('Error updating database:', error);
    throw error;
  }
}
