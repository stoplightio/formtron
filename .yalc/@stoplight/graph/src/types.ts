import { IParserResult } from '@stoplight/types';

export type IGraphLoader<Node extends INodeInstance = INodeInstance, NodeContent = any> = (
  node: Node
) => Promise<NodeContent>;

export interface IGraphHookApi<Input, Output, Parent> {
  createNode: (node: Input, opts?: { parent?: Parent }) => Promise<Output>;
  createEdge: (source: INodeInstance, destination: INodeInstance) => void;
  getNode: (id: string) => INodeInstance | undefined;
  getParentNode: (node: INodeInstance) => INodeInstance | undefined;
}

export interface IGraphHook<
  Input extends INodeOptions = INodeOptions,
  Output extends INodeInstance = INodeInstance,
  Parent extends INodeInstance = INodeInstance
> {
  name: string;

  // by default node type is set to name, but can override here if necessary
  // TODO(SL-248): do we even need this? It looks that this is only used to ensure that the produced node
  // is of the same type that what hook declares. Can't we solve that differently?
  nodeType?: string;

  // allow plugins to opt into dangerous recursive handling
  // we can put additional safeguards around this later
  recursive?: boolean;

  // scopes which nodes this plugin is interested in
  selector?: ((node: INodeInstance) => boolean) | string;

  // events
  onWillCreateNode?: (node: Partial<Output>) => void;

  // TODO(SL-248): why does that have to return anything? What is `any`?
  onDidCreateNode?: (parent: Parent, opts: IGraphHookApi<Input, Output, Parent>) => Promise<any>;
}

export interface IGraphPlugin {
  hooks?: Array<IGraphHook<any, any, any>>;
  loaders?: {
    [nodeType: string]: IGraphLoader<any, any>;
  };
}

/**
 * Nodes
 */

export enum NodeTypes {
  PARSED = 'parsed',
}

// When creating a node.
export interface INodeOptions<Content = unknown> extends Object {
  id: string;
  type: string;
  contentType?: string;
  // TODO(SL-248): I think this should be private in context of INode because INode has loadContent function
  content?: Content;
}

// When dealing with a node instance.
export interface INodeInstance<Content = unknown> extends INodeOptions<Content> {
  loadContent: () => Promise<Content>;
}

export interface IParsedNode<T> extends INodeInstance<IParserResult<T>> {
  type: NodeTypes.PARSED;
}
