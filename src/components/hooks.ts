import { useTheme } from '../theme';
import { FormtronComponentVariant } from '../types';
const capitalize = require('lodash/capitalize');

const useProp = (prop: string) => (variant?: FormtronComponentVariant) => {
  const theme = useTheme();
  const _prop = variant ? (variant as string) + capitalize(prop) : prop;
  if (!theme.input || !theme.input[_prop]) return;
  return theme.input[_prop];
};

export const useBorder = useProp('border');

export const useFg = useProp('fg');

export const useBg = useProp('bg');
