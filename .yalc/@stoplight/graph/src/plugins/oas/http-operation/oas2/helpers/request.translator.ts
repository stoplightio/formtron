import { IHttpRequestParams } from '@stoplight/types';
import { Parameter } from 'swagger-schema-official';
import { isBodyParameter, isFormDataParameter, isHeaderParameter, isPathParameter, isQueryParameter } from './guards';
import {
  translateToBodyParameter,
  translateToFormDataParameter,
  translateToHeaderParam,
  translateToPathParameter,
  translateToQueryParameter,
} from './params.translator';

export function translateToRequest(parameters: Parameter[], consumes: string[]): IHttpRequestParams {
  return parameters.reduce((request: IHttpRequestParams, parameter: Parameter) => {
    if (isBodyParameter(parameter)) {
      request.body = translateToBodyParameter(parameter, consumes);
    } else if (isFormDataParameter(parameter)) {
      request.body = translateToFormDataParameter(parameter, request.body, consumes);
    } else if (isQueryParameter(parameter)) {
      const queryParameter = translateToQueryParameter(parameter, consumes);
      request.query = (request.query || []).concat(queryParameter);
    } else if (isPathParameter(parameter)) {
      const pathParameter = translateToPathParameter(parameter, consumes);
      request.path = (request.path || []).concat(pathParameter);
    } else if (isHeaderParameter(parameter)) {
      const headerParameter = translateToHeaderParam(parameter, consumes);
      request.headers = (request.headers || []).concat(headerParameter);
    }
    return request;
  }, {});
}
