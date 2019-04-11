import * as React from 'react';

import { ThemeZone } from '@stoplight/ui-kit';
import { computeOps } from './computeOps';
import { deriveFormData } from './deriveFormData';
import { useDraftValue } from './hooks/useDraftValue';
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
}) => {
  const [_draft, _onChange] = useDraftValue(deriveFormData(schema, value, selection), v => {
    const ops = computeOps(schema, value, selection, v);
    onChange(ops);
    if (onInternalChange) onInternalChange(v);
  });
  const Widget = fieldComponents[schema.type];
  return (
    <ThemeZone name={themeName}>
      <Widget
        value={_draft}
        schema={schema}
        onChange={_onChange}
        path={selection.split('.')}
        fieldComponents={fieldComponents}
        disabled={disabled}
        layout={layout}
      />
    </ThemeZone>
  );
};
