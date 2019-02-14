import { useTheme } from './theme';

export const useInvalidColor = (valid: boolean) => {
  const theme = useTheme();
  if (valid) return;
  if (!theme.canvas) return;
  return theme.canvas.invalid;
};
