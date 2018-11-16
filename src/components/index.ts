import {
  CheckboxInput,
  IntegerInput,
  MultiSelect,
  PasswordInput,
  SelectInput,
  StringInput,
  TelephoneInput,
} from './basic';

import { JsonInput, MarkdownInput } from './advanced';

import {
  Form,
  FormArrayInput,
  KeyedFormArrayInput,
  KeyedStringArrayInput,
  MultiSelectArrayInput,
  StringArrayInput,
} from './complex';

export const fieldComponents = {
  'form[]': FormArrayInput,
  'form{}': KeyedFormArrayInput,
  'multiselect[]': MultiSelectArrayInput,
  'string[]': StringArrayInput,
  'string{}': KeyedStringArrayInput,
  boolean: CheckboxInput,
  form: Form,
  integer: IntegerInput,
  json: JsonInput,
  markdown: MarkdownInput,
  multiselect: MultiSelect,
  password: PasswordInput,
  select: SelectInput,
  string: StringInput,
  telephone: TelephoneInput,
};

export * from './AutocompletionContext';
