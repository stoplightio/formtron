/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Button, Flex, Text } from '@stoplight/ui-kit';
import fromPairs = require('lodash/fromPairs');

import { fieldName, IFormtronControl } from '..';
import { DraftValue } from './DraftValue';
import { ValidityIndicator } from './ValidityIndicator';

export const ObjectInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value = {},
  schema,
  onChange,
  fieldComponents,
  selection,
}) => {
  // Make this thing an array
  const items = [...Object.entries(value)];
  const defaultValue = schema.default;
  const KeyWidget = fieldComponents[fieldName(schema.keys)];
  const ValWidget = fieldComponents[fieldName(schema.values)];

  const splice = (start: number, deleteCount: number, ...vals: any[]) => {
    items.splice(start, deleteCount, ...vals);
    return fromPairs(items);
  };

  const noConflict = (key: any) => !(key in value);

  const updateKey = (index: number, key: any) => splice(index, 1, [key, items[index][1]]);

  const updateVal = (index: number, val: any) => splice(index, 1, [items[index][0], val]);

  const insert = (index: number) => splice(index, 0, ['', defaultValue]);

  const append = () => splice(items.length, 0, ['', defaultValue]);

  const remove = (index: number) => splice(index, 1);

  return (
    <Box as="fieldset" position="relative">
      <legend>{schema.title}</legend>
      {(items as any[]).map((entry, index) => {
        const [key, val] = entry;
        const _selection = selection === '' || selection === '.' ? `${index}` : `${selection}.${index}`;
        return (
          <Flex key={`${index}-${items.length}`}>
            <Flex flexDirection="column">
              <Button type="button" title="Insert item" onClick={() => onChange(insert(index))}>
                <Text color="green">+</Text>
              </Button>
              <Button type="button" title="Delete item" onClick={() => onChange(remove(index))}>
                <Text color="red">x</Text>
              </Button>
            </Flex>
            <DraftValue value={key} onChange={_key => noConflict(_key) && onChange(updateKey(index, _key))}>
              {({ value, onChange }) => {
                return (
                  <React.Fragment>
                    <ValidityIndicator state={key !== value ? false : null} />
                    <Box flex={1}>
                      <KeyWidget
                        id={(id && `${id}-${index}`) || undefined}
                        value={value}
                        schema={schema.keys}
                        selection={_selection}
                        fieldComponents={fieldComponents}
                        onChange={_key => onChange(_key)}
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
                onChange={_val => onChange(updateVal(index, _val))}
              />
            </Box>
          </Flex>
        );
      })}
      <Button type="button" title="Append item" onClick={() => onChange(append())}>
        <Text color="green">+</Text>
      </Button>
    </Box>
  );
};
