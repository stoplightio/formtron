jest.mock('../../common/accessors');
jest.mock('../../common/tag.translator');
jest.mock('../helpers/accessors');
jest.mock('../helpers/request.translator');
jest.mock('../helpers/responses.translator');
jest.mock('../helpers/securities.translator');
jest.mock('../helpers/servers.translator');

import { mockPassthroughImplementation } from '@stoplight/test-utils';
import { getOasParameters } from '../../common/accessors';
import { translateToTags } from '../../common/tag.translator';
import { getOas3Securities } from '../helpers/accessors';
import { translateOperation } from '../helpers/operation.translator';
import { translateOas3ToRequest } from '../helpers/request.translator';
import { translateToOas3Responses } from '../helpers/responses.translator';
import { translateOas3ToSecurities } from '../helpers/securities.translator';
import { translateToServers } from '../helpers/servers.translator';

describe('translateOperation', () => {
  beforeEach(() => {
    mockPassthroughImplementation(
      translateToServers,
      translateOas3ToSecurities,
      translateToOas3Responses,
      translateOas3ToRequest,
      translateToTags,
      getOas3Securities,
      getOasParameters
    );
  });

  test('given no tags should translate operation with empty tags array', () => {
    expect(
      translateOperation({
        method: 'method',
        path: 'path',
        operation: {
          operationId: 'opid',
          responses: {},
          deprecated: true,
          description: 'descr',
          summary: 'summary',
        },
        spec: {
          info: {
            title: 'title',
            version: '2',
          },
          openapi: '2',
          paths: [],
        },
        pathObject: {},
      })
    ).toMatchSnapshot();
  });

  test('given some tags should translate operation with those tags', () => {
    expect(
      translateOperation({
        method: 'method',
        path: 'path',
        operation: {
          operationId: 'opid',
          responses: {},
          deprecated: true,
          description: 'descr',
          summary: 'summary',
          tags: ['tag'],
        },
        spec: {
          info: {
            title: 'title',
            version: '2',
          },
          openapi: '2',
          paths: [],
        },
        pathObject: {},
      })
    ).toMatchSnapshot();
  });

  test('given operation servers should translate operation with those servers', () => {
    expect(
      translateOperation({
        method: 'method',
        path: 'path',
        operation: {
          operationId: 'opid',
          responses: {},
          deprecated: true,
          description: 'descr',
          summary: 'summary',
          servers: [{ url: 'operation/server' }],
        },
        spec: {
          info: {
            title: 'title',
            version: '2',
          },
          openapi: '2',
          paths: [],
        },
        pathObject: {},
      })
    ).toMatchSnapshot();
  });

  test('given path servers should translate operation with those servers', () => {
    expect(
      translateOperation({
        method: 'method',
        path: 'path',
        operation: {
          operationId: 'opid',
          responses: {},
          deprecated: true,
          description: 'descr',
          summary: 'summary',
        },
        spec: {
          info: {
            title: 'title',
            version: '2',
          },
          openapi: '2',
          paths: [],
        },
        pathObject: {
          servers: [{ url: 'path/server' }],
        },
      })
    ).toMatchSnapshot();
  });

  test('given spec servers should translate operation with those servers', () => {
    expect(
      translateOperation({
        method: 'method',
        path: 'path',
        operation: {
          operationId: 'opid',
          responses: {},
          deprecated: true,
          description: 'descr',
          summary: 'summary',
        },
        spec: {
          info: {
            title: 'title',
            version: '2',
          },
          openapi: '2',
          paths: [],
          servers: [{ url: 'spec/server' }],
        },
        pathObject: {},
      })
    ).toMatchSnapshot();
  });
});
