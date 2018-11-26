import { Graph } from '../../../graph';
import { createJsonPlugin } from '../index';

describe('json plugin', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
    graph.addPlugin(createJsonPlugin());
  });

  describe('onDidCreateNode', () => {
    test('should listen for new nodes with contentType json, and add a parsed child', async () => {
      await graph.createNode({
        id: '123',
        type: 'stringified-json',
        contentType: 'json',
        content: JSON.stringify({ foo: 'bar' }),
      });

      expect(graph.nodes[1].content).toMatchSnapshot();
    });

    test('should not add a parsed child for nodes that are not json', async () => {
      await graph.createNode({
        id: '123',
        type: 'text',
        contentType: 'text',
        content: 'foo',
      });

      expect(graph.nodes).toHaveLength(1);
    });
  });
});
