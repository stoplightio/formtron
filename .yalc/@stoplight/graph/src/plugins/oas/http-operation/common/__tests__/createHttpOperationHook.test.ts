import { Operation, Path, Spec } from 'swagger-schema-official';
import { INodeInstance } from '../../../../..';
import { Oas2SharedNodeTypes } from '../../../types';
import { createHttpOperationHook } from '../createHttpOperationHook';

describe('httpOperationHook', () => {
  let httpOperationHook: any;
  const operationMethod = 'FAKE_METHOD';
  const operationPath = 'FAKE_PATH';
  const fakeHttpOperation = {
    id: 'operation-id',
  };
  const graphOptionsStub = {
    createEdge: jest.fn(),
    createNode: jest.fn(),
    getNode: jest.fn(),
    getParentNode: jest.fn(),
  };
  let operationConfig: any;

  beforeEach(() => {
    operationConfig = {
      getMethod: jest.fn().mockReturnValue(operationMethod),
      getPath: jest.fn().mockReturnValue(operationPath),
      name: 'FAKE_NAME',
      nodeType: 'FAKE_NODE_TYPE',
      selector: 'FAKE_SELECTOR_VALUE',
      translateOperation: jest.fn().mockReturnValue(fakeHttpOperation),
    };
    httpOperationHook = createHttpOperationHook(operationConfig);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('selector', () => {
    test('selector is a plain string', () => {
      expect(httpOperationHook.selector).toEqual('FAKE_SELECTOR_VALUE');
    });
  });

  describe('onDidCreateNode', () => {
    const operationNode: INodeInstance<Operation> = {
      id: `${operationPath}_${operationMethod}`,
      loadContent: jest.fn(),
      type: Oas2SharedNodeTypes.OPERATION,
      content: {
        responses: {
          response: {
            description: 'description',
          },
        },
      },
    };

    test('given no content should simply return', async () => {
      await httpOperationHook.onDidCreateNode!({ id: 'x', loadContent: jest.fn(), type: 't' }, graphOptionsStub);

      expect(graphOptionsStub.createNode).not.toHaveBeenCalled();
    });

    test('given no parent path should not create node', async () => {
      (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce(null);

      await httpOperationHook.onDidCreateNode!(operationNode, graphOptionsStub);
      expect(graphOptionsStub.createNode).not.toHaveBeenCalled();
    });

    test('given parent path with no content should not create node', async () => {
      (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce({
        id: 'path-id',
        content: null,
      });

      await httpOperationHook.onDidCreateNode!(operationNode, graphOptionsStub);
      expect(graphOptionsStub.createNode).not.toHaveBeenCalled();
    });

    test('given no parent paths with should not create node', async () => {
      // path
      (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce({
        id: 'path-id',
        content: {},
      });
      // paths
      (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce(null);

      await httpOperationHook.onDidCreateNode!(operationNode, graphOptionsStub);
      expect(graphOptionsStub.createNode).not.toHaveBeenCalled();
    });

    test('given no parent spec should not create node', async () => {
      // path
      (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce({
        id: 'path-id',
        content: {},
      });
      // paths
      (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce({
        id: 'paths-id',
        content: {},
      });
      // spec
      (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce(null);

      await httpOperationHook.onDidCreateNode!(operationNode, graphOptionsStub);
      expect(graphOptionsStub.createNode).not.toHaveBeenCalled();
    });

    test('given parent spec with no content should not create node', async () => {
      // path
      (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce({
        id: 'path-id',
        content: {},
      });

      // paths
      (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce({
        id: 'paths-id',
        content: {},
      });

      // spec
      (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce({
        id: 'spec-id',
        content: null,
      });

      await httpOperationHook.onDidCreateNode!(operationNode, graphOptionsStub);
      expect(graphOptionsStub.createNode).not.toHaveBeenCalled();
    });

    describe('given correct tree structure', () => {
      const path: Path = {};
      const spec: Spec = {
        info: {
          title: 't',
          version: 'v',
        },
        swagger: 's',
        paths: {},
      };

      beforeEach(() => {
        (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce({
          id: 'path-id',
          content: path,
        });

        // paths
        (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce({
          id: 'paths-id',
          content: {},
        });

        // spec
        (graphOptionsStub.getParentNode as jest.Mock).mockReturnValueOnce({
          id: 'spec-id',
          content: spec,
        });
      });

      test('should call translate operation with correct parameters', async () => {
        await httpOperationHook.onDidCreateNode!(operationNode, graphOptionsStub);

        expect(operationConfig.getMethod).toHaveBeenCalledWith(operationNode);
        expect(operationConfig.getPath).toHaveBeenCalledWith({
          id: 'path-id',
          content: {},
        });
        expect(operationConfig.translateOperation).toHaveBeenCalledWith({
          operation: operationNode.content,
          method: operationMethod,
          path: operationPath,
          spec,
          pathObject: path,
        });
      });

      test('should call createNode with correct parameters', async () => {
        await httpOperationHook.onDidCreateNode!(operationNode, graphOptionsStub);

        expect(graphOptionsStub.createNode as any).toHaveBeenCalledWith(
          {
            id: `${operationNode.id}-${operationConfig.nodeType}`,
            type: operationConfig.nodeType,
            content: fakeHttpOperation,
          },
          {
            parent: operationNode,
          }
        );
      });
    });
  });
});
