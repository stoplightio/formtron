import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit/Box';
import { ToggleInput } from '../components/ToggleInput';
import { Theme, Tooltips } from './decorators';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(Theme)
  .addDecorator(Tooltips)
  .add('ToggleInput', () => {
    return (
      <Box width="300px">
        <ToggleInput
          value={boolean('value', true)}
          path={[]}
          schema={{
            title: text('schema.title', 'Title'),
            required: boolean('schema.required', false),
          }}
          onChange={action('onChange')}
          fieldComponents={{}}
          disabled={boolean('disabled', false)}
        />
      </Box>
    );
  });
