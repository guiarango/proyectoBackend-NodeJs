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
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
    };
    req.session.userLoggedIn = true;

    res.redirect("products");
    // res.send({ status: "success", payload: req.user });
  }
);

router.get("/failLogin", async (req, res) => {
  res.send({ error: "Failed Login" });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
    };

    req.session.userLoggedIn = true;

    res.redirect("/api/products");
  }
);

router.post("/logout", loginController.logout);

// router.post("/", loginController.login);

module.exports = router;
