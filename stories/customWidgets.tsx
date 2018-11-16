import * as React from 'react';

import { IFormtronControl } from '../src';

export const customWidgets = {
  randomNumber: (props: IFormtronControl) => (
    <button
      style={{ position: 'absolute', marginLeft: 5 }}
      onClick={() => props.onChange(String(Math.floor(Math.random() * 500)))}
    >
      🎲
    </button>
  ),
  randomOption: (props: IFormtronControl) => (
    <button
      style={{ position: 'absolute', marginLeft: 5 }}
      onClick={() => props.onChange(props.schema.options[Math.floor(Math.random() * props.schema.options.length)])}
    >
      🎲
    </button>
  ),
};
