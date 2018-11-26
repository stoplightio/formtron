import _get = require('lodash/get');
import { OpenAPIObject } from 'openapi3-ts';
import { IGraphHook, INodeOptions, IParsedNode, NodeTypes } from '../../..';
import { createContainerElementHooks } from '../shared';
import { Oas3ChildNodeTypes, Oas3RootNodeTypes, OasNodeChildType } from '../types';

export const oas3ParsedDetectorHook: IGraphHook<INodeOptions, IParsedNode<OpenAPIObject>> = {
  name: 'oas3-content-type',
  nodeType: NodeTypes.PARSED,
  onWillCreateNode: node => {
    if (_get(node, 'content.data.openapi')) {
      node.contentType = Oas3RootNodeTypes.OAS3;
    }
  },
};

export const oas3SharedNodeHook: IGraphHook<INodeOptions, IParsedNode<OpenAPIObject>> = {
  name: Oas3RootNodeTypes.SHARED,
  selector: node => node.contentType === Oas3RootNodeTypes.OAS3,
  onDidCreateNode: (node, actions) =>
    actions.createNode({ id: 'shared', type: Oas3RootNodeTypes.SHARED }, { parent: node }),
};

export const tagsHook = createContainerElementHooks(
  Oas3RootNodeTypes.TAGS,
  Oas3ChildNodeTypes.TAG,
  OasNodeChildType.ARRAY,
  'tags'
);

export const pathsHook = createContainerElementHooks(
  Oas3RootNodeTypes.PATHS,
  Oas3ChildNodeTypes.PATH,
  OasNodeChildType.OBJECT,
  'paths'
);

export const serversHook = createContainerElementHooks(
  Oas3RootNodeTypes.SERVERS,
  Oas3ChildNodeTypes.SERVER,
  OasNodeChildType.ARRAY,
  'servers',
  'url'
);
