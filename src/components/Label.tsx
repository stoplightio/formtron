import * as React from 'react';

import { IText, Text } from '@stoplight/ui-kit';

import { useFg } from './hooks';
import { Variant } from './types';

interface ILabel extends IText<HTMLLabelElement> {
  variant?: Variant;
}

export const Label: React.FunctionComponent<ILabel> = ({ htmlFor, variant, children, disabled = false }) => {
  const fg = useFg(variant);
  const disabledStyles = disabled
    ? {
        opacity: 0.6,
        cursor: 'not-allowed',
      }
    : null;
  return (
    <Text as="label" htmlFor={htmlFor} color={fg} css={{ ...disabledStyles }}>
      {children}
    </Text>
  );
};
