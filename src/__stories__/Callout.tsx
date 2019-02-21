import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { select, text } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit/Box';
import { Callout } from '../components/Callout';
import { Theme } from './decorators';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(Theme)
  .add('Callout', () => {
    return (
      <Box width="300px" height="100px" backgroundColor="blue">
        <Callout variant={select('variant', ['invalid', ''], '')}>
          {text('children', 'This is an error message description.')}
        </Callout>
      </Box>
    );
  });
