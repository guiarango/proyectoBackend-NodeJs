//Importar clase de productos
const { cartManager } = require("../dao/classes/cartManager");

const cartController = {
  listCarts: async function (req, res) {
    try {
      const carrito = await cartManager.getCarts();
      return res.status(200).send(carrito);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },

  createCart: async (req, res) => {
    const jsonProductos = req.body;

    if (jsonProductos.length > 0) {
      try {
        const result = await cartManager.createCart(jsonProductos);
        return res.status(200).send({ result: "sucess", payload: result });
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      return res.status(404).send("Información de carrito vacía");
    }
  },

  getCartById: async function (req, res) {
    //Se guarda el param de pid
    const cid = req.params.cid;
    //Se valida que el resultado de carrito exista
    try {
      const carrito = await cartManager.getProductsByCartId(cid);
      console.log(carrito);
      return res.render("cartDetail", { carrito: carrito.products });
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },
  addProductToCart: async (req, res) => {
    const quantity = req.body.quantity;
    const cid = req.params.cid;
    const pid = req.params.pid;

    if (!quantity) {
      res.status(404).send("La cantidad no ha sido definida");
    }

    try {
      const newProductsOnCart = await cartManager.addProductToCart(
        cid,
        pid,
        quantity
      );
      return res.status(200).send(newProductsOnCart);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },

  updateAllProducts: async (req, res) => {
    const cid = req.params.cid;
    const products = req.body.products;

    try {
      const updatedProducts = await cartManager.updateAllProductsOnCart(
        cid,
        products
      );
      return res.status(200).send(updatedProducts);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },

  updateProductQuantity: async (req, res) => {
    const quantity = req.body.quantity;
    const cid = req.params.cid;
    const pid = req.params.pid;

    try {
      const updatedProduct = await cartManager.updateProductQuantityOnCart(
        cid,
        pid,
        quantity
      );
      return res.status(200).send(updatedProduct);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },

  deleteCart: async (req, res) => {
    const cid = req.params.cid;

    try {
      const deletedCart = await cartManager.deleteCart(cid);
      return res.status(200).send(deletedCart);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },

  deleteProductFromCart: async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    try {
      const deletedProduct = await cartManager.deleteProductFromCart(cid, pid);
      return res.status(200).send(deletedProduct);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
};

module.exports = cartController;
