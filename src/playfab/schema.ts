import { z } from 'zod';

export const StatisticSchema = z.object({
  Name: z.string(),
  Version: z.number(),
  Value: z.number(),
});

export const LocationSchema = z.object({
  ContinentCode: z.string(),
  CountryCode: z.string(),
  City: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
});

export const ProfileSchema = z.object({
  PublisherId: z.string(),
  TitleId: z.string(),
  PlayerId: z.string(),
  Locations: z.array(LocationSchema),
  DisplayName: z.string().optional(),
  Tags: z.array(z.string()),
  Statistics: z.array(StatisticSchema),
});

export const LeaderboardEntrySchema = z.object({
  PlayFabId: z.string(),
  DisplayName: z.string().optional(),
  StatValue: z.number(),
  Position: z.number().optional(),
  Profile: ProfileSchema,
});

export const GetLeaderboardResponseSchema = z.object({
  code: z.number(),
  status: z.string(),
  data: z.object({
    Leaderboard: z.array(LeaderboardEntrySchema),
    Version: z.number(),
  }),
});

// LoginWithCustomID

export const EntitySchema = z.object({
  Id: z.string(),
  Type: z.string(),
  TypeString: z.string(),
});

export const EntityTokenSchema = z.object({
  EntityToken: z.string(),
  TokenExpiration: z.string(), // Date string
  Entity: EntitySchema,
});

export const SettingsForUserSchema = z.object({
  NeedsAttribution: z.boolean(),
  GatherDeviceInfo: z.boolean(),
  GatherFocusInfo: z.boolean(),
});

export const TreatmentAssignmentSchema = z.object({
  Variants: z.array(z.string()), // According to documentation, these are strings
  Variables: z.array(z.any()), // Variable structure not specified, could be any
});

export const LoginWithCustomIDResponseDataSchema = z.object({
  SessionTicket: z.string(),
  PlayFabId: z.string(),
  NewlyCreated: z.boolean(),
  SettingsForUser: SettingsForUserSchema,
  LastLoginTime: z.string(), // Date string
  EntityToken: EntityTokenSchema,
  TreatmentAssignment: TreatmentAssignmentSchema,
});

export const LoginWithCustomIDResponseSchema = z.object({
  code: z.number(),
  status: z.string(),
  data: LoginWithCustomIDResponseDataSchema,
});

export const GetUserDataResponseSchema = z.object({
  code: z.number(),
  status: z.string(),
  data: z.object({
    Data: z
      .object({
        SelectedBanner: z
          .object({
            Value: z.string(),
            LastUpdated: z.string(),
            Permission: z.string(),
          })
          .optional(),
        SelectedTitle: z
          .object({
            Value: z.string(),
            LastUpdated: z.string(),
            Permission: z.string(),
          })
          .optional(),
      })
      .optional(),
    DataVersion: z.number(),
  }),
});
