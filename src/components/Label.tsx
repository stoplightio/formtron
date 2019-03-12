import toUpper = require('lodash/toUpper');
import * as React from 'react';

import { IText, Text } from '@stoplight/ui-kit';

import { Variant } from './types';

interface ILabel extends IText<HTMLLabelElement> {
  variant?: Variant;
}

export const Label: React.FunctionComponent<ILabel> = ({ htmlFor, variant, children, disabled = false }) => {
  const disabledStyles = disabled
    ? {
        opacity: 0.6,
        cursor: 'not-allowed',
      }
    : null;
  return (
    <Text
      fontWeight={800}
      fontSize="11px"
      mb="6px"
      ml="2px"
      as="label"
      color="rgb(118, 130, 143)"
      display="block"
      htmlFor={htmlFor}
      css={{ ...disabledStyles }}
    >
      {typeof children === 'string' ? toUpper(children) : children}
    </Text>
  );
};
