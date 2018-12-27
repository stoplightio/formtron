import { createThemedModule, ICustomTheme } from '@stoplight/ui-kit';

export type themeZones = 'formtron' | string;

export type themeTypes = IFormtronTheme;

export interface IFormtronTheme extends ICustomTheme {
  canvas?: {
    bg: string;
    fg: string;
  };
  validation: {
    valid: string;
    invalid: string;
  };
}

export const { useTheme, ThemeZone } = createThemedModule<themeZones, themeTypes>();
