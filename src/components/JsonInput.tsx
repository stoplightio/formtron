import * as React from 'react';

import { Box, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { DraftValue } from './utils/DraftValue';

export const JsonInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value,
  schema,
  onChange,
  path,
  disabled = false,
}) => {
  const { variant } = useDiagnostics(path);
  return (
    <DraftValue
      value={JSON.stringify(value, null, 2)}
      onChange={draft => {
        try {
          onChange(JSON.parse(draft));
        } catch (err) {
          // do nothing
        }
      }}
    >
      {({ value, onChange, nonDraftValue }) => {
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
                color={nonDraftValue === value ? undefined : 'red'}
                id={id}
                value={value}
                onChange={(e: React.SyntheticEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value)}
                variant={variant}
                disabled={disabled}
                width="100%"
              />
            </Box>
          </Box>
        );
      }}
    </DraftValue>
  );
};
