import * as graphlib from 'graphlib';

import { IGraphHook, IGraphLoader, IGraphPlugin, INodeInstance, INodeOptions } from './types';

export class Graph {
  public readonly graph = new graphlib.Graph({
    directed: false,
    compound: true,
    multigraph: false,
  });

  /**
   * Nodes
   */

  get nodes(): INodeInstance[] {
    return this.graph.nodes().map(nodeId => this.graph.node(nodeId) as INodeInstance);
  }

  get edges() {
    return this.graph.edges();
  }

  public getNode<TNode extends INodeInstance>(id: string): TNode | undefined {
    return this.graph.node(id);
  }

  public createNode = async <Input extends INodeOptions, Output extends INodeInstance>(
    nodeProps: Input,
    parent?: INodeInstance
  ): Promise<Output> => {
    return this._createNode<Input, Output>(nodeProps, {
      parent,
      source: { name: 'external', nodeType: nodeProps.type },
    });
  };

  private _createNode = async <Input extends INodeOptions, Output extends INodeInstance>(
    nodeProps: Input,
    options: {
      parent?: INodeInstance;
      source: IGraphHook;
    }
  ): Promise<Output> => {
    const { parent, source } = options;

    // TODO: unique generation
    const id = nodeProps.id;

    const existing = this.getNode<Output>(id);
    if (existing) {
      console.warn(`Cannot add node. A node with id '${id}' already exists.`);
      return existing;
    }

    const type = nodeProps.type;
    if (source) {
      // intentionally forcing one node type per hook.
      // hooks should be small, with minimal concerns
      const allowedType = source.nodeType || source.name;

      if (source.nodeType && type !== allowedType) {
        console.error(
          `Creation of a node type not specified in the hook type is not allowed. Requested: ${type}; allowed: ${
            source.nodeType
          }`
        );
      }
    }

    // trigger the onWillCreateNode event
    this._hooks.forEach(hook => {
      // if hook not listening for event, don't run
      if (!hook.onWillCreateNode) return;

      // if not relevant to hook, don't run
      if (hook.name !== type && hook.nodeType !== type) return;

      try {
        // allow mutation here.. don't think this needs to be immutable
        hook.onWillCreateNode(nodeProps);
      } catch (e) {
        console.error('onWillCreateNode hook failed.', hook.name, e);
      }
    });

    const node = {
      // @ts-ignore some complicated TS bug here...
      ...nodeProps,
      id,
      type,

      // if their is a registered loader for this node type, call that, otherwise just return whatever content is
      loadContent: async () => {
        const loader = this._loaders[type];
        if (loader) {
          try {
            return loader(node);
          } catch (e) {
            console.error(`Error loading content for node ${node.id}`, e);
          }
        }

        return node.content;
      },
    } as Output;

    // add the node to our internal graph
    this.graph.setNode(id, node);

    // create the parent<->child relationship, if relevant
    if (parent) {
      this.graph.setParent(id, parent.id);
    }

    // trigger the onDidCreateNode event
    const didCreateEvents: Array<Promise<any>> = [];
    this._hooks.forEach(hook => {
      // if hook not listening for event, don't run
      if (!hook.onDidCreateNode) return;

      // no circular hooks if recursive false
      if (source && !source.recursive && source.name === hook.name) return;

      // if not relevant to hook, don't run
      let { selector } = hook;
      if (selector) {
        if (typeof selector !== 'function') {
          const nodeType = selector;
          selector = (n: INodeInstance) => n.type === nodeType;
        }
        if (!selector(node)) {
          return;
        }
      }

      // TODO(SL-248): the way hooks are designed is very limiting.
      // If a hook must wait until the WHOLE TREE is built it will be a problem for two reasons:
      // - we must ensure that plugins are ordered properly
      // - resolving node will currently fail with Promise.all
      didCreateEvents.push(
        hook.onDidCreateNode(node, {
          createNode: (n, opts) => this._createNode(n, { source: hook, ...opts }),
          createEdge: (sourceNode, destinatioNode) => this.graph.setEdge(sourceNode.id, destinatioNode.id),
          getNode: nodeId => this.getNode(nodeId),
          getParentNode: n => {
            const parentId = this.graph.parent(n.id);
            if (!parentId) {
              return;
            }
            return this.getNode(parentId);
          },
        })
      );
    });

    try {
      // TODO: is this the concurrency model we want? or more something like a queue, and don't block returning node?
      await Promise.all(didCreateEvents);
    } catch (e) {
      console.error('Some onDidCreateNode hooks failed.', e);
    }

    return node;
  };

  /**
   * Plugins
   */

  private _hooks: IGraphHook[] = [];
  private _loaders: {
    [nodeType: string]: IGraphLoader;
  } = {};

  public addPlugin = (...plugins: IGraphPlugin[]): Graph => {
    for (const plugin of plugins) {
      if (plugin.hooks) {
        for (const hook of plugin.hooks) {
          // Don't allow the same hook to be added multiple times
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
          if (!plugin.loaders.hasOwnProperty(nodeType)) continue;

          // Only one loader per nodeType allowed
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
