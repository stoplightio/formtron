/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Flex, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { ThrottleValue } from './utils/ThrottleValue';

import { ValidityIndicator } from './ValidityIndicator';

export const MarkdownInput: React.FunctionComponent<IFormtronControl> = ({ id, value, schema, onChange }) => {
  const [validityState, changeValidityState] = React.useState<boolean | null>(null);

  const onBlur = React.useCallback((e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    changeValidityState(e.currentTarget.checkValidity());
  }, []);

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
              onBlur={onBlur}
            />
            {schema.required && ' *'}
            <ValidityIndicator state={validityState} />
          </Flex>
        </Flex>
      )}
    </ThrottleValue>
  );
};
