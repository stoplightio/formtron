import * as vfile from 'vfile';

import { IGraphHook } from '../../../types';
import { FilesystemTypes, IDirectory, IDirectoryInput, IFilesystemPluginOpts } from '../types';

export const createDirectoryHook = (
  opts: IFilesystemPluginOpts
): IGraphHook<IDirectoryInput, IDirectory, IDirectory> => ({
  name: 'directory',

  nodeType: FilesystemTypes.DIRECTORY,

  // recursive by default
  recursive: opts.recursive !== false,

  // directory hook only cares about events related to other directories
  selector: node => node.type === FilesystemTypes.DIRECTORY,

  onWillCreateNode: node => {
    const file = vfile({ path: node.path });
    node.name = file.stem;
    node.dirname = file.dirname;
  },

  /**
   * The directory hook listens for when directories are created, and then:
   *
   * 1. Loop through all of the directories children
   * 2. Add a directory node for each child directory, setting the parent
   *
   * This is what recursively builds up the graph of directories.
   */
  onDidCreateNode: async (parent, { createNode }) => {
    const children = await parent.loadContent();

    const childDirectories: Array<Promise<any>> = [];
    for (const child of children) {
      if (child.stats.isDirectory()) {
        childDirectories.push(
          createNode(
            {
              id: child.path,
              type: FilesystemTypes.DIRECTORY,
              path: child.path,
            },
            {
              parent,
            }
          )
        );
      }
    }

    try {
      await Promise.all(childDirectories);
    } catch (e) {
      console.error(`Error creating directory children for node '${parent.id}'`, e);
    }
  },
});
