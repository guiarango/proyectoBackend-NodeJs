const { cartModel } = require("../models/ecommerceModels");
const { productManager } = require("./productManager");

class CartManager {
  constructor() {}

  async getCarts() {
    try {
      const data = await cartModel.find({}).populate("products.productId");
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
      const cartFound = await cartModel
        .findOne({ _id: cid })
        .populate("products.productId");
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

      //Se valida que el producto exista en el carrito
      const productOnCartIndex = products.findIndex(
        (product) => product.productId._id.toString() === pid
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateAllProductsOnCart(cid, products) {
    //Se valida que el carrito exista y se guarda en una variable
    await this.getProductsByCartId(cid);

    try {
      //Se valida que el array no esta vacio
      if (products.length <= 0) {
        throw new Error(error);
      }

      const updatedProduct = await cartModel.updateOne(
        { _id: cid },
        { products: products }
      );

      return updatedProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductQuantityOnCart(cid, pid, quantity) {
    //Se valida que el carrito exista y se guarda en una variable
    const { products } = await this.getProductsByCartId(cid);

    //Se valida que el producto exista
    try {
      await productManager.getProductById(pid);

      //Se valida que el producto exista en el carrito
      const productOnCartIndex = products.findIndex(
        (product) => product.productId._id.toString() === pid
      );

      // Se valida si el producto existe o no
      if (productOnCartIndex !== -1) {
        products[productOnCartIndex].quantity = quantity;
      }

      const updatedProduct = await cartModel.updateOne(
        { _id: cid },
        { products: products }
      );

      return updatedProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCart(cid) {
    //Se borra el carrito de la DB
    try {
      const newCart = await cartModel.deleteOne({ _id: cid });
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cid, pid) {
    //Se valida que el carrito exista y se guarda en una variable
    const { products } = await this.getProductsByCartId(cid);

    try {
      //Se valida que el producto exista en el carrito
      const newArrayOfProducts = products.filter(
        (product) => product.productId._id.toString() !== pid
      );

      if (products.length === newArrayOfProducts.length) {
        throw new Error("Product not found in cart");
      }

      const updatedProduct = await cartModel.updateOne(
        { _id: cid },
        { products: newArrayOfProducts }
      );

      return updatedProduct;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const cartManager = new CartManager();

module.exports = { cartManager };
