import { type Prisma } from '@prisma/client';

export type SSRPlayer = Prisma.PlayerGetPayload<{
  include: {
    snapshots: {
      select: {
        rating: true;
        rank: true;
        createdAt: true;
      };
    };
  };
}>;
