import { Graph } from '../../../graph';
import { createYamlPlugin } from '../index';

describe('yaml plugin', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
    graph.addPlugin(createYamlPlugin());
  });

  describe('onDidCreateNode', () => {
    test('should listen for new nodes with contentType yaml, and add a parsed child', async () => {
      await graph.createNode({
        id: '123',
        type: 'stringified-yaml',
        contentType: 'yaml',
        content: `foo: bar`,
      });

      expect(graph.nodes[1].content).toEqual({
        data: { foo: 'bar' },
        pointers: {
          '': { end: { line: 1 }, start: { line: 1 } },
          '/foo': { end: { line: 1 }, start: { line: 1 } },
        },
        validations: [],
      });
    });

    test('should not add a parsed child for nodes that are not yaml', async () => {
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
