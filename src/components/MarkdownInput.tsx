import * as React from 'react';

import { Box, Flex, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { ThrottleValue } from './utils/ThrottleValue';

import { ValidityIndicator } from './ValidityIndicator';

export const MarkdownInput: React.SFC<IFormtronControl> = ({ id, value, schema, onChange }) => {
  const [validityState, changeValidityState] = React.useState<boolean | null>(null);

  const onBlur = React.useCallback(e => {
    changeValidityState(e.target.checkValidity());
  }, []);

  return (
    <ThrottleValue ms={1000} value={value} onChange={onChange}>
      {({ value, onChange }) => (
        <Flex width="100%">
          <Box flex="1" as="label" htmlFor={id}>
            {schema.title}
          </Box>
          <Box flex="1">
            <Flex width="100%">
              <Textarea
                width="100%"
                id={id}
                autosize={true}
                value={value}
                onChange={(e: any) => onChange(e.target.value)}
                onBlur={onBlur}
              />
              {schema.required && ' *'}
              <ValidityIndicator state={validityState} />
            </Flex>
          </Box>
        </Flex>
      )}
    </ThrottleValue>
  );
};
