/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Flex, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { ThrottleValue } from './utils/ThrottleValue';

export const MarkdownInput: React.FunctionComponent<IFormtronControl> = ({ id, value, schema, onChange, path }) => {
  const { variant } = useDiagnostics(path);
  return (
    <ThrottleValue ms={1000} value={value} onChange={onChange}>
      {({ value, onChange }) => (
        <Flex width="100%" alignItems="center">
          <Box flex="1">
            <Messages path={path}>
              <Label htmlFor={id} variant={variant}>
                {schema.title}
              </Label>
            </Messages>
          </Box>
          <Flex flex="1" width="100%">
            <Textarea
              width="100%"
              id={id}
              autosize={true}
              value={value}
              onChange={(e: React.SyntheticEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value)}
              invalid={(variant as string) === 'invalid'}
            />
          </Flex>
        </Flex>
      )}
    </ThrottleValue>
  );
};
