import { createThemedModule } from '@stoplight/ui-kit';
import { IFormtronTheme } from './types';

export type themeZones = 'formtron' | string;

export const { useTheme, ThemeZone } = createThemedModule<themeZones, IFormtronTheme>();
