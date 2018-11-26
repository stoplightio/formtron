"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphlib = require("graphlib");
class Graph {
    constructor() {
        this.graph = new graphlib.Graph({
            directed: false,
            compound: true,
            multigraph: false,
        });
        this.createNode = (nodeProps, parent) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._createNode(nodeProps, {
                parent,
                source: { name: 'external', nodeType: nodeProps.type },
            });
        });
        this._createNode = (nodeProps, options) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { parent, source } = options;
            const id = nodeProps.id;
            const existing = this.getNode(id);
            if (existing) {
                console.warn(`Cannot add node. A node with id '${id}' already exists.`);
                return existing;
            }
            const type = nodeProps.type;
            if (source) {
                const allowedType = source.nodeType || source.name;
                if (source.nodeType && type !== allowedType) {
                    console.error(`Creation of a node type not specified in the hook type is not allowed. Requested: ${type}; allowed: ${source.nodeType}`);
                }
            }
            this._hooks.forEach(hook => {
                if (!hook.onWillCreateNode)
                    return;
                if (hook.name !== type && hook.nodeType !== type)
                    return;
                try {
                    hook.onWillCreateNode(nodeProps);
                }
                catch (e) {
                    console.error('onWillCreateNode hook failed.', hook.name, e);
                }
            });
            const node = Object.assign({}, nodeProps, { id,
                type, loadContent: () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const loader = this._loaders[type];
                    if (loader) {
                        try {
                            return loader(node);
                        }
                        catch (e) {
                            console.error(`Error loading content for node ${node.id}`, e);
                        }
                    }
                    return node.content;
                }) });
            this.graph.setNode(id, node);
            if (parent) {
                this.graph.setParent(id, parent.id);
            }
            const didCreateEvents = [];
            this._hooks.forEach(hook => {
                if (!hook.onDidCreateNode)
                    return;
                if (source && !source.recursive && source.name === hook.name)
                    return;
                let { selector } = hook;
                if (selector) {
                    if (typeof selector !== 'function') {
                        const nodeType = selector;
                        selector = (n) => n.type === nodeType;
                    }
                    if (!selector(node)) {
                        return;
                    }
                }
                didCreateEvents.push(hook.onDidCreateNode(node, {
                    createNode: (n, opts) => this._createNode(n, Object.assign({ source: hook }, opts)),
                    createEdge: (sourceNode, destinatioNode) => this.graph.setEdge(sourceNode.id, destinatioNode.id),
                    getNode: nodeId => this.getNode(nodeId),
                    getParentNode: n => {
                        const parentId = this.graph.parent(n.id);
                        if (!parentId) {
                            return;
                        }
                        return this.getNode(parentId);
                    },
                }));
            });
            try {
                yield Promise.all(didCreateEvents);
            }
            catch (e) {
                console.error('Some onDidCreateNode hooks failed.', e);
            }
            return node;
        });
        this._hooks = [];
        this._loaders = {};
        this.addPlugin = (...plugins) => {
            for (const plugin of plugins) {
                if (plugin.hooks) {
                    for (const hook of plugin.hooks) {
                        const index = this._hooks.findIndex(h => h.name === hook.name);
                        if (index >= 0) {
                            console.warn(`Cannot add hook. A hook with name '${hook.name}' already exists.`);
                            continue;
                        }
                        this._hooks.push(hook);
                    }
                }
                if (plugin.loaders) {
                    for (const nodeType in plugin.loaders) {
                        if (!plugin.loaders.hasOwnProperty(nodeType))
                            continue;
                        if (this._loaders[nodeType]) {
                            console.warn(`Cannot add loader. A loader for node type '${nodeType}' already exists.`);
                            continue;
                        }
                        this._loaders[nodeType] = plugin.loaders[nodeType];
                    }
                }
            }
            return this;
        };
    }
    get nodes() {
        return this.graph.nodes().map(nodeId => this.graph.node(nodeId));
    }
    get edges() {
        return this.graph.edges();
    }
    getNode(id) {
        return this.graph.node(id);
    }
}
exports.Graph = Graph;
//# sourceMappingURL=graph.js.map