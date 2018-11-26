import { IGraphPlugin } from '../../../types';
import { httpOperationHook } from '../http-operation/oas2/hooks/httpOperationHook';
import { createOperationsHook } from '../shared';
import {
  bodyParametersHook,
  headerParametersHook,
  operationBodyParameterHook,
  operationHeaderParameterHook,
  operationPathParameterHook,
  operationQueryParameterHook,
  pathParametersHook,
  queryParametersHook,
} from './operations';
import { operationResponseHook, operationResponsesHook } from './operations/operations';
import { pathsHooks, securitySchemeHooks, tagsHook } from './rootNodeHooks';
import { definitionsHook, oas2ParsedDetectorHook, oas2SharedNodeHook, responsesHook } from './sharedNodeHooks';
const operationsHook = createOperationsHook('oas2');

export const createOas2Plugin = (): IGraphPlugin => ({
  hooks: [
    oas2ParsedDetectorHook,
    oas2SharedNodeHook,
    // Root nodes
    ...securitySchemeHooks,
    ...tagsHook,
    ...pathsHooks,
    // Shared node
    definitionsHook,
    responsesHook,
    headerParametersHook,
    queryParametersHook,
    pathParametersHook,
    bodyParametersHook,
    // Operations
    operationsHook,
    operationBodyParameterHook,
    operationHeaderParameterHook,
    operationQueryParameterHook,
    operationPathParameterHook,
    operationResponseHook,
    operationResponsesHook,
    // IHttpOperation
    httpOperationHook,
  ],
});
