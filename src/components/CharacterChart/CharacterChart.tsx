import { BarChart as MantineBarChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { Title, Tooltip } from '@mantine/core';
import { type Player } from '@prisma/client';
import { getImageProps } from 'next/image';
import { Characters } from '~/game/characters';
import { getLevel } from '~/game/levels';
import { type TickProps } from '~/types/BarChart';

export interface CharacterChartProps {
  player: Player;
}

export default function CharacterChart({ player }: CharacterChartProps) {
  const data = mapCharactersToData(player);

  return (
    <>
      <Title order={2} mb="lg">
        Character stats
      </Title>
      <MantineBarChart
        h={300}
        data={data}
        dataKey="character"
        tooltipAnimationDuration={200}
        yAxisProps={{ width: 80 }}
        series={[{ name: 'Experience', color: 'cyan' }]}
        tickLine="xy"
        xAxisProps={{
          interval: 0,
          height: 50,
          tick({ x, y, payload }: TickProps) {
            const character = Characters.find((c) => c.name === payload.value);

            if (!character) return <></>;

            const characterExp = player[character.statName];
            const labelSize = 20;
            const imageProps = getImageProps({
              src: character.icon,
              alt: payload.value,
              width: labelSize,
              height: labelSize,
            });
            const characterLvl =
              typeof characterExp === 'number' ? getLevel(characterExp, 'character') : 0;

            return (
              <Tooltip label={character.name}>
                <g>
                  <text
                    x={x}
                    y={y + 10}
                    style={{
                      fontSize: 10,
                      fill: 'var(--mantine-color-white)',
                      textAnchor: 'middle',
                      // transform: 'translate(-10px, 0)',
                    }}
                  >
                    Lv. {characterLvl}
                  </text>
                  <image
                    href={imageProps.props.src}
                    height={labelSize}
                    width={labelSize}
                    x={x - 10}
                    y={y + 20}
                  />
                </g>
              </Tooltip>
            );
          },
        }}
      />
    </>
  );
}

function mapCharactersToData(player: Player) {
  return Characters.map((character) => {
    const exp = player[character.statName];

    return {
      character: character.name,
      Experience: exp ? Number(exp) : 0,
    };
  }).sort((a, b) => b.Experience - a.Experience);
}
