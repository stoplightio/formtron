import { Dictionary } from 'ts-essentials';
import { deriveFormData } from './deriveFormData';
import { IOperation } from './types';

const substitute = (key: string, path: string, selection: string, vars: Dictionary<string>) => {
  const _selection = selection.split('.');
  const _path = path.split('.');
  return _path
    .map((part, index) => {
      // non-wildcards need no processing
      if (part !== '*' && part !== '?') return part;
      if (index < _selection.length) {
        // Terminating wildcards are fixed points. We must use the NEW value not the one in the current selection.
        if (part === '?') {
          return vars[key];
        }
        return _selection[index];
      } else {
        throw new Error(`Cannot extract index "${index}" from selection path "${selection}"`);
      }
    })
    .join('.');
};

export const computeOps = (schema: any, data: any, selection: string, newFormData: any) => {
  const ops: IOperation[] = [];
  const oldFormData = deriveFormData(schema, data, selection);

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
    const rejoined = substitute(key, key, selection, oldVars);
    ops.push({
      op: 'add',
      path: rejoined,
      value: newFormData[key],
    });
  }
  // Then rename nodes as needed
  const vars = Object.assign({}, oldVars);
  const oldSelection = selection;
  for (const key of props) {
    // We compute the old path using the current set of variables values
    const oldPath = substitute(key, key, selection, vars);
    // Then we update the current varable value and compute the new path
    vars[key] = newVars[key];
    const newPath = substitute(key, key, selection, vars);
    if (oldPath !== newPath) {
      // move node
      ops.push({
        op: 'move',
        from: oldPath,
        path: newPath,
      });
      // We must also update the selection now so that wildcard placeholders refer to the current state.
      if (selection.startsWith(oldPath)) {
        selection = selection.replace(oldPath, newPath);
      }
    }
  }

  // Compose consecutive move operations into a single operation, to reduce the chances of intermediate conflicts.
  // For example:
  //   move /todos.get -> /todos.put
  // might overwrite an existing /todos.put object
  // but if the full sequence is
  //   move /todos.get -> /todos.put
  //   move /todos.put -> /lists.put
  // then we can combine the two operations into a single new operation:
  //   move /todos.get -> /lists.put
  // that does NOT have that conflict potential.
  // For now we only consider adjacent operations, because it is much harder to prove the
  // safety of combining interleaved operations. (We'd have to prove the intermediate operations are commutative).
  const reducedOps = ops.reduce((acc: IOperation[], op: IOperation) => {
    if (acc.length === 0) return [op];
    const prev = acc[acc.length - 1];
    if (prev.op === 'move' && op.op === 'move' && prev.path === op.from) {
      const newOp: IOperation = {
        op: 'move',
        from: prev.from,
        path: op.path,
      };
      acc.pop();
      acc.push(newOp);
    } else {
      acc.push(op);
    }
    return acc;
  }, []);

  // Lastly, figure out whether this means the current selection path changes as well.
  if (oldSelection !== selection) {
    reducedOps.push({
      op: 'select',
      from: oldSelection,
      path: selection,
    });
  }
  return reducedOps;
};
