const expr = require('expression-eval');
const cache = new Map();

// Compile expression or return cached compiled expression
function compile(str: string) {
  const cached = cache.get(str);
  if (cached) {
    return cached;
  } else {
    const compiled = expr.compile(str);
    cache.set(str, compiled);
    return compiled;
  }
}

export function evaluate(str: string, context: any, currentProp: string) {
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
    return true;
  }
}
