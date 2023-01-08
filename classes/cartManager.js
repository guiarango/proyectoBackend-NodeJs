const fs = require("fs");

const { productManager } = require("./productManager");

class CartManager {
  constructor(path) {
    this.fileName = "carts.json";
    this.path = path;
    this.carts = [];
    this.idCarritoCreado = this.findHighestId();
  }

  findHighestId() {
    const carts = this.getCarts();
    let highestId = 0;

    //Retornar 0 si el el array no tiene elementos
    if (carts.length <= 0) {
      return highestId;
    }

    //Iterar cada producto del array para averiguar cuál es el Id más alto
    carts.forEach((cart) => {
      if (highestId < cart.id) {
        highestId = cart.id;
      }
    });

    //Retornar el id más alto + 1
    return highestId + 1;
  }

  getCarts() {
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

  writeCarts(cartsToPost) {
    fs.writeFileSync(
      `${this.path + this.fileName}`,
      JSON.stringify(cartsToPost)
    );
  }

  incrementId() {
    this.idProductoCreado++;
  }

  createCart(products = []) {
    //Retornar todos los productos
    const carts = this.getCarts();

    //Se crea el objeto productos
    const cart = {
      id: this.idCarritoCreado,
      products: products,
    };

    //Se agrega el producto al json
    carts.push(cart);
    this.writeCarts(carts);

    //Se incrementa el id en 1
    this.incrementId();
  }

  getProductsByCartId(id) {
    const carts = this.getCarts();
    const foundCart = carts.find((cart) => cart.id == id);

    if (typeof foundCart == "undefined") {
      throw new Error("El id no fue encontrado");
    } else {
      return foundCart.products;
    }
  }

  addProductToCart(cid, pid, quantity) {
    const carts = this.getCarts();

    //Se valida que el cart exista
    const foundCartIndex = carts.findIndex((cart) => cart.id == cid);
    if (foundCartIndex === -1) {
      throw new Error("El cart id no fue encontrado");
    }

    //Se valida que el producto exista
    const producto = productManager.getProductById(pid);

    //Se crea el producto
    const nuevoProducto = { id: producto.id, quantity };

    //Se valida si el producto ya existe en el cart
    const productExistsIndex = carts[foundCartIndex].products.findIndex(
      (product) => product.id === pid
    );

    if (productExistsIndex === -1) {
      carts[foundCartIndex].products.push(nuevoProducto);
    } else {
      carts[foundCartIndex].products[productExistsIndex].quantity = quantity;
    }

    //Se agrega el producto al cart
    this.writeCarts(carts);

    return nuevoProducto;
  }
}

const cartManager = new CartManager("./database/");

module.exports = { cartManager };
