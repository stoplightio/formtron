# Formtron UI Schema <!-- omit in toc -->

- [Introduction](#introduction)
- [Mapping form fields to Object keys](#mapping-form-fields-to-object-keys)
- [Escaping literal '\*' and '?' in paths](#escaping-literal--and--in-paths)
- [Conditional / Dynamic behavior](#conditional--dynamic-behavior)
- [Primitive Field Types](#primitive-field-types)
- [Complex Field Types](#complex-field-types)
- [Layouts](#layouts)

## Introduction

The UI schema is defined using JSON schema in formtron/formtron-schema.json.
(When you are authoring schemas, add a `"$schema":` line to enable VS Code's built-in JSON schema validation.)
Here's a brief tutorial.

```json
{
  "$schema": "./node_modules/formtron/formtron-schema.json",
  "type": "form",
  "title": "Simplest Ever Form",
  "description": "A single string field",
  "fields": {
    "name.firstName": {
      "type": "string",
      "title": "Your Name"
    },
    "age_in_years": {
      "type": "integer",
      "title": "Your Age"
    }
  }
}
```

The schema above defines a relationship between an object that looks like this:

```json
{
  "name": {
    "firstName": "Alice",
    "lastName": "Smith"
  },
  "age_in_years": 20
}
```

And a form that looks similar to this:

    ,-----------------------------------------------------------,
    |             ,-----------,                                 |
    | Your Name:  | Alice     |   <-- "string" input component  |
    |             '-----------'                                 |
    |                                                           |
    |             ,-------,                                     |
    | Your Age:   | 20  ⯅ |   <-- "integer" input component     |
    |             |     ⯆ |                                     |
    |             '-------'                                     |
    '-----------------------------------------------------------'

To do this, it transforms the raw input data into an intermediary format that is flat, and contains only the data the form cares about:

```json
{
  "name.firstName": "Alice",
  "age_in_years": 20
}
```

## Mapping form fields to Object keys

All sane schemas data use known keys, and variable data.
However OAS and other schemas don't do this.
This requires a way to map form value to _path names_ as well as _values_.

This is done using wildcard matching syntax. `*` lets you match any key name and an `?` indicates the key name to use as the form value.

Consider this OAS example. The data looks something like this:

```json
{
  "paths": {
    "/v1/my-api/cats": {
      "get": {
        "description": "Return a list of all the cats."
      },
      "post": {
        "description": "Create a new cat."
      }
    }
  }
}
```

In order to map this to a flat form, we use `*` wildcards to match paths, and `?` to assign a property name to that field instead of a property value.

```json
{
  "$schema": "../../../stoplight-schema.json",
  "title": "Form (OASv2 Operation Node)",
  "description": "An HTTP operation.",
  "type": "form",
  "fields": {
    "paths.*.?": {
      "type": "select",
      "options": ["get", "post", "put", "delete", "options"],
      "title": "Method"
    },
    "paths.?": {
      "type": "string",
      "title": "path",
      "required": true
    },
    "paths.*.*.description": {
      "type": "markdown",
      "title": "Description"
    }
  }
}
```

The wildcards `*` are filled in with current `selection` path.
So `paths.*` indicates the child of`paths` that is "currently selected".

If `paths./v1/my-api/cats.get` is "selected" then `paths.?` represents `"/v1/my-api/cats"`
and `paths.*` represents the value at `paths./v1/my-api/cats`.
Also `paths.*.?` represents `"get"` and `paths.*.*` represents the value at `paths./v1/my-api/cats.get`.

**What if I make a loop / something that can't be resolved?**

It will throw an error, and you'll have to deal with it. Since the schemas (and thus their resolution behavior) are static, you'd discover such a mistake long before it reached production.

## Escaping literal '\*' and '?' in paths

TODO: Support for escaping is not yet implemented!!!

Should `*` and `?` be problematic for your data set - for instance the data you are working with contains literal `?` as a key, i.e.:

```json
{
  "translations": {
    "?": "question mark",
    "*": "asterisk"
  }
}
```

then you can escape the value in the path with a double-backslash.

```json
{
  "$schema": "./node_modules/formtron/formtron-schema.json",
  "type": "form",
  "title": "Translations",
  "description": "Translation table for punctuation",
  "fields": {
    "translations.\\?": {
      "type": "string",
      "title": "Name for '?' symbol"
    },
    "translations.\\*": {
      "type": "string",
      "title": "Name for '*' sumbol"
    }
  }
}
```

## Conditional / Dynamic behavior

### Conditional showing / hiding of fields <!-- omit in toc -->

Sometimes you want fields to only be visible if certain other fields have certain values.
Formtron includes an expression interpreter that lets you add this conditional logic.
Just add a `show` property to a form field with a JavaScript expression in a string.
(For technical limitations of the interpreter, see the `expression-eval` package on npm.)

```json
{
  "$schema": "./node_modules/formtron/ui-schema.json",
  "type": "form",
  "title": "Pets",
  "description": "Pet form",
  "fields": {
    "pets.*.name": {
      "type": "string",
      "title": "Pet's Name"
    },
    "pets.*.kind": {
      "type": "select",
      "title": "Type of Animal",
      "options": ["bird", "dog", "cat"]
    },
    "pets.*.airSpeed": {
      "type": "number",
      "title": "Airspeed Velocity (unladen)",
      "show": "kind === 'bird'"
    },
    "pets.*.groundSpeed": {
      "type": "string",
      "title": "Top speed (fetching)",
      "show": "kind === 'dog'"
    },
    "pets.*.jumpHeight": {
      "type": "string",
      "title": "Max jump height",
      "show": "kind === 'cat'"
    }
  }
}
```

The variables used in expressions are the field keys, trimmed after the last period.
(Setting an `area` overrides this and will use that as the variable name.)
You can only reference a field that precedes the current field.
(E.g. you cannot have a field's visibility depend on its own value, or the value of a field below it.)
This ensures a nice top-to-bottom data dependency that keeps the form from becoming a nightmare to debug.

### Conditional enable/disable of fields <!-- omit in toc -->

Exactly the same as for `show` except the field is called `enable`.

### Dynamic `options` for selects <!-- omit in toc -->

The ui-kit "select" and "multiselect" Formtron components allow specifying an `evalOptions` property.
It is just like an `options` property except instead of an array, it is a string containing a JavaScript expression that should evaluate to an array.

Example:

```json
{
  "$schema": "./node_modules/formtron/ui-schema.json",
  "type": "form",
  "title": "Parameter",
  "description": "Parameter",
  "fields": {
    "paths.*.*.parameters.*.type": {
      "type": "select",
      "title": "Type",
      "options": ["number", "integer", "boolean"]
    },
    "paths.*.*.parameters.*.format": {
      "type": "select",
      "title": "Format",
      "evalOptions": "type === 'integer' ? ['int32','int64'] : type === 'number' ? ['float','double'] : []"
    },
  }
}
```

### `strict` option for selects <!-- omit in toc -->

The ui-kit "select" and "multiselect" Formtron components allow specifying a `strict` boolean property.
It defaults to `false`. If set to true, then users will not be allowed
to enter arbitrary values and are forced to pick from the options list
presented.

## Primitive Field Types

The `<Formtron>` component is not aware of any primitive types - the core set of field types is whatever you define.
Field types have a 1-to-1 relationship with React components, and Formtron does not provide any React components, therefore there is no default set.

Lets say you have a `<TextInput>` component, a `<NumberInput>` component, and a `<Slider>` component.
Then you would register these types with `Formtron` by passing them to the `FieldComponents` prop:

```jsx
<Formtron
  fieldComponents={
    text: TextInput,
    num: NumberInput,
    slide: Slider
  }
/>
```

Then in your schema, you could use them like:

```json
{
  "$schema": "../../../schema.json",
  "type": "form",
  "title": "Simplest Ever Form",
  "description": "A single string field",
  "fields": {
    "name": {
      "type": "text",
      "title": "Your Name"
    },
    "age": {
      "type": "num",
      "title": "Your Age"
    },
    "rating": {
      "type": "slide",
      "title": "Rate this App"
    }
  }
}
```

## Complex Field Types

Since Formtron is agnostic about the set of primitive types (components) you use to build your form,
it is _also_ agnostic about complex types (higher-order components).
Every `fieldComponent` receives a copy of the top-level `fieldComponents` prop originally passed to `<Formtron>`,
so you can nest and inject components ad-hoc.

For instance, you can implement a generic `array` component (such as the one in `formtron/components/ArrayInput`)
that includes UI for appending, inserting, and deleting items from a list.
It uses an additional schema property - `items` - to hold a subschema that is used to render each item.
The `default` schema property is needed so that newly created items have a valid initial value.

Here's an example.

```jsx
<Formtron
  fieldComponents={
    form: FormInput,
    array: ArrayInput,
    string: StringInput
  }
/>
```

```json
{
  "$schema": "../../../schema.json",
  "type": "form",
  "title": "Arrays",
  "description": "Array demonstration",
  "fields": {
    "tags": {
      "type": "array",
      "title": "Tag List",
      "default": "",
      "items": {
        "type": "string",
        "title": "Tag"
      }
    }
  }
}
```

The UI-kit also includes a generic `object` component (`formtron/components/ObjectInput`)
that includes UI for appending, inserting, and deleting key/value pairs from an object.
It uses two additional schema properties - `keys` and `values` - to hold the subschema that is used to render each.
The `default` schema property is needed so that newly created properties have a valid initial value.

Here's an example.

```jsx
<Formtron
  fieldComponents={
    form: FormInput,
    object: ObjectInput,
    multiselect: MultiselectInput
  }
/>
```

```json
{
  "$schema": "../../../schema.json",
  "type": "form",
  "title": "Object",
  "description": "Object demonstration",
  "fields": {
    "security": {
      "type": "object",
      "title": "Security",
      "default": [],
      "keys": {
        "type": "string",
        "title": "Security Scheme"
      },
      "values": {
        "type": "multiselect",
        "title": "OAuth2 Scopes"
      }
    }
  }
}
```

## Layouts

Forms support defining layouts using a syntax inspired by CSS Grids:

```json
{
  "type": "form",
  "title": "Layout Examples",
  "layouts": {
    "2-col": [
      "a b",
      "e d",
      "c f"
    ],
    "3-col": [
      "a b c",
      "d e f"
    ],
  },
...
```

> By default, none of these layouts will be active - fields will just be layout out vertically one after the other. To activate a layout, specify a layout prop in the Formtron component. (E.g. `<Formtron layout="main">`)

Similarly to CSS Grids, you can control the relative width of fields within rows by repeating an area name. This layout makes `address` take up 2/3 width:

```json
"layouts": {
  "main": [
    "address address phone"
  ]
}
```

Typically the area names are inferred from the property names, however you can override this if necessary using the `area` property. For instance, here both `license.id` and `id` would get the same inferred name, so we have to override the infered name for one of them.

```json
{
  "type": "form",
  "title": "Layout Area Example",
  "layouts": {
    "main": ["id license"],
  },
  "fields": {
    "id": {
      "type": "string",
      "title": "Id"
    },
    "info.license.id": {
      "type": "string",
      "title": "License",
      "area": "license"
    }
  }
}
```

See the [examples](https://stoplightio.github.io/formtron/?selectedKind=Layouts&selectedStory=examples&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs) for demos.
