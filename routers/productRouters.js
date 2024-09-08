// // src/routers/productRoutes.js
const express = require("express");
const {
  createProduct,
  getProduct,
  getTaskOptionsForProduct,
  updateProduct,
} = require("../controllers/productControllers");

const productRouter = express.Router();

productRouter.post("/products", createProduct);
productRouter.get("/product/:id", getProduct);
productRouter.get("/productOptions/:id", getTaskOptionsForProduct);
productRouter.patch("/product/:id", updateProduct);

module.exports = productRouter;
