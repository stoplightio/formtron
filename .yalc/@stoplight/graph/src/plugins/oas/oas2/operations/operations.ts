import { Operation, Response } from 'swagger-schema-official';
import { IGraphHook, INodeInstance, INodeOptions } from '../../../../types';
import { Oas2SharedNodeTypes } from '../../types';

interface IResponsesNode extends INodeOptions {
  type: Oas2SharedNodeTypes.RESPONSES;
}

export const operationResponsesHook: IGraphHook<IResponsesNode, INodeInstance<Response>, INodeInstance<Operation>> = {
  name: 'operationResponses',
  selector: node => node.type === Oas2SharedNodeTypes.OPERATION,
  onDidCreateNode: async (node, actions) => {
    const operation = node.content;
    if (!operation) return;

    return actions.createNode(
      {
        id: `${node.id}_responses`,
        content: operation.responses,
        type: Oas2SharedNodeTypes.RESPONSES,
      },
      { parent: node }
    );
  },
};

interface IResponseNode extends INodeOptions {
  type: Oas2SharedNodeTypes.RESPONSE;
}

export const operationResponseHook: IGraphHook<IResponseNode, INodeInstance<Response>, INodeInstance<Operation>> = {
  name: 'operationResponse',
  selector: node => node.type === Oas2SharedNodeTypes.RESPONSES,
  onDidCreateNode: async (node, actions) => {
    const responses = node.content;
    if (!responses) return;

    return Promise.all(
      Object.keys(responses).map(responseName => {
        const response: Response = responses[responseName];

        return actions.createNode(
          {
            id: `${node.id}_${responseName}`,
            content: response,
            type: Oas2SharedNodeTypes.RESPONSE,
          },
          { parent: node }
        );
      })
    );
  },
};
