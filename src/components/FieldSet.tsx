import * as React from 'react';

import { Box, IBox, Variant } from '@stoplight/ui-kit';

import { useBorder } from './hooks';

interface IFieldSet extends IBox<HTMLFieldSetElement> {
  legend: HTMLElement | string;
  variant?: Variant;
}

export const FieldSet: React.FunctionComponent<IFieldSet> = ({ legend, variant, children, disabled = false }) => {
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
