import { IHttpHeaderParam } from '@stoplight/types';
import { translateToHeaderParams } from '../helpers/params.translator';
import { translateToResponses } from '../helpers/responses.translator';
jest.mock('../helpers/params.translator');

describe('responses.translator', () => {
  const fakeHeaderParams: IHttpHeaderParam[] = [{ name: 'fake-header', content: {} }];
  const produces = ['*'];

  beforeEach(() => {
    (translateToHeaderParams as jest.Mock).mockReturnValue(fakeHeaderParams);
  });
  test('should translate to multiple responses', () => {
    const responses = translateToResponses(
      {
        r1: {
          description: 'd1',
          examples: {
            e1: {},
          },
          headers: {},
          schema: {},
        },
        r2: {
          description: 'd2',
          examples: {
            e2: {},
          },
          headers: {},
          schema: {},
        },
      },
      produces
    );

    expect(responses).toMatchSnapshot();
  });

  test('should translate to response w/o headers', () => {
    expect(
      translateToResponses(
        {
          r1: {
            description: 'd1',
            examples: {
              e1: {},
            },
            schema: {},
          },
        },
        produces
      )
    ).toMatchSnapshot();
  });

  test('should translate to response w/o examples', () => {
    expect(
      translateToResponses(
        {
          r1: {
            description: 'd1',
            schema: {},
          },
        },
        produces
      )
    ).toMatchSnapshot();
  });
});
