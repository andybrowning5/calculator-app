export async function calculate(expression: string) {
  const res = await fetch('http://localhost:3000/api/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json() as Promise<{ result: number | string }>;
}
