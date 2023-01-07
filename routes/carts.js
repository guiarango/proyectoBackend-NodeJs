const express = require("express");

//Se instancia el router
const router = express.Router();

//Middleware de carts
const { middlewareCarts } = require("../middlewares/customMiddleware");

//Middleware de cart
router.use(middlewareCarts);

//Importar modulo de carts
const { cartManager } = require("../classes/cartManager");

router.post("", (req, res) => {
  const jsonProductos = Array(req.body);

  if (jsonProductos.length) {
    jsonProductos.map((producto) => {
      //Se extraen los valores de cada objeto y luego se distribuyen dentro del metodo createCart
      let valores = Object.values(producto);
      cartManager.createCart(...valores);
    });

    return res.status(200).send("Carrito creado");
  }
  return res.status(404).send("Información de carrito vacía");
});

router.get("/:cid", function (req, res) {
  //Se guarda el param de pid
  const cid = Number(req.params.cid);

  //Se valida que el resultado de carrito exista
  try {
    const carrito = cartManager.getProductsByCartId(cid);
    return res.status(200).send(carrito);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  const quantity = req.body.quantity;
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);

  if (!quantity) {
    res.status(404).send("La cantidad no ha sido definida");
  }

  try {
    cartManager.addProductToCart(cid, pid, quantity);
  } catch (error) {
    res.status(404).send(error.message);
  }

  return res.status(200).send("Producto agregado al carrito");
});

module.exports = router;
