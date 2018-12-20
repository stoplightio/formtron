/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Button, Flex, Text } from '@stoplight/ui-kit';

import { Form } from './Form';
import { MultiselectInput } from './SelectInput';
import { StringInput } from './StringInput';

import { IFormtronControl } from '..';

// We don't export ArrayInput or KeyedArrayInput, because it is so tempting
// to use them inside another SFC, but that creates a **unique** class instance,
// which then causes React to re-render that component every loop
// and that totally screws up things like:
// - you lose focus inside the DOM elements because the DOM elements
//   all get deleted and recreated.
// - terrible for performance
// so to prevent this, we just pre-bake all the complex elements
// that we need.

export const StringArrayInput = ArrayInput(StringInput, '');
StringArrayInput.displayName = 'StringArrayInput';

export const KeyedStringArrayInput = KeyedArrayInput(StringInput, '');
KeyedStringArrayInput.displayName = 'KeyedStringArrayInput';

export const MultiselectArrayInput = ArrayInput(MultiselectInput, []);
MultiselectArrayInput.displayName = 'MultiselectArrayInput';

export const FormArrayInput = ArrayInput(Form, {});
FormArrayInput.displayName = 'FormArrayInput';

export const KeyedFormArrayInput = KeyedArrayInput(Form, {});
KeyedFormArrayInput.displayName = 'KeyedFormArrayInput';

export function ArrayInput(ChildInput: React.SFC<IFormtronControl>, defaultValue: any): React.SFC<IFormtronControl> {
  return ({ id, value, schema, onChange, fieldComponents, selection }) => {
    if (!Array.isArray(value)) {
      throw new Error(`ArrayInput expects it's value prop to be an array`);
    }
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
    const display = typeof defaultValue !== 'object' || Array.isArray(defaultValue) ? 'inline-block' : undefined;
    return (
      <div style={{ display, verticalAlign: 'text-top' }}>
        {value.map((val, index) => {
          return (
            <Flex key={index}>
              <Flex flexDirection="column">
                <Button type="button" onClick={() => onChange(insert(index))}>
                  <Text color="green">+</Text>
                </Button>
                <Button type="button" onClick={() => onChange(remove(index))}>
                  <Text color="red">x</Text>
                </Button>
              </Flex>
              <Box flex={1}>
                <ChildInput
                  id={(id && `${id}-${index}`) || undefined}
                  value={val}
                  schema={schema.items}
                  selection={selection}
                  fieldComponents={fieldComponents}
                  onChange={val => onChange(update(index, val))}
                />
              </Box>
            </Flex>
          );
        })}
        <button onClick={() => onChange(append(defaultValue))} style={{ color: 'green' }}>
          +
        </button>
      </div>
    );
  };
}

export function KeyedArrayInput(
  ChildInput: React.SFC<IFormtronControl>,
  defaultValue: any
): React.SFC<IFormtronControl> {
  const ActualInput = ArrayInput(ChildInput, defaultValue);
  ActualInput.displayName = 'ArrayInput';
  return (props: IFormtronControl) => {
    const vals = Object.entries(props.value).map(([key, val]) => ({
      [key]: val,
    }));
    return (
      <ActualInput
        {...props}
        value={vals}
        onChange={value => {
          console.log('arrayvalues', value);
          const obj = value.reduce((acc: object, obj: object) => Object.assign(acc, obj), {});
          console.log('combinedvalues', obj);
          props.onChange(obj);
        }}
      />
    );
  };
}
