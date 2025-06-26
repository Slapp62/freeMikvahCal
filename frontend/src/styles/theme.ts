import { createTheme, virtualColor } from '@mantine/core';

const myTheme = createTheme({
    primaryColor: 'red',
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: 'pink',
      light: 'cyan',
    }),
    // Add your color
    white: [
      '#ffffff',
      '#f2f2f2',
      '#e6e6e6',
      '#d9d9d9',
      '#cccccc',
      '#bfbfbf',
      '#b3b3b3',
      '#a6a6a6',
      '#999999',
      '#8c8c8c',
    ],
    blue: [
      '#e6f0ff',
      '#dce4f5',
      '#b9c7e2',
      '#94a8d0',
      '#748dc1',
      '#5f7cb8',
      '#5474b4',
      '#44639f',
      '#39588f',
      '#2d4b81',
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  fontFamily: 'Raleway, sans-serif',
  headings: {
    fontFamily: 'Raleway, sans-serif',
    sizes: {
      h1: { fontSize: '36px' },
    },
  },
});

export default myTheme;