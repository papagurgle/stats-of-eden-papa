import { PlayFabClient } from 'playfab-sdk';
import util from 'util';
import {
  GetLeaderboardResponseSchema,
  GetUserDataResponseSchema,
  LoginWithCustomIDResponseSchema,
} from './schema';

PlayFabClient.settings.titleId = '57448';

const ProfileConstraints = {
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
} satisfies PlayFabClientModels.PlayerProfileViewConstraints;

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
    settings.ProfileConstraints = ProfileConstraints;

    const response = await util.promisify(PlayFabClient.GetLeaderboard.bind(PlayFabClient))(
      settings
    );

    return GetLeaderboardResponseSchema.parse(response).data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}

export async function fetchLeaderboardAroundPlayer(
  settings: PlayFabClientModels.GetLeaderboardAroundPlayerRequest
) {
  try {
    settings.ProfileConstraints = ProfileConstraints;

    const response = await util.promisify(
      PlayFabClient.GetLeaderboardAroundPlayer.bind(PlayFabClient)
    )(settings);

    return GetLeaderboardResponseSchema.parse(response).data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}

export async function fetchUserData(settings: PlayFabClientModels.GetUserDataRequest) {
  try {
    const response = await util.promisify(PlayFabClient.GetUserData.bind(PlayFabClient))(settings);

    return GetUserDataResponseSchema.parse(response).data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
