import { type Player } from '@prisma/client';
import { type StaticImageData } from 'next/image';
import ShotGoodBg from '~/assets/backgrounds/ShotGood_01c_05.png';
import ForestBg from '~/assets/backgrounds/td_landscape_forest_se2x.png';
import MountainBg from '~/assets/backgrounds/td_landscape_mountains_sf2x.png';
import WhiteBg from '~/assets/backgrounds/td_landscape_white2x.png';
import ChirettaSplash from '~/assets/characters/Chiretta_Splash_Transparent.png';
import DreadwyrmSplash from '~/assets/characters/Dreadwyrm_Splash_Transparent.png';
import GunnerSplash from '~/assets/characters/Gunner_Splash_Transparent.png';
import HarissaSplash from '~/assets/characters/Harissa_Splash_Transparent.png';
import HazelSplash from '~/assets/characters/Hazel_Splash_transparent.png';
import MaypulSplash from '~/assets/characters/Maypul_Splash_Transparent.png';
import NeeraSplash from '~/assets/characters/Neera_Splash_Transparent.png';
import QueenSplash from '~/assets/characters/Queen_Splash_Transparent.png';
import RevaSplash from '~/assets/characters/Reva_Splash_Transparent.png';
import SaffronSplash from '~/assets/characters/Saffron_Splash_Transparent.png';
import SelicySplash from '~/assets/characters/Selicy_Splash_Transparent.png';
import ShisoSplash from '~/assets/characters/Shiso_Splash_Transparent.png';
import ShopkeeperSplash from '~/assets/characters/Shopkeeper_Splash_Transparent.png';
import TerraSplash from '~/assets/characters/Terra_Splash_Transparent.png';
import VioletteSplash from '~/assets/characters/Violette_Splash_Transparent.png';
import ChirettaIcon from '~/assets/icons/200px-DoE_Chiretta_IconSqu.png';
import DreadwyrmIcon from '~/assets/icons/200px-DoE_Dreadwyrm_IconSqu.png';
import GunnerIcon from '~/assets/icons/200px-DoE_Gunner_IconSqu.png';
import HarissaIcon from '~/assets/icons/200px-DoE_Harissa_IconSqu.png';
import HazelIcon from '~/assets/icons/200px-DoE_Hazel_IconSqu.png';
import MaypulIcon from '~/assets/icons/200px-DoE_Maypul_IconSqu.png';
import NeeraIcon from '~/assets/icons/200px-DoE_Neera_IconSqu.png';
import QueenIcon from '~/assets/icons/200px-DoE_Queen_IconSqu.png';
import RevaIcon from '~/assets/icons/200px-DoE_Reva_IconSqu.png';
import SaffronIcon from '~/assets/icons/200px-DoE_Saffron_IconSqu.png';
import SelicyIcon from '~/assets/icons/200px-DoE_Selicy_IconSqu.png';
import ShisoIcon from '~/assets/icons/200px-DoE_Shiso_IconSqu.png';
import ShopkeeperIcon from '~/assets/icons/200px-DoE_Shopkeeper_IconSqu.png';
import TerraIcon from '~/assets/icons/200px-DoE_Terra_IconSqu.png';
import VioletteIcon from '~/assets/icons/200px-DoE_Violette_IconSqu.png';
// import ArenaBg from '~/assets/stages/Arena-bg.png';
// import ArenaBgD from '~/assets/stages/Arena-bg-dark.png';
// import EdenBg from '~/assets/stages/Eden-bg.png';
// import IceBg from '~/assets/stages/Ice-bg.png';
// import IslandBg from '~/assets/stages/Island-bg.png';
// import IslandBgD from '~/assets/stages/Island-bg-dark.png';
// import MountainBg from '~/assets/stages/Mountain-bg.png';
// import MountainBgR from '~/assets/stages/Mountain-bg-dark.png';

export type Character = {
  name: string;
  icon: StaticImageData;
  splash: StaticImageData;
  bg: StaticImageData;
};

export const Chiretta: Character = {
  name: 'Chiretta',
  icon: ChirettaIcon,
  splash: ChirettaSplash,
  bg: getBackgroundImage('Chiretta'),
};

export const Dreadwyrm: Character = {
  name: 'Dreadwyrm',
  icon: DreadwyrmIcon,
  splash: DreadwyrmSplash,
  bg: getBackgroundImage('Dreadwyrm'),
};

export const Gunner: Character = {
  name: 'Gunner',
  icon: GunnerIcon,
  splash: GunnerSplash,
  bg: getBackgroundImage('Gunner'),
};

export const Harissa: Character = {
  name: 'Harissa',
  icon: HarissaIcon,
  splash: HarissaSplash,
  bg: getBackgroundImage('Harissa'),
};

