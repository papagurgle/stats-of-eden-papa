import { Center, Group, Table, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import cx from 'classnames';
import styles from './player-list.module.scss';

interface PlayerListTh extends React.ComponentPropsWithoutRef<typeof Table.Th> {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

export default function PlayerListTh({
  children,
  reversed,
  sorted,
  onSort,
  className,
  ...props
}: PlayerListTh) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  return (
    <Table.Th className={cx(styles.th, className)} {...props}>
      <UnstyledButton onClick={onSort} className={styles.thControl}>
        {/* mantine justify center */}
        <Group justify="space-between" gap="xs" wrap="nowrap">
          <Text fw="bold" fz="sm">
            {children}
          </Text>
          <Center className={styles.thIcon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}
