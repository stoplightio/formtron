import get = require('lodash/get');
import { Dictionary } from 'ts-essentials';

// @ts-ignore
import memoize from '@stoplight/memoize-one';

const substituteVariables = (key: string, path: string, selection: string, vars: Dictionary<string>) => {
  const _selection = selection.split('.');
  const _path = path.split('.');
  return _path
    .map((part, index) => {
      if (part === '*' || part === '?') {
        if (index < _selection.length) {
          // A '?' indicates we can safely assume the variable name is the key under consideration
          if (part === '?') {
            // Update the vars dictionary
            vars[key] = _selection[index];
          }
          return _selection[index];
        } else {
          throw new Error(`Cannot extract index "${index}" from selection path "${selection}"`);
        }
      }
      // substitute known variable with its value
      if (vars[part] !== undefined) return vars[part];
      // otherwise do not modify it
      return part;
    })
    .join('.');
};

export const deriveFormData = memoize((schema: any, data: any, selection: string) => {
  const output = {};
  const vars = {};
  const keys = Object.keys(schema.fields);

  const unresolved = new Set(keys);
  let lastUnresolvedSize = Infinity;
  while (unresolved.size && unresolved.size < lastUnresolvedSize) {
    // Keep track of whether we are making progress shrinking the unresolved set of keys
    lastUnresolvedSize = unresolved.size;
    for (const key of unresolved) {
      const origPath = key;

      // Substitute variable names in the path with their values, if known
      const path = substituteVariables(key, origPath, selection, vars);
      // Paths that include no wildcards include no unresolved variables, so they are ready
      if (!path.includes('*') && !path.includes('?')) {
        // Is this a value path or a key path?
        if (origPath.includes('?')) {
          output[key] = vars[key];
        } else {
          output[key] = get(data, path);
        }
        unresolved.delete(key);
        break;
      }
    }
    if (unresolved.size === lastUnresolvedSize) {
      throw new Error(`Unable to resolve vars: ${JSON.stringify([...unresolved.keys()])}`);
    }
  }
  // Now, insert the keys in the correct order
  const orderedOutput = {};
  for (const key of keys) {
    orderedOutput[key] = output[key];
  }
  return orderedOutput;
});
