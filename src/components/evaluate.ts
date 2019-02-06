const expr = require('expression-eval');
const memoize = require('lodash/memoize');

// Compile expression or return cached compiled expression
const compile = memoize(expr.compile);

export function evaluate(str: string, context: any, currentProp: string, fallbackValue: any) {
  // Transform `paths.*.*.responses.*.foo` into `foo`
  const _context = {};
  for (const prop in context) {
    // Only consider properties ABOVE the current property in the schema
    // (This enforces a top-to-bottom data dependency which is just nice.)
    if (prop === currentProp) break;
    const short = prop.split('.').pop() as string;
    _context[short] = context[prop];
  }
  // Evaluate expression
  try {
    return compile(str)(_context);
  } catch (err) {
    console.log(err, str, _context);
    return fallbackValue;
  }
}
