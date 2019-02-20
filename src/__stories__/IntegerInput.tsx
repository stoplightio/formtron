import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, number, select, text } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit';
import { IntegerInput } from '../components/IntegerInput';
import { ThemeZone } from '../theme';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <ThemeZone name="formtron">{storyFn()}</ThemeZone>)
  .add('IntegerInput', () => {
    return (
      <Box width="300px">
        <IntegerInput
          value={number('value', 42)}
          selection="/#"
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
