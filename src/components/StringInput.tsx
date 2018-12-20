/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Flex, Input, Text } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { ValidityIndicator } from './ValidityIndicator';

export const StringInput: React.SFC<IFormtronControl> = ({ id, value, schema, onChange }) => {
  const [validityState, changeValidityState] = React.useState<boolean | null>(null);

  const onBlur = React.useCallback(e => {
    changeValidityState(e.target.checkValidity());
  }, []);

  return (
    <Flex width="100%">
      <Box flex="1">
        <Text as="label" htmlFor={id}>
          {schema.title}
        </Text>
      </Box>
      <Box flex="1">
        <Flex width="100%">
          <Input
            type="text"
            id={id}
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
            minLength={schema.minLength}
            maxLength={schema.maxLength}
            required={schema.required}
            onBlur={onBlur}
            flex="1"
          />
          <Box>
            {schema.required && ' *'}
            <ValidityIndicator state={validityState} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};