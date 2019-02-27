import { Box, Flex, Input } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { Variant } from './types';

export const IntegerInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value,
  schema,
  onChange,
  path,
  fieldComponents,
  disabled = false,
}) => {
  const { variant } = useDiagnostics(path);
  const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];

  return (
    <Flex width="100%" alignItems="center">
      <Box flex="1">
        <Messages path={path}>
          <Label htmlFor={id} variant={variant} disabled={disabled}>
            {schema.title}
          </Label>
        </Messages>
      </Box>
      <Flex flex="1" width="100%">
        <Input
          flex="1"
          type="number"
          id={id}
          step="1.0"
          value={value}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => onChange(Number(e.currentTarget.value))}
          invalid={variant === Variant.invalid}
          disabled={disabled}
        />
        {CustomWidget && (
          <CustomWidget
            value={value}
            schema={schema}
            onChange={onChange}
            path={path}
            fieldComponents={fieldComponents}
            disabled={disabled}
          />
        )}
      </Flex>
    </Flex>
  );
};
