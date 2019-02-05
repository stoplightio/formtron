/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box } from '@stoplight/ui-kit';
import * as React from 'react';
import { useTheme } from '../theme';

interface IValidityIndicator {
  state: boolean | null;
}

export const ValidityIndicator: React.FunctionComponent<IValidityIndicator> = ({ state }) => {
  const theme = useTheme();

  if (state === false) {
    return (
      <Box display="inline-block" pl={1} color={theme.canvas && theme.canvas.invalid}>
        *
      </Box>
    );
  } else if (state === true) {
    return (
      <Box display="inline-block" pl={1} color={theme.canvas && theme.canvas.valid}>
        ✓
      </Box>
    );
  } else {
    return <Box display="inline-block" />;
  }
};
