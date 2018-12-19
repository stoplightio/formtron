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
const customWidgetData = require('./examples/custom-widget/data.json');
const customWidgetSchema = require('./examples/custom-widget/schema.json');

const complexData = require('../__tests__/examples/complex/data.json');
const complexSchema = require('../__tests__/examples/complex/schema.json');
const dependentData = require('../__tests__/examples/dependent-variables/data.json');
const dependendSchema1 = require('../__tests__/examples/dependent-variables/schemaA.json');
const dependentSchema2 = require('../__tests__/examples/dependent-variables/schemaB.json');

// We need to load some Icons into the IconLibrary!
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { IconLibrary } from '@stoplight/ui-kit';
// @ts-ignore
IconLibrary.add(faCheck);

// import './style.css';

storiesOf('formtron', module)
  .addDecorator(withKnobs)
  .add('simple', () => {
    return (
      <div className="formtron" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <FormtronDebugger input={simpleData} schema={simpleSchema} selection={simpleData._selection} />
      </div>
    );
  })
  .add('various types', () => {
    return (
      <div className="formtron" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <FormtronDebugger input={variousData} schema={variousSchema} selection={variousData._selection} />
      </div>
    );
  })
  .add('wildcards', () => {
    return (
      <div className="formtron" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <FormtronDebugger input={wildcardData} schema={wildcardSchema} selection={wildcardData._selection} />
      </div>
    );
  })
  .add('custom widgets', () => {
    return (
      <div className="formtron" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <FormtronDebugger
          input={customWidgetData}
          schema={customWidgetSchema}
          selection={customWidgetData._selection}
        />
      </div>
    );
  })
  .add('complex', () => {
    return (
      <div className="formtron" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <FormtronDebugger input={complexData} schema={complexSchema} selection={complexData._selection} />
      </div>
    );
  })
  .add('dependent variables 1', () => {
    return (
      <div className="formtron" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <FormtronDebugger input={dependentData} schema={dependendSchema1} selection={dependentData._selection} />
      </div>
    );
  })
  .add('dependent variables 2', () => {
    return (
      <div className="formtron" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <FormtronDebugger input={dependentData} schema={dependentSchema2} selection={dependentData._selection} />
      </div>
    );
  });
