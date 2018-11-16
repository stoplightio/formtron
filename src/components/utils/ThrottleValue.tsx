import * as React from 'react';

import { throttle } from 'lodash';

import { DraftValue } from '../DraftValue';

export interface IInputWidget {
  value: any;
  onChange: (value: any) => void;
}

export interface IThrottleValue extends IInputWidget {
  ms: number;
  children: React.SFC<IInputWidget>;
}

export class ThrottleValue extends React.Component<IThrottleValue> {
  private onChange: (value: any) => void;

  constructor(props: IThrottleValue) {
    super(props);
    this.onChange = throttle(draft => {
      this.props.onChange(draft);
    }, props.ms || 1000);
  }

  public render() {
    return (
      <DraftValue value={this.props.value} onChange={this.onChange}>
        {({ value, onChange }) => {
          return this.props.children({
            value,
            onChange,
          });
        }}
      </DraftValue>
    );
  }
}
