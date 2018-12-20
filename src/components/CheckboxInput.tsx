/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Checkbox, Flex, Text } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { ValidityIndicator } from './ValidityIndicator';

export const CheckboxInput: React.SFC<IFormtronControl> = ({ id, value, onChange, schema }) => {
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
          <Checkbox
            id={id}
            checked={value}
            disabled={false}
            onChange={_value => onChange(_value)}
            required={schema.required}
            onBlur={onBlur}
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
