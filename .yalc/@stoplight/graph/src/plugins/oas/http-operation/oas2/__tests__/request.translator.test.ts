jest.mock('../helpers/params.translator');
jest.mock('../helpers/guards');
import { Parameter } from 'swagger-schema-official';
import {
  isBodyParameter,
  isFormDataParameter,
  isHeaderParameter,
  isPathParameter,
  isQueryParameter,
} from '../helpers/guards';
import {
  translateToBodyParameter,
  translateToFormDataParameter,
  translateToHeaderParam,
  translateToPathParameter,
  translateToQueryParameter,
} from '../helpers/params.translator';
import { translateToRequest } from '../helpers/request.translator';

describe('request.translator', () => {
  const consumes = ['*'];
  const fakeParameter: Parameter = {
    name: 'name',
    type: 'type',
    in: 'in',
  };
  const fakeBodyParameter = { in: 'body' };
  const fakeFormParameter = { in: 'body', type: 'form' };
  const fakeQueryParameter = { in: 'query' };
  const fakeHeaderParameter = { in: 'header' };
  const fakePathParameter = { in: 'path' };

  beforeEach(() => {
    (translateToBodyParameter as jest.Mock).mockReturnValue(fakeBodyParameter);
    (translateToFormDataParameter as jest.Mock).mockReturnValue(fakeFormParameter);
    (translateToQueryParameter as jest.Mock).mockReturnValue(fakeQueryParameter);
    (translateToPathParameter as jest.Mock).mockReturnValue(fakePathParameter);
    (translateToHeaderParam as jest.Mock).mockReturnValue(fakeHeaderParameter);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('given empty params collection should return empty object', () => {
    expect(translateToRequest([], consumes)).toMatchSnapshot();
  });

  test('given single body param should translate to request with body', () => {
    (isBodyParameter as any).mockReturnValue(true);
    expect(translateToRequest([fakeParameter], consumes)).toMatchSnapshot();
  });

  test('given single form param should translate to request with form', () => {
    (isFormDataParameter as any).mockReturnValue(true);
    expect(translateToRequest([fakeParameter], consumes)).toMatchSnapshot();
  });

  test('given single path param should translate to request with path', () => {
    (isPathParameter as any).mockReturnValue(true);
    expect(translateToRequest([fakeParameter], consumes)).toMatchSnapshot();
  });

  test('given single query param should translate to request with query', () => {
    (isQueryParameter as any).mockReturnValue(true);
    expect(translateToRequest([fakeParameter], consumes)).toMatchSnapshot();
  });

  test('given single header param should translate to request with header', () => {
    (isHeaderParameter as any).mockReturnValue(true);
    expect(translateToRequest([fakeParameter], consumes)).toMatchSnapshot();
  });

  test('given single unknown param should translate to empty request', () => {
    expect(translateToRequest([fakeParameter], consumes)).toMatchSnapshot();
  });

  test('given two query params should translate', () => {
    (isQueryParameter as any).mockReturnValueOnce(true);
    (isQueryParameter as any).mockReturnValueOnce(true);
    expect(translateToRequest([fakeParameter, fakeParameter], consumes)).toMatchSnapshot();
  });

  test('given two header params should translate', () => {
    (isHeaderParameter as any).mockReturnValueOnce(true);
    (isHeaderParameter as any).mockReturnValueOnce(true);
    expect(translateToRequest([fakeParameter, fakeParameter], consumes)).toMatchSnapshot();
  });

  test('given two path params should translate', () => {
    (isPathParameter as any).mockReturnValueOnce(true);
    (isPathParameter as any).mockReturnValueOnce(true);
    expect(translateToRequest([fakeParameter, fakeParameter], consumes)).toMatchSnapshot();
  });

  test('should translate mixed request', () => {
    (isBodyParameter as any).mockReturnValueOnce(true);
    (isFormDataParameter as any).mockReturnValueOnce(true);
    (isQueryParameter as any).mockReturnValueOnce(true);
    (isHeaderParameter as any).mockReturnValueOnce(true);
    (isPathParameter as any).mockReturnValueOnce(true);
    expect(
      translateToRequest([fakeParameter, fakeParameter, fakeParameter, fakeParameter, fakeParameter], consumes)
    ).toMatchSnapshot();
  });
});
