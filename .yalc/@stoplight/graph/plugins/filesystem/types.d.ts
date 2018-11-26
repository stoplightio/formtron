/// <reference types="node" />
import { Stats } from 'fs';
import { INodeInstance, INodeOptions } from '../../types';
export declare enum FilesystemTypes {
    DIRECTORY = "directory",
    FILE = "file"
}
export interface IFilesystemPluginOpts {
    recursive?: boolean;
}
export interface IDirectoryInput extends INodeOptions<IDirectoryContent> {
    type: FilesystemTypes.DIRECTORY;
    path: string;
    stats?: Stats;
}
export interface IDirectory extends INodeInstance<IDirectoryContent> {
    type: FilesystemTypes.DIRECTORY;
    path: string;
    name: string;
    dirname: string;
}
export declare type IDirectoryContent = Array<{
    name: string;
    path: string;
    stats: Stats;
}>;
export declare type IFileContent = string;
export interface IFileInput extends INodeOptions<IFileContent> {
    type: FilesystemTypes.FILE;
    path: string;
    stats?: Stats;
}
export interface IFile extends INodeInstance<IFileContent> {
    type: FilesystemTypes.FILE;
    path: string;
    name: string;
    fileName: string;
    dirname: string;
    contentType: string;
    stats?: Stats;
}