export const Hazel: Character = {
  name: 'Hazel',
  icon: HazelIcon,
  splash: HazelSplash,
  bg: getBackgroundImage('Hazel'),
};

export const Maypul: Character = {
  name: 'Maypul',
  icon: MaypulIcon,
  splash: MaypulSplash,
  bg: getBackgroundImage('Maypul'),
};

export const Neera: Character = {
  name: 'Neera',
  icon: NeeraIcon,
  splash: NeeraSplash,
  bg: getBackgroundImage('Neera'),
};

export const Queen: Character = {
  name: 'Queen',
  icon: QueenIcon,
  splash: QueenSplash,
  bg: getBackgroundImage('Queen'),
};

export const Reva: Character = {
  name: 'Reva',
  icon: RevaIcon,
  splash: RevaSplash,
  bg: getBackgroundImage('Reva'),
};

export const Saffron: Character = {
  name: 'Saffron',
  icon: SaffronIcon,
  splash: SaffronSplash,
  bg: getBackgroundImage('Saffron'),
};

export const Selicy: Character = {
  name: 'Selicy',
  icon: SelicyIcon,
  splash: SelicySplash,
  bg: getBackgroundImage('Selicy'),
};

export const Shiso: Character = {
  name: 'Shiso',
  icon: ShisoIcon,
  splash: ShisoSplash,
  bg: getBackgroundImage('Shiso'),
};

export const Shopkeeper: Character = {
  name: 'Shopkeeper',
  icon: ShopkeeperIcon,
  splash: ShopkeeperSplash,
  bg: getBackgroundImage('Shopkeeper'),
};

export const Terra: Character = {
  name: 'Terra',
  icon: TerraIcon,
  splash: TerraSplash,
  bg: getBackgroundImage('Terra'),
};

export const Violette: Character = {
  name: 'Violette',
  icon: VioletteIcon,
  splash: VioletteSplash,
  bg: getBackgroundImage('Violette'),
};

export const Characters: Character[] = [
  Chiretta,
  Dreadwyrm,
  Gunner,
  Harissa,
  Hazel,
  Maypul,
  Neera,
  Queen,
  Reva,
  Saffron,
  Selicy,
  Shiso,
  Shopkeeper,
  Terra,
  Violette,
];

export function getTopCharacter(player: Player): Character {
  let topCharacter: Character = Selicy;
  let topExp = 0;
  const chiretta = player.chirettaExp;
  const dreadwyrm = player.dreadwyrmExp;
  const gunner = player.gunnerExp;
  const harissa = player.harissaExp;
  const hazel = player.hazelExp;
  const maypul = player.maypulExp;
  const neera = player.neeraExp;
  const queen = player.queenExp;
  const reva = player.revaExp;
  const saffron = player.saffronExp;
  const selicy = player.selicyExp;
  const shiso = player.shisoExp;
  const shopkeeper = player.shopkeeperExp;
  const terra = player.terraExp;
  const violette = player.violetteExp;

  // loop over characters and find the one with the highest experience
  for (const character of Characters) {
    let exp = 0;

    switch (character.name) {
      case 'Chiretta':
        exp = chiretta ?? 0;
        break;
      case 'Dreadwyrm':
        exp = dreadwyrm ?? 0;
        break;
      case 'Gunner':
        exp = gunner ?? 0;
        break;
      case 'Harissa':
        exp = harissa ?? 0;
        break;
      case 'Hazel':
        exp = hazel ?? 0;
        break;
      case 'Maypul':
        exp = maypul ?? 0;
        break;
      case 'Neera':
        exp = neera ?? 0;
        break;
      case 'Queen':
        exp = queen ?? 0;
        break;
      case 'Reva':
        exp = reva ?? 0;
        break;
      case 'Saffron':
        exp = saffron ?? 0;
        break;
      case 'Selicy':
        exp = selicy ?? 0;
        break;
      case 'Shiso':
        exp = shiso ?? 0;
        break;
      case 'Shopkeeper':
        exp = shopkeeper ?? 0;
        break;
      case 'Terra':
        exp = terra ?? 0;
        break;
      case 'Violette':
        exp = violette ?? 0;
        break;
    }

    if (exp > topExp) {
      topExp = exp;
      topCharacter = character;
    }
  }

  return topCharacter;
}

// Function to return either the ShotGoodBg, ForestBg, MountainBg, WhiteBg based on the character. Hash the character name and use the modulo operator to get a number between 0 and 3. Use that number to select the background image.
export function getBackgroundImage(character: Character | string): StaticImageData {
  const backgrounds = [ShotGoodBg, ForestBg, MountainBg, WhiteBg];
  const index =
    Math.abs(hashCode(typeof character === 'string' ? character : character.name)) %
    backgrounds.length;

  return backgrounds[index] ?? ShotGoodBg;
}

function hashCode(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}
