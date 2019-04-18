const capitalize = require('lodash/capitalize');
import { Variant } from '@stoplight/ui-kit';

import { useTheme } from '../../theme';

const useProp = (prop: string) => (variant?: Variant) => {
  const theme = useTheme();
  const _prop = variant ? variant + capitalize(prop) : prop;
  if (!theme.input || !theme.input[_prop]) return;
  return theme.input[_prop];
};

export const useBorder = useProp('border');

export const useFg = useProp('fg');

export const useBg = useProp('bg');
