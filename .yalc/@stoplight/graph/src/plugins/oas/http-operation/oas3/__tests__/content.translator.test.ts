import { translateHeaderObject, translateMediaTypeObject } from '../helpers/content.translator';

describe('translateMediaTypeObject', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('given single example should translate to IHttpContent', () => {
    expect(
      translateMediaTypeObject(
        {
          schema: {},
          example: { summary: 'single example' },
          encoding: {},
        },
        'mediaType'
      )
    ).toMatchSnapshot();
  });

  test('given multiple examples should translate to IHttpContent', () => {
    expect(
      translateMediaTypeObject(
        {
          schema: {},
          examples: [{ summary: 'multi example' }],
          encoding: {},
        },
        'mediaType'
      )
    ).toMatchSnapshot();
  });

  test('given encodings should translate each encoding to array item', () => {
    expect(
      translateMediaTypeObject(
        {
          schema: {},
          examples: [{ summary: 'multi example' }],
          encoding: {
            enc1: {
              contentType: 'text/plain',
              headers: {
                h1: {},
              },
              style: 'form',
              explode: true,
              allowReserved: true,
            },
            enc2: {
              contentType: 'text/plain',
              headers: {
                h1: {},
              },
              style: 'form',
              explode: true,
              allowReserved: true,
            },
          },
        },
        'mediaType'
      )
    ).toMatchSnapshot();
  });

  test('given complex nested media type object should translate correctly', () => {
    expect(
      translateMediaTypeObject(
        {
          schema: {},
          examples: [{ summary: 'multi example' }],
          encoding: {
            enc1: {
              contentType: 'text/plain',
              style: 'form',
              headers: {
                h1: {
                  description: 'descr',
                  style: 'matrix',
                  examples: {
                    a: {
                      summary: 'example summary',
                    },
                  },
                  content: {
                    mediaType: 'nested/media',
                  },
                },
              },
            },
          },
        },
        'mediaType'
      )
    ).toMatchSnapshot();
  });

  test('given encoding with incorrect style should throw an error', () => {
    const testedFunction = () => {
      translateMediaTypeObject(
        {
          schema: {},
          examples: [{ summary: 'multi example' }],
          encoding: {
            enc1: {
              contentType: 'text/plain',
              style: 'xyz',
            },
          },
        },
        'mediaType'
      );
    };
    expect(testedFunction).toThrowErrorMatchingSnapshot();
  });
});

describe('translateHeaderObject', () => {
  test('should translate to IHttpHeaderParam', () => {
    expect(
      translateHeaderObject(
        {
          description: 'descr',
          required: true,
          deprecated: true,
          allowEmptyValue: true,
          style: 'matrix',
          explode: true,
          allowReserved: true,
          schema: {},
          examples: {
            a: {
              summary: 'example summary',
            },
          },
          example: {},
          content: {},
        },
        'header-name'
      )
    ).toMatchSnapshot();
  });
});
