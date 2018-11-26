import { IHttpResponse } from '@stoplight/types';
import { ResponseObject, ResponsesObject } from 'openapi3-ts';
import { mapDict } from '../../common/utils';
import { translateHeaderObject, translateMediaTypeObject } from './content.translator';

function translateToOas3Response(response: ResponseObject, statusCode: string): IHttpResponse {
  return {
    code: statusCode,
    description: response.description,
    headers: mapDict(response.headers, translateHeaderObject),
    contents: mapDict(response.content, translateMediaTypeObject),
  };
}

export function translateToOas3Responses(responses: ResponsesObject): IHttpResponse[] {
  return mapDict(responses, translateToOas3Response);
}
