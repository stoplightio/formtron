import { Graph } from '../../../../graph';
import { NodeTypes } from '../../../../types';
import { Oas2RootNodeTypes } from '../../types';
import { createOas2Plugin } from '../index';

describe('oas2 plugin', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
    graph.addPlugin(createOas2Plugin());
  });

  test('should not mark a node as OAS2 when the `swagger` field is not present', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: { a: 1, b: 2 },
    });

    const node = graph.getNode('123');
    expect(node).toBeDefined();

    if (node) {
      expect(node.contentType).not.toBe(Oas2RootNodeTypes.OAS2);
    }
  });

  test('should mark a node as OAS2 when `swagger` field is present', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: { swagger: '2.0' },
        pointers: {},
        validations: [],
      },
    });

    const node = graph.getNode('123');
    expect(node).toBeDefined();
    expect(node).toHaveProperty('contentType', Oas2RootNodeTypes.OAS2);
  });

  test('should create a shared empty node', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: { swagger: '2.0' },
        pointers: {},
        validations: [],
      },
    });

    expect(graph.getNode('shared')).toBeDefined();
  });

  test('security schemes', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: {
          swagger: '2.0',
          securityDefinitions: {
            api_key: {
              type: 'apiKey',
              name: 'api_key',
              in: 'header',
            },
            petstore_auth: {
              type: 'oauth2',
              authorizationUrl: 'http://swagger.io/api/oauth/dialog',
              flow: 'implicit',
              scopes: {
                'write:pets': 'modify pets in your account',
                'read:pets': 'read your pets',
              },
            },
          },
        },
        pointers: {},
        validations: [],
      },
    });

    expect(graph.getNode('securityDefinitions')).toBeDefined();

    const apiKeyNode = graph.getNode('api_key');
    const oAuthNode = graph.getNode('petstore_auth');

    expect(apiKeyNode).toBeDefined();
    expect(apiKeyNode!.content).toHaveProperty('type', 'apiKey');

    expect(oAuthNode).toBeDefined();
    expect(oAuthNode!.content).toHaveProperty('type', 'oauth2');
  });

  test('paths', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: {
          swagger: '2.0',
          paths: {
            '/pets': {
              get: {
                summary: 'List all pets',
                operationId: 'listPets',
                tags: ['pets'],
              },
            },
            '/pets/{petId}': {
              get: {
                summary: 'Info for a specific pet',
                operationId: 'showPetById',
                tags: ['pets'],
              },
            },
          },
        },
        pointers: {},
        validations: [],
      },
    });

    expect(graph.getNode('paths')).toBeDefined();

    const paths = graph.getNode('/pets');
    const pathsById = graph.getNode('/pets/{petId}');

    expect(paths).toBeDefined();
    expect(paths!.content).toHaveProperty('get');

    expect(pathsById).toBeDefined();
    expect(pathsById!.content).toHaveProperty('get');
  });

  test('tags', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: {
          swagger: '2.0',
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

  test('shared parameters', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: {
          swagger: '2.0',
          parameters: [
            {
              name: 'tags',
              in: 'query',
              description: 'tags to filter by',
              required: false,
              type: 'array',
              collectionFormat: 'csv',
              items: {
                type: 'string',
              },
            },
            {
              name: 'limit',
              in: 'header',
              description: 'maximum number of results to return',
              required: false,
              type: 'integer',
              format: 'int32',
            },
          ],
        },
        pointers: {},
        validations: [],
      },
    });

    const tagsParameter = graph.getNode('123_tags');
    const limitParameter = graph.getNode('123_limit');

    expect(tagsParameter).toBeDefined();
    expect(tagsParameter).toHaveProperty('type', 'oas2_query');
    expect(tagsParameter!.content).toHaveProperty('name');

    expect(limitParameter).toBeDefined();
    expect(limitParameter).toHaveProperty('type', 'oas2_header');
    expect(limitParameter!.content).toHaveProperty('name');
  });

  test('shared responses', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: {
          swagger: '2.0',
          responses: {
            '200': {
              description: 'pet response',
              schema: {
                type: 'array',
                items: {
                  $ref: '#/definitions/Pet',
                },
              },
            },
            default: {
              description: 'unexpected error',
              schema: {
                $ref: '#/definitions/Error',
              },
            },
          },
        },
        pointers: {},
        validations: [],
      },
    });

    const okResponse = graph.getNode('responses_200');
    const defaultResponse = graph.getNode('responses_default');

    expect(okResponse).toBeDefined();
    expect(okResponse!.content).toHaveProperty('description');

    expect(defaultResponse).toBeDefined();

    expect(defaultResponse!.content).toHaveProperty('description');
  });

  test('shared definitions', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: {
          swagger: '2.0',
          definitions: {
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
        },
        pointers: {},
        validations: [],
      },
    });

    const tagDefinition = graph.getNode('definitions_Tag');
    const categoryDefinition = graph.getNode('definitions_Category');

    expect(tagDefinition).toBeDefined();
    expect(tagDefinition!.content).toHaveProperty('type');

    expect(categoryDefinition).toBeDefined();
    expect(categoryDefinition!.content).toHaveProperty('type');
  });

  describe('operations', () => {
    test('edges with tags and security definitions', async () => {
      await graph.createNode({
        id: '123',
        type: NodeTypes.PARSED,
        content: {
          data: {
            swagger: '2.0',
            securityDefinitions: {
              apiKey1: {
                type: 'apiKey',
                name: 'api_key',
                in: 'header',
              },
              apiKey2: {
                type: 'apiKey',
                name: 'api_key2',
                in: 'query',
              },
              oAuth: {
                type: 'oauth2',
                authorizationUrl: 'http://swagger.io/api/oauth/dialog',
                flow: 'implicit',
                scopes: {
                  'write:pets': 'modify pets in your account',
                  'read:pets': 'read your pets',
                },
              },
            },
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
            paths: {
              '/test': {
                get: {
                  tags: ['User'],
                  security: [{ oAuth: ['scope1', 'scope2'] }, { apiKey1: [], apiKey2: [] }],
                },
              },
            },
          },
          pointers: {},
          validations: [],
        },
      });

      expect(graph.edges).toHaveLength(4);
    });

    test('operation parameters', async () => {
      await graph.createNode({
        id: '123',
        type: NodeTypes.PARSED,
        content: {
          data: {
            swagger: '2.0',
            securityDefinitions: {
              apiKey1: {
                type: 'apiKey',
                name: 'api_key',
                in: 'header',
              },
              apiKey2: {
                type: 'apiKey',
                name: 'api_key2',
                in: 'query',
              },
              oAuth: {
                type: 'oauth2',
                authorizationUrl: 'http://swagger.io/api/oauth/dialog',
                flow: 'implicit',
                scopes: {
                  'write:pets': 'modify pets in your account',
                  'read:pets': 'read your pets',
                },
              },
            },
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
            paths: {
              '/test': {
                get: {
                  tags: ['User'],
                  security: [{ oAuth: ['scope1', 'scope2'] }, { apiKey1: [], apiKey2: [] }],
                  parameters: [
                    {
                      name: 'tagsParam',
                      in: 'header',
                      description: 'tags to filter by',
                      required: false,
                      type: 'array',
                      collectionFormat: 'csv',
                      items: {
                        type: 'string',
                      },
                    },
                    {
                      name: 'limitParam',
                      in: 'query',
                      description: 'maximum number of results to return',
                      required: false,
                      type: 'integer',
                      format: 'int32',
                    },
                    {
                      name: 'nameParam',
                      in: 'path',
                      description: 'maximum number of results to return',
                      required: false,
                      type: 'integer',
                      format: 'int32',
                    },
                    {
                      name: 'userDetails',
                      in: 'body',
                      description: 'maximum number of results to return',
                      required: false,
                      type: 'integer',
                      format: 'int32',
                    },
                  ],
                },
              },
            },
          },
          pointers: {},
          validations: [],
        },
      });

      const tagsParam = graph.getNode('/test_get_tagsParam');
      const limitParam = graph.getNode('/test_get_limitParam');
      const nameParam = graph.getNode('/test_get_nameParam');
      const userDetails = graph.getNode('/test_get_userDetails');

      expect(tagsParam).toBeDefined();
      expect(limitParam).toBeDefined();
      expect(nameParam).toBeDefined();
      expect(userDetails).toBeDefined();

      expect(tagsParam).toHaveProperty('type', 'oas2_header');
      expect(limitParam).toHaveProperty('type', 'oas2_query');
      expect(nameParam).toHaveProperty('type', 'oas2_path');
      expect(userDetails).toHaveProperty('type', 'oas2_body');
    });
  });

  test('complete document snapshot', async () => {
    await graph.createNode({
      id: '123',
      type: NodeTypes.PARSED,
      content: {
        data: require('../fixtures/petstore.json'),
        pointers: {},
        validations: [],
      },
    });

    expect(graph.nodes).toMatchSnapshot('nodes');
    expect(graph.edges).toMatchSnapshot('nodes');
  });
});
