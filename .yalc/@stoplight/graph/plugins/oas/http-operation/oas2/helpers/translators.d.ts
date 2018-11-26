import { IHttpOperation, IServer } from '@stoplight/types';
import { Operation, Spec } from 'swagger-schema-official';
import { Oas2TranslateOperationOptions } from '../../common/types';
export declare function translateToServers(operation: Partial<Operation>, spec: Partial<Spec>): IServer[];
export declare function translateOperation(opts: Oas2TranslateOperationOptions): IHttpOperation;
