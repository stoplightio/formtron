import * as vfile from 'vfile';

import { IGraphHook } from '../../../types';
import { FilesystemTypes, IDirectory, IFile, IFileInput } from '../types';

export const createFileHook = (): IGraphHook<IFileInput, IFile, IDirectory> => ({
  name: 'file',

  nodeType: FilesystemTypes.FILE,

  // file hook only cares about events related to directories
  selector: node => node.type === FilesystemTypes.DIRECTORY,

  onWillCreateNode: node => {
    const file = vfile({ path: node.path });
    node.name = file.stem;
    node.contentType = file.extname ? file.extname.substr(1) : undefined;
    node.fileName = file.basename;
    node.dirname = file.dirname;
  },

  /**
   * The file hook listens for when directories are created, and then:
   *
   * 1. Loop through all of the directories children
   * 2. Add a file node for each child file, setting the parent to the original directory node
   *
   * This + the directory hook is what recursively builds up the graph of files.
   */
  onDidCreateNode: async (parent, { createNode }) => {
    const children = await parent.loadContent();

    const childFiles: Array<Promise<any>> = [];
    for (const child of children) {
      if (child.stats.isFile()) {
        childFiles.push(
          createNode(
            {
              id: child.path,
              type: FilesystemTypes.FILE,
              path: child.path,
              stats: child.stats,
            },
            {
              parent,
            }
          )
        );
      }
    }

    try {
      await Promise.all(childFiles);
    } catch (e) {
      console.error(`Error creating file children for node '${parent.id}'`, e);
    }
  },
});
