//Se instancia el router
const express = require("express");
const router = express.Router();

//Middleware de carts
const { middlewareCarts } = require("../middlewares/customMiddleware");

//Middleware de cart
router.use(middlewareCarts);

//Importar controlador de cart
const cartController = require("../controllers/cartController");

router.get("", cartController.listCarts);

router.get("/:cid", cartController.getCartById);

router.post("", cartController.createCart);

router.post("/:cid/product/:pid", cartController.addProductToCart);

router.put("/:cid", cartController.updateAllProducts);

router.put("/:cid/product/:pid", cartController.updateProductQuantity);

router.delete("/:cid", cartController.deleteCart);

router.delete("/:cid/product/:pid", cartController.deleteProductFromCart);

module.exports = router;
