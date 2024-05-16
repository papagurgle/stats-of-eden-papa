import { BarChart as MantineBarChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { Tooltip } from '@mantine/core';
import { type Player } from '@prisma/client';
import { getImageProps } from 'next/image';
import { Characters } from '~/game/characters';
import { type TickProps } from '~/types/BarChart';

export interface CharacterChartProps {
  player: Player;
}

export default function CharacterChart({ player }: CharacterChartProps) {
  const mapCharactersToData = (player: Player) => {
    return Characters.map((character) => {
      const exp = player[`${character.name.toLowerCase()}Exp` as keyof Player];

      return {
        character: character.name,
        Experience: exp ? Number(exp) : 0,
      };
    }).sort((a, b) => b.Experience - a.Experience);
  };

  const data = mapCharactersToData(player);

  return (
    <>
      <MantineBarChart
        h={300}
        data={data}
        dataKey="character"
        yAxisProps={{ width: 80 }}
        series={[{ name: 'Experience', color: 'cyan' }]}
        tickLine="xy"
        xAxisProps={{
          interval: 0,
          tick({ x, y, payload }: TickProps) {
            const labelSize = 20;
            const characterImage = Characters.find((c) => c.name === payload.value)?.icon ?? '';
            const characterName = Characters.find((c) => c.name === payload.value)?.name ?? '';
            const imageProps = getImageProps({
              src: characterImage,
              alt: payload.value,
              width: labelSize,
              height: labelSize,
            });

            return (
              <Tooltip label={characterName}>
                <image
                  href={imageProps.props.src}
                  height={labelSize}
                  width={labelSize}
                  x={x - 10}
                  y={y}
                />
              </Tooltip>
            );
          },
        }}
      />
    </>
  );
}
