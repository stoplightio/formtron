import * as React from 'react';

import { Box, IBox } from '@stoplight/ui-kit';

import { useBorder } from './hooks';
import { Variant } from './types';

interface IFieldSet extends IBox<HTMLFieldSetElement> {
  legend: HTMLElement | string;
  variant?: Variant;
}

export const FieldSet: React.FunctionComponent<IFieldSet> = ({ legend, variant, children }) => {
  const borderColor = useBorder(variant) || 'currentColor';
  return (
    <Box as="fieldset" border={`1px solid ${borderColor}`}>
      <Box as="legend" color={borderColor}>
        {legend}
      </Box>
      {children}
    </Box>
  );
};
