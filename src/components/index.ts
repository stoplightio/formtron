import { ArrayInput } from './ArrayInput';
import { CheckboxInput } from './CheckboxInput';
import { Form } from './Form';
import { IntegerInput } from './IntegerInput';
import { JsonInput } from './JsonInput';
import { MarkdownInput } from './MarkdownInput';
import { ObjectInput } from './ObjectInput';
import { MultiselectInput, SelectInput } from './SelectInput';
import { StringInput } from './StringInput';
import { ToggleInput } from './ToggleInput';

export const fieldComponents = {
  array: ArrayInput,
  object: ObjectInput,
  checkbox: CheckboxInput,
  form: Form,
  integer: IntegerInput,
  json: JsonInput,
  markdown: MarkdownInput,
  multiselect: MultiselectInput,
  select: SelectInput,
  string: StringInput,
  toggle: ToggleInput,
};

export * from './AutocompletionContext';
export * from './DiagnosticMessagesContext';
