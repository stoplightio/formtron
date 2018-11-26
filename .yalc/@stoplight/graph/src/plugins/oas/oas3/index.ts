import { IGraphPlugin } from '../../../types';
import { httpOperationHook } from '../http-operation/oas3/hooks/httpOperationHook';
import { createOperationsHook } from '../shared';
import { cookieParametersHook, headerParametersHook, pathParametersHook, queryParametersHook } from './operations';
import { oas3ParsedDetectorHook, oas3SharedNodeHook, pathsHook, serversHook, tagsHook } from './rootNodeHooks';
import {
  callbacksHook,
  examplesHook,
  headersHook,
  linksHook,
  requestBodiesHook,
  responsesHook,
  schemasHook,
  securitySchemesHook,
} from './sharedNodeHooks';

const operationsHook = createOperationsHook('oas3');

export const createOas3Plugin = (): IGraphPlugin => ({
  hooks: [
    oas3ParsedDetectorHook,
    oas3SharedNodeHook,
    schemasHook,
    responsesHook,
    headerParametersHook,
    queryParametersHook,
    pathParametersHook,
    cookieParametersHook,
    examplesHook,
    requestBodiesHook,
    headersHook,
    securitySchemesHook,
    linksHook,
    operationsHook,
    callbacksHook,
    ...pathsHook,
    ...tagsHook,
    ...serversHook,
    httpOperationHook,
  ],
});
