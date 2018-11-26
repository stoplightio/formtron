"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../types");
const createHttpOperationHook_1 = require("../../common/createHttpOperationHook");
const operation_translator_1 = require("../helpers/operation.translator");
exports.NODE_TYPE = 'oas3_http_operation';
exports.httpOperationHook = createHttpOperationHook_1.createHttpOperationHook({
    getMethod: createHttpOperationHook_1.getMethod,
    getPath: createHttpOperationHook_1.getPath,
    name: exports.NODE_TYPE,
    nodeType: exports.NODE_TYPE,
    selector: types_1.Oas3RootNodeTypes.OPERATION,
    translateOperation: operation_translator_1.translateOperation,
});
//# sourceMappingURL=httpOperationHook.js.map