import _get = require('lodash/get');
import { OpenAPIObject, OperationObject, ParameterObject, PathObject, SecurityRequirementObject } from 'openapi3-ts';
import { Operation, Parameter, Path, Security, Spec } from 'swagger-schema-official';
import { IGraphHook, INodeInstance, INodeOptions, IParsedNode } from '../..';
import {
  Oas2ChildNodeTypes,
  Oas2ParamType,
  Oas2RootNodeTypes,
  Oas2SharedNodeTypes,
  Oas3ChildNodeTypes,
  Oas3ParamType,
  Oas3RootNodeTypes,
  Oas3SharedNodeTypes,
  OasNodeChildType,
} from './types';

type oas3TopProperty = 'openapi' | 'info' | 'servers' | 'paths' | 'components' | 'security' | 'tags' | 'externalDocs';

export function createContainerElementHooks(
  containerType: Oas3RootNodeTypes,
  elementType: Oas3ChildNodeTypes,
  childType: OasNodeChildType,
  containerPropertyName: oas3TopProperty,
  childIdentifierProperty?: string
): any[];

export function createContainerElementHooks(
  containerType: Oas2RootNodeTypes,
  elementType: Oas2ChildNodeTypes,
  childType: OasNodeChildType,
  containerPropertyName: keyof Spec,
  childIdentifierProperty?: string
): any[];

export function createContainerElementHooks(
  containerType: Oas2RootNodeTypes | Oas3RootNodeTypes,
  elementType: Oas2ChildNodeTypes | Oas3ChildNodeTypes,
  childType: OasNodeChildType,
  containerPropertyName: keyof Spec | oas3TopProperty,
  childIdentifierProperty: string = 'name'
): any[] {
  const contentTypeNode = Object.values(Oas3RootNodeTypes).includes(containerType)
    ? Oas3RootNodeTypes.OAS3
    : Oas2RootNodeTypes.OAS2;

  const containerHook: IGraphHook<INodeOptions, INodeInstance, IParsedNode<Spec | OpenAPIObject>> = {
    name: containerType,
    selector: node => node.contentType === contentTypeNode,
    onDidCreateNode: async (node, actions) => {
      const container = _get(node, ['content', 'data', containerPropertyName]);
      if (!container) return;

      return actions.createNode(
        {
          id: containerPropertyName,
          type: containerType,
          contentType: containerType,
          content: container,
        },
        { parent: node }
      );
    },
  };

  const elementHook: IGraphHook<INodeOptions, INodeInstance, INodeInstance<any>> = {
    name: elementType,
    selector: node => node.contentType === containerType,
    onDidCreateNode: async (node, actions) => {
      if (!node.content) return;
      const elements = node.content;

      return Promise.all(
        (childType === OasNodeChildType.OBJECT ? Object.keys(elements) : elements).map((element: any) =>
          actions.createNode(
            {
              id: childType === OasNodeChildType.OBJECT ? element : element[childIdentifierProperty],
              type: elementType,
              content: childType === OasNodeChildType.OBJECT ? elements[element] : element,
            },
            { parent: node }
          )
        )
      );
    },
  };

  return [containerHook, elementHook];
}

type Oas2SharedPropertyNames = 'responses' | 'definitions';
type Oas3SharedPropertyNames =
  | 'schemas'
  | 'responses'
  | 'parameters'
  | 'examples'
  | 'requestBodies'
  | 'headers'
  | 'securitySchemes'
  | 'links'
  | 'callbacks';

export function createSharedNodeHook(
  nodeName: Oas2SharedPropertyNames,
  childType: OasNodeChildType,
  elementType: Oas2SharedNodeTypes
): IGraphHook<INodeOptions, INodeInstance, INodeInstance>;

export function createSharedNodeHook(
  nodeName: Oas3SharedPropertyNames,
  childType: OasNodeChildType,
  elementType: Oas3SharedNodeTypes
): IGraphHook<INodeOptions, INodeInstance, INodeInstance>;

export function createSharedNodeHook(
  nodeName: Oas2SharedPropertyNames | Oas3SharedPropertyNames,
  childType: OasNodeChildType,
  elementType: Oas2SharedNodeTypes | Oas3SharedNodeTypes
): IGraphHook<INodeOptions, INodeInstance, INodeInstance> {
  let selector = (node: INodeInstance) => node.contentType === Oas3RootNodeTypes.OAS3;
  let propertyPath = ['content', 'data', 'components', nodeName];

  if (Object.values(Oas2SharedNodeTypes).includes(elementType)) {
    propertyPath = ['content', 'data', nodeName];
    selector = (node: INodeInstance) => node.contentType === Oas2RootNodeTypes.OAS2;
  }

  return {
    name: elementType,
    selector,
    onDidCreateNode: async (node, actions) => {
      const elements = _get(node, propertyPath);

      if (!elements) return;

      return Promise.all(
        (childType === OasNodeChildType.OBJECT ? Object.keys(elements) : elements).map((element: any) =>
          actions.createNode(
            {
              id: `${nodeName}_${childType === OasNodeChildType.OBJECT ? element : element.name}`,
              type: elementType,
              content: childType === OasNodeChildType.OBJECT ? elements[element] : element,
            },
            { parent: actions.getNode('shared') }
          )
        )
      );
    },
  };
}

