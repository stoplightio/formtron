/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Flex } from '@stoplight/ui-kit';
import { Select } from '@stoplight/ui-kit/Select';
import * as React from 'react';

import { IFormtronControl } from '..';
import { DraftValue } from './utils/DraftValue';

import { AutocompletionContext } from './AutocompletionContext';

export const SelectInput: React.FunctionComponent<IFormtronControl> = ({
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
              : async (search: string) => [{ value: search, label: search }];
        return (
          <Flex width="100%">
            <Box flex="1" as="label" htmlFor={id}>
              {schema.title}
            </Box>
            <Flex flex="1" width="100%">
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
                      />
                    </Box>
                    {schema.required && ' *'}
                    {CustomWidget && (
                      <CustomWidget
                        value={value}
                        schema={schema}
                        selection={selection}
                        onChange={onChange}
                        fieldComponents={fieldComponents}
                      />
                    )}
                  </Flex>
                )}
              </DraftValue>
            </Flex>
          </Flex>
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
  selection,
}) => {
  if (!Array.isArray(value)) {
    throw new Error(`MultiSelect expects it's value prop to be an array but it was of type ${typeof value}`);
  }
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
            <Box as="label" htmlFor={id}>
              {schema.title}
            </Box>
            <Flex width="100%">
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
                />
              </Box>
              {schema.required && ' *'}
              {CustomWidget && (
                <CustomWidget
                  value={value}
                  schema={schema}
                  selection={selection}
                  onChange={onChange}
                  fieldComponents={fieldComponents}
                />
              )}
            </Flex>
          </Box>
        );
      }}
    </AutocompletionContext.Consumer>
  );
};
