import { OperationObject } from 'openapi3-ts';
import { Operation, Path, Spec } from 'swagger-schema-official';
import { IGraphHook, INodeInstance, INodeOptions } from '../..';
import { Oas2ChildNodeTypes, Oas2RootNodeTypes, Oas2SharedNodeTypes, Oas3ChildNodeTypes, Oas3RootNodeTypes, Oas3SharedNodeTypes, OasNodeChildType } from './types';
declare type oas3TopProperty = 'openapi' | 'info' | 'servers' | 'paths' | 'components' | 'security' | 'tags' | 'externalDocs';
export declare function createContainerElementHooks(containerType: Oas3RootNodeTypes, elementType: Oas3ChildNodeTypes, childType: OasNodeChildType, containerPropertyName: oas3TopProperty, childIdentifierProperty?: string): any[];
export declare function createContainerElementHooks(containerType: Oas2RootNodeTypes, elementType: Oas2ChildNodeTypes, childType: OasNodeChildType, containerPropertyName: keyof Spec, childIdentifierProperty?: string): any[];
declare type Oas2SharedPropertyNames = 'responses' | 'definitions';
declare type Oas3SharedPropertyNames = 'schemas' | 'responses' | 'parameters' | 'examples' | 'requestBodies' | 'headers' | 'securitySchemes' | 'links' | 'callbacks';
export declare function createSharedNodeHook(nodeName: Oas2SharedPropertyNames, childType: OasNodeChildType, elementType: Oas2SharedNodeTypes): IGraphHook<INodeOptions, INodeInstance, INodeInstance>;
export declare function createSharedNodeHook(nodeName: Oas3SharedPropertyNames, childType: OasNodeChildType, elementType: Oas3SharedNodeTypes): IGraphHook<INodeOptions, INodeInstance, INodeInstance>;
export declare const createParameterHook: (name: string, parameterType: "path" | "header" | "query" | "body" | "cookie", nodePath: string[], selector: (node: INodeInstance<unknown>) => boolean, parentId?: string | undefined) => IGraphHook<INodeOptions<unknown>, INodeInstance<unknown>, INodeInstance<unknown>>;
interface IOperationNode extends INodeOptions {
    type: Oas3SharedNodeTypes.OPERATION | Oas2SharedNodeTypes.OPERATION;
}
export declare const createOperationsHook: (type: "oas2" | "oas3") => IGraphHook<IOperationNode, INodeInstance<OperationObject | Operation>, INodeInstance<Path | import("openapi3-ts/dist/model/OpenApi").PathsObject>>;
export declare const createSharedParametersNodeHook: (containerType: Oas3RootNodeTypes.OAS3 | Oas2RootNodeTypes.OAS2, parameterType: "path" | "header" | "query" | "body" | "cookie") => IGraphHook<INodeOptions<unknown>, INodeInstance<unknown>, INodeInstance<unknown>>;
export declare const createOperationParameterHook: (containerType: Oas3RootNodeTypes.OAS3 | Oas2RootNodeTypes.OAS2, parameterType: "path" | "header" | "query" | "body" | "cookie") => IGraphHook<INodeOptions<unknown>, INodeInstance<unknown>, INodeInstance<unknown>>;
export {};
