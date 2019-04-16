import { Box, Input } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';

export const StringInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value = '',
  schema,
  onChange,
  path,
  disabled = false,
}) => {
  const { variant } = useDiagnostics(path);

  return (
    <Box>
      <Box>
        <Messages path={path}>
          <Label htmlFor={id} variant={variant} disabled={disabled}>
            {schema.title}
          </Label>
        </Messages>
      </Box>
      <Box>
        <Input
          type="text"
          id={id}
          value={value}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
          minLength={schema.minLength}
          maxLength={schema.maxLength}
          required={schema.required}
          flex="1"
          variant={variant}
          disabled={disabled}
          width="100%"
        />
      </Box>
    </Box>
  );
};
