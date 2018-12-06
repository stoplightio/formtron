import { pointerToPath } from '@stoplight/json';
import produce from 'immer';
import { get, set, unset } from 'lodash';

import { IOperation } from './types';

const parentPath = (path: string) => path.slice(0, path.lastIndexOf('/'));
const childPath = (path: string) => path.slice(path.lastIndexOf('/') + 1);

export const applyOps = (_data: any, ops: IOperation[]) =>
  produce(_data, data => {
    // Apply operations
    for (const op of ops) {
      switch (op.op) {
        case 'add': {
          set(data, pointerToPath(op.path), op.value);
          break;
        }
        case 'move': {
          if (parentPath(op.from) === parentPath(op.path)) {
            // Detect and perform a rename in place.
            const o = {};
            const parent = parentPath(op.from);
            const childFrom = childPath(op.from);
            const childTo = childPath(op.path);
            for (const [key, value] of Object.entries(get(data, pointerToPath(parent)))) {
              if (key === childFrom) {
                o[childTo] = value;
              } else {
                o[key] = value;
              }
            }
            set(data, pointerToPath(parent), o);
          } else {
            const node = get(data, pointerToPath(op.from));
            set(data, pointerToPath(op.path), node);
            unset(data, pointerToPath(op.from));
          }
          break;
        }
      }
    }
  });
