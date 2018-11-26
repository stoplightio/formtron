/// <reference types="node" />
import * as fs from 'fs';
import { IGraphLoader } from '../../../types';
import { IDirectory } from '../types';
export declare const createDirectoryLoader: () => IGraphLoader<IDirectory, {
    name: string;
    path: string;
    stats: fs.Stats;
}[]>;
