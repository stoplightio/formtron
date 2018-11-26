"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _get = require("lodash/get");
const types_1 = require("./types");
function createContainerElementHooks(containerType, elementType, childType, containerPropertyName, childIdentifierProperty = 'name') {
    const contentTypeNode = Object.values(types_1.Oas3RootNodeTypes).includes(containerType)
        ? types_1.Oas3RootNodeTypes.OAS3
        : types_1.Oas2RootNodeTypes.OAS2;
    const containerHook = {
        name: containerType,
        selector: node => node.contentType === contentTypeNode,
        onDidCreateNode: (node, actions) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const container = _get(node, ['content', 'data', containerPropertyName]);
            if (!container)
                return;
            return actions.createNode({
                id: containerPropertyName,
                type: containerType,
                contentType: containerType,
                content: container,
            }, { parent: node });
        }),
    };
    const elementHook = {
        name: elementType,
        selector: node => node.contentType === containerType,
        onDidCreateNode: (node, actions) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!node.content)
                return;
            const elements = node.content;
            return Promise.all((childType === types_1.OasNodeChildType.OBJECT ? Object.keys(elements) : elements).map((element) => actions.createNode({
                id: childType === types_1.OasNodeChildType.OBJECT ? element : element[childIdentifierProperty],
                type: elementType,
                content: childType === types_1.OasNodeChildType.OBJECT ? elements[element] : element,
            }, { parent: node })));
        }),
    };
    return [containerHook, elementHook];
}
exports.createContainerElementHooks = createContainerElementHooks;
function createSharedNodeHook(nodeName, childType, elementType) {
    let selector = (node) => node.contentType === types_1.Oas3RootNodeTypes.OAS3;
    let propertyPath = ['content', 'data', 'components', nodeName];
    if (Object.values(types_1.Oas2SharedNodeTypes).includes(elementType)) {
        propertyPath = ['content', 'data', nodeName];
        selector = (node) => node.contentType === types_1.Oas2RootNodeTypes.OAS2;
    }
    return {
        name: elementType,
        selector,
        onDidCreateNode: (node, actions) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const elements = _get(node, propertyPath);
            if (!elements)
                return;
            return Promise.all((childType === types_1.OasNodeChildType.OBJECT ? Object.keys(elements) : elements).map((element) => actions.createNode({
                id: `${nodeName}_${childType === types_1.OasNodeChildType.OBJECT ? element : element.name}`,
                type: elementType,
                content: childType === types_1.OasNodeChildType.OBJECT ? elements[element] : element,
            }, { parent: actions.getNode('shared') })));
        }),
    };
}
exports.createSharedNodeHook = createSharedNodeHook;
var OasParameterNodeType;
(function (OasParameterNodeType) {
    OasParameterNodeType["body"] = "oas2_body";
    OasParameterNodeType["header"] = "oas2_header";
    OasParameterNodeType["query"] = "oas2_query";
    OasParameterNodeType["path"] = "oas2_path";
})(OasParameterNodeType || (OasParameterNodeType = {}));
exports.createParameterHook = (name, parameterType, nodePath, selector, parentId) => {
    return {
        name,
        selector,
        onDidCreateNode: (node, actions) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const elements = _get(node, nodePath);
            if (!elements)
                return;
            const parametersArray = Array.isArray(elements) ? elements : Object.values(elements);
            return Promise.all(parametersArray.filter(parameter => parameter.in === parameterType).map(parameter => actions.createNode({
                id: `${node.id}_${parameter.name}`,
                type: OasParameterNodeType[parameterType],
                content: parameter,
            }, { parent: parentId ? actions.getNode(parentId) : node })));
        }),
    };
};
exports.createOperationsHook = (type) => {
    const verbs = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];
    if (type === 'oas3') {
        verbs.push('trace');
    }
    const selectorNodeType = type === 'oas2' ? types_1.Oas2ChildNodeTypes.PATH : types_1.Oas3ChildNodeTypes.PATH;
    const nodeType = type === 'oas2' ? types_1.Oas2SharedNodeTypes.OPERATION : types_1.Oas3SharedNodeTypes.OPERATION;
    const operationsHook = {
        name: 'operations',
        nodeType,
        selector: node => node.type === selectorNodeType,
        onDidCreateNode: (node, actions) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const path = node.content;
            if (!path)
                return;
            verbs.forEach((verb) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const operation = path[verb];
                if (!operation)
                    return;
                const operationNode = yield actions.createNode({
                    id: `${node.id}_${verb}`,
                    type: nodeType,
                    content: operation,
                }, { parent: node });
                if (operation.tags) {
                    operation.tags.forEach(tag => {
                        const tagNode = actions.getNode(tag);
                        if (tagNode) {
                            actions.createEdge(operationNode, tagNode);
                        }
                    });
                }
                if (operation.security) {
                    operation.security.forEach(securitySchemes => {
                        Object.keys(securitySchemes).forEach(securityScheme => {
                            const securitySchemeNode = actions.getNode(securityScheme);
                            if (!securitySchemeNode) {
                                console.warn(`Unable to find a corresponding security scheme node on top of the document for ${securityScheme}`);
                            }
                            else {
                                actions.createEdge(node, securitySchemeNode);
                            }
                        });
                    });
                }
            }));
        }),
    };
    return operationsHook;
};
exports.createSharedParametersNodeHook = (containerType, parameterType) => {
    const path = containerType === types_1.Oas2RootNodeTypes.OAS2
        ? ['content', 'data', 'parameters']
        : ['content', 'data', 'components', 'parameters'];
    return exports.createParameterHook(`${parameterType}sharedParameter`, parameterType, path, node => node.contentType === containerType, 'shared');
};
exports.createOperationParameterHook = (containerType, parameterType) => {
    const operation = containerType === types_1.Oas2RootNodeTypes.OAS2 ? types_1.Oas2SharedNodeTypes.OPERATION : types_1.Oas3SharedNodeTypes.OPERATION;
    return exports.createParameterHook(`${parameterType}operationParameter`, parameterType, ['content', 'parameters'], node => node.type === operation);
};
//# sourceMappingURL=shared.js.map