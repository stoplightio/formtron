import * as React from 'react';

import { ThemeZone } from '@stoplight/ui-kit';
import { DraftValue } from './components/utils/DraftValue';
import { computeOps } from './computeOps';
import { deriveFormData } from './deriveFormData';
import { IFormtron } from './types';

export const Formtron: React.FunctionComponent<IFormtron> = ({
  value,
  themeName = 'formtron',
  schema,
  selection,
  onChange,
  fieldComponents,
  onInternalChange,
  disabled = false,
  layout,
  resolver,
}) => (
  <ThemeZone name={themeName}>
    <DraftValue
      value={deriveFormData(schema, value, selection, resolver)}
      onChange={v => {
        const ops = computeOps(schema, value, selection, v, resolver);
        onChange(ops);
        if (onInternalChange) onInternalChange(v);
      }}
    >
      {({ value, onChange }) => {
        const Widget = fieldComponents[schema.type];
        return (
          <Widget
            value={value}
            schema={schema}
            onChange={onChange}
            path={selection.split('.')}
            fieldComponents={fieldComponents}
            disabled={disabled}
            layout={layout}
          />
        );
      }}
    </DraftValue>
  </ThemeZone>
);
