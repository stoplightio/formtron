import { Graph } from '../../../../graph';
import { NodeTypes } from '../../../../types';
import { Oas3RootNodeTypes } from '../../types';
import { createOas3Plugin } from '../index';

describe('oas3 plugin', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
    graph.addPlugin(createOas3Plugin());
  });

  test('should not mark a node as OAS3 when the `openapi` field is not present', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: { a: 1, b: 2 },
    });

    const node = graph.getNode('123');
    expect(node).toBeDefined();

    expect(node!.contentType).not.toBe(Oas3RootNodeTypes.OAS3);
  });

  test('should mark a node as OAS3 when `openapi` field is present', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: { openapi: '3.1' },
        pointers: {},
        validations: [],
      },
    });

    const node = graph.getNode('123');
    expect(node).toBeDefined();
    expect(node).toHaveProperty('contentType', Oas3RootNodeTypes.OAS3);
  });

  test('should create a shared empty node', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: { openapi: '3.1' },
        pointers: {},
        validations: [],
      },
    });

    expect(graph.getNode('shared')).toBeDefined();
  });

  test('tags', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: {
          openapi: '3.0.1',
          tags: [
            {
              name: 'User',
              description: 'All user related operations',
            },
            {
              name: 'Provider',
              description: 'All provider related operations',
            },
          ],
        },
        pointers: {},
        validations: [],
      },
    });

    expect(graph.getNode('tags')).toBeDefined();

    const userTag = graph.getNode('User');
    const providerTag = graph.getNode('Provider');

    expect(userTag).toBeDefined();
    expect(userTag!.content).toHaveProperty('name');

    expect(providerTag).toBeDefined();

    expect(providerTag!.content).toHaveProperty('name');
  });

  test('servers', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: {
          openapi: '3.0.1',
          servers: [
            {
              url: 'https://development.gigantic-server.com/v1',
              description: 'Development server',
            },
            {
              url: 'https://staging.gigantic-server.com/v1',
              description: 'Staging server',
            },
            {
              url: 'https://api.gigantic-server.com/v1',
              description: 'Production server',
            },
          ],
        },
        pointers: {},
        validations: [],
      },
    });

    expect(graph.getNode('servers')).toBeDefined();

    const developmentServerNode = graph.getNode('https://development.gigantic-server.com/v1');
    const stagingServerNode = graph.getNode('https://staging.gigantic-server.com/v1');

    expect(developmentServerNode).toBeDefined();
    expect(developmentServerNode!.content).toHaveProperty('url');

    expect(stagingServerNode).toBeDefined();
    expect(stagingServerNode!.content).toHaveProperty('url');
  });

  test('shared nodes', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: {
          openapi: '3.0.1',
          components: {
            schemas: {
              GeneralError: {
                type: 'object',
                properties: {
                  code: {
                    type: 'integer',
                    format: 'int32',
                  },
                  message: {
                    type: 'string',
                  },
                },
              },
              Category: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    format: 'int64',
                  },
                  name: {
                    type: 'string',
                  },
                },
              },
              Tag: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    format: 'int64',
                  },
                  name: {
                    type: 'string',
                  },
                },
              },
            },
            parameters: {
              skipParam: {
                name: 'skip',
                in: 'query',
                description: 'number of items to skip',
                required: true,
                schema: {
                  type: 'integer',
                  format: 'int32',
                },
              },
              limitParam: {
                name: 'limit',
                in: 'query',
                description: 'max records to return',
                required: true,
                schema: {
                  type: 'integer',
                  format: 'int32',
                },
              },
            },
            responses: {
              NotFound: {
                description: 'Entity not found.',
              },
              IllegalInput: {
                description: 'Illegal input for operation.',
              },
              GeneralError: {
                description: 'General Error',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/GeneralError',
                    },
                  },
                },
              },
            },
            securitySchemes: {
              api_key: {
                type: 'apiKey',
                name: 'api_key',
                in: 'header',
              },
              petstore_auth: {
                type: 'oauth2',
                flows: {
                  implicit: {
                    authorizationUrl: 'http://example.org/api/oauth/dialog',
                    scopes: {
                      'write:pets': 'modify pets in your account',
                      'read:pets': 'read your pets',
                    },
                  },
                },
              },
            },
          },
        },
        pointers: {},
        validations: [],
      },
    });

    expect(graph.getNode('shared')).toBeDefined();
    ['securitySchemes_api_key', 'responses_NotFound', 'schemas_GeneralError'].forEach(nodeName => {
      expect(graph.getNode(nodeName)).toBeDefined();
    });

    const skipParameter = graph.getNode('123_skip');
    const limitParameter = graph.getNode('123_limit');

    expect(skipParameter).toBeDefined();
    expect(skipParameter).toHaveProperty('type', 'oas2_query');
    expect(skipParameter!.content).toHaveProperty('name');

    expect(limitParameter).toBeDefined();
    expect(limitParameter).toHaveProperty('type', 'oas2_query');
    expect(limitParameter!.content).toHaveProperty('name');
  });

  describe('paths', () => {
    beforeEach(async () => {
      graph = new Graph();
      graph.addPlugin(createOas3Plugin());
      await graph.createNode({
        id: '123',
        type: NodeTypes.PARSED,
        content: {
          data: {
            openapi: '3.0.1',
            paths: {
              '/pets': {
                get: {
                  description: 'Returns all pets from the system that the user has access to',
                  responses: {
                    '200': {
                      description: 'A list of pets.',
                      content: {
                        'application/json': {
                          schema: {
                            type: 'array',
                            items: {
                              $ref: '#/components/schemas/pet',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          pointers: {},
          validations: [],
        },
      });
    });

    test('root path', () => {
      expect(graph.getNode('paths')).toBeDefined();
    });

    test('path', () => {
      expect(graph.getNode('/pets')).toBeDefined();
    });

    test('operation', () => {
      expect(graph.getNode('/pets_get')).toBeDefined();
    });
  });
});
