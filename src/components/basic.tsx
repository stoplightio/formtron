import * as React from 'react';

// @ts-ignore
import Select from 'react-select/lib/Async';

import { IFormtronControl } from '..';
import { DraftValue } from '../DraftValue';

import { AutocompletionContext } from './AutocompletionContext';

export const IntegerInput: React.SFC<IFormtronControl> = ({
  id,
  value,
  selection,
  onChange,
  schema,
  fieldComponents,
}) => {
  const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];
  return (
    <div>
      <label htmlFor={id}>{schema.title}</label>
      <input
        type="number"
        id={id}
        step="1.0"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        required={schema.required}
        onBlur={e => {
          e.target.checkValidity();
          e.target.classList.add('was-validated');
        }}
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
    </div>
  );
};

export const PasswordInput: React.SFC<IFormtronControl> = ({ id, value, onChange, schema }) => {
  return (
    <div>
      <label htmlFor={id}>{schema.title}</label>
      <input
        type="password"
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        minLength={schema.minLength}
        maxLength={schema.maxLength}
        required={schema.required}
        onBlur={e => {
          e.target.checkValidity();
          e.target.classList.add('was-validated');
        }}
      />
      <span />
      {schema.required && ' *'}
    </div>
  );
};

export const StringInput: React.SFC<IFormtronControl> = ({ id, value, schema, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{schema.title}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        minLength={schema.minLength}
        maxLength={schema.maxLength}
        required={schema.required}
        onBlur={e => {
          e.target.checkValidity();
          e.target.classList.add('was-validated');
        }}
      />
      <span />
      {schema.required && ' *'}
    </div>
  );
};

export const TelephoneInput: React.SFC<IFormtronControl> = ({ id, value, onChange, schema }) => {
  return (
    <div>
      <label htmlFor={id}>{schema.title}</label>
      <input
        type="tel"
        placeholder="1-222-333-4444"
        pattern="([0-9]-)?[0-9]{3}-[0-9]{3}-[0-9]{4}"
        value={value}
        id={id}
        onChange={e => onChange(e.target.value)}
        minLength={schema.minLength}
        maxLength={schema.maxLength}
        required={schema.required}
        onBlur={e => {
          e.target.checkValidity();
          e.target.classList.add('was-validated');
        }}
      />
      <span />
      {schema.required && ' *'}
    </div>
  );
};

export const CheckboxInput: React.SFC<IFormtronControl> = ({ id, value, onChange, schema }) => {
  return (
    <div>
      <label htmlFor={id}>{schema.title}</label>
      <input
        type="checkbox"
        id={id}
        checked={value}
        onChange={e => onChange(e.target.checked)}
        required={schema.required}
        onBlur={e => {
          e.target.checkValidity();
          e.target.classList.add('was-validated');
        }}
      />
      <span />
      {schema.required && ' *'}
    </div>
  );
};

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
        const loadOptions =
          schema.custom && schema.custom.source
            ? autocompletionSources[schema.custom.source]
            : schema.options
              ? async () => schema.options.map((o: string) => ({ value: o, label: o }))
              : async () => [];
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
                <>
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
                    defaultOptions
                    loadOptions={loadOptions}
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
                </>
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
        const loadOptions =
          schema.custom && schema.custom.source
            ? autocompletionSources[schema.custom.source]
            : schema.options
              ? async () => schema.options.map((o: string) => ({ value: o, label: o }))
              : async () => [];
        return (
          <div>
            <label htmlFor={id}>{schema.title}</label>
            <Select
              key={value}
              styles={{
                container: (base: any) => ({
                  ...base,
                  display: 'inline-block',
                  minWidth: 200,
                }),
              }}
              defaultValue={value.map(value => ({ value, label: value }))}
              isMulti
              loadOptions={loadOptions}
              defaultOptions
              onChange={(values: any[]) => onChange(values.map(v => v.value))}
            />
            <span />
            {schema.required && ' *'}
          </div>
        );
      }}
    </AutocompletionContext.Consumer>
  );
};