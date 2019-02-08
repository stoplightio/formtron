import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit/Box';
import { CheckboxInput } from '../components/CheckboxInput';
import { ThemeZone } from '../theme';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <ThemeZone name="formtron">{storyFn()}</ThemeZone>)
  .add('CheckboxInput', () => {
    return (
      <Box width="300px">
        <CheckboxInput
          value={boolean('value', true)}
          selection="/#"
          schema={{
            title: text('schema.title', 'Title'),
            required: boolean('schema.required', false),
          }}
          onChange={action('onChange')}
          fieldComponents={{}}
        />
      </Box>
    );
  });
