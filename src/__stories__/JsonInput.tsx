import { storiesOf } from '@storybook/react';
import * as React from 'react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

// @ts-ignore
import { boolean, number, object, select, text } from '@storybook/addon-knobs/react';

import { JsonInput } from '../components/JsonInput';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('JsonInput', () => {
    return (
      <JsonInput
        value={object('value', {
          _id: '5c1ae511f09121c5887e5a93',
          index: 0,
          guid: 'f5c7f172-8e61-4a92-b407-1d76f5dfa792',
          isActive: true,
          balance: '$3,944.87',
          picture: 'http://placehold.it/32x32',
          age: 39,
          eyeColor: 'green',
          name: {
            first: 'Weeks',
            last: 'Barton',
          },
        })}
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
