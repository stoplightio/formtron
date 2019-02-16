/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Button, Flex, Text } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { FieldSet } from './FieldSet';
import { EasyArray } from './utils/EasyArray';

export const ArrayInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value = [],
  schema,
  onChange,
  fieldComponents,
  selection,
  valid,
}) => {
  const easyArray = new EasyArray(value, schema.default);
  const Widget = fieldComponents[schema.items.type];

  return (
    <FieldSet position="relative" invalid={!valid} legend={schema.title}>
      {easyArray.items.map((val: any, index: number) => {
        const _selection = selection === '' || selection === '.' ? `${index}` : `${selection}.${index}`;
        return (
          <Flex key={`${index}-${value.length}`}>
            <Flex flexDirection="column">
              <Button type="button" title="Insert item" onClick={() => onChange(easyArray.insert(index))}>
                <Text color="green">+</Text>
              </Button>
              <Button type="button" title="Delete item" onClick={() => onChange(easyArray.remove(index))}>
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
                onChange={_val => onChange(easyArray.update(index, _val))}
                valid={true}
                validationMessages={[]}
              />
            </Box>
          </Flex>
        );
      })}
      <Button type="button" title="Append item" onClick={() => onChange(easyArray.append())}>
        <Text color="green">+</Text>
      </Button>
    </FieldSet>
  );
};
