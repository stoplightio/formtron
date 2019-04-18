import { Box, Flex, useTheme } from '@stoplight/ui-kit';
import { Select, selectStyles } from '@stoplight/ui-kit/Select';
import * as React from 'react';

import { IFormtronControl } from '..';

import { AutocompletionContext } from './AutocompletionContext';
import { useDiagnostics } from './hooks';
import { Label } from './Label';
import { Messages } from './Messages';
import { DraftValue } from './utils/DraftValue';

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
              <DraftValue value={value} onChange={onChange}>
                {({ value, onChange }) => (
                  <Flex width="100%">
                    <Box flex="1">
                      <Select
                        key={JSON.stringify(schema.options)}
                        value={{ value, label: value }}
                        defaultValue={{ value, label: value }}
                        defaultOptions
                        loadOptions={loadOptions}
                        onChange={(value: any) => {
                          if (value === null) {
                            onChange(value);
                          } else {
                            onChange(value.value);
                          }
                        }}
                        menuPlacement="auto"
                        clearable={!schema.required}
                        allowCreate={!schema.strict}
                        variant={variant}
                        disabled={disabled}
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
                )}
              </DraftValue>
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
  const theme = useTheme();
  if (!Array.isArray(value)) {
    throw new Error(`MultiSelect expects it's value prop to be an array but it was of type ${typeof value}`);
  }
  const { variant } = useDiagnostics(path);
  const selectCss = selectStyles(theme.select, variant);

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
                    ...selectCss,
                    container: (base: any) => ({
                      ...(selectCss.container && selectCss.container(base)),
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
                  variant={variant}
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
