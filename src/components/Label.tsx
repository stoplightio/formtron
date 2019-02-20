/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { IText, Text } from '@stoplight/ui-kit';

import { FormtronComponentVariant } from '../types';
import { useFg } from './hooks';

interface ILabel extends IText<HTMLLabelElement> {
  variant?: FormtronComponentVariant;
}

export const Label: React.FunctionComponent<ILabel> = ({ htmlFor, variant, children }) => {
  const fg = useFg(variant);
  return (
    <Text as="label" htmlFor={htmlFor} color={fg}>
      {children}
    </Text>
  );
};
