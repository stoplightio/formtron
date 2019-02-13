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
  const columns = schema.columns || 1;
  return (
    <Box
      as="fieldset"
      position="relative"
      backgroundColor={theme.canvas && theme.canvas.bg}
      color={theme.canvas && theme.canvas.fg}
    >
      <legend>{schema.title}</legend>
      <i>{schema.description}</i>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, ${100 / columns}%)`,
          gridColumnGap: '10px',
          gridRowGap: '10px',
        }}
      >
        {Object.keys(schema.fields).map((name, index) => {
          const formId = `${name}-${index}`;
          const propSchema = schema.fields[name];
          if (propSchema.show) {
            const show = evaluate(propSchema.show, value, name, true);
            if (!show) return null;
          }
          if (propSchema.evalOptions) {
            propSchema.options = evaluate(propSchema.evalOptions, value, name, []);
          }
          const Widget = fieldComponents[propSchema.type];
          if (Widget === undefined) {
            throw new Error(`No appropriate widget could be found for type "${propSchema.type}"`);
          }
          const span = propSchema.span || 1;
          const el = (
            <div key={formId} style={{ gridColumnEnd: `span ${span}` }}>
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
      </div>
    </Box>
  );
};
