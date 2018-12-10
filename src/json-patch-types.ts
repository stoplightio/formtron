export type IGraphOperation = IReversibleOperation<IJsonOperation>;

export interface IReversibleOperation<O> {
  redo: O[];
  undo: O[];
}

/** NOTE: IJsonOperation describes a generic standard and so might be a good fit for '@stoplight/types' */

export type IJsonOperation<T = any> =
  | IAddOperation<T>
  | IRemoveOperation
  | IReplaceOperation<T>
  | IMoveOperation
  | ICopyOperation
  | ITestOperation<T>
  | ITextOperation
  | ISelectOperation;

export interface IBaseOperation<T> {
  op: T;
  path: string;
}

export interface IAddOperation<T> extends IBaseOperation<'add'> {
  value: T;
}

export interface IRemoveOperation extends IBaseOperation<'remove'> {}

export interface IReplaceOperation<T> extends IBaseOperation<'replace'> {
  value: T;
}

export interface IMoveOperation extends IBaseOperation<'move'> {
  from: string;
}

export interface ICopyOperation extends IBaseOperation<'copy'> {
  from: string;
}

export interface ITestOperation<T> extends IBaseOperation<'test'> {
  value: T;
}

export interface ITextOperation extends IBaseOperation<'text'> {
  value: string;
  offset: number;
  length: number;
}

export interface ISelectOperation extends IBaseOperation<'select'> {
  from: string;
  path: string;
}
