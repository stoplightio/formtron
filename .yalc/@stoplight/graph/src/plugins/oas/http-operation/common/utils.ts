import flatten = require('lodash/flatten');
import map = require('lodash/map');
import uniq = require('lodash/uniq');

export function mapDict<T, R>(dict: { [name: string]: T } | undefined, callback: (obj: T, key: string) => R): R[] {
  return map(dict, (object, key) => callback(object, key));
}

export function uniqFlatMap<T>(collection?: T[]) {
  return uniq(flatten(map(collection, Object.keys)));
}
