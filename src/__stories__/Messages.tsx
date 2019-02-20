import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';

import { Flex } from '@stoplight/ui-kit';
import { IntegerInput } from '../components/IntegerInput';
import { Messages } from '../components/Messages';
import { ThemeZone } from '../theme';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <ThemeZone name="formtron">{storyFn()}</ThemeZone>)
  .add('Messages', () => {
    return (
      <Flex flexDirection="column" width="300px" m={3}>
        <Messages
          variant={select('variant', ['invalid', ''], '')}
          messages={[text('message', 'This is an error message description.')]}
        >
          <IntegerInput
            value={42}
            selection="/#"
            schema={{
              title: 'Title',
              required: false,
            }}
            onChange={() => void 0}
            fieldComponents={{}}
            variant={select('variant', ['invalid', ''], '')}
            messages={[]}
          />
        </Messages>

        <Messages
          variant={select('variant', ['invalid', ''], '')}
          messages={[text('message', 'This is an error message description.')]}
        >
          <IntegerInput
            value={42}
            selection="/#"
            schema={{
              title: 'Title',
              required: false,
            }}
            onChange={() => void 0}
            fieldComponents={{}}
            variant={select('variant', ['invalid', ''], '')}
            messages={[]}
          />
        </Messages>
      </Flex>
    );
  });
