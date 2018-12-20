import * as React from 'react';

import { Button } from '@stoplight/ui-kit';

import { IFormtronControl } from '../types';

export const customWidgets = {
  randomNumber: (props: IFormtronControl) => (
    <Button type="button" ml={2} fontSize={4} onClick={() => props.onChange(String(Math.floor(Math.random() * 500)))}>
      🎲
    </Button>
  ),
  randomOption: (props: IFormtronControl) => (
    <Button
      ml={2}
      fontSize={4}
      type="button"
      onClick={() => props.onChange(props.schema.options[Math.floor(Math.random() * props.schema.options.length)])}
    >
      🎲
    </Button>
  ),
};
