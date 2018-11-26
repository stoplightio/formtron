"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const parseWithPointers_1 = require("@stoplight/json/parseWithPointers");
const types_1 = require("../../types");
exports.createJsonHook = () => ({
    name: 'json-parser',
    nodeType: types_1.NodeTypes.PARSED,
    selector: node => node.contentType === 'json',
    onDidCreateNode: (parent, { createNode }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        return createNode({
            id: `parsed-${parent.id}`,
            type: types_1.NodeTypes.PARSED,
            content: parseWithPointers_1.parseWithPointers((yield parent.loadContent())),
        }, {
            parent,
        });
    }),
});
//# sourceMappingURL=hook.js.map