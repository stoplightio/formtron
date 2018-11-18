import { Graph } from '@stoplight/graph/dist/index.d';
import { createFilesystemPlugin } from '@stoplight/graph/dist/plugins/filesystem';
import { FilesystemTypes, IDirectory, IDirectoryInput } from '@stoplight/graph/dist/plugins/filesystem/types';
import { createJsonPlugin } from '@stoplight/graph/dist/plugins/json';
import { createOas2Plugin } from '@stoplight/graph/dist/plugins/oas/oas2';

const petstore = require('./examples/oas2/petstore.json');

import * as fs from 'fs';
// @ts-ignore
Buffer._useTypedArrays = true; // needed to avoid Uncaught TypeError: uint8BackedBuffer.toArrayBuffer is not a function

const initFS = async () =>
  new Promise((resolve, reject) => {
    const str = JSON.stringify(petstore, null, 2);
    fs.mkdir('/pets', err => {
      if (err && err.code !== 'EEXIST') return reject(err);
      fs.writeFile('/pets/petstore.json', str, err => {
        if (err) reject(err);
        // @ts-ignore
        global.fs = fs;
        resolve();
      });
    });
  });

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
