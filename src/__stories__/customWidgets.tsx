import * as React from 'react';

import { Button } from '@stoplight/ui-kit';

import { IFormtronControl } from '../types';

export const customWidgets = {
  randomNumber: (props: IFormtronControl) => (
    <Button
      type="button"
      ml={7}
      fontSize={4}
      disabled={props.disabled}
      onClick={() => props.onChange(String(Math.floor(Math.random() * 500)))}
    >
      🎲
    </Button>
  ),
  randomOption: (props: IFormtronControl) => (
    <Button
      ml={7}
      fontSize={4}
      type="button"
      disabled={props.disabled}
      onClick={() => props.onChange(props.schema.options[Math.floor(Math.random() * props.schema.options.length)])}
    >
      🎲
    </Button>
  ),
  addMoreAwesomeness: (props: IFormtronControl) => (
    <Button
      title="Add more awesomeness"
      ml={7}
      fontSize={4}
      type="button"
      disabled={props.disabled}
      onClick={() => props.onChange([...props.value, 'awesome'])}
    >
      🔥
    </Button>
  ),
};
