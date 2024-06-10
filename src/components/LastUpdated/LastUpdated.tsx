import { Text, Tooltip } from '@mantine/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
import Indicator from '~/components/Indicator/Indicator';
import styles from './last-updated.module.scss';

export interface LastUpdatedProps {
  time: Date;
  updating?: boolean;
  textOnly?: boolean;
}

TimeAgo.addDefaultLocale(en);

export default function LastUpdated({ time, updating, textOnly }: LastUpdatedProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(time);

  return textOnly ? (
    <Text size="xs" mb="xs" className={styles.text}>
      Site updates hourly
    </Text>
  ) : (
    <Tooltip label={`${formattedDate}${updating ? ' - Site is currently updating' : ''}`}>
      <Text size="xs" mb="xs" className={styles.text}>
        {updating ? <Indicator /> : <></>} Last updated: <ReactTimeAgo date={time} />. Updates
        hourly
      </Text>
    </Tooltip>
  );
}
