import { parseWithPointers } from '@stoplight/yaml';
import { IGraphHook, INodeInstance, INodeOptions, IParsedNode, NodeTypes } from '../../types';

export const createYamlHook = (): IGraphHook<INodeOptions, IParsedNode<string>, INodeInstance> => ({
  name: 'yaml-parser',

  nodeType: NodeTypes.PARSED,

  // yaml hook only cares about nodes whos content is yaml
  selector: node => node.contentType === 'yaml' || node.contentType === 'yml',

  onDidCreateNode: (parent, { createNode }) => {
    return createNode(
      {
        id: `parsed-${parent.id}`,
        type: NodeTypes.PARSED,
        content: parseWithPointers(parent.content as string),
      },
      {
        parent,
      }
    );
  },
});
