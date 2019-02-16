/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { IText, Text } from '@stoplight/ui-kit';

import { useInvalidFg } from './hooks';

interface ILabel extends IText<HTMLLabelElement> {
  invalid: boolean;
}

export const Label: React.FunctionComponent<ILabel> = ({ htmlFor, invalid, children }) => {
  const fg = useInvalidFg(!invalid);
  return (
    <Text as="label" htmlFor={htmlFor} color={fg}>
      {children}
    </Text>
  );
};
