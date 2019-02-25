/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Flex, Input } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { Variant } from './types';

export const StringInput: React.FunctionComponent<IFormtronControl> = ({ id, value = '', schema, onChange, path }) => {
  const { variant } = useDiagnostics(path);

  return (
    <Flex width="100%" alignItems="center">
      <Box flex="1">
        <Messages path={path}>
          <Label htmlFor={id} variant={variant}>
            {schema.title}
          </Label>
        </Messages>
      </Box>
      <Flex flex="1" width="100%">
        <Input
          type="text"
          id={id}
          value={value}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
          minLength={schema.minLength}
          maxLength={schema.maxLength}
          required={schema.required}
          flex="1"
          invalid={variant === Variant.invalid}
        />
      </Flex>
    </Flex>
  );
};
