//Importar librería
const express = require("express");

//Instanciar servidor
const app = express();

//Importar modulo de productos
const { productManager } = require("./productManager.js");

//Puerto en el cuál trabajar
const port = 3000;

//--------------------ENDPOINTS--------------------
app.get("/", function (req, res) {
  res.send("Bienvenido al home");
});

app.get("/products", function (req, res) {
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
  res.json(respuesta);
});

app.get("/products/:pid", function (req, res) {
  //Se guarda el param de pid
  const pid = Number(req.params.pid);

  //Se consultan el producto con pid
  const product = productManager.getProductById(pid);
  let respuesta;

  //Se valida que el resultado de product exista
  if (product) {
    respuesta = product;
  } else {
    respuesta = "No se encontró el producto deseado";
  }

  res.json(respuesta);
});

//Levantar servidor
app.listen(port, function () {
  console.log(`app running on port ${port}`);
});
