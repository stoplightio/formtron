/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Select } from '@stoplight/ui-kit/Select';
import * as React from 'react';

import { IFormtronControl } from '..';
import { DraftValue } from '../DraftValue';

import { AutocompletionContext } from './AutocompletionContext';

export const SelectInput: React.SFC<IFormtronControl> = ({
  id,
  value,
  schema,
  onChange,
  selection,
  fieldComponents,
}) => {
  return (
    <AutocompletionContext.Consumer>
      {autocompletionSources => {
        const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];
        const options = schema.options.map((o: string) => ({ value: o, label: o }));
        // const loadOptions =
        //   schema.custom && schema.custom.source
        //     ? autocompletionSources[schema.custom.source]
        //     : schema.options
        //       ? async () => schema.options.map((o: string) => ({ value: o, label: o }))
        //       : async () => [];
        return (
          <div>
            <label htmlFor={id}>{schema.title}</label>
            <DraftValue
              value={value}
              onChange={(value: string) => {
                onChange(value);
              }}
            >
              {({ value, onChange }) => (
                <React.Fragment>
                  <Select
                    styles={{
                      container: (base: any) => ({
                        ...base,
                        display: 'inline-block',
                        minWidth: 200,
                      }),
                    }}
                    value={{ value, label: value }}
                    defaultValue={{ value, label: value }}
                    options={options}
                    // defaultOptions
                    // loadOptions={loadOptions}
                    onChange={(value: any) => onChange(value.value)}
                  />
                  <span />
                  {schema.required && ' *'}
                  {CustomWidget && (
                    <CustomWidget
                      value={value}
                      schema={schema}
                      selection={selection}
                      onChange={(val: any) => {
                        onChange(val);
                      }}
                      fieldComponents={fieldComponents}
                    />
                  )}
                </React.Fragment>
              )}
            </DraftValue>
          </div>
        );
      }}
    </AutocompletionContext.Consumer>
  );
};

export const MultiSelect: React.SFC<IFormtronControl> = ({ id, value, schema, onChange }) => {
  if (!Array.isArray(value)) {
    throw new Error(`MultiSelect expects it's value prop to be an array`);
  }
  return (
    <AutocompletionContext.Consumer>
      {autocompletionSources => {
        const options = schema.options.map((o: string) => ({ value: o, label: o }));
        // const loadOptions =
        //   schema.custom && schema.custom.source
        //     ? autocompletionSources[schema.custom.source]
        //     : schema.options
        //       ? async () => schema.options.map((o: string) => ({ value: o, label: o }))
        //       : async () => [];
        return (
          <div>
            <label htmlFor={id}>{schema.title}</label>
            <Select
              key={JSON.stringify(value)}
              styles={{
                container: (base: any) => ({
                  ...base,
                  display: 'inline-block',
                  minWidth: 200,
                }),
              }}
              defaultValue={value.map(_value => ({ value: _value, label: _value }))}
              isMulti
              options={options}
              // loadOptions={loadOptions}
              // defaultOptions
              onChange={values =>
                values && Array.isArray(values) ? onChange(values.map(v => v.value)) : values && onChange(values.value)
              }
            />
            <span />
            {schema.required && ' *'}
          </div>
        );
      }}
    </AutocompletionContext.Consumer>
  );
};
