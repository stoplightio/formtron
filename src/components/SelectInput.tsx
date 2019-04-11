import { Box, Flex } from '@stoplight/ui-kit';
import { Select } from '@stoplight/ui-kit/Select';
import * as React from 'react';

import { IFormtronControl } from '..';

import { useDraftValue } from '../hooks/useDraftValue';
import { AutocompletionContext } from './AutocompletionContext';
import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { Variant } from './types';

export const SelectInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value,
  schema,
  onChange,
  path,
  fieldComponents,
  disabled = false,
}) => {
  const { variant } = useDiagnostics(path);
  const [draft, _onChange] = useDraftValue(value, onChange);

  return (
    <AutocompletionContext.Consumer>
      {autocompletionSources => {
        const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];
        const loadOptions =
          schema.custom && schema.custom.source
            ? autocompletionSources[schema.custom.source]
            : schema.options
              ? async () => schema.options.map((o: string) => ({ value: o, label: o }))
              : async (search: string) => [{ value: search, label: search }];
        return (
          <Box>
            <Box>
              <Messages path={path}>
                <Label htmlFor={id} variant={variant} disabled={disabled}>
                  {schema.title}
                </Label>
              </Messages>
            </Box>
            <Box>
              <Flex width="100%">
                <Box flex="1">
                  <Select
                    key={JSON.stringify(schema.options)}
                    value={{ value: draft, label: draft }}
                    defaultValue={{ value: draft, label: draft }}
                    defaultOptions
                    loadOptions={loadOptions}
                    onChange={(value: any) => {
                      if (value === null) {
                        _onChange(value);
                      } else {
                        _onChange(value.value);
                      }
                    }}
                    menuPlacement="auto"
                    clearable={!schema.required}
                    allowCreate={!schema.strict}
                    invalid={variant === Variant.invalid}
                    disabled={disabled}
                    searchable={false}
                    {...schema.custom && schema.custom.props}
                  />
                </Box>
                {CustomWidget && (
                  <CustomWidget
                    value={draft}
                    schema={schema}
                    path={path}
                    onChange={_onChange}
                    fieldComponents={fieldComponents}
                    disabled={disabled}
                  />
                )}
              </Flex>
            </Box>
          </Box>
        );
      }}
    </AutocompletionContext.Consumer>
  );
};

export const MultiselectInput: React.FunctionComponent<IFormtronControl> = ({
  id,
  value = [],
  schema,
  onChange,
  fieldComponents,
  path,
  disabled = false,
}) => {
  if (!Array.isArray(value)) {
    throw new Error(`MultiSelect expects it's value prop to be an array but it was of type ${typeof value}`);
  }
  const { variant } = useDiagnostics(path);

  return (
    <AutocompletionContext.Consumer>
      {autocompletionSources => {
        const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];
        const loadOptions =
          schema.custom && schema.custom.source
            ? autocompletionSources[schema.custom.source]
            : schema.options
              ? async () => schema.options.map((o: string) => ({ value: o, label: o }))
              : async (search: string) => [{ value: search, label: search }];
        return (
          <Box>
            <Messages path={path}>
              <Label htmlFor={id} variant={variant} disabled={disabled}>
                {schema.title}
              </Label>
            </Messages>
            <Flex>
              <Box flex="1">
                <Select
                  key={JSON.stringify(value) + JSON.stringify(schema.options)}
                  styles={{
                    container: (base: any) => ({
                      ...base,
                      display: 'inline-block',
                      minWidth: 200,
                    }),
                  }}
                  defaultValue={value.map(_value => ({ value: _value, label: _value }))}
                  isMulti
                  loadOptions={loadOptions}
                  defaultOptions
                  onChange={(values: any) =>
                    values && Array.isArray(values)
                      ? onChange(values.map(v => v.value))
                      : values && onChange(values.value)
                  }
                  menuPlacement="auto"
                  allowCreate={!schema.strict}
                  invalid={variant === Variant.invalid}
                  disabled={disabled}
                  clearable={false}
                  searchable={false}
                  {...schema.custom && schema.custom.props}
                />
              </Box>
              {CustomWidget && (
                <CustomWidget
                  value={value}
                  schema={schema}
                  path={path}
                  onChange={onChange}
                  fieldComponents={fieldComponents}
                  disabled={disabled}
                />
              )}
            </Flex>
          </Box>
        );
      }}
    </AutocompletionContext.Consumer>
  );
};
