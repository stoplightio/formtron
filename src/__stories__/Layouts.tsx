import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit';
import { Formtron } from '..';
import { fieldComponents } from '../components';
import { Theme, Tooltips } from './decorators';

const data = require('./examples/layouts/data.json');
const schema = require('./examples/layouts/schema.json');

storiesOf('Layouts', module)
  .addDecorator(withKnobs)
  .addDecorator(Theme)
  .addDecorator(Tooltips)
  .add('examples', () => {
    return (
      <Box width="500px">
        <Formtron
          fieldComponents={fieldComponents}
          value={data}
          schema={schema}
          selection="."
          onChange={action('onChange')}
          layout={select('layout', ['', '2-col', '3-col', 'hide-some', 'wild'], '')}
        />
      </Box>
    );
  });
