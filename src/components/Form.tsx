import * as React from 'react';

import { IFormtronControl } from '..';

import { evaluate } from './evaluate';
import { FieldSet } from './FieldSet';
import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { replaceWildcards } from './utils/replaceWildcards';
import { shortName } from './utils/shortName';
import { toGridTemplateAreas } from './utils/toGridTemplateAreas';

export const Form: React.FunctionComponent<IFormtronControl> = ({
  value = {},
  schema,
  onChange,
  fieldComponents,
  path,
  disabled = false,
  layout,
}) => {
  const { variant } = useDiagnostics(path);
  const keys = Object.keys(schema.fields);
  const grid = layout && schema.layouts && schema.layouts[layout];
  const guts = (
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: grid ? toGridTemplateAreas(grid) : undefined,
        gridColumnGap: '10px',
        gridRowGap: '10px',
      }}
    >
      {keys.map((name, index) => {
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
          <div key={formId} style={grid ? { gridArea: propSchema.area || shortName(name) } : {}}>
            <Widget
              id={formId}
              value={value[name]}
              schema={propSchema}
              path={replaceWildcards(name, path)}
              onChange={(val: any) => {
                const v = { ...value, [name]: val };
                onChange(v);
              }}
              fieldComponents={fieldComponents}
              disabled={disabled}
            />
          </div>
        );
        return el;
      })}
    </div>
  );
  // _optionally_ wrap in a FieldSet.
  const contents = schema.title ? (
    <FieldSet legend={schema.title} variant={variant} disabled={disabled}>
      <Label disabled={disabled}>
        <i>{schema.description}</i>
      </Label>
      {guts}
    </FieldSet>
  ) : (
    guts
  );
  return <Messages path={path}>{contents}</Messages>;
};
