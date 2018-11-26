import * as React from 'react';

export interface IState<T> {
  initialState?: T;
  children: (data: T, setState: ((state: T) => void)) => React.ReactNode;
}

interface IStateState<T> {
  state: T;
}

export class State<T> extends React.Component<IState<T>, IStateState<T>> {
  constructor(props: any) {
    super(props);
    this.state = {
      state: props.initialState,
    };
  }

  private _setState = (state: T) => this.setState({ state });

  public render() {
    return this.props.children(this.state.state, this._setState);
  }
}
