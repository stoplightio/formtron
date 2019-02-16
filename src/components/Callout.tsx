/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, IBox } from '@stoplight/ui-kit';

import { useTheme } from '../theme';

import { useInvalidBorder } from './hooks';

interface ICallout extends IBox<HTMLDivElement> {
  invalid: boolean;
}

export const Callout: React.FunctionComponent<ICallout> = ({ invalid, children }) => {
  const { canvas } = useTheme();
  const invalidColor = useInvalidBorder(!invalid);
  return (
    <Box
      border={`1px solid ${invalidColor || 'currentColor'}`}
      borderRadius="10px"
      backgroundColor={canvas && canvas.bg}
      p={2}
    >
      {children}
    </Box>
  );
};
