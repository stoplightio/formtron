import { Dictionary } from 'ts-essentials';

export interface IFormtronWidget {
  value: any;
  onChange: (value: any) => void;
}

export interface IFormtronContext {
  schema: any;
  selection: string;
  fieldComponents: Dictionary<React.StatelessComponent<IFormtronControl>>;
}

export interface IFormtronControl extends IFormtronWidget, IFormtronContext {
  id?: string;
}

export interface IFormtron extends IFormtronControl {
  onInternalChange?: any;
}

export * from './json-patch-types';
