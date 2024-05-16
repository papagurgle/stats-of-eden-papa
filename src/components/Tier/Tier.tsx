import { Image, Text } from '@mantine/core';
import NextImage from 'next/image';
import { getTier } from '~/game/tiers';

export interface TierProps {
  rating: number;
  size: 'small' | 'large';
}

export default function Tier({ size, rating }: TierProps) {
  const tier = getTier(rating);

  return (
    <>
      <Image
        component={NextImage}
        w={size === 'large' ? 30 : 22}
        h={size === 'large' ? 30 : 22}
        radius="sm"
        src={tier.image}
        alt={tier.name}
      />
      <Text size="xs">
        {tier.name} - {rating}
      </Text>
    </>
  );
}
