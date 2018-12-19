/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Checkbox, Flex, Input } from '@stoplight/ui-kit';
import { Select } from '@stoplight/ui-kit/Select';
import * as React from 'react';

// @ts-ignore
// import Select from 'react-select/lib/Async';

import { IFormtronControl } from '..';
import { DraftValue } from '../DraftValue';

import { AutocompletionContext } from './AutocompletionContext';

interface IValidityIndicator {
  state: boolean | null;
}

export const ValidityIndicator: React.SFC<IValidityIndicator> = ({ state }) => {
  if (state === false) {
    return (
      <span
        style={{
          paddingLeft: '5px',
          color: '#8b0000',
        }}
      >
        *
      </span>
    );
  } else if (state === true) {
    return (
      <span
        style={{
          paddingLeft: '5px',
          color: '#009000',
        }}
      >
        ✓
      </span>
    );
  } else {
    return <span />;
  }
};

export const IntegerInput: React.SFC<IFormtronControl> = ({
  id,
  value,
  selection,
  onChange,
  schema,
  fieldComponents,
}) => {
  const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];
  const [validityState, changeValidityState] = React.useState<boolean | null>(null);

  const onBlur = React.useCallback(e => {
    changeValidityState(e.target.checkValidity());
  }, []);

  return (
    <Flex width="100%">
      <Box flex="1" as="label" htmlFor={id}>
        {schema.title}
      </Box>
      <Box flex="1">
        <Flex width="100%">
          <Input
            flex="1"
            type="number"
            id={id}
            step="1.0"
            value={value}
            onChange={e => onChange(Number(e.currentTarget.value))}
            required={schema.required}
            onBlur={onBlur}
          />
          <Box>
            {schema.required && ' *'}
            <ValidityIndicator state={validityState} />
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
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export const PasswordInput: React.SFC<IFormtronControl> = ({ id, value, onChange, schema }) => {
  const [validityState, changeValidityState] = React.useState<boolean | null>(null);

  const onBlur = React.useCallback(e => {
    changeValidityState(e.target.checkValidity());
  }, []);

  return (
    <div>
      <label htmlFor={id}>{schema.title}</label>
      <Input
        type="password"
        id={id}
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        minLength={schema.minLength}
        maxLength={schema.maxLength}
        required={schema.required}
        onBlur={onBlur}
      />
      {schema.required && ' *'}
      <ValidityIndicator state={validityState} />
    </div>
  );
};

export const StringInput: React.SFC<IFormtronControl> = ({ id, value, schema, onChange }) => {
  const [validityState, changeValidityState] = React.useState<boolean | null>(null);

  const onBlur = React.useCallback(e => {
    changeValidityState(e.target.checkValidity());
  }, []);

  return (
    <Flex width="100%">
      <Box flex="1" as="label" htmlFor={id}>
        {schema.title}
      </Box>
      <Box flex="1">
        <Flex width="100%">
          <Input
            type="text"
            id={id}
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
            minLength={schema.minLength}
            maxLength={schema.maxLength}
            required={schema.required}
            onBlur={onBlur}
            flex="1"
          />
          <Box>
            {schema.required && ' *'}
            <ValidityIndicator state={validityState} />
          </Box>
        </Flex>
      </Box>
    </Flex>
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
  const [validityState, changeValidityState] = React.useState<boolean | null>(null);

  const onBlur = React.useCallback(e => {
    changeValidityState(e.target.checkValidity());
  }, []);

  return (
    <Flex width="100%">
      <Box flex="1" as="label" htmlFor={id}>
        {schema.title}
      </Box>
      <Box flex="1">
        <Flex width="100%">
          <Checkbox
            id={id}
            checked={value}
            disabled={false}
            onChange={_value => onChange(_value)}
            required={schema.required}
            onBlur={onBlur}
          />
          <Box>
            {schema.required && ' *'}
            <ValidityIndicator state={validityState} />
          </Box>
        </Flex>
      </Box>
    </Flex>
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
