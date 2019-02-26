import { replaceWildcards } from '../utils/replaceWildcards';

describe('replaceWildcards', () => {
  it('should substitute * and ? with current path values', () => {
    expect(replaceWildcards('foo.*.bar', ['foo', 'bar', 'one', 'two', 'three'])).toEqual(['foo', 'bar', 'bar']);
    expect(replaceWildcards('*.bar.?.*', ['foo', 'bar', 'one', 'two', 'three'])).toEqual(['foo', 'bar', 'one']);
    expect(replaceWildcards('foo', ['foo', 'bar', 'one', 'two', 'three'])).toEqual(['foo']);
    expect(replaceWildcards('*.?', ['foo', 'bar', 'one', 'two', 'three'])).toEqual(['foo', 'bar']);
  });
});
