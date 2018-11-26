import { createOperationParameterHook, createSharedParametersNodeHook } from '../../shared';
import { Oas2RootNodeTypes } from '../../types';

export const headerParametersHook = createSharedParametersNodeHook(Oas2RootNodeTypes.OAS2, 'header');
export const queryParametersHook = createSharedParametersNodeHook(Oas2RootNodeTypes.OAS2, 'query');
export const pathParametersHook = createSharedParametersNodeHook(Oas2RootNodeTypes.OAS2, 'path');
export const bodyParametersHook = createSharedParametersNodeHook(Oas2RootNodeTypes.OAS2, 'body');

export const operationHeaderParameterHook = createOperationParameterHook(Oas2RootNodeTypes.OAS2, 'header');
export const operationQueryParameterHook = createOperationParameterHook(Oas2RootNodeTypes.OAS2, 'query');
export const operationPathParameterHook = createOperationParameterHook(Oas2RootNodeTypes.OAS2, 'path');
export const operationBodyParameterHook = createOperationParameterHook(Oas2RootNodeTypes.OAS2, 'body');
