import * as React from 'react';

// @ts-ignore
import TextareaAutosize from 'react-textarea-autosize';

import { IFormtronControl } from '..';
import { DraftValue } from '../DraftValue';

import { ThrottleValue } from './utils/ThrottleValue';

export const MarkdownInput: React.SFC<IFormtronControl> = ({ id, value, schema, onChange }) => {
  return (
    <ThrottleValue ms={1000} value={value} onChange={onChange}>
      {({ value, onChange }) => (
        <div>
          <label htmlFor={id}>{schema.title}</label>
          <TextareaAutosize
            id={id}
            value={value}
            onChange={(e: any) => onChange(e.target.value)}
            onBlur={(e: any) => {
              e.target.checkValidity();
              e.target.classList.add('was-validated');
            }}
          />
        </div>
      )}
    </ThrottleValue>
  );
};

export const JsonInput: React.SFC<IFormtronControl> = ({ id, value, schema, onChange }) => {
  return (
    <DraftValue
      value={JSON.stringify(value, null, 2)}
      onChange={draft => {
        try {
          onChange(JSON.parse(draft));
        } catch (err) {
          // do nothing
        }
      }}
    >
      {({ value, onChange, nonDraftValue }) => {
        return (
          <div>
            <label htmlFor={id}>{schema.title}</label>
            <TextareaAutosize
              style={{ color: nonDraftValue === value ? undefined : 'red' }}
              id={id}
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
              onBlur={(e: any) => {
                e.target.checkValidity();
                e.target.classList.add('was-validated');
              }}
            />
          </div>
        );
      }}
    </DraftValue>
  );
};
