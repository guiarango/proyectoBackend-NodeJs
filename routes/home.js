const express = require("express");

//Se instancia el router
const router = express.Router();

//Importar productManager
const { productManager } = require("../dao/classes/productManager");

router.get("", function (req, res) {
  const products = productManager.getProducts();
  res.render("home", { products });
});

module.exports = router;
