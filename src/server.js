import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;

const productos = new ProductManager();
const readAllProduct = productos.readProducts();

app.get("/products", async (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!limit) return res.send(await readAllProduct);

  let allProducts = await readAllProduct;
  let productLimit = allProducts.slice(0, limit);

  res.send(productLimit);
});

app.get("/products/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  let allProducts = await readAllProduct;
  let productById = allProducts.find((product) => product.id === pid);
  res.send(productById);
});

const server = app.listen(PORT, () => {
  console.log(`express por local host ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error del servidor ${error}`));
