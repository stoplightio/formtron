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
        valid: '#009000',
        invalid: '#ff253a'
      },
    } : {
      canvas: {
        bg: '#fff',
        fg: '#111',
        valid: '#009000',
        invalid: '#c6211f'
      },
    },
};
