"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
const types_1 = require("../types");
exports.headersHook = shared_1.createSharedNodeHook('headers', types_1.OasNodeChildType.OBJECT, types_1.Oas3SharedNodeTypes.HEADERS);
exports.schemasHook = shared_1.createSharedNodeHook('schemas', types_1.OasNodeChildType.OBJECT, types_1.Oas3SharedNodeTypes.SCHEMAS);
exports.responsesHook = shared_1.createSharedNodeHook('responses', types_1.OasNodeChildType.OBJECT, types_1.Oas3SharedNodeTypes.RESPONSES);
exports.linksHook = shared_1.createSharedNodeHook('links', types_1.OasNodeChildType.OBJECT, types_1.Oas3SharedNodeTypes.LINKS);
exports.callbacksHook = shared_1.createSharedNodeHook('callbacks', types_1.OasNodeChildType.OBJECT, types_1.Oas3SharedNodeTypes.CALLBACKS);
exports.examplesHook = shared_1.createSharedNodeHook('examples', types_1.OasNodeChildType.OBJECT, types_1.Oas3SharedNodeTypes.EXAMPLES);
exports.requestBodiesHook = shared_1.createSharedNodeHook('requestBodies', types_1.OasNodeChildType.OBJECT, types_1.Oas3SharedNodeTypes.REQUEST_BODIES);
exports.securitySchemesHook = shared_1.createSharedNodeHook('securitySchemes', types_1.OasNodeChildType.OBJECT, types_1.Oas3SharedNodeTypes.SECURITY_SCHEMES);
//# sourceMappingURL=sharedNodeHooks.js.map