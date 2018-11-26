"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml_1 = require("@stoplight/yaml");
const types_1 = require("../../types");
exports.createYamlHook = () => ({
    name: 'yaml-parser',
    nodeType: types_1.NodeTypes.PARSED,
    selector: node => node.contentType === 'yaml' || node.contentType === 'yml',
    onDidCreateNode: (parent, { createNode }) => {
        return createNode({
            id: `parsed-${parent.id}`,
            type: types_1.NodeTypes.PARSED,
            content: yaml_1.parseWithPointers(parent.content),
        }, {
            parent,
        });
    },
});
//# sourceMappingURL=hook.js.map