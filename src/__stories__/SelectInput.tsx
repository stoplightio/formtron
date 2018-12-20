import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select, text } from '@storybook/addon-knobs/react';

import { SelectInput } from '../components/SelectInput';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('SelectInput', () => {
    const options = ['choice a', 'choice b', 'choice c'];
    return (
      <SelectInput
        value={select('value', options, 'choice a')}
        selection="/#"
        schema={{
          title: text('schema.title', 'Title'),
          options,
          required: boolean('schema.required', false),
        }}
        onChange={action('onChange')}
        fieldComponents={{}}
      />
    );
  });
