/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Button, Flex, Text } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { FieldSet } from './FieldSet';
import { DraftValue } from './utils/DraftValue';
import { EasyObject } from './utils/EasyObject';

export const ObjectInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value = {},
  schema,
  onChange,
  fieldComponents,
  selection,
  valid,
}) => {
  // Make this thing an array
  const easyObject = new EasyObject(value, schema.default);
  const KeyWidget = fieldComponents[schema.keys.type];
  const ValWidget = fieldComponents[schema.values.type];

  const noConflict = (key: any) => !(key in value);

  return (
    <FieldSet position="relative" invalid={!valid} legend={schema.title}>
      {easyObject.items.map((entry, index) => {
        const [key, val] = entry;
        const _selection = selection === '' || selection === '.' ? `${index}` : `${selection}.${index}`;
        return (
          <Flex key={`${index}-${easyObject.items.length}`}>
            <Flex flexDirection="column">
              <Button type="button" title="Insert item" onClick={() => onChange(easyObject.insert(index))}>
                <Text color="green">+</Text>
              </Button>
              <Button type="button" title="Delete item" onClick={() => onChange(easyObject.remove(index))}>
                <Text color="red">x</Text>
              </Button>
            </Flex>
            <DraftValue value={key} onChange={_key => noConflict(_key) && onChange(easyObject.updateKey(index, _key))}>
              {({ value, onChange }) => {
                return (
                  <React.Fragment>
                    <Box flex={1}>
                      <KeyWidget
                        id={(id && `${id}-${index}`) || undefined}
                        value={value}
                        schema={schema.keys}
                        selection={_selection}
                        fieldComponents={fieldComponents}
                        onChange={_key => onChange(_key)}
                        valid={key === value}
                        validationMessages={[]}
                      />
                    </Box>
                  </React.Fragment>
                );
              }}
            </DraftValue>
            <Box flex={1}>
              <ValWidget
                id={(id && `${id}-${index}`) || undefined}
                value={val}
                schema={schema.values}
                selection={_selection}
                fieldComponents={fieldComponents}
                onChange={_val => onChange(easyObject.updateVal(index, _val))}
                valid={true}
                validationMessages={[]}
              />
            </Box>
          </Flex>
        );
      })}
      <Button type="button" title="Append item" onClick={() => onChange(easyObject.append())}>
        <Text color="green">+</Text>
      </Button>
    </FieldSet>
  );
};
