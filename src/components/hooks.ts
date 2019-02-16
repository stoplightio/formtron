import { useTheme } from '../theme';

export const useInvalidBorder = (valid: boolean) => {
  const theme = useTheme();
  if (valid) return;
  if (!theme.input || !theme.input.invalidBorder) return;
  return theme.input.invalidBorder;
};

export const useInvalidFg = (valid: boolean) => {
  const theme = useTheme();
  if (valid) return;
  if (!theme.input || !theme.input.invalidFg) return;
  return theme.input.invalidFg;
};

export const useInvalidBg = (valid: boolean) => {
  const theme = useTheme();
  if (valid) return;
  if (!theme.input || !theme.input.invalidBg) return;
  return theme.input.invalidBg;
};
