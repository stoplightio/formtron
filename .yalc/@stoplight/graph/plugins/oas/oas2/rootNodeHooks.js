"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
const types_1 = require("../types");
exports.securitySchemeHooks = shared_1.createContainerElementHooks(types_1.Oas2RootNodeTypes.SECURITY_SCHEMES, types_1.Oas2ChildNodeTypes.SECURITY_SCHEME, types_1.OasNodeChildType.OBJECT, 'securityDefinitions');
exports.pathsHooks = shared_1.createContainerElementHooks(types_1.Oas2RootNodeTypes.PATHS, types_1.Oas2ChildNodeTypes.PATH, types_1.OasNodeChildType.OBJECT, 'paths');
exports.tagsHook = shared_1.createContainerElementHooks(types_1.Oas2RootNodeTypes.TAGS, types_1.Oas2ChildNodeTypes.TAG, types_1.OasNodeChildType.ARRAY, 'tags');
//# sourceMappingURL=rootNodeHooks.js.map