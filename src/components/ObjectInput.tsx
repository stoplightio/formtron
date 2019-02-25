/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Button, Flex, Text } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { FieldSet } from './FieldSet';
import { useDiagnostics } from './hooks';
import { Messages } from './Messages';
import { Variant } from './types';
import { DraftValue } from './utils/DraftValue';
import { EasyObject } from './utils/EasyObject';

export const ObjectInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value = {},
  schema,
  onChange,
  fieldComponents,
  path,
}) => {
  const { variant } = useDiagnostics(path);
  // Make this thing an array
  const easyObject = new EasyObject(value, schema.default);
  const KeyWidget = fieldComponents[schema.keys.type];
  const ValWidget = fieldComponents[schema.values.type];

  const noConflict = (key: any) => !(key in value);

  return (
    <Messages path={path}>
      <FieldSet position="relative" invalid={variant === Variant.invalid} legend={schema.title}>
        {easyObject.items.map((entry, index) => {
          const [key, val] = entry;
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
              <DraftValue
                value={key}
                onChange={_key => noConflict(_key) && onChange(easyObject.updateKey(index, _key))}
              >
                {({ value, onChange }) => {
                  return (
                    <React.Fragment>
                      <Box flex={1}>
                        <KeyWidget
                          id={(id && `${id}-${index}`) || undefined}
                          value={value}
                          schema={schema.keys}
                          path={[...path, key]}
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
                  onChange={_val => onChange(easyObject.updateVal(index, _val))}
                  path={[...path, key]}
                  fieldComponents={fieldComponents}
                />
              </Box>
            </Flex>
          );
        })}
        <Button type="button" title="Append item" onClick={() => onChange(easyObject.append())}>
          <Text color="green">+</Text>
        </Button>
      </FieldSet>
    </Messages>
  );
};
