import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, object, select, text } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit';
import { JsonInput } from '../components/JsonInput';
import { ThemeZone } from '../theme';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <ThemeZone name="formtron">{storyFn()}</ThemeZone>)
  .add('JsonInput', () => {
    return (
      <Box width="300px">
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
          path={[]}
          schema={{
            title: text('schema.title', 'Title'),
            required: boolean('schema.required', false),
          }}
          onChange={action('onChange')}
          fieldComponents={{}}
          variant={select('variant', ['invalid', ''], '')}
          messages={[text('messages', '')]}
        />
      </Box>
    );
  });
