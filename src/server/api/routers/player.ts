// Importing necessary libraries and utilities
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

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
        take: z.number(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db.player.findMany({
        take: input.take,
        skip: input.skip,
        orderBy: [
          { rank: 'asc' }, // Primary sort by rank ascending
          { updatedAt: 'desc' }, // Secondary sort by update time descending
        ],
        distinct: ['rank'], // Ensure each rank is represented only once
      });
    }),
});
