import { type PlayerInfo } from '~/types/Player';
import { getPeakRating } from '~/utils/peakRating';

export type PlayerListSortBy = 'rank' | 'experience' | 'wins' | 'peak';

export function sortData(data: PlayerInfo[], payload: { sortBy: PlayerListSortBy }): PlayerInfo[] {
  const { sortBy } = payload;

  return [...data].sort((a, b) => {
    let tempA, tempB;

    if (sortBy === 'wins') {
      tempA = a.rankedWins;
      tempB = b.rankedWins;
    } else if (sortBy === 'experience') {
      tempA = a.experience;
      tempB = b.experience;
    } else if (sortBy === 'peak') {
      tempA = getPeakRating(a);
      tempB = getPeakRating(b);
    }

    if (typeof tempA === 'number' && typeof tempB === 'number') {
      return tempB - tempA;
    } else if (typeof tempA === 'number') {
      return 1;
    } else if (typeof tempB === 'number') {
      return -1;
    } else {
      return 0;
    }
  });
}
