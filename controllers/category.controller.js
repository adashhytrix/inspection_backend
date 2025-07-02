const db = require("../config/db");

exports.createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  db.query("INSERT INTO categories (name) VALUES (?)", [name], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Category already exists" });
      }
      return res.status(500).json({ message: "Error creating category", error: err });
    }
    res.status(201).json({ message: "Category created", id: result.insertId });
  });
};

exports.getCategories = (req, res) => {
  db.query("SELECT id AS sl_no, name FROM categories ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching categories" });
    res.status(200).json(results);
  });
};
