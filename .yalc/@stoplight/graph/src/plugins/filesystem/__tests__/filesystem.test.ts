import { readFile } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

import { Graph } from '../../../graph';
import { createFilesystemPlugin } from '../index';
import { FilesystemTypes, IDirectory, IDirectoryInput, IFile, IFileInput } from '../types';

const promisified = promisify(readFile);
const mockedFn = jest.fn(promisified);
readFile[promisify.custom] = mockedFn;

describe('filesystem', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
    graph.addPlugin(createFilesystemPlugin());
  });

  test('should support adding a file node', async () => {
    const path = resolve(__dirname, 'fixtures', 'nested', 'test.txt');
    await graph.createNode<IFileInput, IFile>({
      id: path,
      type: FilesystemTypes.FILE,
      path,
    });
    expect(graph.nodes).toHaveLength(1);
    expect(graph.nodes[0].type).toBe(FilesystemTypes.FILE);
  });

  describe('onWillCreateNode', () => {
    test('should set file name, fileName, dirname, and contentType', async () => {
      const path = resolve(__dirname, 'fixtures', 'nested', 'users.json');
      await graph.createNode<IFileInput, IFile>({
        id: path,
        type: FilesystemTypes.FILE,
        path,
      });

      const node = graph.getNode<IFile>(path);
      expect(node).toBeDefined();

      expect(node).toHaveProperty('name', 'users');
      expect(node).toHaveProperty('fileName', 'users.json');
      expect(node).toHaveProperty('dirname', resolve(__dirname, 'fixtures', 'nested'));
      expect(node).toHaveProperty('contentType', 'json');
    });

    test('should set file name and dirname', async () => {
      const path = resolve(__dirname, 'fixtures', 'simple', 'directory');
      await graph.createNode<IDirectoryInput, IDirectory>({
        id: path,
        type: FilesystemTypes.DIRECTORY,
        path,
      });

      const node = graph.getNode<IDirectory>(path);

      expect(node).toHaveProperty('name', 'directory');
      expect(node).toHaveProperty('dirname', resolve(__dirname, 'fixtures', 'simple'));
    });
  });

  describe('onDidCreateNode', () => {
    test('should listen for new directories, and add file nodes', async () => {
      const path = resolve(__dirname, 'fixtures', 'simple');
      await graph.createNode<IDirectoryInput, IDirectory>({
        id: path,
        type: FilesystemTypes.DIRECTORY,
        path,
      });
      expect(graph.nodes.filter(n => n.type === FilesystemTypes.DIRECTORY)).toHaveLength(2);
      expect(graph.nodes.filter(n => n.type === FilesystemTypes.FILE)).toHaveLength(2);
    });

    test('should listen for new directories to build up the recursive tree', async () => {
      const path = resolve(__dirname, 'fixtures', 'nested');
      await graph.createNode<IDirectoryInput, IDirectory>({
        id: path,
        type: FilesystemTypes.DIRECTORY,
        path,
      });
      expect(graph.nodes.filter(n => n.type === FilesystemTypes.DIRECTORY)).toHaveLength(3);
      expect(graph.nodes.filter(n => n.type === FilesystemTypes.FILE)).toHaveLength(4);
    });

    test.skip('should create directory<->file parent<->child relationship', async () => {
      // TODO
    });
  });

  describe('loadNodeContent', () => {
    test('should return the file contents', async () => {
      let content;

      graph.addPlugin({
        hooks: [
          {
            name: 'parse',
            onDidCreateNode: async node => {
              content = await node.loadContent();
            },
          },
        ],
      });

      const path = resolve(__dirname, 'fixtures', 'nested', 'test.txt');
      await graph.createNode<IFileInput, IFile>({
        id: path,
        type: FilesystemTypes.FILE,
        path,
      });

      expect(content).toEqual('TestValue');
    });

    test.skip('should cache the contents and not read from disk twice', async () => {
      // I am creating a new graph to avoid to have an already-filled cache

      graph = new Graph();
      graph.addPlugin(createFilesystemPlugin());

      graph.addPlugin({
        hooks: [
          {
            name: 'parse',
            onDidCreateNode: node => node.loadContent(),
          },
        ],
      });

      const path = resolve(__dirname, 'fixtures', 'nested', 'test.txt');

      await graph.createNode<IFileInput, IFile>({
        id: 'p1',
        type: FilesystemTypes.FILE,
        path,
      });

      await graph.createNode<IFileInput, IFile>({
        id: 'p2',
        type: FilesystemTypes.FILE,
        path,
      });

      expect(mockedFn).toBeCalledTimes(1);

      afterAll(() => {
        mockedFn.mockRestore();
      });
    });
  });
});
