"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types_1 = require("../../types");
exports.operationResponsesHook = {
    name: 'operationResponses',
    selector: node => node.type === types_1.Oas2SharedNodeTypes.OPERATION,
    onDidCreateNode: (node, actions) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const operation = node.content;
        if (!operation)
            return;
        return actions.createNode({
            id: `${node.id}_responses`,
            content: operation.responses,
            type: types_1.Oas2SharedNodeTypes.RESPONSES,
        }, { parent: node });
    }),
};
exports.operationResponseHook = {
    name: 'operationResponse',
    selector: node => node.type === types_1.Oas2SharedNodeTypes.RESPONSES,
    onDidCreateNode: (node, actions) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const responses = node.content;
        if (!responses)
            return;
        return Promise.all(Object.keys(responses).map(responseName => {
            const response = responses[responseName];
            return actions.createNode({
                id: `${node.id}_${responseName}`,
                content: response,
                type: types_1.Oas2SharedNodeTypes.RESPONSE,
            }, { parent: node });
        }));
    }),
};
//# sourceMappingURL=operations.js.map