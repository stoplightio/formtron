jest.mock('../helpers/content.translator');
import { mockPassthroughImplementation } from '@stoplight/test-utils';
import { translateMediaTypeObject } from '../helpers/content.translator';
import { translateOas3ToRequest } from '../helpers/request.translator';

describe('translateOas3ToRequest', () => {
  beforeEach(() => {
    mockPassthroughImplementation(translateMediaTypeObject);
  });

  test('given no request body should translate parameters', () => {
    expect(
      translateOas3ToRequest([
        {
          name: 'param-name-1',
          in: 'query',
          content: {
            'content-a': {
              schema: {},
            },
          },
        },
        {
          name: 'param-name-2',
          in: 'query',
          content: {
            'content-b': {
              schema: {},
            },
          },
        },
        {
          name: 'param-name-3',
          in: 'header',
          content: {
            'content-c': {
              schema: {},
            },
          },
        },
      ])
    ).toMatchSnapshot();
  });

  test('give a request body should translate it', () => {
    expect(
      translateOas3ToRequest([], {
        description: 'descr',
        required: true,
        content: {
          'content-a': {
            schema: {},
          },
        },
      })
    ).toMatchSnapshot();
  });
});
