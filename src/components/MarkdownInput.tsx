import * as React from 'react';

import { Box, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { useThrottledValue } from '../hooks/useThrottledValue';
import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { Variant } from './types';

export const MarkdownInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value,
  schema,
  onChange,
  path,
  disabled = false,
}) => {
  const { variant } = useDiagnostics(path);
  const [draft, _onChange] = useThrottledValue(value, onChange, 1000);
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
        <Textarea
          width="100%"
          id={id}
          autosize={true}
          value={draft}
          onChange={(e: React.SyntheticEvent<HTMLTextAreaElement>) => _onChange(e.currentTarget.value)}
          invalid={variant === Variant.invalid}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};
