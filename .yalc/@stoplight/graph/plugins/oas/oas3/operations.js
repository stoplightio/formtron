"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
const types_1 = require("../types");
exports.headerParametersHook = shared_1.createSharedParametersNodeHook(types_1.Oas3RootNodeTypes.OAS3, 'header');
exports.queryParametersHook = shared_1.createSharedParametersNodeHook(types_1.Oas3RootNodeTypes.OAS3, 'query');
exports.pathParametersHook = shared_1.createSharedParametersNodeHook(types_1.Oas3RootNodeTypes.OAS3, 'path');
exports.cookieParametersHook = shared_1.createSharedParametersNodeHook(types_1.Oas3RootNodeTypes.OAS3, 'cookie');
exports.operationHeaderParameterHook = shared_1.createOperationParameterHook(types_1.Oas3RootNodeTypes.OAS3, 'header');
exports.operationQueryParameterHook = shared_1.createOperationParameterHook(types_1.Oas3RootNodeTypes.OAS3, 'query');
exports.operationPathParameterHook = shared_1.createOperationParameterHook(types_1.Oas3RootNodeTypes.OAS3, 'path');
exports.operationcookieParameterHook = shared_1.createOperationParameterHook(types_1.Oas3RootNodeTypes.OAS3, 'cookie');
//# sourceMappingURL=operations.js.map