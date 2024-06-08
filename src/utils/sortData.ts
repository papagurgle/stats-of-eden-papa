import { type PlayerInfo } from '~/types/Player';

export type PlayerListSortBy = 'rank' | 'name' | 'experience' | 'wins';

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
    } else if (sortBy === 'name') {
      tempA = b.displayName;
      tempB = a.displayName;
    }

    if (typeof tempA === 'number' && typeof tempB === 'number') {
      return tempB - tempA;
    } else if (typeof tempA === 'number') {
      return 1;
    } else if (typeof tempB === 'number') {
      return -1;
    } else if (typeof tempA === 'string' && typeof tempB === 'string') {
      return tempB.localeCompare(tempA);
    } else {
      return 0;
    }
  });
}
