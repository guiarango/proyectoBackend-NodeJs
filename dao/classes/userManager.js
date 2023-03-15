const { userModel } = require("../models/ecommerceModels");

class UserManager {
  constructor() {}

  async getUser(email, password) {
    try {
      const userFound = await userModel
        .findOne({
          email: email,
        })
        .populate("carts._id");
      return userFound;
    } catch (error) {
      return undefined;
    }
  }

  async createUser(firstName, lastName, email, age, password, role) {
    //Se crea el objeto productos
    const userInfo = { firstName, lastName, email, age, password, role };

    //Se agrega el carrito a la DB
    try {
      let newUser = await userModel.create(userInfo);
      delete newUser._doc.password;
      return newUser;
    } catch (error) {
      return undefined;
    }
  }
}

const userManager = new UserManager();

module.exports = { userManager };
