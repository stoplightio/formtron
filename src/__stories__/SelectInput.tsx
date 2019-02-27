import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select, text } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit/Box';
import { SelectInput } from '../components/SelectInput';
import { Theme, Tooltips } from './decorators';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(Theme)
  .addDecorator(Tooltips)
  .add('SelectInput', () => {
    const options = ['choice a', 'choice b', 'choice c'];
    return (
      <Box width="300px">
        <SelectInput
          value={select('value', options, 'choice a')}
          path={[]}
          schema={{
            title: text('schema.title', 'Title'),
            options,
            required: boolean('schema.required', false),
            strict: boolean('schema.strict', false),
          }}
          onChange={action('onChange')}
          fieldComponents={{}}
          disabled={boolean('disabled', false)}
        />
      </Box>
    );
  });
