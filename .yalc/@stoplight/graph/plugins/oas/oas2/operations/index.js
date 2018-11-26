"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../../shared");
const types_1 = require("../../types");
exports.headerParametersHook = shared_1.createSharedParametersNodeHook(types_1.Oas2RootNodeTypes.OAS2, 'header');
exports.queryParametersHook = shared_1.createSharedParametersNodeHook(types_1.Oas2RootNodeTypes.OAS2, 'query');
exports.pathParametersHook = shared_1.createSharedParametersNodeHook(types_1.Oas2RootNodeTypes.OAS2, 'path');
exports.bodyParametersHook = shared_1.createSharedParametersNodeHook(types_1.Oas2RootNodeTypes.OAS2, 'body');
exports.operationHeaderParameterHook = shared_1.createOperationParameterHook(types_1.Oas2RootNodeTypes.OAS2, 'header');
exports.operationQueryParameterHook = shared_1.createOperationParameterHook(types_1.Oas2RootNodeTypes.OAS2, 'query');
exports.operationPathParameterHook = shared_1.createOperationParameterHook(types_1.Oas2RootNodeTypes.OAS2, 'path');
exports.operationBodyParameterHook = shared_1.createOperationParameterHook(types_1.Oas2RootNodeTypes.OAS2, 'body');
//# sourceMappingURL=index.js.map