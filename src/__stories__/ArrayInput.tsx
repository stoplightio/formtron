import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import { fieldComponents } from '../components';
import { ArrayInput } from '../components/ArrayInput';
import { ThemeZone } from '../theme';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <ThemeZone name="formtron">{storyFn()}</ThemeZone>)
  .add('ArrayInput', () => {
    return (
      <ArrayInput
        value={[42, 23, 97]}
        selection="bob"
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
      />
    );
  });
