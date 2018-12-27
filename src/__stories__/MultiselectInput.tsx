import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { array, boolean, text } from '@storybook/addon-knobs/react';

import { MultiselectInput } from '../components/SelectInput';
import { ThemeZone } from '../theme';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <ThemeZone name="formtron">{storyFn()}</ThemeZone>)
  .add('MultiselectInput', () => {
    const options = ['choice a', 'choice b', 'choice c'];
    return (
      <MultiselectInput
        value={array('value', ['choice a'])}
        selection="/#"
        schema={{
          title: text('schema.title', 'Title'),
          options,
          required: boolean('schema.required', false),
        }}
        onChange={action('onChange')}
        fieldComponents={{}}
      />
    );
  });
