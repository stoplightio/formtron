/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box } from '@stoplight/ui-kit';
import * as React from 'react';

import { useTheme } from './theme';

import { MultiSelect, StringInput } from './basic';

import { fieldName, IFormtronControl } from '..';

export const Form: React.FunctionComponent<IFormtronControl> = ({
  value,
  schema,
  onChange,
  fieldComponents,
  selection,
}) => {
  const theme = useTheme();
  return (
    <Box
      as="fieldset"
      position="relative"
      backgroundColor={theme.canvas && theme.canvas.bg}
      color={theme.canvas && theme.canvas.fg}
    >
      <legend>{schema.title}</legend>
      <i>{schema.description}</i>
      {Object.keys(schema.fields).map((name, index) => {
        const formId = `${name}-${index}`;
        const propSchema = schema.fields[name];
        const Widget = fieldComponents[fieldName(propSchema)];
        if (Widget === undefined) {
          throw new Error(`No appropriate widget could be found for type "${propSchema.type}"`);
        }
        const el = (
          <div key={formId}>
            <Widget
              id={formId}
              value={value[name] || ''}
              schema={propSchema}
              selection={selection}
              onChange={(val: any) => {
                const v = { ...value, [name]: val };
                onChange(v);
              }}
              fieldComponents={fieldComponents}
            />
          </div>
        );
        return el;
      })}
    </Box>
  );
};

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

export const MultiSelectArrayInput = ArrayInput(MultiSelect, []);
MultiSelectArrayInput.displayName = 'MultiSelectArrayInput';

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
            <div key={index} style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button onClick={() => onChange(insert(index))} style={{ color: 'green' }}>
                  +
                </button>
                <button onClick={() => onChange(remove(index))} style={{ color: 'red' }}>
                  x
                </button>
              </div>
              <ChildInput
                id={(id && `${id}-${index}`) || undefined}
                value={val}
                schema={schema.items}
                selection={selection}
                fieldComponents={fieldComponents}
                onChange={val => onChange(update(index, val))}
              />
            </div>
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
