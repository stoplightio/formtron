import * as fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

import { IGraphLoader } from '../../../types';
import { IDirectory, IDirectoryContent } from '../types';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const promisesCache: Array<Promise<IDirectoryContent>> = [];

/**
 * This loader reads a directory and returns an array of children
 * that include useful information such as the child stats object, etc.
 */
export const createDirectoryLoader = (): IGraphLoader<IDirectory, IDirectoryContent> => node => {
  const promise = promisesCache[node.path];
  if (promise) return promise;

  promisesCache[node.path] = readdir(node.path, 'utf8').then(paths => {
    return Promise.all(
      paths.map(p => {
        const absolutePath = resolve(node.path, p);
        return stat(absolutePath).then(stats => ({
          name: p,
          path: absolutePath,
          stats,
        }));
      })
    );
  });

  return promisesCache[node.path];
};
