import * as React from 'react';

export type OnChange = (value: any) => void;
export type UseDraftValue = (value: any, onChange: OnChange) => [any, OnChange, any];

export const useDraftValue: UseDraftValue = (value, givenOnChange) => {
  const [draft, setDraft] = React.useState(value);

  React.useEffect(() => setDraft(value), [value]);

  const onChange = React.useCallback(
    (draft: any) => {
      setDraft(draft);
      givenOnChange(draft);
    },
    [givenOnChange]
  );

  return [draft, onChange, value];
};
