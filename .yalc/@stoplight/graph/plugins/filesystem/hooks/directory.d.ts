import { IGraphHook } from '../../../types';
import { IDirectory, IDirectoryInput, IFilesystemPluginOpts } from '../types';
export declare const createDirectoryHook: (opts: IFilesystemPluginOpts) => IGraphHook<IDirectoryInput, IDirectory, IDirectory>;
