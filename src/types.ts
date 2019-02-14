import * as React from 'react';
import { Dictionary } from 'ts-essentials';
import { themeTypes } from './theme';

export interface IFormtronControl {
  id?: string;
  value: any;
  onChange: (value: any) => void;

  schema: any;
  selection: string;
  fieldComponents: Dictionary<React.FunctionComponent<IFormtronControl>>;

  valid: boolean;
  validationMessages: string[];
}

export interface IFormtron extends IFormtronControl {
  onInternalChange?: Function;
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
