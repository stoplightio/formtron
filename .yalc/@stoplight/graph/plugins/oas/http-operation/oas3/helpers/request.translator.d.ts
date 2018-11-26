import { IHttpRequestParams } from '@stoplight/types';
import { ParameterObject, RequestBodyObject } from 'openapi3-ts';
export declare function translateOas3ToRequest(parameters: ParameterObject[], requestBodyObject?: RequestBodyObject): IHttpRequestParams;
