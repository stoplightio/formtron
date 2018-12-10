import { pathToPointer, pointerToPath } from '@stoplight/json';
import produce, { Patch } from 'immer';
import { get, set, unset } from 'lodash';
import { Dictionary } from 'ts-essentials';
import { deriveFormData } from './deriveFormData';
import { IGraphOperation } from './types';

const substitute = (key: string, path: string, selection: string[], vars: Dictionary<string>) => {
  const _path = path.split('.');
  return _path.map((part, index) => {
    // non-wildcards need no processing
    if (part !== '*' && part !== '?') return part;
    if (index < selection.length) {
      // Terminating wildcards are fixed points. We must use the NEW value not the one in the current selection.
      if (part === '?') {
        return vars[key];
      }
      return selection[index];
    } else {
      throw new Error(`Cannot extract index "${index}" from selection path "${pathToPointer(selection)}"`);
    }
  });
};

const arrayStartsWith = <T>(prefixArr: T[], arr: T[]) => {
  for (let i = 0; i < prefixArr.length; i++) {
    if (prefixArr[i] !== arr[i]) return false;
  }
  return true;
};

// I'm sure there's a better way to do this
const arrayEqual = <T>(a1: T[], a2: T[]) => {
  if (a1.length !== a2.length) return false;
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
};

export const computeOps = (schema: any, _data: any, selection: string, newFormData: any) => {
  const gop: IGraphOperation = { redo: [], undo: [] };
  const _selection = pointerToPath(selection).filter(x => x !== '');
  const _oldSelection = Array.from(_selection);
  const oldFormData = deriveFormData(schema, _data, selection);
  produce(
    _data,
    data => {
      const newVars: Dictionary<string> = {};
      const oldVars: Dictionary<string> = {};
      // processing queue for 'add' operations
      const values: string[] = [];
      // processing queue for 'move' operations
      const props: string[] = [];
      for (const key of Object.keys(schema.fields)) {
        // Populate variable dictionaries
        if (key.includes(`?`)) {
          newVars[key] = newFormData[key];
          oldVars[key] = oldFormData[key];
        }
        // If the form value has changed, assign it to one of two processing queues.
        if (JSON.stringify(oldFormData[key]) !== JSON.stringify(newFormData[key])) {
          if (key.includes('?')) {
            props.push(key);
          } else {
            values.push(key);
          }
        }
      }

      // Update all values first using oldVars
      for (const key of values) {
        const rejoined = substitute(key, key, _selection, oldVars);
        set(data, rejoined, newFormData[key]);
      }

      // Then rename nodes as needed
      const vars = Object.assign({}, oldVars);
      for (const key of props) {
        // We compute the old path using the current set of variables values
        const oldPath = substitute(key, key, _selection, vars);
        // Then we update the current varable value and compute the new path
        vars[key] = newVars[key];
        const newPath = substitute(key, key, _selection, vars);
        if (oldPath !== newPath) {
          const node = get(data, oldPath);
          set(data, newPath, node);
          unset(data, oldPath);
          // We must also update the selection now so that wildcard placeholders refer to the current state.
          if (arrayStartsWith<string>(oldPath, _selection)) {
            _selection.splice(0, oldPath.length, ...newPath);
          }
        }
      }
    },
    (patches, inversePatches) => {
      const fixPath = (patch: Patch) => {
        const spath: string[] = patch.path.map(x => x.toString());
        const path = pathToPointer(spath);
        return { ...patch, path };
      };
      // @ts-ignore
      gop.redo = patches.map(fixPath);
      // @ts-ignore
      gop.undo = inversePatches.map(fixPath);

      // Figure out whether this means the current selection path changes as well.
      if (!arrayEqual(_oldSelection, _selection)) {
        const newSelection = pathToPointer(_selection);
        const oldSelection = pathToPointer(_oldSelection);
        gop.redo.push({
          op: 'select',
          from: oldSelection,
          path: newSelection,
        });
        gop.undo.push({
          op: 'select',
          from: newSelection,
          path: oldSelection,
        });
      }
    }
  );
  return gop;
};
