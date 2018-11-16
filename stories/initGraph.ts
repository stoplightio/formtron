import { Graph } from '@stoplight/graph/dist/index.d';
import { createFilesystemPlugin } from '@stoplight/graph/dist/plugins/filesystem';
import { FilesystemTypes, IDirectory, IDirectoryInput } from '@stoplight/graph/dist/plugins/filesystem/types';
import { createJsonPlugin } from '@stoplight/graph/dist/plugins/json';
import { createOas2Plugin } from '@stoplight/graph/dist/plugins/oas/oas2';
// @ts-ignore
import memoize from '@stoplight/memoize-one';

const petstore = require('./examples/oas2/petstore.json');

import * as fs from 'fs';
// @ts-ignore
Buffer._useTypedArrays = true; // needed to avoid error
console.log('fs', fs);

export const graph = new Graph();

const initFS = memoize(
  () =>
    new Promise((resolve, reject) => {
      const str = JSON.stringify(petstore, null, 2);
      fs.mkdir('/pets', err => {
        if (err && err.code !== 'EEXIST') return reject(err);
        fs.writeFile('/pets/petstore.json', str, err => {
          if (err) reject(err);
          console.log('fs', fs);
          // @ts-ignore
          global.fs = fs;
          resolve();
        });
      });
    })
);

const initGraph = memoize(async () => {
  const hook = {
    name: 'loggy',
    selector: () => true,
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
  // graph.createNode({
  //   id: 'root',
  //   type: NodeTypes.PARSED,
  //   content: {
  //     data: petstore,
  //     pointers: {},
  //     validations: [],
  //   },
  // });
});

export const getNodes = async () => {
  await initFS();
  await initGraph();
  return graph.nodes;
};
