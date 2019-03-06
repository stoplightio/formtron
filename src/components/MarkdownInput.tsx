import * as React from 'react';

import { Box, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { Variant } from './types';
import { ThrottleValue } from './utils/ThrottleValue';

export const MarkdownInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value,
  schema,
  onChange,
  path,
  disabled = false,
}) => {
  const { variant } = useDiagnostics(path);
  return (
    <ThrottleValue ms={1000} value={value} onChange={onChange}>
      {({ value, onChange }) => (
        <Box>
          <Box>
            <Messages path={path}>
              <Label htmlFor={id} variant={variant} disabled={disabled}>
                {schema.title}
              </Label>
            </Messages>
          </Box>
          <Box>
            <Textarea
              width="100%"
              id={id}
              autosize={true}
              value={value}
              onChange={(e: React.SyntheticEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value)}
              invalid={variant === Variant.invalid}
              disabled={disabled}
            />
          </Box>
        </Box>
      )}
    </ThrottleValue>
  );
};
