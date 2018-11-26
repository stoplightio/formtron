import { Spec } from 'swagger-schema-official';
import { IGraphHook, INodeOptions, IParsedNode } from '../../..';
export declare const responsesHook: IGraphHook<INodeOptions<unknown>, import("../../../types").INodeInstance<unknown>, import("../../../types").INodeInstance<unknown>>;
export declare const definitionsHook: IGraphHook<INodeOptions<unknown>, import("../../../types").INodeInstance<unknown>, import("../../../types").INodeInstance<unknown>>;
export declare const oas2ParsedDetectorHook: IGraphHook<INodeOptions, IParsedNode<Spec>>;
export declare const oas2SharedNodeHook: IGraphHook<INodeOptions, IParsedNode<Spec>>;
