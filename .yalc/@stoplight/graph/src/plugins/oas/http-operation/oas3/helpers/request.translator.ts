import { IHttpContent, IHttpRequestBody, IHttpRequestParams } from '@stoplight/types';
import { groupBy, map, mapValues, omit } from 'lodash';
import { MediaTypeObject, ParameterObject, RequestBodyObject } from 'openapi3-ts';
import { translateMediaTypeObject } from './content.translator';

function translateOas3RequestBody(requestBodyObject: RequestBodyObject): IHttpRequestBody {
  return {
    required: requestBodyObject.required,
    description: requestBodyObject.description,
    contents: map<MediaTypeObject, IHttpContent>(requestBodyObject.content, translateMediaTypeObject),
  };
}

function translateParameterObject(parameterObject: ParameterObject) {
  return {
    ...omit(parameterObject, 'in'),
    // TODO(SL-249): we are missing examples in our types, on purpose?
    // examples: parameterObject.examples,
    content: mapValues(parameterObject.content, translateMediaTypeObject),
  };
}

export function translateOas3ToRequest(
  parameters: ParameterObject[],
  requestBodyObject?: RequestBodyObject
): IHttpRequestParams {
  return {
    ...(requestBodyObject ? { body: translateOas3RequestBody(requestBodyObject) } : {}),
    ...mapValues(groupBy(parameters, 'in'), parameterObjects => map(parameterObjects, translateParameterObject)),
  };
}
