import * as fs from 'fs';
import { promisify } from 'util';

import { IGraphLoader } from '../../../types';
import { IFile, IFileContent } from '../types';

const readFile = promisify(fs.readFile);
const promisesCache: Array<Promise<string>> = [];

/**
 * This loader reads a file and returns its contents.
 *
 * It includes some simple caching so that other hooks don't have to worry about calling loadContent and causing disk issues.
 */
export const createFileLoader = (): IGraphLoader<IFile, IFileContent> => node => {
  const promise = promisesCache[node.path];
  if (promise) return promise;

  promisesCache[node.path] = readFile(node.path, 'utf8');

  return promisesCache[node.path];
};
