const express = require("express");

//Se instancia el router
const router = express.Router();

//Middleware de products
const { middlewareProducts } = require("../middlewares/customMiddleware");

//Middleware de products
router.use(middlewareProducts);

//Importar modulo de productos
const { productManager } = require("../classes/productManager");

router.get("", function (req, res) {
  //Se guarda el query string de limit
  const limit = Number(req.query.limit);

  //Se consultan los productos
  const products = productManager.getProducts();
  let respuesta;

  //Se valida que exista la variable limit y que sea un número
  if (limit && !isNaN(limit)) {
    respuesta = products.slice(0, limit);
  } else {
    respuesta = products;
  }
  return res.status(200).send(respuesta);
});

router.post("", (req, res) => {
  const jsonProductos = Array(req.body);

  if (jsonProductos.length) {
    jsonProductos.map((producto) => {
      //Se extraen los valores de cada objeto y luego se distribuyen dentro del metodo addproduct
      let valores = Object.values(producto);
      try {
        productManager.addProduct(...valores);
      } catch (error) {
        return res.status(404).send(error.message);
      }
    });

    return res.status(200).send("Producto creado");
  }
  return res.status(404).send("Información de producto vacía");
});

router.get("/:pid", function (req, res) {
  //Se guarda el param de pid
  const pid = Number(req.params.pid);

  //Se valida que el resultado de product exista
  try {
    const product = productManager.getProductById(pid);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.put("/:pid", function (req, res) {
  //Se guarda el param de pid
  const pid = Number(req.params.pid);

  try {
    productManager.updateProduct(pid, req.body);
    return res.status(200).send("Producto actualizado");
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.delete("/:pid", function (req, res) {
  //Se guarda el param de pid
  const pid = Number(req.params.pid);

  try {
    productManager.deleteProduct(pid, req.body);
    return res.status(200).send("Producto borrado");
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
