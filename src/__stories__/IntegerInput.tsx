import { storiesOf } from '@storybook/react';
import * as React from 'react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

// @ts-ignore
import { boolean, number, select, text } from '@storybook/addon-knobs/react';

import { IntegerInput } from '../components/IntegerInput';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('IntegerInput', () => {
    return (
      <IntegerInput
        value={number('value', 42)}
        selection="/#"
        schema={{
          title: text('schema.title', 'Title'),
          required: boolean('schema.required', false),
        }}
        onChange={() => void 0}
        fieldComponents={{}}
      />
    );
  });
