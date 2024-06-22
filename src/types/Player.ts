import { type Player, type Prisma } from '@prisma/client';
import { type Character } from '~/game/characters';

export type PlayerInfo = Prisma.PlayerGetPayload<{
  include: {
    snapshots: {
      select: {
        displayName: true;
        rating: true;
        rank: true;
        createdAt: true;
      };
    };
  };
}>;
export type TopCharacterPlayers = {
  character: Character;
  players: Player[];
};
