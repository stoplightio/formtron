import * as React from 'react';

export interface IDefer<T> {
  promise: Promise<T>;
  children: (data: T) => React.ReactNode;
}

interface IDeferState<T> {
  data?: T;
}

export class Defer<T> extends React.Component<IDefer<T>, IDeferState<T>> {
  public componentWillMount() {
    this.props.promise.then((data: T) => this.setState({ data }));
  }
  public render() {
    if (this.state && this.state.data !== undefined) {
      const { data } = this.state;
      return this.props.children(data);
    }
    return null;
  }
}
