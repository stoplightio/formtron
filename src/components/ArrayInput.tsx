import * as React from 'react';

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Box, Button, Flex, Icon } from '@stoplight/ui-kit';

import { IFormtronControl } from '..';

import { FieldSet } from './FieldSet';
import { useDiagnostics } from './hooks';
import { IconButton } from './IconButton';
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
          <Button
            fontWeight={800}
            fontSize="11px"
            my={11}
            mx={7}
            color="rgb(118, 130, 143)"
            disabled={disabled}
            display="inline-block"
            borderColor="transparent"
            backgroundColor="transparent"
            onClick={() => onChange(easyArray.append())}
          >
            <Icon mr={7} icon={faPlus} /> Add Item
          </Button>
        ) : (
          easyArray.items.map((val: any, index: number) => {
            return (
              <Flex my={11} mx={7} key={`${index}-${value.length}`}>
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
                    <IconButton
                      icon={faPlus}
                      onClick={() => onChange(easyArray.insert(index + 1))}
                      disabled={disabled}
                    />
                  </Flex>
                </Flex>

                <Flex flexDirection="column" alignItems="center" ml="10px">
                  <Label disabled={disabled}>Remove</Label>

                  <Flex flex={1} width="100%" justifyContent="center" alignItems="center" disabled={disabled}>
                    <IconButton icon={faTrash} onClick={() => onChange(easyArray.remove(index))} disabled={disabled} />
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
