import { HttpParamStyles } from '@stoplight/types';
import { QueryParameter } from 'swagger-schema-official';
import { translateToContent } from '../helpers/content.translator';
import {
  translateToBodyParameter,
  translateToFormDataParameter,
  translateToHeaderParam,
  translateToHeaderParams,
  translateToPathParameter,
  translateToQueryParameter,
} from '../helpers/params.translator';
jest.mock('../helpers/content.translator');

describe('params.translator', () => {
  const fakeTranslatedContent = 'some fake content';
  const consumes = ['*'];

  beforeEach(() => {
    (translateToContent as jest.Mock).mockReturnValue(fakeTranslatedContent);
  });

  describe('translateToHeaderParam', () => {
    test('should translate header param', () => {
      expect(
        translateToHeaderParam(
          {
            required: true,
            name: 'name',
            type: 'type',
            in: 'body',
            minimum: 12,
            description: 'desc',
          },
          consumes
        )
      ).toMatchSnapshot();
    });
  });

  describe('translateToHeaderParams', () => {
    test('should translate empty dictionary to empty array', () => {
      expect(translateToHeaderParams({}, consumes)).toMatchSnapshot();
    });

    test('should translate to simple header param', () => {
      expect(
        translateToHeaderParams(
          {
            'header-name': {
              description: 'a description',
              type: 'a type',
            },
          },
          consumes
        )
      ).toMatchSnapshot();
    });

    test('should translate to multiple header params', () => {
      expect(
        translateToHeaderParams(
          {
            'header-name': {
              description: 'a description',
              type: 'a type',
            },
            'plain-tex': {
              description: 'another description',
              type: 'another type',
            },
          },
          consumes
        )
      ).toMatchSnapshot();
    });
  });

  describe('translateToBodyParameter', () => {
    test('should translate to body parameter', () => {
      expect(
        translateToBodyParameter(
          {
            in: 'body',
            name: 'name',
            required: true,
            description: 'descr',
            schema: {
              format: 'e-mail',
            },
          },
          consumes
        )
      ).toMatchSnapshot();
    });
  });

  describe('translateToFormDataParameter', () => {
    test('given request body with empty encodings should create encoding', () => {
      expect(
        translateToFormDataParameter(
          {
            name: 'name',
            type: 'formData',
            description: 'desc',
            required: true,
            in: 'body',
          },
          {
            contents: [
              {
                mediaType: 'application/json',
              },
            ],
          },
          consumes
        )
      ).toMatchSnapshot();
    });

    test('given request body with existing encoding should append', () => {
      expect(
        translateToFormDataParameter(
          {
            name: 'name',
            type: 'formData',
            description: 'desc',
            required: true,
            in: 'body',
          },
          {
            contents: [
              {
                mediaType: 'application/json',
                encodings: [{ property: 'prop', style: HttpParamStyles.SpaceDelimited }],
              },
            ],
          },
          consumes
        )
      ).toMatchSnapshot();
    });

    test('given no request body should create one', () => {
      expect(
        translateToFormDataParameter(
          {
            name: 'name',
            type: 'formData',
            description: 'desc',
            required: true,
            in: 'body',
          },
          null,
          consumes
        )
      ).toMatchSnapshot();
    });
  });

  describe('translateToQueryParameter', () => {
    const parameter: QueryParameter = {
      required: true,
      description: 'descr',
      name: 'name',
      in: 'query',
      type: 'array',
      allowEmptyValue: true,
    };

    test.each(['pipes', 'ssv', 'csv', 'multi', 'something-else'])('translate style: %s', style => {
      expect(
        translateToQueryParameter({ ...parameter, collectionFormat: style } as QueryParameter, consumes)
      ).toMatchSnapshot();
    });
  });

  describe('translateToPathParameter', () => {
    test('should translate', () => {
      expect(
        translateToPathParameter(
          {
            required: true,
            description: 'descr',
            name: 'name',
            in: 'path',
            type: 'string',
          },
          consumes
        )
      ).toMatchSnapshot();
    });
  });
});
