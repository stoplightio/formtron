import { ICustomTheme } from '@stoplight/ui-kit';
import { Dictionary } from 'ts-essentials';
import { themeTypes } from './components/theme';

export interface IFormtronTheme extends ICustomTheme {}

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
  themeName?: themeTypes;
}

export interface IAddOperation {
  op: 'add';
  path: string;
  value: any;
}

export interface IMoveOperation {
  op: 'move';
  from: string;
  path: string;
}

export interface ISelectOperation {
  op: 'select';
  from: string;
  path: string;
}

export type IOperation = IAddOperation | IMoveOperation | ISelectOperation;
