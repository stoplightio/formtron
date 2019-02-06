import { evaluate } from '../components/evaluate';

describe('formtron/evaluate', () => {
  test('evaluate', () => {
    // Should be 2 + 3
    const val = evaluate('foo + bar', { foo: 2, bar: 3, baz: 4 }, 'baz', true);
    expect(val).toBe(5);
  });
  test('evaluate only considers prior props', () => {
    // Should be 2 + undefined
    const val = evaluate('foo + bar', { foo: 2, bar: 3, baz: 4 }, 'bar', true);
    expect(val).not.toBe(5);
  });
  test('evaluate handles errors gracefully', () => {
    // Should return fallback value
    const val = evaluate('foo + bar +', { foo: 2, bar: 3, baz: 4 }, 'bar', 42);
    expect(val).toBe(42);
  });
});
