import { UnstyledButton, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'classnames';
import styles from './color-scheme-toggle.module.scss';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <UnstyledButton
      className={styles.control}
      aria-label="Toggle color scheme"
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
    >
      <IconSun className={cx(styles.icon, styles.light)} stroke={1.5} />
      <IconMoon className={cx(styles.icon, styles.dark)} stroke={1.5} />
    </UnstyledButton>
  );
}
