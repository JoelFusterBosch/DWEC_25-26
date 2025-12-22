// models/product.model.js
import connection from "../api/db.js";

const errorHandler = (err, res) => {
  console.error(err);
  res.status(500).json({ error: "Error en el servidor" });
};

export const getAllProducts = async (req, res) => {
  try {
    const [results] = await connection.query("SELECT * FROM products");
    res.status(200).json(results); // enviar todos los productos
  } catch (err) {
    errorHandler(err, res);
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await connection.query("SELECT * FROM products WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    errorHandler(err, res);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const [result] = await connection.query("INSERT INTO products (name, price) VALUES (?, ?)", [name, price]);
    res.status(201).json({ id: result.insertId, name, price });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price } = req.body;
    await connection.query("UPDATE products SET name=?, price=? WHERE id=?", [name, price, id]);
    res.json({ id, name, price });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await connection.query("DELETE FROM products WHERE id=?", [id]);
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    errorHandler(err, res);
  }
};
