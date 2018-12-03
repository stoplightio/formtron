import { Graph } from '@stoplight/graph/dist/index.d';
import { createFilesystemPlugin } from '@stoplight/graph/dist/plugins/filesystem';
import { FilesystemTypes, IDirectory, IDirectoryInput } from '@stoplight/graph/dist/plugins/filesystem/types';
import { createJsonPlugin } from '@stoplight/graph/dist/plugins/json';
import { createOas2Plugin } from '@stoplight/graph/dist/plugins/oas/oas2';

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
  const graph = (await _graph).graph;
  // @ts-ignore
  global.graph = graph;
  const roots = graph.filterNodes((x: any) => !graph.parent(x)).nodes();
  const all: string[] = [];
  const depths: number[] = [];
  let depth = 0;
  const addChildren = (id: string) => {
    depth += 1;
    for (const node of graph.children(id)) {
      all.push(node);
      depths.push(depth);
      addChildren(node);
    }
    depth -= 1;
  };
  addChildren(roots);
  const nodes = all.map(id => graph.node(id.trim())).map((node, i) => ({ ...node, depth: depths[i] }));
  return nodes;
  // return (await _graph).nodes;
};
