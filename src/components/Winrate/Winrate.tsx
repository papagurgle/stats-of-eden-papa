import { Progress, Tooltip } from '@mantine/core';
import styles from './winrate.module.scss';

export interface WinrateProps extends React.ComponentProps<typeof Progress.Root> {
  wins: number;
  losses: number;
  className?: string;
}

export default function Winrate({ wins, losses, className, ...props }: WinrateProps) {
  const noGames = wins + losses === 0;

  return (
    <Tooltip label={`${wins} Wins - ${losses} Losses`}>
      <Progress.Root size={13} className={className} {...props}>
        <Progress.Section
          // prettier-ignore
          value={Math.round(noGames ? (wins / (wins + losses)) : 0.5) * 100}
          color="cyan"
        >
          <Progress.Label className={styles.label}>{wins}W</Progress.Label>
        </Progress.Section>
        <Progress.Section
          // prettier-ignore
          value={Math.round(noGames ? (losses / (wins + losses)) : 0.5) * 100}
          className={styles.label}
          color="pink"
        >
          <Progress.Label className={styles.label}>{losses}L</Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </Tooltip>
  );
}
