/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Flex, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';
import { useInvalidColor } from '../hooks';

import { DraftValue } from './utils/DraftValue';

export const JsonInput: React.FunctionComponent<IFormtronControl> = ({ id, value, schema, onChange, valid }) => {
  const invalidColor = useInvalidColor(valid);

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
          <Flex width="100%">
            <Box flex="1" as="label" htmlFor={id}>
              {schema.title}
            </Box>
            <Flex flex="1" width="100%">
              <Textarea
                flex="1"
                autosize={true}
                color={nonDraftValue === value ? undefined : 'red'}
                id={id}
                value={value}
                onChange={(e: React.SyntheticEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value)}
                borderColor={invalidColor}
              />
            </Flex>
          </Flex>
        );
      }}
    </DraftValue>
  );
};
