import { parseWithPointers } from '@stoplight/json/parseWithPointers';
import { IGraphHook, INodeInstance, INodeOptions, IParsedNode, NodeTypes } from '../../types';

export const createJsonHook = (): IGraphHook<INodeOptions, IParsedNode<string>, INodeInstance> => ({
  name: 'json-parser',

  nodeType: NodeTypes.PARSED,

  selector: node => node.contentType === 'json',

  onDidCreateNode: async (parent, { createNode }) => {
    return createNode(
      {
        id: `parsed-${parent.id}`,
        type: NodeTypes.PARSED,
        content: parseWithPointers((await parent.loadContent()) as string),
      },
      {
        parent,
      }
    );
  },
});
