/* Simple in-memory CRUD API server for examples
   - No DB, stores items in an in-memory array
   - Exposes RESTful endpoints on port 7001
*/

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 7001;

app.use(cors());
app.use(express.json());

// In-memory store
const items = [
  { id: 1, name: 'Apples', qty: 3 },
  { id: 2, name: 'Bananas', qty: 5 }
];
let nextId = 3;

// Health
app.get('/health', (req, res) => res.json({ ok: true, port }));

// List items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get single item
app.get('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// Create item
app.post('/items', (req, res) => {
  const { name, qty } = req.body || {};
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name is required' });
  }
  const item = { id: nextId++, name: name.trim(), qty: Number(qty) || 0 };
  items.push(item);
  res.status(201).json(item);
});

// Update / replace item
app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const { name, qty } = req.body || {};
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name is required' });
  }
  items[idx] = { id, name: name.trim(), qty: Number(qty) || 0 };
  res.json(items[idx]);
});

// Partial update
app.patch('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  const { name, qty } = req.body || {};
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'name must be a non-empty string' });
    }
    item.name = name.trim();
  }
  if (qty !== undefined) item.qty = Number(qty) || 0;
  res.json(item);
});

// Delete
app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const [deleted] = items.splice(idx, 1);
  res.json(deleted);
});

// Seed example route for quick demo (adds sample items)
app.post('/seed', (req, res) => {
  items.length = 0;
  nextId = 1;
  const sample = [
    { id: nextId++, name: 'Apples', qty: 3 },
    { id: nextId++, name: 'Bananas', qty: 5 }
  ];
  items.push(...sample);
  res.json({ seeded: items.length, items });
});

app.listen(port, () => {
  console.log(`CRUD server listening on http://localhost:${port}`);
});
