import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit/Box';
import { Callout } from '../components/Callout';
import { ThemeZone } from '../theme';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <ThemeZone name="formtron">{storyFn()}</ThemeZone>)
  .add('Callout', () => {
    return (
      <Box width="300px" height="100px" backgroundColor="blue">
        <Callout invalid={boolean('invalid', false)}>
          {text('children', 'This is an error message description.')}
        </Callout>
      </Box>
    );
  });
