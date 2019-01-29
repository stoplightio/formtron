/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Button, Flex, Text } from '@stoplight/ui-kit';

import { fieldName, IFormtronControl } from '..';

import { EasyArray } from './utils/EasyArray';

export const ArrayInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value = [],
  schema,
  onChange,
  fieldComponents,
  selection,
}) => {
  const arr = new EasyArray(value, schema.default);
  const Widget = fieldComponents[fieldName(schema.items)];

  return (
    <Box as="fieldset" position="relative">
      <legend>{schema.title}</legend>
      {arr.items.map((val: any, index: number) => {
        const _selection = selection === '' || selection === '.' ? `${index}` : `${selection}.${index}`;
        return (
          <Flex key={`${index}-${value.length}`}>
            <Flex flexDirection="column">
              <Button type="button" title="Insert item" onClick={() => onChange(arr.insert(index))}>
                <Text color="green">+</Text>
              </Button>
              <Button type="button" title="Delete item" onClick={() => onChange(arr.remove(index))}>
                <Text color="red">x</Text>
              </Button>
            </Flex>
            <Box flex={1}>
              <Widget
                id={(id && `${id}-${index}`) || undefined}
                value={val}
                schema={schema.items}
                selection={_selection}
                fieldComponents={fieldComponents}
                onChange={_val => onChange(arr.update(index, _val))}
              />
            </Box>
          </Flex>
        );
      })}
      <Button type="button" title="Append item" onClick={() => onChange(arr.append())}>
        <Text color="green">+</Text>
      </Button>
    </Box>
  );
};
