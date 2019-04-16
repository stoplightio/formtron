import { Box, Checkbox, Flex } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';

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
    <Flex flexDirection="column" width="100%" height="100%">
      <Box>
        <Messages path={path}>
          <Label htmlFor={id} variant={variant} disabled={disabled}>
            {schema.title}
          </Label>
        </Messages>
      </Box>
      <Flex alignItems="center" flex="1">
        <Checkbox
          mr="auto"
          id={id}
          checked={value}
          onChange={onChange}
          variant={variant}
          disabled={disabled}
        />
      </Flex>
    </Flex>
  );
};
