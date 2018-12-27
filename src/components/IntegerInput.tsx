/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Flex, Input, Text } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { ValidityIndicator } from './ValidityIndicator';

export const IntegerInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value,
  selection,
  onChange,
  schema,
  fieldComponents,
}) => {
  const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];
  const [validityState, changeValidityState] = React.useState<boolean | null>(null);

  const onBlur = React.useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
    changeValidityState(e.currentTarget.checkValidity());
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
            flex="1"
            type="number"
            id={id}
            step="1.0"
            value={value}
            onChange={e => onChange(Number(e.currentTarget.value))}
            required={schema.required}
            onBlur={onBlur}
          />
          <Box>
            {schema.required && ' *'}
            <ValidityIndicator state={validityState} />
            {CustomWidget && (
              <CustomWidget
                value={value}
                schema={schema}
                selection={selection}
                onChange={onChange}
                fieldComponents={fieldComponents}
              />
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
