import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit';
import { Form } from '../components/Form';
import { StringInput } from '../components/StringInput';
import { Theme, Tooltips } from './decorators';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(Theme)
  .addDecorator(Tooltips)
  .add('Form', () => {
    return (
      <Box width="300px">
        <Form
          value={{
            key: 'value',
          }}
          path={[]}
          schema={{
            title: text('schema.title', 'Title'),
            required: boolean('schema.required', false),
            fields: {
              key: {
                type: 'string',
              },
            },
          }}
          onChange={action('onChange')}
          fieldComponents={{ string: StringInput }}
        />
      </Box>
    );
  });
