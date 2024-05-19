import { Tooltip } from '@mantine/core';
import { IconArrowBadgeDownFilled, IconArrowBadgeUpFilled, IconMinus } from '@tabler/icons-react';
import cx from 'classnames';
import { type RankChange } from '~/utils/rankChange';
import styles from './rank-change.module.scss';

export interface RankChangeProps {
  rank: number;
  previousRank: number;
  change: RankChange;
  reverse?: boolean;
  hideNone?: boolean;
}

export default function RankChange({
  rank,
  previousRank,
  change,
  reverse,
  hideNone,
}: RankChangeProps) {
  return (
    <Tooltip label={`Yesterday's rank: ${previousRank}`} position="left" withArrow>
      <span className={cx(styles.rank, reverse && styles.reverse)}>
        {
          {
            up: <IconArrowBadgeUpFilled className={cx(styles.rankChange, styles.up)} size={20} />,
            down: (
              <IconArrowBadgeDownFilled className={cx(styles.rankChange, styles.down)} size={20} />
            ),
            none:
              hideNone && change === 'none' ? (
                <></>
              ) : (
                <IconMinus className={cx(styles.rankChange, styles.none)} size={20} />
              ),
          }[change]
        }
        {rank}
      </span>
    </Tooltip>
  );
}
