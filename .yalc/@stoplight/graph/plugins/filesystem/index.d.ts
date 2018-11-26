import { IGraphPlugin } from '../../types';
import { IFilesystemPluginOpts } from './types';
export * from './types';
export declare const createFilesystemPlugin: (opts?: IFilesystemPluginOpts) => IGraphPlugin;
