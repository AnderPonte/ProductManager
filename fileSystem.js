import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.patch = "./products.txt";
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, image, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      image,
      code,
      stock,
      id: ProductManager.id,
    };

    console.log(newProduct);

    this.products.push(newProduct);

    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let response = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(response);
  };

  getProducts = async () => {
    let response2 = await this.readProducts();
    return console.log(response2);
  };

  getProductById = async (id) => {
    let response3 = await this.readProducts();
    let filter = response3.find((product) => product.id === id);

    if (!filter) {
      console.log("Producto No encontrado");
    } else {
      console.log(filter);
    }
  };

  deleteProductById = async (id) => {
    let response3 = await this.readProducts();
    let productDelete = response3.filter((product) => product.id != id);
    await fs.writeFile(this.patch, JSON.stringify(productDelete));
    console.log("Producto Eliminado");
  };

  updateProducts = async ({ id, ...product }) => {
    await this.deleteProductById(id);
    let productOld = await this.readProducts();
    let productUpdate = [{ ...product, id }, ...productOld];
    await fs.writeFile(this.patch, JSON.stringify(productUpdate));
  };
}

const productos = new ProductManager();

// productos.addProduct("titulo1", "descripción 1", 23, "image1", "3456", 10);
// productos.addProduct("titulo2", "descripción 2", 34, "image2", "4323", 23);
// productos.addProduct("titulo3", "descripción 3", 56, "image3", "5645", 10);

// productos.getProducts();
// productos.getProductById(3);
// productos.deleteProductById(3);
// productos.updateProducts({
//   title: "titulo3",
//   description: "descripción 3",
//   price: 89,
//   image: "image3",
//   code: "5645",
//   stock: 10,
//   id: 3,
// });
