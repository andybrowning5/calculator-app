import { useEffect, useMemo, useRef, useState } from 'react';
import Key from './Key';
import { calculate } from '../lib/api';

const OPERATORS = ['+', '-', '×', '÷', '*', '/', '%', '^'];

function toApiExpression(expr: string) {
  return expr.replace(/×/g, '*').replace(/÷/g, '/');
}

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const displayRef = useRef<HTMLDivElement>(null);

  const canAppendOperator = useMemo(() => {
    if (!expression) return false;
    const last = expression.trim().slice(-1);
    return !OPERATORS.includes(last) && last !== '(';
  }, [expression]);

  function append(val: string) {
    setError('');
    if (OPERATORS.includes(val)) {
      if (!canAppendOperator) return;
    }
    if (val === ')') {
      const opens = (expression.match(/\(/g) || []).length;
      const closes = (expression.match(/\)/g) || []).length;
      if (closes >= opens) return;
    }
    setExpression((e) => (e + val).replace(/\s+/g, ''));
  }

  function clearAll() {
    setExpression('');
    setResult('');
    setError('');
  }

  function backspace() {
    setExpression((e) => e.slice(0, -1));
  }

  async function equals() {
    try {
      const { result } = await calculate(toApiExpression(expression));
      setResult(String(result));
      setError('');
    } catch (e: any) {
      setError(e.message || 'Error');
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = e.key;
      if ((k >= '0' && k <= '9') || ['.', '(', ')'].includes(k)) append(k);
      else if (k === '+') append('+');
      else if (k === '-') append('-');
      else if (k === '*') append('×');
      else if (k === '/') append('÷');
      else if (k === '%') append('%');
      else if (k === '^') append('^');
      else if (k === 'Enter' || k === '=') { e.preventDefault(); equals(); }
      else if (k === 'Backspace') backspace();
      else if (k.toLowerCase() === 'c') clearAll();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expression]);

  useEffect(() => {
    displayRef.current?.scrollTo({ top: displayRef.current.scrollHeight });
  }, [expression, result, error]);

  const keys = [
    '(', ')', '⌫', 'C',
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', '%', '+',
    '^'
  ];

  function onPress(label: string) {
    if (label === 'C') return clearAll();
    if (label === '⌫') return backspace();
    append(label);
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow-xl p-5">
      <div ref={displayRef} className="h-28 rounded-xl bg-slate-900 text-slate-100 p-4 mb-4 overflow-y-auto">
        <div className="text-slate-300 text-sm">{expression || '0'}</div>
        <div className="text-2xl font-semibold">{result}</div>
        {error && <div className="text-rose-400 text-sm mt-1">{error}</div>}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {keys.map((k) => (
          <Key key={k} label={k} onPress={onPress} className={k==='C' ? 'bg-rose-50 hover:bg-rose-100' : ''} />
        ))}
        <button
          onClick={equals}
          className="col-span-4 rounded-xl p-3 text-lg font-medium shadow bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white"
        >
          =
        </button>
      </div>
      <div className="mt-3 text-xs text-slate-500 text-center">Tip: Use keyboard for faster input.</div>
    </div>
  );
}
