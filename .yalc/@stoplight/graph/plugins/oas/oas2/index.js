"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpOperationHook_1 = require("../http-operation/oas2/hooks/httpOperationHook");
const shared_1 = require("../shared");
const operations_1 = require("./operations");
const operations_2 = require("./operations/operations");
const rootNodeHooks_1 = require("./rootNodeHooks");
const sharedNodeHooks_1 = require("./sharedNodeHooks");
const operationsHook = shared_1.createOperationsHook('oas2');
exports.createOas2Plugin = () => ({
    hooks: [
        sharedNodeHooks_1.oas2ParsedDetectorHook,
        sharedNodeHooks_1.oas2SharedNodeHook,
        ...rootNodeHooks_1.securitySchemeHooks,
        ...rootNodeHooks_1.tagsHook,
        ...rootNodeHooks_1.pathsHooks,
        sharedNodeHooks_1.definitionsHook,
        sharedNodeHooks_1.responsesHook,
        operations_1.headerParametersHook,
        operations_1.queryParametersHook,
        operations_1.pathParametersHook,
        operations_1.bodyParametersHook,
        operationsHook,
        operations_1.operationBodyParameterHook,
        operations_1.operationHeaderParameterHook,
        operations_1.operationQueryParameterHook,
        operations_1.operationPathParameterHook,
        operations_2.operationResponseHook,
        operations_2.operationResponsesHook,
        httpOperationHook_1.httpOperationHook,
    ],
});
//# sourceMappingURL=index.js.map