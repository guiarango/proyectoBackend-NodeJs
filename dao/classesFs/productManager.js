const fs = require("fs");

function requiredParameter(parameterName) {
  throw new Error(`El Parametro ${parameterName} no fue ingresado`);
}

class ProductManager {
  constructor(path) {
    this.fileName = "productos.json";
    this.path = path;
    this.products = [];
    this.idProductoCreado = this.findHighestId();
  }

  findHighestId() {
    const products = this.getProducts();
    let highestId = 0;

    //Retornar 0 si el el array no tiene elementos
    if (products.length <= 0) {
      return highestId;
    }

    //Iterar cada producto del array para averiguar cuál es el Id más alto
    products.forEach((product) => {
      if (highestId < product.id) {
        highestId = product.id;
      }
    });

    //Retornar el id más alto + 1
    return highestId + 1;
  }

  getProducts() {
    try {
      const data = JSON.parse(fs.readFileSync(`${this.path + this.fileName}`));
      return data;
    } catch (error) {
      console.log(
        `No se encontró un archivo con el nombre ${this.fileName} en la ruta ${this.path}`
      );
      return [];
    }
  }

  writeProducts(productsToPost) {
    fs.writeFileSync(
      `${this.path + this.fileName}`,
      JSON.stringify(productsToPost)
    );
  }

  incrementId() {
    this.idProductoCreado++;
  }

  addProduct(
    title = requiredParameter("title"),
    description = requiredParameter("description"),
    price = requiredParameter("price"),
    code = requiredParameter("code"),
    stock = requiredParameter("stock"),
    status = requiredParameter("status"),
    category = requiredParameter("category"),
    thumbnail = "Valor por defecto"
  ) {
    //Retornar todos los productos
    const products = this.getProducts();

    //Validar que el code no se repita
    const codigoRepetido = products.some((product) => product.code == code);
    if (codigoRepetido) {
      throw new Error("El code del producto ya existe");
    }

    //Se crea el objeto productos
    const product = {
      id: this.idProductoCreado,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    };

    //Se agrega el producto al json
    products.push(product);
    this.writeProducts(products);

    //Se incrementa el id en 1
    this.incrementId();
  }

  getProductById(id) {
    const products = this.getProducts();
    const foundProduct = products.find((product) => product.id == id);

    if (typeof foundProduct == "undefined") {
      throw new Error("El product id no fue encontrado");
    } else {
      return foundProduct;
    }
  }

  updateProduct(id, dataToUpdate) {
    const products = this.getProducts();
    const foundProductIndex = products.findIndex((product) => product.id == id);

    //Si no se encuentra el id, no se actulizará el producto
    if (foundProductIndex == -1) {
      throw new Error("El id no fue encontrado");
    }

    //Si se encuentra el Id, se procederá a actualizarlo
    products[foundProductIndex] = {
      ...products[foundProductIndex],
      ...dataToUpdate,
    };
    this.writeProducts(products);
    return products[foundProductIndex];
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const foundProductIndex = products.findIndex((product) => product.id == id);

    //Si no se encuentra el id, no se actulizará el producto
    if (foundProductIndex == -1) {
      throw new Error("El id no fue encontrado");
    }

    //Si se encuentra el Id, se procederá a borrarlo
    const productToDelete = products.splice(foundProductIndex, 1);
    this.writeProducts(products);
    return productToDelete;
  }
}

const productManager = new ProductManager("./database/");

module.exports = { productManager };
