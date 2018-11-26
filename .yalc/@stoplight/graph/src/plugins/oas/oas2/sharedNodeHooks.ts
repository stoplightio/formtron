import _get = require('lodash/get');
import { Spec } from 'swagger-schema-official';
import { IGraphHook, INodeOptions, IParsedNode, NodeTypes } from '../../..';
import { createSharedNodeHook } from '../shared';
import { Oas2RootNodeTypes, Oas2SharedNodeTypes, OasNodeChildType } from '../types';

export const responsesHook = createSharedNodeHook('responses', OasNodeChildType.OBJECT, Oas2SharedNodeTypes.RESPONSE);

export const definitionsHook = createSharedNodeHook(
  'definitions',
  OasNodeChildType.OBJECT,
  Oas2SharedNodeTypes.JSON_SCHEMA
);

export const oas2ParsedDetectorHook: IGraphHook<INodeOptions, IParsedNode<Spec>> = {
  name: 'oas2-content-type',
  nodeType: NodeTypes.PARSED,
  onWillCreateNode: node => {
    if (_get(node, 'content.data.swagger')) {
      node.contentType = Oas2RootNodeTypes.OAS2;
    }
  },
};

export const oas2SharedNodeHook: IGraphHook<INodeOptions, IParsedNode<Spec>> = {
  name: Oas2RootNodeTypes.SHARED,
  selector: node => node.contentType === Oas2RootNodeTypes.OAS2,
  onDidCreateNode: (node, actions) =>
    actions.createNode({ id: 'shared', type: Oas2RootNodeTypes.SHARED }, { parent: node }),
};
