import { IParserResult } from '@stoplight/types';
export declare type IGraphLoader<Node extends INodeInstance = INodeInstance, NodeContent = any> = (node: Node) => Promise<NodeContent>;
export interface IGraphHookApi<Input, Output, Parent> {
    createNode: (node: Input, opts?: {
        parent?: Parent;
    }) => Promise<Output>;
    createEdge: (source: INodeInstance, destination: INodeInstance) => void;
    getNode: (id: string) => INodeInstance | undefined;
    getParentNode: (node: INodeInstance) => INodeInstance | undefined;
}
export interface IGraphHook<Input extends INodeOptions = INodeOptions, Output extends INodeInstance = INodeInstance, Parent extends INodeInstance = INodeInstance> {
    name: string;
    nodeType?: string;
    recursive?: boolean;
    selector?: ((node: INodeInstance) => boolean) | string;
    onWillCreateNode?: (node: Partial<Output>) => void;
    onDidCreateNode?: (parent: Parent, opts: IGraphHookApi<Input, Output, Parent>) => Promise<any>;
}
export interface IGraphPlugin {
    hooks?: Array<IGraphHook<any, any, any>>;
    loaders?: {
        [nodeType: string]: IGraphLoader<any, any>;
    };
}
export declare enum NodeTypes {
    PARSED = "parsed"
}
export interface INodeOptions<Content = unknown> extends Object {
    id: string;
    type: string;
    contentType?: string;
    content?: Content;
}
export interface INodeInstance<Content = unknown> extends INodeOptions<Content> {
    loadContent: () => Promise<Content>;
}
export interface IParsedNode<T> extends INodeInstance<IParserResult<T>> {
    type: NodeTypes.PARSED;
}
