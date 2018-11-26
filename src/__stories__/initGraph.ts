import { Graph } from '@stoplight/graph';
import { createFilesystemPlugin } from '@stoplight/graph/plugins/filesystem';
import { FilesystemTypes, IDirectory, IDirectoryInput } from '@stoplight/graph/plugins/filesystem/types';
import { createJsonPlugin } from '@stoplight/graph/plugins/json';
import { createOas2Plugin } from '@stoplight/graph/plugins/oas/oas2';

const petstore = require('./examples/oas2/petstore.json');

import * as fs from 'fs';
// @ts-ignore
Buffer._useTypedArrays = true; // needed to avoid Uncaught TypeError: uint8BackedBuffer.toArrayBuffer is not a function

const initFS = async () => {
  const str = JSON.stringify(petstore, null, 2);
  await new Promise((resolve, reject) =>
    fs.mkdir('/pets', err => (err && err.code !== 'EEXIST' ? reject(err) : resolve()))
  );
  await new Promise((resolve, reject) =>
    fs.writeFile('/pets/petstore.json', str, err => (err ? reject(err) : resolve()))
  );
  // @ts-ignore
  global.fs = fs;
};

const initGraph = async () => {
  await initFS();
  const graph = new Graph();
  const hook = {
    name: 'loggy',
    onDidCreateNode: async (node: any) => {
      console.log('created node', node.id);
    },
  };
  graph.addPlugin({
    hooks: [hook],
  });
  graph.addPlugin(createFilesystemPlugin());
  graph.addPlugin(createJsonPlugin());
  graph.addPlugin(createOas2Plugin());
  await graph.createNode<IDirectoryInput, IDirectory>({
    id: '/pets',
    type: FilesystemTypes.DIRECTORY,
    path: '/pets',
  });
  return graph;
};

let _graph: Promise<Graph> | null = null;

export const getNodes = async () => {
  if (_graph === null) {
    _graph = initGraph();
  }
  return (await _graph).nodes;
};
