import * as path from 'path';
import { Graph } from '../index';
import { createFilesystemPlugin, FilesystemTypes, IDirectory, IDirectoryInput } from '../plugins/filesystem';
import { createJsonPlugin } from '../plugins/json';
import { createOas2Plugin } from '../plugins/oas/oas2';
import { Oas2RootNodeTypes } from '../plugins/oas/types';

describe('graph', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
    graph.addPlugin(createFilesystemPlugin());
    graph.addPlugin(createJsonPlugin());
    graph.addPlugin(createOas2Plugin());
  });

  test('load a JSON file and get an OAS2 parsed node back', async () => {
    const dirPath = path.resolve('./src/plugins/oas/oas2/fixtures/');

    await graph.createNode<IDirectoryInput, IDirectory>({
      id: dirPath,
      type: FilesystemTypes.DIRECTORY,
      path: dirPath,
    });

    expect(graph.nodes.filter(n => n.contentType === Oas2RootNodeTypes.OAS2));
  });
});
