import { SecuritySchemeObject } from 'openapi3-ts';
import { translateOas3ToSecurities } from '../helpers/securities.translator';

describe('translateOas3ToSecurities', () => {
  test('should just return the same object', () => {
    const collection: SecuritySchemeObject[] = [];
    expect(translateOas3ToSecurities(collection)).toBe(collection);
  });
});
