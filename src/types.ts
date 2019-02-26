import * as React from 'react';
import { Dictionary } from 'ts-essentials';
import { themeTypes } from './theme';

export interface IFormtronCommon {
  id?: string;
  value: any;
  onChange: (value: any) => void;

  schema: any;
  fieldComponents: Dictionary<React.FunctionComponent<IFormtronControl>>;
}

export interface IFormtronControl extends IFormtronCommon {
  path: string[];
}

export interface IFormtron extends IFormtronCommon {
  selection: string;
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
