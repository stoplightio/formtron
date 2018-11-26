"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../types");
const createHttpOperationHook_1 = require("../../common/createHttpOperationHook");
const translators_1 = require("../helpers/translators");
exports.NODE_TYPE = 'oas2_http_operation';
exports.httpOperationHook = createHttpOperationHook_1.createHttpOperationHook({
    getMethod: createHttpOperationHook_1.getMethod,
    getPath: createHttpOperationHook_1.getPath,
    name: exports.NODE_TYPE,
    nodeType: exports.NODE_TYPE,
    selector: types_1.Oas2SharedNodeTypes.OPERATION,
    translateOperation: translators_1.translateOperation,
});
//# sourceMappingURL=httpOperationHook.js.map