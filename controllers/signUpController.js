//Importar clase de productos
const { userManager } = require("../dao/classes/userManager");

const loginController = {
  showForm: async function (req, res) {
    return res.render("signUp", {});
  },

  signUp: async function (req, res) {
    const { firstName, lastName, email, age, password, role } = req.body;

    //Validar que los campos no esten vacios
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      age !== "" &&
      password !== ""
    ) {
      //Crea el usuario
      const user = await userManager.createUser(
        firstName,
        lastName,
        email,
        age,
        password,
        role ? role : "usuario"
      );

      //Validar que el usuario se encuentre en la base de datos y loggearlo
      if (user) {
        //Crear la session
        req.session.userLoggedIn = true;
        req.session.user = user;
        return res.redirect("/api/products");
      }

      return res.render("signUp", {
        errors: "Error al crear el usuario, intente nuevamente",
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        password,
      });
    }

    return res.render("signUp", {
      errors: "Favor diligenciar todos los campos del signUp",
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
    });
  },
};
module.exports = loginController;
