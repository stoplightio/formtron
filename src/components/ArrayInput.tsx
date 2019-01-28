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
  const defaultValue = schema.default;
  const Widget = fieldComponents[fieldName(schema.items)];

  const splice = (start: number, deleteCount: number, ...vals: any[]) => {
    items.splice(start, deleteCount, ...vals);
    return items;
  };

  const update = (index: number, val: any) => splice(index, 1, val);

  const insert = (index: number) => splice(index, 0, defaultValue);

  const append = () => splice(items.length, 0, defaultValue);

  const remove = (index: number) => splice(index, 1);

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
      <Button type="button" title="Append item" onClick={() => onChange(append())}>
        <Text color="green">+</Text>
      </Button>
    </Box>
  );
};
