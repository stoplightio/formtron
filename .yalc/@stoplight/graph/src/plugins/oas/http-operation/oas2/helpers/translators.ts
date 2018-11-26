import { IHttpOperation, IServer } from '@stoplight/types';
import isNull = require('lodash/isNull');
import omitBy = require('lodash/omitBy');
import { Operation, Parameter, Response, Spec } from 'swagger-schema-official';
import URI = require('urijs');
import { getOasParameters } from '../../common/accessors';
import { translateToTags } from '../../common/tag.translator';
import { Oas2TranslateOperationOptions } from '../../common/types';
import { getConsumes, getProduces, getSecurities } from './accessors';
import { translateToRequest } from './request.translator';
import { translateToResponses } from './responses.translator';
import { translateToSecurities } from './securities.translator';

export function translateToServers(operation: Partial<Operation>, spec: Partial<Spec>): IServer[] {
  const schemes = operation.schemes || spec.schemes || [];
  const { host, basePath } = spec;
  if (!host || !basePath) {
    return [];
  }
  return schemes.map(scheme => {
    return {
      url: URI()
        .scheme(scheme)
        .host(host)
        .path(basePath)
        .toString(),
    };
  });
}

export function translateOperation(opts: Oas2TranslateOperationOptions): IHttpOperation {
  const { operation, method, path, pathObject, spec } = opts;
  const produces = getProduces(operation, spec);
  const consumes = getConsumes(operation, spec);
  const httpOperation: IHttpOperation = {
    // TODO(SL-248): what shall we do with id?
    id: '?http-operation-id?',
    iid: operation.operationId,
    description: operation.description,
    deprecated: operation.deprecated,
    method,
    path,
    summary: operation.summary,
    responses: translateToResponses(operation.responses as { [name: string]: Response }, produces),
    servers: translateToServers(operation, spec),
    request: translateToRequest(
      getOasParameters(operation.parameters as Parameter[], pathObject.parameters as Parameter[]),
      consumes
    ),
    tags: translateToTags(operation.tags || []),
    security: translateToSecurities(getSecurities(operation, spec)),
  };

  return omitBy(httpOperation, isNull) as IHttpOperation;
}
