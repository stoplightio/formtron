import get = require('lodash/get');

import { IOperation } from './types';

export const computeWarnings = (data: any, ops: IOperation[]) => {
  // Find cases where key renames would overwrite existing keys
  const warnings = [];
  for (const op of ops) {
    switch (op.op) {
      case 'move': {
        const exists = get(data, op.path) !== undefined;
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
