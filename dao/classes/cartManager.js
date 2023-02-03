const fs = require("fs");

const { cartModel } = require("../models/ecommerceModels");
const { productManager } = require("./productManager");

class CartManager {
  constructor() {}

  async getCarts() {
    try {
      const data = await cartModel.find({});
      return data;
    } catch (error) {
      throw new Error("No se pudo conectar al servidor");
    }
  }

  async createCart(products = []) {
    //Se crea el objeto productos
    const productsInCart = {
      products: products,
    };

    //Se agrega el carrito a la DB
    try {
      const newCart = await cartModel.create(productsInCart);
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductsByCartId(cid) {
    try {
      const cartFound = await cartModel.findOne({ _id: cid });
      return cartFound;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(cid, pid, quantity) {
    //Se valida que el carrito exista y se guarda en una variable
    const { products } = await this.getProductsByCartId(cid);

    //Se valida que el producto exista
    try {
      productManager.getProductById(pid);
    } catch (error) {
      throw new Error(error);
    }

    //Se valida que el producto exista en el carrito
    const productOnCartIndex = products.findIndex(
      (product) => product.productId === pid
    );

    // Se valida si toca hacer el push de un producto o simplemente actualizar su quantity
    if (productOnCartIndex == -1) {
      products.push({ productId: pid, quantity: quantity });
    } else {
      products[productOnCartIndex].quantity = quantity;
    }

    const updatedProduct = await cartModel.updateOne(
      { _id: cid },
      { products: products }
    );

    return updatedProduct;
  }
}

const cartManager = new CartManager();

module.exports = { cartManager };
