import { applyOperation, deepClone } from 'fast-json-patch';
import produce from 'immer';

import { IGraphOperation } from './types';

export const applyOps = (_data: any, gops: IGraphOperation) => {
  const filteredOps = gops.redo.filter(patch => patch.op !== 'text' && patch.op !== 'select');
  const foo = produce(_data, data => {
    for (const op of deepClone(filteredOps)) {
      // @ts-ignore
      applyOperation(data, op);
    }
  });
  return Object.assign({}, foo);
};
