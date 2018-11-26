import * as graphlib from 'graphlib';
import { IGraphPlugin, INodeInstance, INodeOptions } from './types';
export declare class Graph {
    readonly graph: graphlib.Graph;
    readonly nodes: INodeInstance[];
    readonly edges: graphlib.Edge[];
    getNode<TNode extends INodeInstance>(id: string): TNode | undefined;
    createNode: <Input extends INodeOptions<unknown>, Output extends INodeInstance<unknown>>(nodeProps: Input, parent?: INodeInstance<unknown> | undefined) => Promise<Output>;
    private _createNode;
    private _hooks;
    private _loaders;
    addPlugin: (...plugins: IGraphPlugin[]) => Graph;
}
