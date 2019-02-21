# formtron

<!-- BADGES -->

JSON form builder for React.

- Explore the components: [Storybook](https://stoplightio.github.io/formtron/)
- View the changelog: [Releases](https://github.com/stoplightio/formtron/releases)

Formtron consists of:

- a [schema](./docs/FormtronSchema.md) for defining a series of fields and mapping those fields to the underlying data
- a separate collection of React components built using the Stoplight UI kit: `fieldComponents`
- a series of functions for transforming data: `deriveFormData`, `computeOps`, `applyOps`
- a React component: `Formtron`

### Features

- **Awesome**: It is.
- .. more features

### Installation

Supported in modern browsers and node.

```bash
# latest stable
yarn add formtron
```

### Usage

```tsx
import { applyOps, Formtron } from "formtron";

<Formtron
  fieldComponents={fieldComponents}
  value={this.state.data}
  schema={this.props.schema}
  selection={this.props.selection}
  onChange={ops => {
    const previewOutput = applyOps(this.state.data, ops);
    this.setState(state => ({ ...state, ops, previewOutput }));
  }}
/>;
```

`fieldComponents` is an object whose values are React components and whose keys correspond to field "type"s in the schema.
Learn more about the react components in the next section. Learn more about schema types in the [FormtronSchema.md](./docs/FormtronSchema.md)

`value` is a read-only JSON-like data object that provides the initial values for the form.

`schema` is a read-only JSON object that has it's own documentation [page](./docs/FormtronSchema.md)

`selection` is a read-only `.` separated path to the currently "selected" node.

`onChange` emits a JSON-patch-like object... it's practically JSON patch except it uses "." for paths instead of "/".
You can use the exported `applyOps` function to apply the changes when the user hits a Save button or something.

### Using @stoplight/ui-kit Field Components

The raw `<Formtron>` component is completely agnostic and has no set of primitive types.
Every "type" used in you schema (boolean, string, etc) must have a corresponding React component.
At [Stoplight](https://stoplight.io) we use [`ui-kit`](https://github.com/stoplightio/ui-kit) to build our UI.
Therefore the default set of components are React components built with `ui-kit`.
Feel free to use them in your own project, or skip to the next section to learn how to implement your own formtron-compatible components.

These types arre defined in `ui-schema.json`.

As a Stoplight developer, you should use the provided `ui-schema.json` to validate your Formtron UI Schema,
and extend it as new primitive types are created. Here are the defined types so far:

- string
- integer
- select
- multiselect
- markdown
- array
- object
- form
- json

Some of these extend the minimum field schema (`type`, `title`, `path`) with additional properties, like:

- `required`
- `options` (for `select` and `multiselect` types)
- `minLength` (for `markdown` type)

WARNING: The higher-order types `ArrayInput` and `KeyedArrayInput` are kind of broken.
They'll be fixed in a future user story.

### Implementing Field Components

Field components need to implement the `IFormtronControl` interface in order for Formtron to use them.

```ts
export interface IFormtronControl<T> {
  id?: string;
  value: T;
  onChange: (value: T) => void;
  schema: any;
  path: string;
  fieldComponents: Dictionary<React.StatelessComponent<IFormtronControl>>;
}
```

The `id` prop is a suggested value for your component's `id` prop, for accessibility.

The use of `value` and `onChange` is mandatory. Generally field components are [controlled components](https://reactjs.org/docs/forms.html#controlled-components).

You can use the `schema` that is provided to make use of additional properties such as `schema.required` and `schema.maxLength` or `schema.custom.widget`.

`path` is a read-only `.` separated path indicating where the field component's `value` is with respect to the top-level Formtron value.

You need not use `fieldControls` yourself but it is provided in case you are implementing a component that nests other field components.

### Contributing

1. Clone repo.
2. Create / checkout `feature/{name}`, `chore/{name}`, or `fix/{name}` branch.
3. Install deps: `yarn`.
4. Make your changes.
5. Run tests: `yarn test.prod`.
6. Stage relevant files to git.
7. Commit: `yarn commit`. _NOTE: Commits that don't follow the [conventional](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional) format will be rejected. `yarn commit` creates this format for you, or you can put it together manually and then do a regular `git commit`._
8. Push: `git push`.
9. Open PR targeting the `develop` branch.
