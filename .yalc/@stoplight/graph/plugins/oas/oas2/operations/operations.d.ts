import { Operation, Response } from 'swagger-schema-official';
import { IGraphHook, INodeInstance, INodeOptions } from '../../../../types';
import { Oas2SharedNodeTypes } from '../../types';
interface IResponsesNode extends INodeOptions {
    type: Oas2SharedNodeTypes.RESPONSES;
}
export declare const operationResponsesHook: IGraphHook<IResponsesNode, INodeInstance<Response>, INodeInstance<Operation>>;
interface IResponseNode extends INodeOptions {
    type: Oas2SharedNodeTypes.RESPONSE;
}
export declare const operationResponseHook: IGraphHook<IResponseNode, INodeInstance<Response>, INodeInstance<Operation>>;
export {};
