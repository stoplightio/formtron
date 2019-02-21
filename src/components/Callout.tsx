/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, IBox } from '@stoplight/ui-kit';

import { FormtronComponentVariant } from '../types';
import { useBg, useBorder, useFg } from './hooks';

interface ICallout extends IBox<HTMLDivElement> {
  variant?: FormtronComponentVariant;
}

export const Callout: React.FunctionComponent<ICallout> = ({ variant, children }) => {
  const borderColor = useBorder(variant);
  const fg = useFg(variant);
  const bg = useBg(variant);
  return (
    <Box
      border={`1px solid ${borderColor || 'currentColor'}`}
      borderRadius="10px"
      backgroundColor={bg}
      color={fg}
      p={2}
    >
      {children}
    </Box>
  );
};
