import { Image, Tooltip } from '@mantine/core';
import cx from 'classnames';
import NextImage from 'next/image';
import { FLAG_CODES } from '~/utils/flags';
import styles from './flag.module.scss';

export interface FlagProps {
  country: string;
  city: string;
  size: number;
  className?: string;
}

export default function Flag({ city, country, size, className }: FlagProps) {
  return (
    <Tooltip label={`${FLAG_CODES[country.toLowerCase() as keyof typeof FLAG_CODES]}`}>
      <Image
        radius="xs"
        w="auto"
        width={size}
        height={size / (96 / 72)}
        src={`https://flagcdn.com/96x72/${country.toLowerCase()}.png`}
        alt={`Flag of ${country}`}
        component={NextImage}
        className={cx(styles.flag, className)}
      />
    </Tooltip>
  );
}
