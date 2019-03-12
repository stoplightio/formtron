# formtron 2.0 🎛

<!-- BADGES -->

The **_ultimate_** form builder for React!

- Explore the components: [Storybook](https://stoplightio.github.io/formtron/)
- View the changelog: [Releases](https://github.com/stoplightio/formtron/releases)

---

This package contains both _Formtron_ and the _[UI-kit](https://github.com/stoplightio/ui-kit) Field Components_

Formtron (`'formtron'`) exports:

- a React component: `Formtron`
- a series of functions for transforming data: `deriveFormData`, `computeOps`, `applyOps`, `computeWarnings`

- a [schema](./docs/FormtronSchema.md) for defining a series of fields and mapping those fields to the underlying data

The UI-Kit Field Components (`'formtron/components'`) exports:

- a dictionary (`{[string]: FunctionComponent}`) of React components built using the Stoplight UI kit: `fieldComponents`
- two React Contexts: `AutocompletionContext`, `DiagnosticMessagesContext`

### Formtron Features

- Built for React in TypeScript
- Terse schema syntax for defining forms
- Multiple custom layouts
- Show fields conditionally based on the value of other fields
- Schema supports passing custom data to field components

### UI-Kit Field Components Features

- Field components for
  - array
  - object
  - checkbox
  - form
  - integer
  - json
  - markdown
  - multiselect
  - select
  - string
  - toggle
- auto-completion provider for `select` and `multiselect`
- tooltips for every field to display diagnostic messages

### Installation

Supported in modern browsers and node.

```bash
# latest stable
yarn add formtron
```

### Usage

```tsx
import { applyOps, Formtron } from "formtron";
import { fieldComponents } from "formtron/components"; // or bring your own components

<Formtron
  fieldComponents={fieldComponents}
  value={this.state.data}
  schema={this.props.schema}
  selection={this.props.selection}
  onChange={ops => {
    const previewOutput = applyOps(this.state.data, ops);
    this.setState(state => ({ ...state, ops, previewOutput }));
  }}
  layout={this.props.layout}
/>;
```

`fieldComponents` is an object whose values are React components and whose keys correspond to field "type"s in the schema.
Learn more about the react components in the next section. Learn more about schema types in the [FormtronSchema.md](./docs/FormtronSchema.md)

`value` is a read-only JSON-like data object that provides the initial values for the form.

`schema` is a read-only JSON object that has it's own documentation [page](./docs/FormtronSchema.md)

`selection` is a read-only `.` separated path to the currently "selected" node.

`onChange` emits a JSON-patch-like object... it's practically JSON patch except it uses "." for paths instead of "/".
You can use the exported `applyOps` function to apply the changes when the user hits a Save button or something.

`layout` is an (optional) string selecting which layout to use. Layouts can be defined in the `schema`.

### Using UI-Kit Field Components

The raw `<Formtron>` component is completely agnostic and has no set of primitive types.
Every "type" used in you schema (boolean, string, etc) must have a corresponding React component.
At [Stoplight](https://stoplight.io) we use [`ui-kit`](https://github.com/stoplightio/ui-kit) to build our UI.
Therefore the default set of components are React components built with `ui-kit`.
Feel free to use them in your own project, or skip to the next section to learn how to implement your own formtron-compatible components.

These types arre defined in `ui-schema.json`.

As a Stoplight developer, you should use the provided `ui-schema.json` to validate your Formtron UI Schema,
and extend it as new primitive types are created.

Some of these extend the minimum field schema (`type`, `title`, `show`, `area`) with additional properties, like:

- `required`, `minLength`, etc
- `options` and `evalOptions` (for `select` and `multiselect` types)

### Implementing Field Components

Field components need to implement the `IFormtronControl` interface in order for Formtron to use them.

```ts
export interface IFormtronControl {
  id?: string;
  path: string[];
  value: any;
  onChange: (value: any) => void;
  schema: any;
  fieldComponents: Dictionary<React.FunctionComponent<IFormtronControl>>;
  disabled?: boolean;
  layout?: string;
}
```

The `id` prop is a suggested value for your component's `id` prop, for accessibility.

The `path` prop indicates where the field component's `value` is with respect to the top-level Formtron value. This is provided to the component so it can look up additional metadata such as diagnostic messages.

The use of `value` and `onChange` is mandatory. Generally field components are [controlled components](https://reactjs.org/docs/forms.html#controlled-components).

You can use the `schema` that is provided to make use of additional properties such as `schema.required` and `schema.maxLength` or `schema.custom.widget`.

You need not use `fieldControls` yourself but it is provided in case you are implementing a component that nests other field components.

The `disabled` prop is passed from Formtron on to field components.

The `layout` prop is passed from Formtron on to field components.

### Contributing

1. Clone repo.
2. Create / checkout `feature/{name}`, `chore/{name}`, or `fix/{name}` branch.
3. Install deps: `yarn`.
4. Make your changes.
5. Run tests: `yarn test.prod`.
6. Stage relevant files to git.
7. Commit: `yarn commit`. _NOTE: Commits should follow the [conventional](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional) format. `yarn commit` creates this format for you, or you can put it together manually and then do a regular `git commit`._
8. Push: `git push`.
9. Open PR targeting the `master` branch.
