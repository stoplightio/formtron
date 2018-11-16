import produce from 'immer';
import { get, set, unset } from 'lodash';

import { IOperation } from './types';

const parentPath = (path: string) => path.slice(0, path.lastIndexOf('.'));
const childPath = (path: string) => path.slice(path.lastIndexOf('.') + 1);

export const applyOps = (_data: any, ops: IOperation[]) =>
  produce(_data, data => {
    // Apply operations
    for (const op of ops) {
      switch (op.op) {
        case 'add': {
          set(data, op.path, op.value);
          break;
        }
        case 'move': {
          if (parentPath(op.from) === parentPath(op.path)) {
            // Detect and perform a rename in place.
            const o = {};
            const parent = parentPath(op.from);
            const childFrom = childPath(op.from);
            const childTo = childPath(op.path);
            for (const [key, value] of Object.entries(get(data, parent))) {
              if (key === childFrom) {
                o[childTo] = value;
              } else {
                o[key] = value;
              }
            }
            set(data, parent, o);
          } else {
            const node = get(data, op.from);
            set(data, op.path, node);
            unset(data, op.from);
          }
          break;
        }
      }
    }
  });
