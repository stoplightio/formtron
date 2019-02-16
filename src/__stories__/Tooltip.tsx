import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';

import { Box } from '@stoplight/ui-kit/Box';
import { IntegerInput } from '../components/IntegerInput';
import { Tooltip } from '../components/Tooltip';
import { ThemeZone } from '../theme';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <ThemeZone name="formtron">{storyFn()}</ThemeZone>)
  .add('Tooltip', () => {
    return (
      <Box width="300px" m={3}>
        <Tooltip invalid={boolean('invalid', false)} message={text('message', 'This is an error message description.')}>
          <Box>
            <IntegerInput
              value={42}
              selection="/#"
              schema={{
                title: 'Title',
                required: false,
              }}
              onChange={() => void 0}
              fieldComponents={{}}
              valid={!boolean('invalid', false)}
              validationMessages={[]}
            />
          </Box>
        </Tooltip>

        <Tooltip invalid={boolean('invalid', false)} message={text('message', 'This is an error message description.')}>
          <Box>
            <IntegerInput
              value={42}
              selection="/#"
              schema={{
                title: 'Title',
                required: false,
              }}
              onChange={() => void 0}
              fieldComponents={{}}
              valid={!boolean('invalid', false)}
              validationMessages={[]}
            />
          </Box>
        </Tooltip>
      </Box>
    );
  });
