import * as React from 'react';

import { Box, Flex, Textarea } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';
import { DraftValue } from '../DraftValue';

import { ValidityIndicator } from './ValidityIndicator';

export const JsonInput: React.SFC<IFormtronControl> = ({ id, value, schema, onChange }) => {
  const [validityState, changeValidityState] = React.useState<boolean | null>(null);

  const onBlur = React.useCallback(e => {
    changeValidityState(e.target.checkValidity());
  }, []);

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
            <Box flex="1">
              <Flex width="100%">
                <Textarea
                  flex="1"
                  autosize={true}
                  color={nonDraftValue === value ? undefined : 'red'}
                  id={id}
                  value={value}
                  onChange={(e: any) => onChange(e.target.value)}
                  onBlur={onBlur}
                />
                <ValidityIndicator state={validityState} />
              </Flex>
            </Box>
          </Flex>
        );
      }}
    </DraftValue>
  );
};
