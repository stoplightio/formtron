import { getConsumes, getProduces, getSecurities } from '../helpers/accessors';

describe('accessors', () => {
  describe('getSecurities', () => {
    test('should return empty array', () => {
      expect(getSecurities({}, {})).toMatchSnapshot();
    });

    test('should fallback to operation security', () => {
      expect(getSecurities({ security: [{ type: 'basic' }] }, {})).toMatchSnapshot();
    });

    test('should fallback to global security', () => {
      expect(
        getSecurities(
          {},
          {
            security: [{ s1: [], s2: [] }, { s1: [], s3: [] }],
            securityDefinitions: {
              s1: { type: 'basic' },
              s3: { type: 'oauth2' },
              s5: { type: 'apiKey' },
            },
          }
        )
      ).toMatchSnapshot();
    });

    test('should prefer to operation security', () => {
      expect(
        getSecurities(
          { security: [{ type: 'apiKey' }] },
          {
            security: [{ s1: [] }],
            securityDefinitions: { s1: { type: 'basic' } },
          }
        )
      ).toMatchSnapshot();
    });
  });

  describe('getProduces', () => {
    test('given all empty arrays should return asterisk', () => {
      expect(getProduces({}, {})).toMatchSnapshot();
      expect(getProduces({ produces: [] }, { produces: [] })).toMatchSnapshot();
    });

    test('should fallback to spec produces', () => {
      expect(getProduces({}, { produces: ['text/plain'] })).toMatchSnapshot();
    });

    test('should prefer operation produces', () => {
      expect(getProduces({ produces: ['text/poem'] }, { produces: ['text/plain'] })).toMatchSnapshot();
    });
  });

  describe('getConsumes', () => {
    test('given all empty arrays should return asterisk', () => {
      expect(getConsumes({}, {})).toMatchSnapshot();
      expect(getConsumes({ consumes: [] }, { consumes: [] })).toMatchSnapshot();
    });

    test('should fallback to spec consumes', () => {
      expect(getConsumes({}, { consumes: ['text/plain'] })).toMatchSnapshot();
    });

    test('should prefer operation consumes', () => {
      expect(getConsumes({ consumes: ['text/poem'] }, { consumes: ['text/plain'] })).toMatchSnapshot();
    });
  });
});
