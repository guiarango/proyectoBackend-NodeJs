//Importar clase de productos
const { userManager } = require("../dao/classes/userManager");
const bcrypt = require("bcrypt");

const loginController = {
  showForm: async function (req, res) {
    return res.render("login", {});
  },

  login: async function (req, res) {
    const { email, password } = req.body;

    //Validar que los campos no esten vacios
    if (email !== "" && password !== "") {
      //Encontrar el usuario por email y password
      const user = await userManager.getUser(email);

      if (user) {
        //Validar passwords
        const passwordBD = user._doc.password;
        const passwordValid = bcrypt.compareSync(password, passwordBD);

        if (passwordValid) {
          //Crear la session
          delete user._doc.password;
          req.session.userLoggedIn = true;
          req.session.user = user;
          return res.redirect("/api/products");
        }
      }

      return res.render("login", {
        errors: "Favor validar el email y el password",
        email: email,
      });
    }

    console.log(email);
    return res.render("login", {
      errors: "Favor diligenciar todos los campos del Login",
      email: email,
    });
  },
  logout: async function (req, res) {
    req.session.destroy();
    return res.redirect("/api/login");
  },
};
module.exports = loginController;
