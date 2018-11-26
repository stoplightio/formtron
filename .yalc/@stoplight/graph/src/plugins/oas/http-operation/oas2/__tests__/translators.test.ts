jest.mock('../helpers/responses.translator');
jest.mock('../helpers/request.translator');
jest.mock('../helpers/securities.translator');
import { translateToRequest } from '../helpers/request.translator';
import { translateToResponses } from '../helpers/responses.translator';
import { translateToSecurities } from '../helpers/securities.translator';
import { translateOperation, translateToServers } from '../helpers/translators';

describe('translators', () => {
  describe('translateToServers', () => {
    test('given operation schemes should return servers', () => {
      expect(
        translateToServers({ schemes: ['http', 'https'] }, { host: 'stoplight.io', basePath: '/base-path' })
      ).toMatchSnapshot();
    });

    test('given spec schemes should return servers', () => {
      expect(
        translateToServers({}, { schemes: ['http', 'https'], host: 'stoplight.io', basePath: '/base-path' })
      ).toMatchSnapshot();
    });

    test('given operation and spec schemes should take operation schemes', () => {
      expect(
        translateToServers({ schemes: ['http'] }, { schemes: ['https'], host: 'stoplight.io', basePath: '/base-path' })
      ).toMatchSnapshot();
    });

    test('given no scheme should return empty array', () => {
      expect(translateToServers({}, { host: 'stoplight.io', basePath: '/base-path' })).toMatchSnapshot();
    });
  });

  describe('translateOperation', () => {
    beforeEach(() => {
      (translateToResponses as jest.Mock).mockReturnValueOnce({});
      (translateToRequest as jest.Mock).mockReturnValueOnce({});
      (translateToSecurities as jest.Mock).mockReturnValueOnce({});
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('should translate operation', () => {
      expect(
        translateOperation({
          operation: {
            operationId: 'oid',
            description: 'odesc',
            deprecated: true,
            summary: 'osum',
            responses: {
              response: {
                description: 'desc',
                examples: {
                  example: {},
                },
                headers: {
                  header: {
                    type: 't',
                  },
                },
                schema: {},
              },
            },
          },
          method: 'get',
          path: '/',
          pathObject: {},
          spec: {
            info: {
              title: 'title',
              version: '1.0',
            },
            swagger: '2.0',
            paths: {
              '/': {},
            },
          },
        })
      ).toMatchSnapshot();
    });
  });
});
