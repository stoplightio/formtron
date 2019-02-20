import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { select, text } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit';
import { fieldComponents } from '../components';
import { ObjectInput } from '../components/ObjectInput';
import { ThemeZone } from '../theme';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <ThemeZone name="formtron">{storyFn()}</ThemeZone>)
  .add('ObjectInput', () => {
    return (
      <Box width="300px">
        <ObjectInput
          value={{ first: 42, second: 23, third: 97 }}
          selection="."
          schema={{
            type: 'object',
            title: 'Object',
            keys: {
              type: 'string',
              title: 'Name',
            },
            values: {
              type: 'integer',
              title: 'Number',
            },
          }}
          onChange={action('onChange')}
          fieldComponents={fieldComponents}
          variant={select('variant', ['invalid', ''], '')}
          messages={[text('messages', '')]}
        />
      </Box>
    );
  });
