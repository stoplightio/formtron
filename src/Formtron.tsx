import * as React from 'react';

import { IFormtron } from './types';

import { computeOps } from './computeOps';
import { deriveFormData } from './deriveFormData';
import { DraftValue } from './DraftValue';
import { fieldName } from './fieldName';

export const Formtron: React.SFC<IFormtron> = ({
  value,
  schema,
  selection,
  onChange,
  fieldComponents,
  onInternalChange,
}) => (
  <DraftValue
    value={deriveFormData(schema, value, selection)}
    onChange={v => {
      const ops = computeOps(schema, value, selection, v);
      onChange(ops);
      onInternalChange(v);
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
);
