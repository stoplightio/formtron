import { Box, Flex, Input } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';

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
    <Box>
      <Box>
        <Messages path={path}>
          <Label htmlFor={id} variant={variant} disabled={disabled}>
            {schema.title}
          </Label>
        </Messages>
      </Box>
      <Flex>
        <Input
          flex="1"
          type="number"
          id={id}
          step="1.0"
          value={value}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => onChange(Number(e.currentTarget.value))}
          variant={variant}
          disabled={disabled}
          width="100%"
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
    </Box>
  );
};
