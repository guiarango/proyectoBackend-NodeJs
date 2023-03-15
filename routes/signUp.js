const express = require("express");
const passport = require("passport");
const router = express.Router();

//Importar controlador de user
const signUpController = require("../controllers/signUpController");

//Importar middlewares
const userIsLoggedInMiddleware = require("../middlewares/userIsLoggedInMiddleware");

router.get("/", userIsLoggedInMiddleware, signUpController.showForm);
router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    const user = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
      cartId: req.user.cartId,
    };

    req.session.user = user;
    req.session.userLoggedIn = true;

    return res.redirect("/api/products");
    // res.send({ status: "success", message: "User registered" });
  }
);

router.get("/failRegister", async (req, res) => {
  console.log("Failed strategy");
  res.send({ error: "Failed" });
});

// router.post("/", signUpController.signUp);

module.exports = router;
