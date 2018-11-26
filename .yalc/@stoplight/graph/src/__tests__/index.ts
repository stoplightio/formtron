import { Graph } from '../index';
import { IGraphHook } from '../types';

describe('graph', () => {
  let graph: Graph;
  let hook: IGraphHook<any>;

  beforeEach(() => {
    graph = new Graph();
    hook = {
      name: 'h1',
      selector: jest.fn(() => true),
      onDidCreateNode: jest.fn(),
    };
    graph.addPlugin({
      hooks: [hook],
    });
  });

  describe('createNode', () => {
    test('should trigger onNodeCreated', () => {
      graph.createNode({ id: 'node1', type: 'x' });
      expect(hook.onDidCreateNode).toBeCalledTimes(1);
      expect(hook.selector).toBeCalledTimes(1);
    });

    test('should not trigger onNodeCreated if the hook selector returns false', () => {
      hook.selector = jest.fn(() => false);
      graph.createNode({ id: 'node1', type: 'x' });
      expect(hook.onDidCreateNode).not.toBeCalled();
      expect(hook.selector).toBeCalledTimes(1);
    });

    test('should add a new node to the graph', () => {
      hook.onDidCreateNode = jest.fn((parent, { createNode }) => createNode({ id: 'derivedNode' }, { parent }));

      graph.createNode({ id: 'node1', type: 'x' });

      expect(graph.nodes).toHaveLength(2);
    });
  });
});
