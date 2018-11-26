jest.mock('../helpers/content.translator');
import { mockPassthroughImplementation } from '@stoplight/test-utils';
import { translateHeaderObject, translateMediaTypeObject } from '../helpers/content.translator';
import { translateToOas3Responses } from '../helpers/responses.translator';

describe('translateToOas3Responses', () => {
  beforeEach(() => {
    mockPassthroughImplementation(translateHeaderObject, translateMediaTypeObject);
  });

  test('given empty dictionary should return empty array', () => {
    expect(translateToOas3Responses({})).toMatchSnapshot();
  });

  test('given a response in dictionary should translate', () => {
    expect(
      translateToOas3Responses({
        default: {
          content: {
            'fake-content-type': {},
          },
          description: 'descr',
          headers: {
            'fake-header-name-1': {},
            'fake-header-name-2': {},
          },
        },
        200: {
          content: {
            'fake-content-type-200': {},
          },
          description: 'descr 200',
          headers: {
            'fake-header-name-200': {},
          },
        },
      })
    ).toMatchSnapshot();
  });
});
