/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box } from '@stoplight/ui-kit';
import * as React from 'react';

import { useTheme } from '../theme';

import { IFormtronControl } from '..';

import { evaluate } from './evaluate';

export const Form: React.FunctionComponent<IFormtronControl> = ({
  value = {},
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
        if (propSchema.show) {
          const show = evaluate(propSchema.show, value, name);
          if (!show) return null;
        }
        if (propSchema.evalOptions) {
          propSchema.options = evaluate(propSchema.evalOptions, value, name);
        }
        const Widget = fieldComponents[propSchema.type];
        if (Widget === undefined) {
          throw new Error(`No appropriate widget could be found for type "${propSchema.type}"`);
        }
        const el = (
          <div key={formId}>
            <Widget
              id={formId}
              value={value[name]}
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
