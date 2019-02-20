/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, IBox } from '@stoplight/ui-kit';

import { useTheme } from '../theme';

import { FormtronComponentVariant } from '../types';
import { useBorder } from './hooks';

interface ICallout extends IBox<HTMLDivElement> {
  variant?: FormtronComponentVariant;
}

export const Callout: React.FunctionComponent<ICallout> = ({ variant, children }) => {
  const { canvas } = useTheme();
  const borderColor = useBorder(variant);
  return (
    <Box
      border={`1px solid ${borderColor || 'currentColor'}`}
      borderRadius="10px"
      backgroundColor={canvas && canvas.bg}
      p={2}
    >
      {children}
    </Box>
  );
};
