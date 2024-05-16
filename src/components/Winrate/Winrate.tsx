import { Progress, Tooltip } from '@mantine/core';
import styles from './winrate.module.scss';

export interface WinrateProps extends React.ComponentProps<typeof Progress.Root> {
  wins: number;
  losses: number;
  className?: string;
}

export default function Winrate({ wins, losses, className, ...props }: WinrateProps) {
  return (
    <Tooltip label={`${wins} Wins - ${losses} Losses`}>
      <Progress.Root size={13} className={className} {...props}>
        <Progress.Section value={Math.round((wins / (wins + losses)) * 100)} color="cyan">
          <Progress.Label className={styles.label}>{wins}W</Progress.Label>
        </Progress.Section>
        <Progress.Section
          value={Math.round((losses / (wins + losses)) * 100)}
          className={styles.label}
          color="pink"
        >
          <Progress.Label className={styles.label}>{losses}L</Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </Tooltip>
  );
}
