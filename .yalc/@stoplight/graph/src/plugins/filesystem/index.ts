import { IGraphPlugin } from '../../types';
import { createDirectoryHook } from './hooks/directory';
import { createFileHook } from './hooks/file';
import { createDirectoryLoader } from './loaders/directory';
import { createFileLoader } from './loaders/file';
import { FilesystemTypes, IFilesystemPluginOpts } from './types';

export * from './types';

export const createFilesystemPlugin = (opts: IFilesystemPluginOpts = {}): IGraphPlugin => ({
  hooks: [createFileHook(), createDirectoryHook(opts)],
  loaders: {
    [FilesystemTypes.FILE]: createFileLoader(),
    [FilesystemTypes.DIRECTORY]: createDirectoryLoader(),
  },
});
