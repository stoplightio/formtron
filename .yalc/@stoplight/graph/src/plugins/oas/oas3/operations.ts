import { createOperationParameterHook, createSharedParametersNodeHook } from '../shared';
import { Oas3RootNodeTypes } from '../types';

export const headerParametersHook = createSharedParametersNodeHook(Oas3RootNodeTypes.OAS3, 'header');
export const queryParametersHook = createSharedParametersNodeHook(Oas3RootNodeTypes.OAS3, 'query');
export const pathParametersHook = createSharedParametersNodeHook(Oas3RootNodeTypes.OAS3, 'path');
export const cookieParametersHook = createSharedParametersNodeHook(Oas3RootNodeTypes.OAS3, 'cookie');

export const operationHeaderParameterHook = createOperationParameterHook(Oas3RootNodeTypes.OAS3, 'header');
export const operationQueryParameterHook = createOperationParameterHook(Oas3RootNodeTypes.OAS3, 'query');
export const operationPathParameterHook = createOperationParameterHook(Oas3RootNodeTypes.OAS3, 'path');
export const operationcookieParameterHook = createOperationParameterHook(Oas3RootNodeTypes.OAS3, 'cookie');
