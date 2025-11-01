import express from 'express';
import cors from 'cors';
import { isValidExpression, evaluateExpression } from './evaluator';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/calculate', (req, res) => {
  const { expression } = req.body ?? {};
  if (!isValidExpression(expression)) {
    return res.status(400).json({ error: 'Invalid or unsafe expression' });
  }
  try {
    const result = evaluateExpression(expression);
    return res.status(200).json({ result });
  } catch (e: any) {
    return res.status(400).json({ error: 'Invalid expression' });
  }
});

export default app;
