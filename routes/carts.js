const express = require("express");

//Se instancia el router
const router = express.Router();

//Middleware de carts
const { middlewareCarts } = require("../middlewares/customMiddleware");

//Middleware de cart
router.use(middlewareCarts);

//Importar modulo de carts
const { cartManager } = require("../dao/classes/cartManager");

router.post("", async (req, res) => {
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
});

router.get("/:cid", async function (req, res) {
  //Se guarda el param de pid
  const cid = req.params.cid;
  //Se valida que el resultado de carrito exista
  try {
    const carrito = await cartManager.getProductsByCartId(cid);
    return res.status(200).send(carrito);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
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
});

module.exports = router;
