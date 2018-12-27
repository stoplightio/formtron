import { CheckboxInput } from './CheckboxInput';
import { Form } from './Form';
import { IntegerInput } from './IntegerInput';
import { JsonInput } from './JsonInput';
import { MarkdownInput } from './MarkdownInput';
import { MultiselectInput, SelectInput } from './SelectInput';
import { StringInput } from './StringInput';

import {
  FormArrayInput,
  KeyedFormArrayInput,
  KeyedStringArrayInput,
  MultiselectArrayInput,
  StringArrayInput,
} from './complex';

export const fieldComponents = {
  'form[]': FormArrayInput,
  'form{}': KeyedFormArrayInput,
  'multiselect[]': MultiselectArrayInput,
  'string[]': StringArrayInput,
  'string{}': KeyedStringArrayInput,
  checkbox: CheckboxInput,
  form: Form,
  integer: IntegerInput,
  json: JsonInput,
  markdown: MarkdownInput,
  multiselect: MultiselectInput,
  select: SelectInput,
  string: StringInput,
};

export * from './AutocompletionContext';
