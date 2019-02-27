import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit/Box';
import { fieldComponents } from '../components';
import { ArrayInput } from '../components/ArrayInput';
import { Theme, Tooltips } from './decorators';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(Theme)
  .addDecorator(Tooltips)
  .add('ArrayInput', () => {
    return (
      <Box width="300px">
        <ArrayInput
          value={[42, 23, 97]}
          path={[]}
          schema={{
            type: 'array',
            title: 'Array',
            items: {
              type: 'integer',
              title: 'Number',
            },
          }}
          onChange={action('onChange')}
          fieldComponents={fieldComponents}
          disabled={boolean('disabled', false)}
        />
      </Box>
    );
  });
