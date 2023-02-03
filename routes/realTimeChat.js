const express = require("express");

//Se instancia el router
const router = express.Router();

//Importar chatController
const chatController = require("../controllers/chatController");

//ENDPOINTS
router.get("/", chatController.retrieveMessagesFromDB);

module.exports = router;
