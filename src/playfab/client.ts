import { PlayFabClient } from 'playfab-sdk';
import util from 'util';
import { GetLeaderboardResponseSchema, LoginWithCustomIDResponseSchema } from './schema';

PlayFabClient.settings.titleId = '57448';

export { PlayFabClient };

export async function loginWithCustomId(settings: PlayFabClientModels.LoginWithCustomIDRequest) {
  try {
    const response = await util.promisify(PlayFabClient.LoginWithCustomID.bind(PlayFabClient))(
      settings
    );

    return LoginWithCustomIDResponseSchema.parse(response).data;
  } catch (error) {
    console.error('Error logging in with custom ID:', error);
    throw error;
  }
}

export async function fetchLeaderboard(settings: PlayFabClientModels.GetLeaderboardRequest) {
  try {
    settings.ProfileConstraints = {
      ShowDisplayName: true,
      ShowLocations: true,
      ShowStatistics: true,
      ShowTags: true,
      ShowAvatarUrl: false,
      ShowBannedUntil: false,
      ShowCampaignAttributions: false,
      ShowContactEmailAddresses: false,
      ShowCreated: false,
      ShowExperimentVariants: false,
      ShowLastLogin: false,
      ShowLinkedAccounts: false,
      ShowMemberships: false,
      ShowOrigination: false,
      ShowPushNotificationRegistrations: false,
      ShowTotalValueToDateInUsd: false,
      ShowValuesToDate: false,
    };

    const response = await util.promisify(PlayFabClient.GetLeaderboard.bind(PlayFabClient))(
      settings
    );

    return GetLeaderboardResponseSchema.parse(response).data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}
