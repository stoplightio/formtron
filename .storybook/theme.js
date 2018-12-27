import { createThemedModule } from '@stoplight/ui-kit';

const { useTheme, ThemeProvider, ThemeZone } = createThemedModule();

export { useTheme, ThemeProvider, ThemeZone };

export const themes = ['dark', 'light'];

export const zones = {
  'formtron': ({ base }) => base === 'dark'
    ? {
      canvas: {
        bg: '#111',
        fg: '#fff',
        valid: '#8b0000',
        invalid: '#009000'
      },
    } : {
      canvas: {
        bg: '#fff',
        fg: '#111',
        valid: '#8b0000',
        invalid: '#009000'
      },
    },
};
