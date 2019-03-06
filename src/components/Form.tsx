import * as React from 'react';

import { IFormtronControl } from '..';

import { Box, Flex } from '@stoplight/ui-kit';
import { evaluate } from './evaluate';
import { FieldSet } from './FieldSet';
import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { parseGridTemplateAreas } from './utils/gridHelpers';
import { replaceWildcards } from './utils/replaceWildcards';
import { shortName } from './utils/shortName';

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
  const gridAreaToName = {};
  const fallbackRows = [];
  for (const name of keys) {
    const propSchema = schema.fields[name];
    const gridArea = propSchema.area || shortName(name);
    gridAreaToName[gridArea] = name;
    fallbackRows.push([gridArea]);
  }
  console.log(gridAreaToName);

  const grid = layout && schema.layouts && schema.layouts[layout];
  const rows = grid ? parseGridTemplateAreas(grid) : fallbackRows;
  console.log(rows);
  const innerStuff = [];
  let index = -1;
  for (const row of rows) {
    const cells = [];
    // preprocess row
    const flex = {};
    const cellNames = [];
    for (const gridArea of row) {
      if (flex[gridArea]) {
        flex[gridArea] += 1;
      } else {
        flex[gridArea] = 1;
        cellNames.push(gridArea);
      }
    }
    for (const gridArea of cellNames) {
      index++;
      const name = gridAreaToName[gridArea];
      console.log(name);
      const formId = `${name}-${index}`;
      const propSchema = schema.fields[name];
      if (propSchema.show) {
        const show = evaluate(propSchema.show, value, name, true);
        if (!show) continue;
      }
      if (propSchema.evalOptions) {
        propSchema.options = evaluate(propSchema.evalOptions, value, name, []);
      }
      const Widget = fieldComponents[propSchema.type];
      if (Widget === undefined) {
        cells.push(<Box flex={flex[gridArea]}>No appropriate widget could be found for type "{propSchema.type}"</Box>);
      } else {
        cells.push(
          <Box flex={flex[gridArea]} key={formId} m={1}>
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
          </Box>
        );
      }
    }
    if (cells.length > 0) {
      innerStuff.push(<Flex>{cells}</Flex>);
    }
  }
  // const innerStuff = (
  //   <div
  //     style={{
  //       display: 'grid',
  //       gridTemplateAreas: grid ? toGridTemplateAreas(grid) : undefined,
  //       gridColumnGap: '10px',
  //       gridRowGap: '10px',
  //     }}
  //   >
  //     {keys.map((name, index) => {
  //       const formId = `${name}-${index}`;
  //       const propSchema = schema.fields[name];
  //       const gridArea = propSchema.area || shortName(name);
  //       // skip fields that aren't part of this layout
  //       if (grid && !gridKeys.has(gridArea)) return null;
  //       if (propSchema.show) {
  //         const show = evaluate(propSchema.show, value, name, true);
  //         if (!show) return null;
  //       }
  //       if (propSchema.evalOptions) {
  //         propSchema.options = evaluate(propSchema.evalOptions, value, name, []);
  //       }
  //       const Widget = fieldComponents[propSchema.type];
  //       if (Widget === undefined) {
  //         throw new Error(`No appropriate widget could be found for type "${propSchema.type}"`);
  //       }
  //       const el = (
  //         <div key={formId} style={grid ? { gridArea } : {}}>
  //           <Widget
  //             id={formId}
  //             value={value[name]}
  //             schema={propSchema}
  //             path={replaceWildcards(name, path)}
  //             onChange={(val: any) => {
  //               const v = { ...value, [name]: val };
  //               onChange(v);
  //             }}
  //             fieldComponents={fieldComponents}
  //             disabled={disabled}
  //           />
  //         </div>
  //       );
  //       return el;
  //     })}
  //   </div>
  // );
  // _optionally_ wrap in a FieldSet.
  const contents = schema.title ? (
    <FieldSet legend={schema.title} variant={variant} disabled={disabled}>
      <Label disabled={disabled}>
        <i>{schema.description}</i>
      </Label>
      {innerStuff}
    </FieldSet>
  ) : (
    innerStuff
  );
  return <Messages path={path}>{contents}</Messages>;
};
