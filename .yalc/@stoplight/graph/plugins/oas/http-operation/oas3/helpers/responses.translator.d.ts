import { IHttpResponse } from '@stoplight/types';
import { ResponsesObject } from 'openapi3-ts';
export declare function translateToOas3Responses(responses: ResponsesObject): IHttpResponse[];
