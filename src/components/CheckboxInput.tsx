import { Box, Checkbox, Flex } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { Variant } from './types';

export const CheckboxInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value,
  onChange,
  schema,
  path,
  disabled = false,
}) => {
  const { variant } = useDiagnostics(path);
  return (
    <Flex width="100%" height="100%" alignItems="center">
      <Box flex="1">
        <Messages path={path}>
          <Label htmlFor={id} variant={variant} disabled={disabled}>
            {schema.title}
          </Label>
        </Messages>
      </Box>
      <Box flex="1">
        <Checkbox
          id={id}
          checked={value}
          onChange={onChange}
          invalid={variant === Variant.invalid}
          disabled={disabled}
        />
      </Box>
    </Flex>
  );
};
