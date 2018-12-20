import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, number, text } from '@storybook/addon-knobs/react';

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
        onChange={action('onChange')}
        fieldComponents={{}}
      />
    );
  });
