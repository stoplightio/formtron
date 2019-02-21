/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Checkbox, Flex } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';

export const CheckboxInput: React.FunctionComponent<IFormtronControl> = ({ id, value, onChange, schema, path }) => {
  const { variant } = useDiagnostics(path);
  return (
    <Messages path={path}>
      <Flex width="100%" alignItems="center">
        <Box flex="1">
          <Label htmlFor={id} variant={variant}>
            {schema.title}
          </Label>
        </Box>
        <Flex flex="1" width="100%">
          <Checkbox
            id={id}
            checked={value}
            disabled={false}
            onChange={onChange}
            invalid={(variant as string) === 'invalid'}
          />
        </Flex>
      </Flex>
    </Messages>
  );
};
