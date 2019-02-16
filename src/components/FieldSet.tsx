/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, IBox } from '@stoplight/ui-kit';

import { useInvalidBorder } from './hooks';

interface IFieldSet extends IBox<HTMLFieldSetElement> {
  legend: HTMLElement | string;
  invalid: boolean;
}

export const FieldSet: React.FunctionComponent<IFieldSet> = ({ legend, invalid, children }) => {
  const invalidColor = useInvalidBorder(!invalid);
  return (
    <Box as="fieldset" border={`1px solid ${invalidColor || 'currentColor'}`}>
      <Box as="legend" color={invalidColor}>
        {legend}
      </Box>
      {children}
    </Box>
  );
};