enum OasParameterNodeType {
  body = 'oas2_body',
  header = 'oas2_header',
  query = 'oas2_query',
  path = 'oas2_path',
}

export const createParameterHook = (
  name: string,
  parameterType: Oas2ParamType | Oas3ParamType,
  nodePath: string[],
  selector: (node: INodeInstance) => boolean,
  parentId?: string
): IGraphHook<INodeOptions, INodeInstance, INodeInstance> => {
  return {
    name,
    selector,
    onDidCreateNode: async (node, actions) => {
      const elements = _get(node, nodePath) as Array<Parameter | ParameterObject>;

      if (!elements) return;

      const parametersArray = Array.isArray(elements) ? elements : (Object.values(elements) as ParameterObject[]);

      return Promise.all(
        parametersArray.filter(parameter => parameter.in === parameterType).map(parameter =>
          actions.createNode(
            {
              id: `${node.id}_${parameter.name}`,
              type: OasParameterNodeType[parameterType],
              content: parameter,
            },
            { parent: parentId ? actions.getNode(parentId) : node }
          )
        )
      );
    },
  };
};

interface IOperationNode extends INodeOptions {
  type: Oas3SharedNodeTypes.OPERATION | Oas2SharedNodeTypes.OPERATION;
}

export const createOperationsHook = (type: 'oas2' | 'oas3') => {
  const verbs = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];

  if (type === 'oas3') {
    verbs.push('trace');
  }

  const selectorNodeType = type === 'oas2' ? Oas2ChildNodeTypes.PATH : Oas3ChildNodeTypes.PATH;
  const nodeType = type === 'oas2' ? Oas2SharedNodeTypes.OPERATION : Oas3SharedNodeTypes.OPERATION;

  const operationsHook: IGraphHook<
    IOperationNode,
    INodeInstance<OperationObject | Operation>,
    INodeInstance<Path | PathObject>
  > = {
    name: 'operations',
    nodeType,
    selector: node => node.type === selectorNodeType,
    onDidCreateNode: async (node, actions) => {
      const path = node.content;

      if (!path) return;

      verbs.forEach(async verb => {
        const operation: Operation | OperationObject | undefined = path[verb];
        if (!operation) return;

        const operationNode = await actions.createNode(
          {
            id: `${node.id}_${verb}`,
            type: nodeType,
            content: operation,
          },
          { parent: node }
        );

        if (operation.tags) {
          operation.tags.forEach(tag => {
            const tagNode = actions.getNode(tag);

            if (tagNode) {
              actions.createEdge(operationNode, tagNode);
            }
          });
        }

        if (operation.security) {
          // Note: this type is not exactly true, however the final result is basically the same.
          (operation.security as Array<Security | SecurityRequirementObject>).forEach(securitySchemes => {
            Object.keys(securitySchemes).forEach(securityScheme => {
              const securitySchemeNode = actions.getNode(securityScheme);
              if (!securitySchemeNode) {
                console.warn(
                  `Unable to find a corresponding security scheme node on top of the document for ${securityScheme}`
                );
              } else {
                actions.createEdge(node, securitySchemeNode);
              }
            });
          });
        }
      });
    },
  };
  return operationsHook;
};

export const createSharedParametersNodeHook = (
  containerType: Oas2RootNodeTypes.OAS2 | Oas3RootNodeTypes.OAS3,
  parameterType: Oas2ParamType | Oas3ParamType
): IGraphHook<INodeOptions, INodeInstance, INodeInstance> => {
  const path =
    containerType === Oas2RootNodeTypes.OAS2
      ? ['content', 'data', 'parameters']
      : ['content', 'data', 'components', 'parameters'];
  return createParameterHook(
    `${parameterType}sharedParameter`,
    parameterType,
    path,
    node => node.contentType === containerType,
    'shared'
  );
};

export const createOperationParameterHook = (
  containerType: Oas2RootNodeTypes.OAS2 | Oas3RootNodeTypes.OAS3,
  parameterType: Oas2ParamType | Oas3ParamType
): IGraphHook<INodeOptions, INodeInstance, INodeInstance> => {
  const operation =
    containerType === Oas2RootNodeTypes.OAS2 ? Oas2SharedNodeTypes.OPERATION : Oas3SharedNodeTypes.OPERATION;
  return createParameterHook(
    `${parameterType}operationParameter`,
    parameterType,
    ['content', 'parameters'],
    node => node.type === operation
  );
};
