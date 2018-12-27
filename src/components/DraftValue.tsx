import * as React from 'react';

export interface IInputWidget {
  value: any;
  onChange: (value: any) => void;
}

export interface IDraftValueState {
  draft: any;
  value: any;
}

export interface IDraftValue extends IInputWidget {
  children: React.FunctionComponent<IInputWidget & { nonDraftValue: any }>;
}

export class DraftValue extends React.Component<IDraftValue, IDraftValueState> {
  public state = {
    draft: this.props.value,
    value: this.props.value,
  };

  public static getDerivedStateFromProps(props: IInputWidget, state: IDraftValueState) {
    if (props.value !== state.value) {
      return {
        value: props.value,
        draft: props.value,
      };
    }
    return null;
  }

  private onChange = (value: any) => {
    this.setState({ draft: value, value: this.state.value });
    this.props.onChange(value);
  };

  public render() {
    return this.props.children({
      value: this.state.draft,
      onChange: this.onChange,
      nonDraftValue: this.state.value,
    });
  }
}
