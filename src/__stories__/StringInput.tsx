import { storiesOf } from '@storybook/react';
import * as React from 'react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

// @ts-ignore
import { boolean, select, text } from '@storybook/addon-knobs/react';

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
        onChange={() => void 0}
        fieldComponents={{}}
      />
    );
  });
