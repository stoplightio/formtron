import { storiesOf } from '@storybook/react';
import * as React from 'react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

// @ts-ignore
import { boolean, select, text } from '@storybook/addon-knobs/react';

import { FormtronDebugger } from './FormtronDebugger';

const simpleData = require('../__tests__/examples/simple/data.json');
const simpleSchema = require('../__tests__/examples/simple/schema.json');

const variousData = require('../__tests__/examples/various-types/data.json');
const variousSchema = require('../__tests__/examples/various-types/schema.json');

const wildcardData = require('../__tests__/examples/wildcards/data.json');
const wildcardSchema = require('../__tests__/examples/wildcards/schema.json');

const complexData = require('../__tests__/examples/complex/data.json');
const complexSchema = require('../__tests__/examples/complex/schema.json');

const dependentData = require('../__tests__/examples/dependent-variables/data.json');
const dependendSchema1 = require('../__tests__/examples/dependent-variables/schemaA.json');
const dependentSchema2 = require('../__tests__/examples/dependent-variables/schemaB.json');

const customWidgetData = require('./examples/custom-widget/data.json');
const customWidgetSchema = require('./examples/custom-widget/schema.json');

const arrayData = require('./examples/array/data.json');
const arraySchema = require('./examples/array/schema.json');

const objectData = require('./examples/object/data.json');
const objectSchema = require('./examples/object/schema.json');

const showData = require('./examples/show/data.json');
const showSchema = require('./examples/show/schema.json');

const evalOptionsData = require('./examples/evalOptions/data.json');
const evalOptionsSchema = require('./examples/evalOptions/schema.json');

// We need to load some Icons into the IconLibrary!
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { IconLibrary } from '@stoplight/ui-kit';
// @ts-ignore
IconLibrary.add(faCheck);

storiesOf('formtron', module)
  .addDecorator(withKnobs)
  .add('simple', () => {
    return <FormtronDebugger input={simpleData} schema={simpleSchema} selection={simpleData._selection} />;
  })
  .add('various types', () => {
    return <FormtronDebugger input={variousData} schema={variousSchema} selection={variousData._selection} />;
  })
  .add('wildcards', () => {
    return <FormtronDebugger input={wildcardData} schema={wildcardSchema} selection={wildcardData._selection} />;
  })
  .add('complex', () => {
    return <FormtronDebugger input={complexData} schema={complexSchema} selection={complexData._selection} />;
  })
  .add('dependent variables 1', () => {
    return <FormtronDebugger input={dependentData} schema={dependendSchema1} selection={dependentData._selection} />;
  })
  .add('dependent variables 2', () => {
    return <FormtronDebugger input={dependentData} schema={dependentSchema2} selection={dependentData._selection} />;
  })
  .add('custom widgets', () => {
    return (
      <FormtronDebugger input={customWidgetData} schema={customWidgetSchema} selection={customWidgetData._selection} />
    );
  })
  .add('array', () => {
    return <FormtronDebugger input={arrayData} schema={arraySchema} selection={arrayData._selection} />;
  })
  .add('object', () => {
    return <FormtronDebugger input={objectData} schema={objectSchema} selection={objectData._selection} />;
  })
  .add('show', () => {
    return <FormtronDebugger input={showData} schema={showSchema} selection={showData._selection} />;
  })
  .add('evalOptions', () => {
    return (
      <FormtronDebugger input={evalOptionsData} schema={evalOptionsSchema} selection={evalOptionsData._selection} />
    );
  });

// const diagnostics = {
//   '': ['Validate structure of OpenAPIv2 specification.'],
//   description: ['Operation `description` must be present and non-empty string.'],
//   contact: ['Info object should contain `contact` object.'],
// };
