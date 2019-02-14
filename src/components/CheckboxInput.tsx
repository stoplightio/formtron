/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Checkbox, Flex, Text } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';
import { useInvalidColor } from '../hooks';

export const CheckboxInput: React.FunctionComponent<IFormtronControl> = ({ id, value, onChange, schema, valid }) => {
  const invalidColor = useInvalidColor(valid);

  return (
    <Flex width="100%">
      <Box flex="1">
        <Text as="label" htmlFor={id}>
          {schema.title}
        </Text>
      </Box>
      <Flex flex="1" width="100%">
        <Checkbox id={id} checked={value} disabled={false} onChange={onChange} borderColor={invalidColor} />
      </Flex>
    </Flex>
  );
};
