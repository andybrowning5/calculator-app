import { isValidExpression, evaluateExpression } from '../src/evaluator';

describe('evaluator', () => {
  it('validates allowed characters and length', () => {
    expect(isValidExpression('1 + 2 * (3 - 4) / 5')).toBe(true);
    expect(isValidExpression('')).toBe(false);
    expect(isValidExpression('2 ** 3')).toBe(false); // ** not allowed
    expect(isValidExpression('alert(1)')).toBe(false);
  });

  it('evaluates simple expressions', () => {
    expect(evaluateExpression('1+2')).toBe(3);
    expect(evaluateExpression('2 * (3 + 4)')).toBe(14);
  });

  it('throws on invalid expressions', () => {
    expect(() => evaluateExpression('1+')).toThrow('Invalid expression');
  });
});
