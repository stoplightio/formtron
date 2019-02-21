/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { IFormtronControl } from '..';

import { evaluate } from './evaluate';
import { FieldSet } from './FieldSet';
import { useDiagnostics } from './hooks';
import { Messages } from './Messages';

const substitute = (path: string, selection: string[]) => {
  const _path = path.split('.');
  const newpath = [];
  for (let i = 0; i < _path.length; i++) {
    const part = _path[i];
    if (part === '*' || part === '?') {
      newpath.push(selection[i]);
    } else {
      newpath.push(part);
    }
    if (part === '?') break;
  }
  return newpath;
};

export const Form: React.FunctionComponent<IFormtronControl> = ({
  value = {},
  schema,
  onChange,
  fieldComponents,
  path,
}) => {
  const { variant } = useDiagnostics(path);

  return (
    <Messages path={path}>
      <FieldSet legend={schema.title} variant={variant}>
        <i>{schema.description}</i>
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
          const el = (
            <div key={formId}>
              <Widget
                id={formId}
                value={value[name]}
                schema={propSchema}
                path={substitute(name, path)}
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
      </FieldSet>
    </Messages>
  );
};
