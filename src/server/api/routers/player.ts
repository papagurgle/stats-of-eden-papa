import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { type PlayerInfo } from '~/types/Player';
import { type PlayerListSortBy } from '~/utils/sortData';

// Define the playerRouter with tRPC
export const playerRouter = createTRPCRouter({
  getPlayer: publicProcedure
    .input(
      z.object({
        playFabId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const player = await ctx.db.player.findUnique({
        where: {
          playFabId: input.playFabId,
        },
        include: {
          snapshots: true,
        },
      });

      return player;
    }),

  headerSearch: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!input.search || input.search.length < 2) {
        return [];
      }

      return await ctx.db.player.findMany({
        where: {
          displayName: {
            contains: input.search,
            mode: 'insensitive',
          },
        },
        select: {
          playFabId: true,
          displayName: true,
        },
        take: 10,
      });
    }),

  getPlayerSnapshots: publicProcedure
    .input(
      z.object({
        playFabId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db.playerSnapshot.findMany({
        where: {
          playFabId: input.playFabId,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
    }),

  getLeaderboard: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        sort: z.enum(['rank', 'name', 'experience', 'wins']) satisfies z.ZodType<PlayerListSortBy>,
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor, skip, sort } = input;

      const items = (await ctx.db.player.findMany({
        skip: skip,
        take: limit + 1,
        cursor: cursor
          ? {
              playFabId: cursor,
            }
          : undefined,
        orderBy: [
          { rank: sort ? (sort === 'rank' ? 'asc' : undefined) : 'asc' },
          { displayName: sort === 'name' ? 'asc' : undefined },
          { experience: sort === 'experience' ? 'desc' : undefined },
          { rankedWins: sort === 'wins' ? 'desc' : undefined },
          { updatedAt: 'desc' }, // Secondary sort by update time descending
        ],
        distinct: ['rank'], // Ensure each rank is represented only once
        include: {
          snapshots: {
            orderBy: {
              createdAt: 'desc',
            },
            select: {
              displayName: true,
              rating: true,
              rank: true,
              createdAt: true,
            },
            take: limit,
            skip: 1,
          },
        },
      })) satisfies PlayerInfo[];

      let nextCursor: typeof cursor | undefined = undefined;

      if (items.length > input.limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.playFabId;
      }

      return {
        items,
        nextCursor,
      };
    }),

  getPlayerRanks: publicProcedure
    .input(
      z.object({
        playFabId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const player = await ctx.db.player.findUnique({
        where: {
          playFabId: input.playFabId,
        },
        include: {
          snapshots: {
            orderBy: {
              createdAt: 'asc',
            },
            select: {
              rank: true,
              createdAt: true,
            },
          },
        },
      });

      return player?.snapshots;
    }),
});
