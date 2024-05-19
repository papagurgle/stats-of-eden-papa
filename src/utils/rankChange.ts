import { type SSRPlayer } from '~/types/Player';

export type RankChange = 'up' | 'down' | 'none';

export function getRankChange(player: SSRPlayer): 'up' | 'down' | 'none' {
  if (!player.snapshots || player.snapshots.length === 0) {
    return 'none';
  }

  const previousSnapshot = player.snapshots[0];

  if (previousSnapshot?.rank && player.rank) {
    if (player.rank < previousSnapshot.rank) {
      return 'up';
    }

    if (player.rank > previousSnapshot.rank) {
      return 'down';
    }
  }

  return 'none';
}
