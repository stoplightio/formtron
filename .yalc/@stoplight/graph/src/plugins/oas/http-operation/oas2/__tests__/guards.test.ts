import {
  isBodyParameter,
  isFormDataParameter,
  isHeaderParameter,
  isPathParameter,
  isQueryParameter,
} from '../helpers/guards';

describe('guards', () => {
  const param: any = {
    type: 't',
    name: 'n',
  };
  test('isBodyParameter', () => {
    param.in = 'body';
    expect(isBodyParameter(param)).toEqual(true);
  });

  test('not isBodyParameter', () => {
    param.in = 'asldkj';
    expect(isBodyParameter(param)).toEqual(false);
  });

  test('isFormDataParameter', () => {
    param.in = 'formData';
    expect(isFormDataParameter(param)).toEqual(true);
  });

  test('not isFormDataParameter', () => {
    param.in = 'asldkj';
    expect(isFormDataParameter(param)).toEqual(false);
  });

  test('isQueryParameter', () => {
    param.in = 'query';
    expect(isQueryParameter(param)).toEqual(true);
  });

  test('not isQueryParameter', () => {
    param.in = 'asldkj';
    expect(isQueryParameter(param)).toEqual(false);
  });

  test('isPathParameter', () => {
    param.in = 'path';
    expect(isPathParameter(param)).toEqual(true);
  });

  test('not isPathParameter', () => {
    param.in = 'asldkj';
    expect(isPathParameter(param)).toEqual(false);
  });

  test('isHeaderParameter', () => {
    param.in = 'header';
    expect(isHeaderParameter(param)).toEqual(true);
  });

  test('not isHeaderParameter', () => {
    param.in = 'asldkj';
    expect(isHeaderParameter(param)).toEqual(false);
  });
});
