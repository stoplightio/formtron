/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Flex, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { DiagnosticMessagesContext } from './DiagnosticMessagesContext';
import { Label } from './Label';
import { Messages } from './Messages';
import { ThrottleValue } from './utils/ThrottleValue';

export const MarkdownInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value,
  schema,
  onChange,
  path,
  variant,
}) => {
  const getMessages = React.useContext(DiagnosticMessagesContext);
  return (
    <ThrottleValue ms={1000} value={value} onChange={onChange}>
      {({ value, onChange }) => (
        <Messages variant={variant} messages={getMessages(path)}>
          <Flex width="100%" alignItems="center">
            <Box flex="1">
              <Label htmlFor={id} variant={variant}>
                {schema.title}
              </Label>
            </Box>
            <Flex flex="1" width="100%">
              <Textarea
                width="100%"
                id={id}
                autosize={true}
                value={value}
                onChange={(e: React.SyntheticEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value)}
                invalid={(variant as string) === 'invalid'}
              />
            </Flex>
          </Flex>
        </Messages>
      )}
    </ThrottleValue>
  );
};
