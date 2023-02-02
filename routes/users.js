const express = require("express");
const { userModel } = require("../dao/models/ecommerceModels");

//Se instancia el router
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    let users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
