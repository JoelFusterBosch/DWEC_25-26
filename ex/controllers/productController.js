import express from 'express'
const router = express.Router();

router.use(express.json())


//mysql2
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await getProduct(req.params.id);
  res.json(product);
};

export const createProductCtrl = async (req, res) => {
  const id = await createProduct(req.body);
  res.json({ message: "Producto creado", id });
};

export const updateProductCtrl = async (req, res) => {
  await updateProduct(req.params.id, req.body);
  res.json({ message: "Producto actualizado" });
};

export const deleteProductCtrl = async (req, res) => {
  await deleteProduct(req.params.id);
  res.json({ message: "Producto eliminado" });
};
export default router;