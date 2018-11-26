"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpOperationHook_1 = require("../http-operation/oas3/hooks/httpOperationHook");
const shared_1 = require("../shared");
const operations_1 = require("./operations");
const rootNodeHooks_1 = require("./rootNodeHooks");
const sharedNodeHooks_1 = require("./sharedNodeHooks");
const operationsHook = shared_1.createOperationsHook('oas3');
exports.createOas3Plugin = () => ({
    hooks: [
        rootNodeHooks_1.oas3ParsedDetectorHook,
        rootNodeHooks_1.oas3SharedNodeHook,
        sharedNodeHooks_1.schemasHook,
        sharedNodeHooks_1.responsesHook,
        operations_1.headerParametersHook,
        operations_1.queryParametersHook,
        operations_1.pathParametersHook,
        operations_1.cookieParametersHook,
        sharedNodeHooks_1.examplesHook,
        sharedNodeHooks_1.requestBodiesHook,
        sharedNodeHooks_1.headersHook,
        sharedNodeHooks_1.securitySchemesHook,
        sharedNodeHooks_1.linksHook,
        operationsHook,
        sharedNodeHooks_1.callbacksHook,
        ...rootNodeHooks_1.pathsHook,
        ...rootNodeHooks_1.tagsHook,
        ...rootNodeHooks_1.serversHook,
        httpOperationHook_1.httpOperationHook,
    ],
});
//# sourceMappingURL=index.js.map