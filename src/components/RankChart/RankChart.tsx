import { LineChart } from '@mantine/charts';
import { Paper, Text, Title } from '@mantine/core';
import { type Payload } from '~/types/LineChart';
import { type PlayerInfo } from '~/types/Player';

export interface RankChartProps {
  player: PlayerInfo;
}

interface ChartTooltipProps {
  label: string;
  payload: Payload[] | undefined;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(date);
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      {payload.map((item, i) =>
        Object.entries(item.payload).map(([key, value]) => (
          <>
            {key === 'rank' && !(value instanceof Date) && (
              <Text key={i} fz="sm">
                Rank: {value}
              </Text>
            )}
            {key === 'rating' && !(value instanceof Date) && (
              <Text key={i} fz="sm">
                Rating: {value}
              </Text>
            )}
          </>
        ))
      )}
    </Paper>
  );
}

export default function RankChart({ player }: RankChartProps) {
  const data = player.snapshots.flatMap((entry, i) => {
    return entry.rank !== null
      ? {
          date: formatDate(entry.createdAt),
          rank: entry.rank,
          rating: entry.rating,
          index: i,
        }
      : [];
  });

  return (
    <>
      <Title order={2} mb="lg">
        Rank history
      </Title>
      {data.length > 1 ? (
        <LineChart
          h={300}
          data={data}
          dataKey="date"
          series={[{ name: 'rank', color: 'blue.6', label: 'Rank' }]}
          curveType="natural"
          withXAxis={false}
          connectNulls
          xAxisProps={{
            padding: {
              right: 20,
            },
            reversed: true,
          }}
          yAxisProps={{
            padding: {
              bottom: 40,
              top: 40,
            },
            reversed: true,
            allowDecimals: false,
            domain: [Math.max(...data.map((entry) => entry.rank), 1), 0],
          }}
          tooltipProps={{
            // @ts-expect-error overwriting types
            content: ({ label, payload }: ChartTooltipProps) => {
              return <ChartTooltip label={label} payload={payload} />;
            },
          }}
        />
      ) : (
        <Text ta="center">No rank history available</Text>
      )}
    </>
  );
}
