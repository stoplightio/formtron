/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { IText, Text } from '@stoplight/ui-kit';

import { useFg } from './hooks';
import { Variant } from './types';

interface ILabel extends IText<HTMLLabelElement> {
  variant?: Variant;
}

export const Label: React.FunctionComponent<ILabel> = ({ htmlFor, variant, children }) => {
  const fg = useFg(variant);
  return (
    <Text as="label" htmlFor={htmlFor} color={fg}>
      {children}
    </Text>
  );
};
