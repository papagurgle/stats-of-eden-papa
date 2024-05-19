import { Text, Tooltip } from '@mantine/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
import styles from './last-updated.module.scss';

export interface LastUpdatedProps {
  time: Date;
}

TimeAgo.addDefaultLocale(en);

export default function LastUpdated({ time }: LastUpdatedProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(time);

  return (
    <Tooltip label={formattedDate}>
      <Text size="xs" mb="xs" className={styles.text}>
        Last updated: <ReactTimeAgo date={time} />. Updates hourly
      </Text>
    </Tooltip>
  );
}
