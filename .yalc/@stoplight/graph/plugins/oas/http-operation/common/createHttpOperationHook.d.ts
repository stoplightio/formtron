import { IHttpOperation } from '@stoplight/types';
import { IGraphHook, INodeInstance, INodeOptions } from '../../../..';
import { ITranslateOperationOptions } from './types';
interface IHttpOperationHookConfig<Operation, Path, Spec> {
    name: string;
    nodeType: string;
    selector: string;
    getPath: Function;
    getMethod: Function;
    translateOperation: (opts: ITranslateOperationOptions<Operation, Path, Spec>) => IHttpOperation;
}
declare type GraphHook<T> = IGraphHook<INodeOptions, INodeInstance<IHttpOperation>, INodeInstance<T>>;
export declare const getMethod: ({ id }: INodeInstance<unknown>) => string;
export declare const getPath: ({ id }: INodeInstance<unknown>) => string;
export declare function createHttpOperationHook<Operation, Path, Spec>(config: IHttpOperationHookConfig<Operation, Path, Spec>): GraphHook<Operation>;
export {};
