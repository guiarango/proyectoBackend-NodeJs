//Se instancia el router
const express = require("express");
const router = express.Router();

//Middleware de carts
const { middlewareCarts } = require("../middlewares/customMiddleware");

//Middleware de cart
router.use(middlewareCarts);

//Importar controlador de cart
const cartController = require("../controllers/cartController");

router.post("", cartController.createCart);

router.get("/:cid", cartController.getCartById);

router.post("/:cid/product/:pid", cartController.addProductToCart);

module.exports = router;
