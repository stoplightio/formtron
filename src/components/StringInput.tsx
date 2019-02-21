/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Flex, Input, Text } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormtronControl } from '..';

import { useFg } from './hooks';
import { Messages } from './Messages';

export const StringInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value = '',
  schema,
  onChange,
  path,
  variant,
  // messages,
}) => {
  const fg = useFg(variant);
  return (
    <Messages variant={variant} messages={[path.join(' > ')]}>
      <Flex width="100%" alignItems="center">
        <Box flex="1">
          <Text as="label" htmlFor={id} color={fg}>
            {schema.title}
          </Text>
        </Box>
        <Flex flex="1" width="100%">
          <Input
            type="text"
            id={id}
            value={value}
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
            minLength={schema.minLength}
            maxLength={schema.maxLength}
            required={schema.required}
            flex="1"
            invalid={(variant as string) === ('invalid' as string)}
          />
        </Flex>
      </Flex>
    </Messages>
  );
};
