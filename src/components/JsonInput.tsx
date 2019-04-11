import * as React from 'react';

import { Box, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { useDraftValue } from '../hooks/useDraftValue';
import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { Variant } from './types';

export const JsonInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value,
  schema,
  onChange,
  path,
  disabled = false,
}) => {
  const { variant } = useDiagnostics(path);
  const [draft, _onChange, _value] = useDraftValue(JSON.stringify(value, null, 2), (draft: any) => {
    try {
      onChange(JSON.parse(draft));
    } catch (err) {
      // do nothing
    }
  });
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
          flex="1"
          autosize={true}
          color={_value === draft ? undefined : 'red'}
          id={id}
          value={draft}
          onChange={(e: React.SyntheticEvent<HTMLTextAreaElement>) => _onChange(e.currentTarget.value)}
          invalid={variant === Variant.invalid}
          disabled={disabled}
          width="100%"
        />
      </Box>
    </Box>
  );
};
