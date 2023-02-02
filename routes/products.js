const express = require("express");

//Se instancia el router
const router = express.Router();

//Middleware de products
const { middlewareProducts } = require("../middlewares/customMiddleware");

//Middleware de products
router.use(middlewareProducts);

//Importar modulo de productos
const { productManager } = require("../dao/classes/productManager");

router.get("", async function (req, res) {
  //Se guarda el query string de limit
  const limit = Number(req.query.limit);

  //Se consultan los productos
  const products = await productManager.getProducts();
  let respuesta;

  //Se valida que exista la variable limit y que sea un número
  if (limit && !isNaN(limit)) {
    respuesta = products.slice(0, limit);
  } else {
    respuesta = products;
  }
  return res.status(200).send(respuesta);
});

router.post("", async (req, res) => {
  const {
    title,
    description,
    price,
    code,
    stock,
    status,
    category,
    thumbnail,
  } = req.body;

  //Validar que los objetos no vengan vacios
  if (
    title &&
    description &&
    price &&
    code &&
    stock &&
    status !== null &&
    category
  ) {
    try {
      const result = await productManager.addProduct(
        title,
        description,
        price,
        code,
        stock,
        status,
        category,
        thumbnail
      );
      return res.status(200).send({ result: "sucess", payload: result });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    return res.status(404).send("Información de producto vacía");
  }
});

router.get("/:pid", async function (req, res) {
  //Se guarda el param de pid
  const pid = req.params.pid;

  //Se valida que el resultado de product exista
  try {
    const product = await productManager.getProductById(pid);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.put("/:pid", async function (req, res) {
  //Se guarda el param de pid
  const pid = req.params.pid;
  const data = req.body;

  try {
    const result = await productManager.updateProduct(pid, data);
    return res.status(200).send({ result: "sucess", payload: result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/:pid", async function (req, res) {
  //Se guarda el param de pid
  const pid = req.params.pid;

  try {
    const product = await productManager.deleteProduct(pid);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
