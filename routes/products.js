//Se instancia el router
const express = require("express");
const router = express.Router();

//Middleware de products
const { middlewareProducts } = require("../middlewares/customMiddleware");

//Middleware de products
router.use(middlewareProducts);

//Importar controlador de producto
const productController = require("../controllers/productController");

router.get("", productController.listProducts);

router.get("/:pid", productController.findProductById);

router.post("", productController.createProduct);

router.put("/:pid", productController.updateProductById);

router.delete("/:pid", productController.deleteProductById);

module.exports = router;
