/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Flex, Input, Text } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';
import { useInvalidColor } from '../hooks';

export const IntegerInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value,
  selection,
  onChange,
  schema,
  fieldComponents,
  valid,
  validationMessages,
}) => {
  const invalidColor = useInvalidColor(valid);
  const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];

  return (
    <Flex width="100%">
      <Box flex="1">
        <Text as="label" htmlFor={id}>
          {schema.title}
        </Text>
      </Box>
      <Flex flex="1" width="100%">
        <Input
          flex="1"
          type="number"
          id={id}
          step="1.0"
          value={value}
          onChange={e => onChange(Number(e.currentTarget.value))}
          borderColor={invalidColor}
        />
        {CustomWidget && (
          <CustomWidget
            value={value}
            schema={schema}
            selection={selection}
            onChange={onChange}
            fieldComponents={fieldComponents}
            valid={true}
            validationMessages={[]}
          />
        )}
      </Flex>
    </Flex>
  );
};
