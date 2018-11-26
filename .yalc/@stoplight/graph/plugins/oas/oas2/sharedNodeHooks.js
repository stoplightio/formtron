"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _get = require("lodash/get");
const __1 = require("../../..");
const shared_1 = require("../shared");
const types_1 = require("../types");
exports.responsesHook = shared_1.createSharedNodeHook('responses', types_1.OasNodeChildType.OBJECT, types_1.Oas2SharedNodeTypes.RESPONSE);
exports.definitionsHook = shared_1.createSharedNodeHook('definitions', types_1.OasNodeChildType.OBJECT, types_1.Oas2SharedNodeTypes.JSON_SCHEMA);
exports.oas2ParsedDetectorHook = {
    name: 'oas2-content-type',
    nodeType: __1.NodeTypes.PARSED,
    onWillCreateNode: node => {
        if (_get(node, 'content.data.swagger')) {
            node.contentType = types_1.Oas2RootNodeTypes.OAS2;
        }
    },
};
exports.oas2SharedNodeHook = {
    name: types_1.Oas2RootNodeTypes.SHARED,
    selector: node => node.contentType === types_1.Oas2RootNodeTypes.OAS2,
    onDidCreateNode: (node, actions) => actions.createNode({ id: 'shared', type: types_1.Oas2RootNodeTypes.SHARED }, { parent: node }),
};
//# sourceMappingURL=sharedNodeHooks.js.map