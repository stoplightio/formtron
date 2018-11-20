import * as React from 'react';

export interface IDefer<T> {
  promise: Promise<T>;
  children: (data: T) => React.ReactNode;
}

interface IDeferState {
  data: any;
}

export class Defer<T> extends React.Component<IDefer<T>, IDeferState> {
  public state = {
    data: null as any,
  };
  public componentWillMount() {
    this.props.promise.then((data: any) => this.setState({ data }));
  }
  public render() {
    const { data } = this.state;
    return this.props.children(data);
  }
}
