const passport = require("passport");
const local = require("passport-local");
const { userModel } = require("../../dao/models/ecommerceModels");
const bcrypt = require("bcrypt");

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        let { firstName, lastName, email, age, role } = req.body;

        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            console.log("user already exists");
            return done(null, false);
          }

          role = role ? role : "usuario";
          const newUser = {
            firstName,
            lastName,
            email,
            age,
            role,
            password: bcrypt.hashSync(password, 10),
          };
          let result = userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("error al obtener el usuario " + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          let user = await userModel.findOne({ email: username });

          //El usuario no existe
          if (!user) {
            console.log("user doesn't exist");
            return done(null, false);
          }

          //Las contrasenas no coinciden
          if (!bcrypt.compareSync(password, user._doc.password)) {
            return done(null, false);
          }

          delete user._doc.password;
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser(async (user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

module.exports = initializePassport;
