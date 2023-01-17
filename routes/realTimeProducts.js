const express = require("express");

//Se instancia el router
const router = express.Router();

//Importar productManager
const { productManager } = require("../classes/productManager");

//ENDPOINTS
router.get("/", function (req, res) {
  const products = productManager.getProducts();
  res.render("realTimeProducts", { products });
});

module.exports = router;
