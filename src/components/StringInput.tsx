/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Flex, Input, Text } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';
import { useInvalidColor } from '../hooks';

export const StringInput: React.FunctionComponent<IFormtronControl> = ({ id, value = '', schema, onChange, valid }) => {
  const invalidColor = useInvalidColor(valid);

  return (
    <Flex width="100%">
      <Box flex="1">
        <Text as="label" htmlFor={id}>
          {schema.title}
        </Text>
      </Box>
      <Flex flex="1" width="100%">
        <Input
          type="text"
          id={id}
          value={value}
          onChange={e => onChange(e.currentTarget.value)}
          minLength={schema.minLength}
          maxLength={schema.maxLength}
          required={schema.required}
          flex="1"
          borderColor={invalidColor}
        />
      </Flex>
    </Flex>
  );
};
