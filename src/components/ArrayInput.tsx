import * as React from 'react';

import { Box, Button, Flex, Text } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { FieldSet } from './FieldSet';
import { useDiagnostics } from './hooks';
import { Messages } from './Messages';
import { EasyArray } from './utils/EasyArray';

export const ArrayInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value = [],
  schema,
  onChange,
  fieldComponents,
  disabled = false,
  path,
}) => {
  const { variant } = useDiagnostics(path);
  const easyArray = new EasyArray(value, schema.default);
  const Widget = fieldComponents[schema.items.type];

  return (
    <Messages path={path}>
      <FieldSet position="relative" variant={variant} legend={schema.title}>
        {easyArray.items.map((val: any, index: number) => {
          return (
            <Flex key={`${index}-${value.length}`}>
              <Flex flexDirection="column">
                <Button
                  type="button"
                  title="Insert item"
                  onClick={() => onChange(easyArray.insert(index))}
                  disabled={disabled}
                >
                  <Text color="green">+</Text>
                </Button>
                <Button
                  type="button"
                  title="Delete item"
                  onClick={() => onChange(easyArray.remove(index))}
                  disabled={disabled}
                >
                  <Text color="red">x</Text>
                </Button>
              </Flex>
              <Box flex={1}>
                <Widget
                  id={(id && `${id}-${index}`) || undefined}
                  value={val}
                  schema={schema.items}
                  path={[...path, String(index)]}
                  fieldComponents={fieldComponents}
                  onChange={_val => onChange(easyArray.update(index, _val))}
                  disabled={disabled}
                />
              </Box>
            </Flex>
          );
        })}
        <Button type="button" title="Append item" onClick={() => onChange(easyArray.append())} disabled={disabled}>
          <Text color="green">+</Text>
        </Button>
      </FieldSet>
    </Messages>
  );
};
