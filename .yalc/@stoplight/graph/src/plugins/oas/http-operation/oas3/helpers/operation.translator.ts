import { IHttpOperation } from '@stoplight/types';
import { ParameterObject, RequestBodyObject, ResponsesObject } from 'openapi3-ts';
import { getOasParameters } from '../../common/accessors';
import { translateToTags } from '../../common/tag.translator';
import { Oas3TranslateOperationOptions } from '../../common/types';
import { getOas3Securities } from './accessors';
import { translateOas3ToRequest } from './request.translator';
import { translateToOas3Responses } from './responses.translator';
import { translateOas3ToSecurities } from './securities.translator';
import { translateToServers } from './servers.translator';

export function translateOperation(opts: Oas3TranslateOperationOptions): IHttpOperation {
  const { operation, method, path, pathObject, spec } = opts;
  return {
    id: '?http-oas3-operation-id?',
    iid: operation.operationId,
    description: operation.description,
    deprecated: operation.deprecated,
    method,
    path,
    summary: operation.summary,
    responses: translateToOas3Responses(operation.responses as ResponsesObject),
    servers: translateToServers(operation.servers || pathObject.servers || spec.servers),
    request: translateOas3ToRequest(
      getOasParameters(operation.parameters as ParameterObject[], pathObject.parameters),
      operation.requestBody as RequestBodyObject
    ),
    tags: translateToTags(operation.tags || []),
    security: translateOas3ToSecurities(getOas3Securities(operation, spec)),
  };
}
