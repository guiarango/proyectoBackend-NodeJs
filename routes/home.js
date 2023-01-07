const express = require("express");

//Se instancia el router
const router = express.Router();

router.get("", function (req, res) {
  res.send("Bienvenido al home");
});

module.exports = router;
