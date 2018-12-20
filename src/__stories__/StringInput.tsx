import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';

import { StringInput } from '../components/StringInput';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('StringInput', () => {
    return (
      <StringInput
        value={text('value', 'some text')}
        selection="/#"
        schema={{
          title: text('schema.title', 'Title'),
          required: boolean('schema.required', false),
          minLength: text('schema.minLength', null),
          maxLength: text('schema.maxLength', null),
        }}
        onChange={action('onChange')}
        fieldComponents={{}}
      />
    );
  });
