import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';

import { Flex } from '@stoplight/ui-kit';
import { IntegerInput } from '../components/IntegerInput';
import { Messages } from '../components/Messages';
import { Theme, Tooltips } from './decorators';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(Theme)
  .addDecorator(Tooltips)
  .add('Messages', () => {
    return (
      <Flex flexDirection="column" width="300px" m={3}>
        <Messages path={[]}>
          <IntegerInput
            value={42}
            path={[]}
            schema={{
              title: 'Title',
              required: false,
            }}
            onChange={() => void 0}
            fieldComponents={{}}
          />
        </Messages>

        <Messages path={[]}>
          <IntegerInput
            value={42}
            path={[]}
            schema={{
              title: 'Title',
              required: false,
            }}
            onChange={() => void 0}
            fieldComponents={{}}
          />
        </Messages>
      </Flex>
    );
  });
