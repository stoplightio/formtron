import * as React from 'react';

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Box, Button, Flex, Icon } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { FieldSet } from './FieldSet';
import { useDiagnostics } from './hooks';
import { Label } from './Label';
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
  disabled = false,
  layout,
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
        {easyObject.items.length === 0 ? (
          <Button
            fontWeight={800}
            fontSize="11px"
            my={3}
            mx={2}
            color="rgb(118, 130, 143)"
            disabled={disabled}
            display="inline-block"
            border="transparent"
            backgroundColor="transparent"
            onClick={() => onChange(easyObject.append())}
          >
            <Icon mr={2} icon={faPlus} /> Add Item
          </Button>
        ) : (
          easyObject.items.map((entry, index) => {
            const [key, val] = entry;
            return (
              <Flex my={3} mx={2} key={`${index}-${easyObject.items.length}`}>
                <DraftValue
                  value={key}
                  onChange={_key => noConflict(_key) && onChange(easyObject.updateKey(index, _key))}
                >
                  {({ value, onChange }) => {
                    return (
                      <React.Fragment>
                        <Box flex={1} mr="10px">
                          <KeyWidget
                            id={(id && `${id}-${index}`) || undefined}
                            value={value}
                            schema={schema.keys}
                            path={[...path, key]}
                            fieldComponents={fieldComponents}
                            onChange={_key => onChange(_key)}
                            disabled={disabled}
                            layout={layout}
                          />
                        </Box>
                      </React.Fragment>
                    );
                  }}
                </DraftValue>
                <Box flex={1} mx="10px">
                  <ValWidget
                    id={(id && `${id}-${index}`) || undefined}
                    value={val}
                    schema={schema.values}
                    onChange={_val => onChange(easyObject.updateVal(index, _val))}
                    path={[...path, key]}
                    fieldComponents={fieldComponents}
                    disabled={disabled}
                    layout={layout}
                  />
                </Box>

                <Flex flexDirection="column" alignItems="center" mx="10px">
                  <Label disabled={disabled}>Add</Label>

                  <Flex flex={1} width="100%" justifyContent="center" alignItems="center">
                    <Button
                      border="transparent"
                      backgroundColor="transparent"
                      height="100%"
                      disabled={disabled}
                      onClick={() => onChange(easyObject.insert(index + 1))}
                    >
                      <Icon icon={faPlus} fontSize="15px" color="rgb(118, 130, 143)" />
                    </Button>
                  </Flex>
                </Flex>

                <Flex flexDirection="column" alignItems="center" ml="10px">
                  <Label disabled={disabled}>Remove</Label>

                  <Flex flex={1} width="100%" justifyContent="center" alignItems="center">
                    <Button
                      border="transparent"
                      backgroundColor="transparent"
                      height="100%"
                      disabled={disabled}
                      onClick={() => onChange(easyObject.remove(index))}
                    >
                      <Icon icon={faTrash} fontSize="15px" color="rgb(118, 130, 143)" />
                    </Button>
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
