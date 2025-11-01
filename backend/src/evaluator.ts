import { create, all } from 'mathjs';

const math = create(all, {});

export function isValidExpression(expression: string): boolean {
  if (!expression || typeof expression !== 'string') return false;
  if (expression.length > 200) return false;
  // Allow digits, ops, spaces, decimal, parentheses, percent, caret
  const allowed = /^[0-9+\-*/().%^\s]+$/;
  if (!allowed.test(expression)) return false;
  return true;
}

export function evaluateExpression(expression: string): number | string {
  try {
    const result = math.evaluate(expression);
    // Convert BigNumber/Fraction to number or string
    if (typeof result === 'number') return result;
    if (result && typeof result.valueOf === 'function') {
      const v = result.valueOf();
      return typeof v === 'number' ? v : String(v);
    }
    return String(result);
  } catch (err: any) {
    throw new Error('Invalid expression');
  }
}
