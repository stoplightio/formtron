/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Button, Flex, Text } from '@stoplight/ui-kit';

import { fieldName, IFormtronControl } from '..';

export const ArrayInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value = [],
  schema,
  onChange,
  fieldComponents,
  selection,
}) => {
  // Make shallow copy
  const items = [...value];
  const update = (index: number, val: any) => {
    items.splice(index, 1, val);
    return items;
  };
  const insert = (index: number) => {
    items.splice(index, 0, defaultValue);
    return items;
  };
  const append = (val: any) => {
    items.push(val);
    return items;
  };
  const remove = (index: number) => {
    items.splice(index, 1);
    return items;
  };
  const defaultValue = schema.default;
  const Widget = fieldComponents[fieldName(schema.items)];
  return (
    <Box as="fieldset" position="relative">
      <legend>{schema.title}</legend>
      {value.map((val: any, index: number) => {
        const _selection = selection === '' || selection === '.' ? `${index}` : `${selection}.${index}`;
        return (
          <Flex key={`${index}-${value.length}`}>
            <Flex flexDirection="column">
              <Button type="button" title="Insert item" onClick={() => onChange(insert(index))}>
                <Text color="green">+</Text>
              </Button>
              <Button type="button" title="Delete item" onClick={() => onChange(remove(index))}>
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
                onChange={_val => onChange(update(index, _val))}
              />
            </Box>
          </Flex>
        );
      })}
      <Button type="button" title="Append item" onClick={() => onChange(append(defaultValue))}>
        <Text color="green">+</Text>
      </Button>
    </Box>
  );
};
