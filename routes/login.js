const express = require("express");
const passport = require("passport");
const router = express.Router();

//Importar controlador de user
const loginController = require("../controllers/loginController");

//Importar middlewares
const userIsLoggedInMiddleware = require("../middlewares/userIsLoggedInMiddleware");

router.get("/", userIsLoggedInMiddleware, loginController.showForm);

router.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/failLogin" }),
  async (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .send({ status: "error", error: "Invalid credentials" });
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };
    res.send({ status: "success", payload: req.user });
  }
);

router.get("/failLogin", async (req, res) => {
  res.send({ error: "Failed Login" });
});

router.post("/logout", loginController.logout);

// router.post("/", loginController.login);

module.exports = router;
