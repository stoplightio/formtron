/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Flex, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';
import { useInvalidColor } from '../hooks';

import { ThrottleValue } from './utils/ThrottleValue';

export const MarkdownInput: React.FunctionComponent<IFormtronControl> = ({ id, value, schema, onChange, valid }) => {
  const invalidColor = useInvalidColor(valid);

  return (
    <ThrottleValue ms={1000} value={value} onChange={onChange}>
      {({ value, onChange }) => (
        <Flex width="100%">
          <Box flex="1" as="label" htmlFor={id}>
            {schema.title}
          </Box>
          <Flex flex="1" width="100%">
            <Textarea
              width="100%"
              id={id}
              autosize={true}
              value={value}
              onChange={(e: React.SyntheticEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value)}
              borderColor={invalidColor}
            />
          </Flex>
        </Flex>
      )}
    </ThrottleValue>
  );
};
