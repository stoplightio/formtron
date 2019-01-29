/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Button, Flex, Text } from '@stoplight/ui-kit';

import { fieldName, IFormtronControl } from '..';
import { DraftValue } from './DraftValue';
import { EasyObject } from './utils/EasyObject';
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
  const easyObject = new EasyObject(value, schema.default);
  const KeyWidget = fieldComponents[fieldName(schema.keys)];
  const ValWidget = fieldComponents[fieldName(schema.values)];

  const noConflict = (key: any) => !(key in value);

  return (
    <Box as="fieldset" position="relative">
      <legend>{schema.title}</legend>
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
                onChange={_val => onChange(easyObject.updateVal(index, _val))}
              />
            </Box>
          </Flex>
        );
      })}
      <Button type="button" title="Append item" onClick={() => onChange(easyObject.append())}>
        <Text color="green">+</Text>
      </Button>
    </Box>
  );
};
