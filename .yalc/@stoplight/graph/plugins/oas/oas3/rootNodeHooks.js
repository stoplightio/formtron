"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _get = require("lodash/get");
const __1 = require("../../..");
const shared_1 = require("../shared");
const types_1 = require("../types");
exports.oas3ParsedDetectorHook = {
    name: 'oas3-content-type',
    nodeType: __1.NodeTypes.PARSED,
    onWillCreateNode: node => {
        if (_get(node, 'content.data.openapi')) {
            node.contentType = types_1.Oas3RootNodeTypes.OAS3;
        }
    },
};
exports.oas3SharedNodeHook = {
    name: types_1.Oas3RootNodeTypes.SHARED,
    selector: node => node.contentType === types_1.Oas3RootNodeTypes.OAS3,
    onDidCreateNode: (node, actions) => actions.createNode({ id: 'shared', type: types_1.Oas3RootNodeTypes.SHARED }, { parent: node }),
};
exports.tagsHook = shared_1.createContainerElementHooks(types_1.Oas3RootNodeTypes.TAGS, types_1.Oas3ChildNodeTypes.TAG, types_1.OasNodeChildType.ARRAY, 'tags');
exports.pathsHook = shared_1.createContainerElementHooks(types_1.Oas3RootNodeTypes.PATHS, types_1.Oas3ChildNodeTypes.PATH, types_1.OasNodeChildType.OBJECT, 'paths');
exports.serversHook = shared_1.createContainerElementHooks(types_1.Oas3RootNodeTypes.SERVERS, types_1.Oas3ChildNodeTypes.SERVER, types_1.OasNodeChildType.ARRAY, 'servers', 'url');
//# sourceMappingURL=rootNodeHooks.js.map