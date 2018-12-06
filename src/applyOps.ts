import { pointerToPath } from '@stoplight/json';
import produce from 'immer';
import { get, set, unset } from 'lodash';

import { IOperation } from './types';

const getParentPath = (path: string[]) => path.slice(0, path.length - 2);
const getChildPath = (path: string[]) => path[path.length - 1];

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
          const from = pointerToPath(op.from);
          const to = pointerToPath(op.path);
          const parentFrom = getParentPath(from);
          const parentTo = getParentPath(to);
          if (parentFrom.length > 0 && parentFrom.join('/') === parentTo.join('/')) {
            // Detect and perform a rename in place.
            const o = {};
            const childFrom = getChildPath(from);
            const childTo = getChildPath(to);
            console.log(from);
            console.log(parentFrom);
            console.log(childFrom);
            console.log(childTo);
            for (const [key, value] of Object.entries(get(data, parentFrom))) {
              if (key === childFrom) {
                o[childTo] = value;
              } else {
                o[key] = value;
              }
            }
            set(data, parentFrom, o);
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
