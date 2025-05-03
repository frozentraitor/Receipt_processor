import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

const receipts = new Map();

// POST /receipts/process
app.post('/receipts/process', (req, res) => {
  const receipt = req.body;
  // TODO: validate against your schema
  const id = uuidv4();
  receipts.set(id, receipt);
  res.json({ id });
});

// GET /receipts/:id/points
app.get('/receipts/:id/points', (req, res) => {
  const receipt = receipts.get(req.params.id);
  if (!receipt) return res.status(404).json({ error: 'Not Found' });

  let points = 0;
  // TODO: implement all scoring rules here
  // e.g. points += countAlphanumeric(receipt.retailer);

  res.json({ points });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
