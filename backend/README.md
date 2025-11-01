# Backend

Express + TypeScript API for evaluating calculator expressions.

## Endpoints
- GET /healthz → { status: 'ok' }
- POST /api/calculate { expression: string } → { result: number|string } or { error }

Validation: only digits, operators (+ - * / % ^), parentheses, spaces, and decimal point. Max 200 chars.

## Dev
```
npm run dev
```

## Test
```
npm test
```
