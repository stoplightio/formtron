import { IGraphHook } from '../../../types';
import { IDirectory, IFile, IFileInput } from '../types';
export declare const createFileHook: () => IGraphHook<IFileInput, IFile, IDirectory>;
