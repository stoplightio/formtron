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

  const { title, description, fields, layouts } = schema;

  const gridAreaToName = {};
  const fallbackRows = [];
  let contentElems: React.ReactElement | React.ReactElement[] = [];

  for (const fieldName in fields) {
    const { area } = fields[fieldName];
    const gridArea = area || shortName(fieldName);
    gridAreaToName[gridArea] = fieldName;
    fallbackRows.push([gridArea]);
  }

  const grid = layout && layouts && layouts[layout];
  const rows = grid ? parseGridTemplateAreas(grid) : fallbackRows;

  for (const row of rows) {
    const cells: React.ReactElement[] = [];

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

    cellNames.forEach((gridArea, index) => {
      const name = gridAreaToName[gridArea];
      const formId = `${name}-${index}`;

      const propSchema = schema.fields[name];
      const { show, evalOptions, type } = propSchema;

      // if evalutating show is false skip area
      if (show && evaluate(show, value, name, true)) {
        return;
      }

      if (evalOptions) {
        propSchema.options = evaluate(evalOptions, value, name, []);
      }

      const Widget = fieldComponents[type];
      if (Widget === undefined) {
        cells.push(<Box flex={flex[gridArea]}>No appropriate widget could be found for type "{type}"</Box>);
      } else {
        cells.push(
          <Box
            key={formId}
            flex={flex[gridArea]}
            ml={index === 0 ? 0 : '10px'}
            mr={index === cellNames.length - 1 ? 0 : '10px'}
            my="12px"
          >
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
              layout={layout}
            />
          </Box>
        );
      }
    });

    if (cells.length > 0) {
      contentElems.push(<Flex>{cells}</Flex>);
    }
  }

  if (title) {
    contentElems = (
      <FieldSet legend={title} variant={variant} disabled={disabled}>
        <Label disabled={disabled}>
          <i>{description}</i>
        </Label>
        {contentElems}
      </FieldSet>
    );
  }

  return <Messages path={path}>{contentElems}</Messages>;
};
