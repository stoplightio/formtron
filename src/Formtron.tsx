import * as React from 'react';

import { ThemeZone } from '@stoplight/ui-kit';
import { computeOps } from './computeOps';
import { deriveFormData } from './deriveFormData';
import { DraftValue } from './DraftValue';
import { fieldName } from './fieldName';
import { IFormtron } from './types';

export const Formtron: React.FunctionComponent<IFormtron> = ({
  value,
  themeName = 'formtron',
  schema,
  selection,
  onChange,
  fieldComponents,
  onInternalChange,
}) => (
  <ThemeZone name={themeName}>
    <DraftValue
      value={deriveFormData(schema, value, selection)}
      onChange={v => {
        const ops = computeOps(schema, value, selection, v);
        onChange(ops);
        if (onInternalChange) onInternalChange(v);
      }}
    >
      {({ value, onChange }) => {
        const Widget = fieldComponents[fieldName(schema)];
        return (
          <Widget
            value={value}
            selection={selection}
            onChange={onChange}
            schema={schema}
            fieldComponents={fieldComponents}
          />
        );
      }}
    </DraftValue>
  </ThemeZone>
);
