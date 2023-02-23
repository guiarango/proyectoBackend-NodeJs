const express = require("express");
const router = express.Router();

//Importar controlador de user
const loginController = require("../controllers/loginController");

//Importar middlewares
const userIsLoggedInMiddleware = require("../middlewares/userIsLoggedInMiddleware");

router.get("/", userIsLoggedInMiddleware, loginController.showForm);
router.post("/", loginController.login);
router.post("/logout", loginController.logout);

module.exports = router;
