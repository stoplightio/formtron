/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Flex, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { DraftValue } from './utils/DraftValue';

export const JsonInput: React.FunctionComponent<IFormtronControl> = ({ id, value, schema, onChange, path }) => {
  const { variant } = useDiagnostics(path);
  return (
    <Messages path={path}>
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
            <Flex width="100%" alignItems="center">
              <Box flex="1">
                <Label htmlFor={id} variant={variant}>
                  {schema.title}
                </Label>
              </Box>
              <Flex flex="1" width="100%">
                <Textarea
                  flex="1"
                  autosize={true}
                  color={nonDraftValue === value ? undefined : 'red'}
                  id={id}
                  value={value}
                  onChange={(e: React.SyntheticEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value)}
                  invalid={(variant as string) === 'invalid'}
                />
              </Flex>
            </Flex>
          );
        }}
      </DraftValue>
    </Messages>
  );
};
