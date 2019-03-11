import * as React from 'react';

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Box, Flex, Icon, Text } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { FieldSet } from './FieldSet';
import { useDiagnostics } from './hooks';
import { Label } from './Label';
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
  layout,
}) => {
  const { variant } = useDiagnostics(path);
  const easyArray = new EasyArray(value, schema.default);
  const Widget = fieldComponents[schema.items.type];

  return (
    <Messages path={path}>
      <FieldSet position="relative" variant={variant} legend={schema.title}>
        {easyArray.items.length === 0 ? (
          <Text
            fontWeight={800}
            fontSize="11px"
            my={3}
            mx={2}
            color="rgb(118, 130, 143)"
            opacity={disabled ? 0.6 : 1}
            display="inline-block"
            onClick={() => !disabled && onChange(easyArray.append())}
          >
            <Icon cursor={disabled ? 'not-allowed' : 'pointer'} mr={2} icon={faPlus} disabled={disabled} /> Add Item
          </Text>
        ) : (
          easyArray.items.map((val: any, index: number) => {
            return (
              <Flex my={3} mx={2} key={`${index}-${value.length}`}>
                <Box flex={1} mr="10px">
                  <Widget
                    id={(id && `${id}-${index}`) || undefined}
                    value={val}
                    schema={schema.items}
                    path={[...path, String(index)]}
                    fieldComponents={fieldComponents}
                    onChange={_val => onChange(easyArray.update(index, _val))}
                    disabled={disabled}
                    layout={layout}
                  />
                </Box>

                <Flex flexDirection="column" alignItems="center" mx="10px">
                  <Label disabled={disabled}>Add</Label>

                  <Flex flex={1} width="100%" justifyContent="center" alignItems="center">
                    <Icon
                      cursor={disabled ? 'not-allowed' : 'pointer'}
                      onClick={() => !disabled && onChange(easyArray.insert(index + 1))}
                      icon={faPlus}
                      color="rgb(118, 130, 143)"
                      opacity={disabled ? 0.6 : 1}
                    />
                  </Flex>
                </Flex>

                <Flex flexDirection="column" alignItems="center" ml="10px">
                  <Label disabled={disabled}>Remove</Label>

                  <Flex flex={1} width="100%" justifyContent="center" alignItems="center">
                    <Icon
                      cursor={disabled ? 'not-allowed' : 'pointer'}
                      icon={faTrash}
                      color="rgb(118, 130, 143)"
                      opacity={disabled ? 0.6 : 1}
                      onClick={() => !disabled && onChange(easyArray.remove(index))}
                    />
                  </Flex>
                </Flex>
              </Flex>
            );
          })
        )}
      </FieldSet>
    </Messages>
  );
};
