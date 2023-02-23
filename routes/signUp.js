const express = require("express");
const router = express.Router();

//Importar controlador de user
const signUpController = require("../controllers/signUpController");

//Importar middlewares
const userIsLoggedInMiddleware = require("../middlewares/userIsLoggedInMiddleware");

router.get("/", userIsLoggedInMiddleware, signUpController.showForm);
router.post("/", signUpController.signUp);

module.exports = router;
