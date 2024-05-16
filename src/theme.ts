import { createTheme, type MantineColorsTuple } from '@mantine/core';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });

const THEME_COLORS: MantineColorsTuple = [
  '#e5f4ff',
  '#cde2ff',
  '#9bc2ff',
  '#64a0ff',
  '#3984fe',
  '#1d72fe',
  '#0969ff',
  '#0058e4',
  '#004ecc',
  '#0043b5',
];

export const theme = createTheme({
  fontFamily: montserrat.style.fontFamily,
  colors: {
    themeColors: THEME_COLORS,
  },
});
