import { storiesOf } from '@storybook/react';
import * as React from 'react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

// @ts-ignore
import { boolean, number, select, text } from '@storybook/addon-knobs/react';

import { CheckboxInput } from '../components/CheckboxInput';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('CheckboxInput', () => {
    return (
      <CheckboxInput
        value={boolean('value', true)}
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
