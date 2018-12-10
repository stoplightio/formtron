import { get } from 'lodash';
import { pointerToPath } from '@stoplight/json';

import { IGraphOperation } from './types';

export const computeWarnings = (data: any, ops: IGraphOperation) => {
  // Find cases where key renames would overwrite existing keys
  const warnings = [];
  for (const op of ops.redo) {
    switch (op.op) {
      case 'replace':
      case 'move': {
        const exists = get(data, pointerToPath(op.path)) !== undefined;
        if (exists) {
          warnings.push({
            type: 'overwrite_key',
            op,
          });
        }
        break;
      }
    }
  }
  return warnings;
};
