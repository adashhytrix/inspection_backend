// routes/items.js
const express = require('express');
const router = express.Router();
const db = require("../config/db");

// GET all items
router.get('/', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// GET single item by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM items WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ message: 'Item not found' });
    res.json(results[0]);
  });
});

// POST create new item
router.post('/', (req, res) => {
  const { item_name, item_unit } = req.body;
  db.query('INSERT INTO items (item_name, item_unit) VALUES (?, ?)', [item_name, item_unit], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, item_name, item_unit });
  });
});

// PUT update item
router.put('/:id', (req, res) => {
  const { item_name, item_unit } = req.body;
  db.query('UPDATE items SET item_name = ?, item_unit = ? WHERE id = ?', [item_name, item_unit, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Item updated' });
  });
});

// DELETE item
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM items WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Item deleted' });
  });
});

module.exports = router;
