import { UnstyledButton, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'classnames';
import classes from './color-scheme-toggle.module.scss';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <UnstyledButton
      className={classes.control}
      aria-label="Toggle color scheme"
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </UnstyledButton>
  );
}
