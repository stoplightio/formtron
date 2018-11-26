# Formtron UI Schema

The UI schema is defined using JSON schema in formtron/formtron-schema.json.
(When you are authoring schemas, add a `"$schema":` line to enable VS Code's built-in JSON schema validation.)
Here's a brief tutorial.

```json
{
  "$schema": "../../formtron/formtron-schema.json",
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
However OAS and other schemas are insane and don't do this.
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
  "$schema": "../../formtron/formtron-schema.json",
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

While Formtron is agnostic about the set of primitive types (components) you use to build your form,
it _does_ have two special builtin higher-order types: `array` and `object`.

These to types require another property in addition to `type`, `title`, and `path`: `item`.
The `item` property holds a subschema for another field.
The only difference between an `item` schema and a normal field schema is that `item` schemas cannot have a `path` property.
(Because the path is determined by the placement in the `array` or `object`.)

Unfortunately, even if `array` or `object` components are implemented as a HOC, each variant of `array` or `object` must be pre-built and registered separately.
(This is not a design feature as much as a compromise due to my programming skills. :wink:)
Formtron will translate a `array` with `items.type` of "foo" into a key "foo[]", and an `object` with `items.type` of "foo" into a key "foo{}".

Here's an example where we register both `string` and `string[]`:

```jsx
<Formtron
  fieldComponents={
    string: TextInput,
    'string[]': ListHOC(TextInput)
  }
/>
```

```json
{
  "$schema": "../../../schema.json",
  "type": "form",
  "title": "Simplest Ever Form",
  "description": "A single string field",
  "fields": {
    "tags": {
      "type": "array",
      "title": "Tag List",
      "items": {
        "type": "string",
        "title": "Tag"
      }
    }
  }
}
```

Note: You don't ever have to use this feature. It's provided merely as a convenience, and is maybe a bad idea.
