/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Flex, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { Label } from './Label';
import { ThrottleValue } from './utils/ThrottleValue';

export const MarkdownInput: React.FunctionComponent<IFormtronControl> = ({ id, value, schema, onChange, valid }) => {
  return (
    <ThrottleValue ms={1000} value={value} onChange={onChange}>
      {({ value, onChange }) => (
        <Flex width="100%" alignItems="center">
          <Box flex="1">
            <Label htmlFor={id} invalid={!valid}>
              {schema.title}
            </Label>
          </Box>
          <Flex flex="1" width="100%">
            <Textarea
              width="100%"
              id={id}
              autosize={true}
              value={value}
              onChange={(e: React.SyntheticEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value)}
              invalid={!valid}
            />
          </Flex>
        </Flex>
      )}
    </ThrottleValue>
  );
};
