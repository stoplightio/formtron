import { getOasParameters } from '../accessors';

describe('getOasParameters', () => {
  test('should return empty array', () => {
    expect(getOasParameters(undefined, undefined)).toEqual([]);
  });

  test('should fallback to operation parameters', () => {
    expect(getOasParameters([{ name: 'n1', in: 'i1' }, { name: 'n2', in: 'i2' }], undefined)).toMatchSnapshot();
  });

  test('should fallback to path parameters', () => {
    expect(getOasParameters(undefined, [{ name: 'n1', in: 'i1' }, { name: 'n2', in: 'i2' }])).toMatchSnapshot();
  });

  test('should prefer operation parameters', () => {
    expect(
      getOasParameters(
        [{ name: 'n1', in: 'n1', type: 'array' }, { name: 'no2', in: 'io2' }],
        [{ name: 'n1', in: 'n1', type: 'string' }, { name: 'np3', in: 'ip3' }]
      )
    ).toMatchSnapshot();
  });
});
