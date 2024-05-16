import { type StaticImageData } from 'next/image';
import TierBronze from '~/assets/tiers/TierBronze.png';
import TierDiamond from '~/assets/tiers/TierDiamond.png';
import TierGold from '~/assets/tiers/TierGold.png';
import TierIron from '~/assets/tiers/TierIron.png';
import TierMaster from '~/assets/tiers/TierMaster.png';
import TierPlatinum from '~/assets/tiers/TierPlatinum.png';
import TierSilver from '~/assets/tiers/TierSilver.png';

export type Tier = {
  name: string;
  rating: number;
  image: StaticImageData;
};

export const Iron: Tier = { name: 'Iron', rating: 0, image: TierIron };
export const Bronze: Tier = { name: 'Bronze', rating: 400, image: TierBronze };
export const Silver: Tier = { name: 'Silver', rating: 600, image: TierSilver };
export const Gold: Tier = { name: 'Gold', rating: 800, image: TierGold };
export const Platinum: Tier = { name: 'Platinum', rating: 1000, image: TierPlatinum };
export const Diamond: Tier = { name: 'Diamond', rating: 1500, image: TierDiamond };
export const Master: Tier = { name: 'Master', rating: 2000, image: TierMaster };
export const Tiers: Tier[] = [Iron, Bronze, Silver, Gold, Platinum, Diamond, Master];

export function getTier(rating: number): Tier {
  let tier = Iron;

  for (const t of Tiers) {
    if (rating >= t.rating) {
      tier = t;
    }
  }

  return tier;
}
