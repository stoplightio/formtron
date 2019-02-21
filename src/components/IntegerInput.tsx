/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Flex, Input } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { DiagnosticMessagesContext } from './DiagnosticMessagesContext';
import { Label } from './Label';
import { Messages } from './Messages';

export const IntegerInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value,
  schema,
  onChange,
  path,
  fieldComponents,
  variant,
}) => {
  const getMessages = React.useContext(DiagnosticMessagesContext);
  const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];

  return (
    <Messages variant={variant} messages={getMessages(path)}>
      <Flex width="100%" alignItems="center">
        <Box flex="1">
          <Label htmlFor={id} variant={variant}>
            {schema.title}
          </Label>
        </Box>
        <Flex flex="1" width="100%">
          <Input
            flex="1"
            type="number"
            id={id}
            step="1.0"
            value={value}
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) => onChange(Number(e.currentTarget.value))}
            invalid={(variant as string) === 'invalid'}
          />
          {CustomWidget && (
            <CustomWidget
              value={value}
              schema={schema}
              onChange={onChange}
              path={path}
              fieldComponents={fieldComponents}
              variant={variant}
            />
          )}
        </Flex>
      </Flex>
    </Messages>
  );
};
