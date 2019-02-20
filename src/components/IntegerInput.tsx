/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Flex, Input } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { Label } from './Label';

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
  const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];

  return (
    <Flex width="100%" alignItems="center">
      <Box flex="1">
        <Label htmlFor={id} invalid={!valid}>
          {schema.title}
        </Label>
      </Box>
      <Flex flex="1" width="100%">
        <Input
          flex="1"
          type="number"
          id={id}
          step="1.0"
          value={value}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => onChange(Number(e.currentTarget.value))}
          invalid={!valid}
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
