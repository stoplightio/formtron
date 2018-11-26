"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
exports.getMethod = ({ id }) => id.slice(id.lastIndexOf('_') + 1);
exports.getPath = ({ id }) => id;
function createHttpOperationHook(config) {
    return {
        name: config.name,
        nodeType: config.nodeType,
        selector: config.selector,
        onDidCreateNode(operationNode, options) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (!operationNode.content) {
                    return;
                }
                const pathNode = options.getParentNode(operationNode);
                if (!pathNode || !pathNode.content) {
                    return;
                }
                const pathsNode = options.getParentNode(pathNode);
                if (!pathsNode) {
                    return;
                }
                const specNode = options.getParentNode(pathsNode);
                if (!specNode || !specNode.content) {
                    return;
                }
                options.createNode({
                    id: `${operationNode.id}-${config.nodeType}`,
                    type: config.nodeType,
                    content: config.translateOperation({
                        operation: operationNode.content,
                        pathObject: pathNode.content,
                        spec: specNode.content,
                        method: config.getMethod(operationNode),
                        path: config.getPath(pathNode),
                    }),
                }, {
                    parent: operationNode,
                });
            });
        },
    };
}
exports.createHttpOperationHook = createHttpOperationHook;
//# sourceMappingURL=createHttpOperationHook.js.map