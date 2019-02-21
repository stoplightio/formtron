import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select, text } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit/Box';
import { StringInput } from '../components/StringInput';
import { ThemeZone } from '../theme';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <ThemeZone name="formtron">{storyFn()}</ThemeZone>)
  .add('StringInput', () => {
    return (
      <Box width="300px" m={3}>
        <StringInput
          value={text('value', 'some text')}
          path={[]}
          schema={{
            title: text('schema.title', 'Title'),
            required: boolean('schema.required', false),
            minLength: text('schema.minLength', null),
            maxLength: text('schema.maxLength', null),
          }}
          onChange={action('onChange')}
          fieldComponents={{}}
          variant={select('variant', ['invalid', ''], '')}
          messages={[text('messages', '')]}
        />
      </Box>
    );
  });
